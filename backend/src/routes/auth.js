const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const User = require("../models/User");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// In-memory OTP store — keyed by email
const otpStore = new Map();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    const normalizedName = String(name || "").trim();
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const plainPassword = String(password || "");

    if (normalizedName.length < 2) {
      return res.status(400).json({ message: "Name must be at least 2 characters." });
    }
    if (!EMAIL_RE.test(normalizedEmail)) {
      return res.status(400).json({ message: "Please provide a valid email address." });
    }
    if (plainPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }
    if (normalizedEmail === String(process.env.ADMIN_USERNAME || "").toLowerCase()) {
      return res.status(409).json({ message: "This email is reserved." });
    }

    const exists = await User.exists({ email: normalizedEmail });
    if (exists) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const passwordHash = User.hashPassword(plainPassword);
    await User.create({ name: normalizedName, email: normalizedEmail, passwordHash });

    // Do NOT create a session — user must log in manually after registering
    return res.status(201).json({
      ok: true,
      message: "Account created successfully. Please log in.",
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Could not register user." });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { identifier, email, password } = req.body || {};
    const normalizedIdentifier = String(identifier || email || "").trim().toLowerCase();
    const plainPassword = String(password || "");

    // Admin login
    if (
      normalizedIdentifier === String(process.env.ADMIN_USERNAME || "admin").toLowerCase() &&
      plainPassword === process.env.ADMIN_PASSWORD
    ) {
      req.session.isAdmin = true;
      req.session.username = "admin";
      req.session.email = null;
      return res.json({ ok: true, name: String(process.env.ADMIN_NAME || "Admin"), email: null, isAdmin: true });
    }

    if (!EMAIL_RE.test(normalizedIdentifier)) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const user = await User.findOne({ email: normalizedIdentifier });
    if (!user || !user.verifyPassword(plainPassword)) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    req.session.isAdmin = false;
    req.session.username = user.name;
    req.session.email = user.email;

    return res.json({ ok: true, name: user.name, email: user.email, isAdmin: false });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Could not log in." });
  }
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ ok: true });
  });
});

// GET /api/auth/me
router.get("/me", (req, res) => {
  if (!req.session?.username) {
    return res.status(401).json({ authenticated: false, isAdmin: false });
  }
  res.json({
    authenticated: true,
    isAdmin: !!req.session.isAdmin,
    username: req.session.username,
    email: req.session.email || null,
  });
});

// POST /api/auth/forgot-password/request — generate & return OTP (dev: visible in response)
router.post("/forgot-password/request", async (req, res) => {
  try {
    const { email } = req.body || {};
    const normalizedEmail = String(email || "").trim().toLowerCase();

    if (!EMAIL_RE.test(normalizedEmail)) {
      return res.status(400).json({ message: "Please provide a valid email address." });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ message: "Email is not registered." });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    otpStore.set(normalizedEmail, { otp, expiresAt });

    console.log(`[DEV] OTP for ${normalizedEmail}: ${otp}`);

    return res.status(200).json({
      ok: true,
      message: "OTP generated. In production, check your email.",
      // Always return devOtp so the UI can show it during development
      devOtp: otp,
    });
  } catch (err) {
    console.error("OTP request error:", err);
    return res.status(500).json({ message: "Could not generate OTP." });
  }
});

// POST /api/auth/forgot-password/reset
router.post("/forgot-password/reset", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body || {};
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedOtp = String(otp || "").trim();
    const plainPassword = String(newPassword || "");

    if (!EMAIL_RE.test(normalizedEmail)) {
      return res.status(400).json({ message: "Please provide a valid email address." });
    }
    if (plainPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    const otpEntry = otpStore.get(normalizedEmail);
    if (!otpEntry || otpEntry.expiresAt < Date.now() || otpEntry.otp !== normalizedOtp) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ message: "Email is not registered." });
    }

    user.passwordHash = User.hashPassword(plainPassword);
    await user.save();

    otpStore.delete(normalizedEmail);

    return res.status(200).json({
      ok: true,
      message: "Password reset successful. Please log in with your new password.",
    });
  } catch (err) {
    console.error("Password reset error:", err);
    return res.status(500).json({ message: "Could not reset password." });
  }
});

module.exports = router;
