export const API_BASE = "/api";

export const SEVERITY_COLORS = {
  high:       { bg: "#fff1ee", border: "#ffcab8", text: "#c95a3a", bar: "#ff8c6b", badge: "rgba(255,140,107,.15)", badgeText: "#c95a3a" },
  borderline: { bg: "#fffbea", border: "#fde68a", text: "#a06b00", bar: "#f5a623", badge: "rgba(245,166,35,.15)",  badgeText: "#a06b00" },
  watch:      { bg: "#eef6ff", border: "#bfdbfe", text: "#1d4ed8", bar: "#60a5fa", badge: "rgba(96,165,250,.15)",  badgeText: "#1d4ed8" },
  normal:     { bg: "#ecfdf5", border: "#a7f3d0", text: "#065f46", bar: "#34d399", badge: "rgba(52,211,153,.15)",  badgeText: "#065f46" },
  unknown:    { bg: "#f3f4f6", border: "#d1d5db", text: "#6b7280", bar: "#9ca3af", badge: "rgba(156,163,175,.15)", badgeText: "#6b7280" },
};

export const SEVERITY_LABELS = {
  high: "HIGH", borderline: "BORDERLINE", watch: "WATCH", normal: "NORMAL", unknown: "—",
};

export const SAMPLE_REPORT = `Patient: John Smith
Date: 15/03/2026

Lab Results:
HbA1c: 7.9%
Fasting Glucose: 198 mg/dL
LDL Cholesterol: 162 mg/dL
Total Cholesterol: 241 mg/dL
Blood Pressure: 148/92 mmHg
eGFR: 61 mL/min
Haemoglobin: 13.8 g/dL`;