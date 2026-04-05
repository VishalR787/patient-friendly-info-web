import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  login,
  register,
  requestPasswordOtp,
  resetPasswordWithOtp,
} from "../features/analyzer/api";

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [successMsg, setSuccessMsg] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showForgot, setShowForgot] = useState(false);
  const [fpEmail, setFpEmail] = useState("");
  const [fpOtp, setFpOtp] = useState("");
  const [fpNewPassword, setFpNewPassword] = useState("");
  const [fpMessage, setFpMessage] = useState("");
  const [fpDevOtp, setFpDevOtp] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "register") {
        const res = await register({ name, email: identifier, password });
        setSuccessMsg(res?.message || "Account created! Please log in.");
        setName("");
        setPassword("");
        setMode("login");
      } else {
        await login(identifier, password);
        navigate("/", { replace: true });
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Could not complete request.");
    } finally {
      setLoading(false);
    }
  };

  const onSendOtp = async () => {
    setFpMessage("");
    setError("");
    try {
      const res = await requestPasswordOtp(fpEmail);
      setFpMessage(res?.message || "OTP sent.");
      setFpDevOtp(res?.devOtp || "");
    } catch (err) {
      setError(err?.response?.data?.message || "Could not send OTP.");
    }
  };

  const onResetPassword = async () => {
    setFpMessage("");
    setError("");
    try {
      const res = await resetPasswordWithOtp({
        email: fpEmail,
        otp: fpOtp,
        newPassword: fpNewPassword,
      });
      setFpMessage(res?.message || "Password reset successful.");
      setFpOtp("");
      setFpNewPassword("");
      setShowForgot(false);
      setMode("login");
      setIdentifier(fpEmail);
    } catch (err) {
      setError(err?.response?.data?.message || "Could not reset password.");
    }
  };

  const disabled =
    loading ||
    !identifier.trim() ||
    !password.trim() ||
    (mode === "register" && !name.trim());

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#f7faf9", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{ fontFamily: "Lora, serif", fontSize: 28, fontWeight: 700, color: "#0e2033" }}>
            Vips<span style={{ color: "#2db89a" }}>Technologies</span>
          </div>
          <div style={{ color: "#6b8499", fontSize: 13, marginTop: 4 }}>
            Secure account access
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          style={{ background: "#fff", border: "1px solid #e0eaf3", borderRadius: 16, padding: 24 }}
        >
          <h2 style={{ marginTop: 0, marginBottom: 16, color: "#0e2033" }}>
            {mode === "login" ? "Login" : "Register"}
          </h2>

          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            <button
              type="button"
              onClick={() => { setMode("login"); setSuccessMsg(""); setError(""); }}
              style={tabStyle(mode === "login")}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => { setMode("register"); setSuccessMsg(""); setError(""); }}
              style={tabStyle(mode === "register")}
            >
              Register
            </button>
          </div>

          {successMsg && (
            <div style={{ color: "#1e8a74", background: "#edfaf7", border: "1px solid #b2e8da", borderRadius: 8, padding: "10px 14px", marginBottom: 12, fontSize: 13, fontWeight: 600 }}>
              {successMsg}
            </div>
          )}

          {mode === "register" && (
            <>
              <label style={labelStyle}>Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                autoComplete="name"
                style={inputStyle}
              />
            </>
          )}

          <label style={labelStyle}>{mode === "login" ? "User ID / Email" : "Email"}</label>
          <input
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder={mode === "login" ? "admin or your email" : "Enter email"}
            autoComplete="username"
            style={inputStyle}
          />

          <label style={labelStyle}>Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              style={{ ...inputStyle, marginBottom: 0, paddingRight: 40, fontSize: 13 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#6b8499", display: "flex", alignItems: "center" }}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>

          {mode === "login" && (
            <button
              type="button"
              onClick={() => setShowForgot((v) => !v)}
              style={{ border: "none", background: "transparent", color: "#1e8a74", fontSize: 12, fontWeight: 700, cursor: "pointer", padding: 0, marginBottom: 10 }}
            >
              Forgot password?
            </button>
          )}

          {showForgot && (
            <div style={{ border: "1px solid #e0eaf3", borderRadius: 10, padding: 12, marginBottom: 12 }}>
              <label style={labelStyle}>Registered Email</label>
              <input value={fpEmail} onChange={(e) => setFpEmail(e.target.value)} placeholder="Enter your email" style={inputStyle} />

              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <button type="button" onClick={onSendOtp} style={smallBtnStyle}>Send OTP</button>
              </div>

              <label style={labelStyle}>OTP</label>
              <input value={fpOtp} onChange={(e) => setFpOtp(e.target.value)} placeholder="6-digit OTP" style={inputStyle} />

              <label style={labelStyle}>New Password</label>
              <input type="password" value={fpNewPassword} onChange={(e) => setFpNewPassword(e.target.value)} placeholder="New password" style={inputStyle} />

              <button type="button" onClick={onResetPassword} style={smallBtnStyle}>Reset Password</button>

              {fpDevOtp && (
                <div style={{ marginTop: 8, fontSize: 12, color: "#6b8499" }}>
                  Dev OTP: <b>{fpDevOtp}</b>
                </div>
              )}
              {fpMessage && <div style={{ marginTop: 8, fontSize: 12, color: "#1e8a74" }}>{fpMessage}</div>}
            </div>
          )}

          {error && <div style={{ color: "#b85030", marginBottom: 12, fontSize: 13 }}>{error}</div>}

          <button disabled={disabled} style={submitStyle}>
            {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

const labelStyle = { display: "block", marginBottom: 6, fontSize: 12 };
const inputStyle = {
  width: "100%",
  marginBottom: 12,
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #d7e4ef",
};

const submitStyle = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 10,
  border: "none",
  background: "#2db89a",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
};

const smallBtnStyle = {
  padding: "8px 12px",
  borderRadius: 8,
  border: "none",
  background: "#0e2033",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
};

const tabStyle = (active) => ({
  flex: 1,
  padding: "8px 10px",
  borderRadius: 10,
  border: active ? "none" : "1px solid #d7e4ef",
  background: active ? "#2db89a" : "#fff",
  color: active ? "#fff" : "#1e3448",
  fontWeight: 700,
  cursor: "pointer",
});
