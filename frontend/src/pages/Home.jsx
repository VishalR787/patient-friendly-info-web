import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SAMPLE_REPORT } from "../utils/constants";

const G = {
  page: { minHeight: "100vh", background: "linear-gradient(150deg,#edfaf7 0%,#f7fbff 55%,#fff5f2 100%)", fontFamily: "Nunito, sans-serif" },
  nav: {
    background: "rgba(255,255,255,.92)", backdropFilter: "blur(14px)",
    borderBottom: "1px solid #e0eaf3", padding: "0 32px",
    display: "flex", alignItems: "center", justifyContent: "space-between", height: 62,
    position: "sticky", top: 0, zIndex: 100,
  },
  logo: { fontFamily: "Lora, serif", fontWeight: 700, fontSize: 18, color: "#0e2033" },
  main: { maxWidth: 720, margin: "0 auto", padding: "64px 24px" },
};

export default function Home() {
  const navigate = useNavigate();
  const [reportText, setReportText] = useState("");

  const handleAnalyse = () => {
    if (!reportText.trim()) return;
    if (reportText.trim() === SAMPLE_REPORT.trim()) {
      navigate("/demo?mode=demo");
      return;
    }
    // Store in sessionStorage and navigate to demo page with real text
    sessionStorage.setItem("reportText", reportText.trim());
    navigate("/demo?mode=analyse");
  };

  const loadSample = () => setReportText(SAMPLE_REPORT);

  return (
    <div style={G.page}>
      {/* Nav */}
      <nav style={G.nav}>
        <div style={G.logo}>PatientFriendly<span style={{ color: "#2db89a" }}>Info</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "9px 16px", borderRadius: 50, background: "#0e2033",
              border: "none", color: "#fff", cursor: "pointer",
              fontWeight: 700, fontSize: 13, fontFamily: "Nunito, sans-serif",
            }}
          >Home</button>
        </div>
      </nav>

      <div style={G.main}>
        {/* Hero text */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#fff", border: "1px solid rgba(45,184,154,.3)",
            padding: "6px 18px", borderRadius: 50, marginBottom: 22,
            fontSize: 12, fontWeight: 700, color: "#1e8a74",
            boxShadow: "0 2px 12px rgba(45,184,154,.1)",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2db89a", display: "inline-block", animation: "pulse 1.5s ease-in-out infinite" }} />
            AI-Powered Medical Report Analysis
          </div>
          <h1 style={{
            fontFamily: "Lora, serif", fontWeight: 700,
            fontSize: "clamp(32px,5vw,50px)", color: "#0e2033",
            letterSpacing: "-0.8px", lineHeight: 1.15, marginBottom: 16,
          }}>
            Your medical report,<br />
            <em style={{ color: "#2db89a", fontStyle: "italic" }}>explained like a friend would.</em>
          </h1>
          <p style={{ fontSize: 16, color: "#6b8499", lineHeight: 1.8, maxWidth: 480, margin: "0 auto" }}>
            Paste your lab results below. Our AI reads every value, detects flagged conditions,
            and explains each one in plain, friendly language — no medical background needed.
          </p>
        </div>

        {/* Upload card */}
        <div style={{
          background: "#fff", borderRadius: 22, padding: 32,
          border: "1px solid #e0eaf3", boxShadow: "0 8px 40px rgba(14,32,51,.07)",
        }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 800, color: "#6b8499", marginBottom: 8, letterSpacing: 0.5, textTransform: "uppercase" }}>
            Paste Your Lab Report
          </label>
          <textarea
            value={reportText}
            onChange={e => setReportText(e.target.value)}
            placeholder={`Patient: John Smith\nDate: 15/03/2026\n\nHbA1c: 7.9%\nFasting Glucose: 198 mg/dL\nLDL Cholesterol: 162 mg/dL\nBlood Pressure: 148/92 mmHg\n...`}
            style={{
              width: "100%", minHeight: 200, padding: "14px 16px",
              borderRadius: 14, border: "1.5px solid #e0eaf3",
              fontFamily: "monospace", fontSize: 13, color: "#1e3448",
              resize: "vertical", outline: "none",
              lineHeight: 1.7, background: "#f7faf9",
              transition: "border-color .2s",
            }}
            onFocus={e => e.target.style.borderColor = "#2db89a"}
            onBlur={e => e.target.style.borderColor = "#e0eaf3"}
          />

          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button
              onClick={loadSample}
              style={{
                flex: 1, padding: "12px 0", borderRadius: 50,
                background: "#f7faf9", border: "1px solid #e0eaf3",
                color: "#6b8499", cursor: "pointer", fontWeight: 700,
                fontSize: 13, fontFamily: "Nunito, sans-serif",
              }}
            >📋 Load Sample Report</button>
            <button
              onClick={handleAnalyse}
              disabled={!reportText.trim()}
              style={{
                flex: 2, padding: "12px 0", borderRadius: 50,
                background: reportText.trim() ? "linear-gradient(135deg,#2db89a,#1e8a74)" : "#e0eaf3",
                border: "none", color: reportText.trim() ? "#fff" : "#6b8499",
                cursor: reportText.trim() ? "pointer" : "not-allowed",
                fontWeight: 800, fontSize: 14, fontFamily: "Nunito, sans-serif",
                boxShadow: reportText.trim() ? "0 4px 18px rgba(45,184,154,.3)" : "none",
                transition: "all .2s",
              }}
            >Analyse My Report →</button>
          </div>

          <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: "#6b8499" }}>
            🔒 Your data is never stored or sent to third parties
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
      `}</style>
    </div>
  );
}
