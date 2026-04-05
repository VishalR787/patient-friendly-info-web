const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const session = require("express-session");
const routes = require('./routes/routes');
const auth = require("./routes/auth");

const app = express();

// ── SESSIONS ──
app.use(session({
  secret: process.env.SESSION_SECRET || "dev-secret",
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: "lax", secure: false },
}));


// ── CORS ──
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// ── BODY PARSING ──
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// ── RATE LIMITING ──
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 30,
  message: { error: 'Too many requests. Please wait a moment.' },
});
app.use('/api/', limiter);

// ── ROUTES ──
app.use('/api/auth', auth);
app.use('/api', routes);

// ── HEALTH CHECK ──
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'PatientFriendlyInfo API' });
});

// ── ERROR HANDLER ──
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Something went wrong. Please try again.',
  });
});

module.exports = app;
