import { SEVERITY_COLORS, SEVERITY_LABELS } from "../utils/constants";

// Maps a metric value to a fill % for the bar
const toPercent = (name, value) => {
  const ranges = {
    "HbA1c":                    { min: 3,   max: 12  },
    "Fasting Glucose":          { min: 50,  max: 300 },
    "LDL Cholesterol":          { min: 30,  max: 250 },
    "Total Cholesterol":        { min: 100, max: 350 },
    "HDL Cholesterol":          { min: 20,  max: 100 },
    "Triglycerides":            { min: 50,  max: 600 },
    "Blood Pressure (Systolic)":{ min: 80,  max: 220 },
    "eGFR":                     { min: 0,   max: 120 },
    "Haemoglobin":              { min: 5,   max: 20  },
    "TSH":                      { min: 0,   max: 10  },
    "Creatinine":               { min: 0,   max: 5   },
    "Uric Acid":                { min: 0,   max: 12  },
  };
  const r = ranges[name] || { min: 0, max: value * 1.5 };
  return Math.min(100, Math.max(4, ((value - r.min) / (r.max - r.min)) * 100));
};

export default function MetricBar({ metric }) {
  const { name, value, unit, status = "unknown", reference } = metric;
  const c = SEVERITY_COLORS[status] || SEVERITY_COLORS.unknown;
  const pct = toPercent(name, value);

  return (
    <div style={{
      background: "#fff", borderRadius: 12, padding: "14px 18px",
      border: `1px solid ${c.border}`, marginBottom: 10,
      borderLeft: `4px solid ${c.bar}`,
    }}>
      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div>
          <span style={{ fontWeight: 800, fontSize: 13, color: "#0e2033" }}>{name}</span>
          {reference && (
            <span style={{ fontSize: 10, color: "#6b8499", marginLeft: 8 }}>Ref: {reference}</span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontWeight: 800, fontSize: 14, color: "#0e2033", fontFamily: "monospace" }}>
            {value} {unit}
          </span>
          <span style={{
            fontSize: 9, fontWeight: 800, padding: "3px 9px", borderRadius: 10,
            background: c.badge, color: c.badgeText,
          }}>
            {SEVERITY_LABELS[status]}
          </span>
        </div>
      </div>

      {/* Bar */}
      <div style={{ background: "#f0f5fb", borderRadius: 99, height: 7, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${pct}%`,
          background: `linear-gradient(90deg, ${c.bar}99, ${c.bar})`,
          borderRadius: 99,
          transition: "width 1s ease",
        }} />
      </div>
    </div>
  );
}