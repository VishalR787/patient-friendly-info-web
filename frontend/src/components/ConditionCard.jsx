import { useState } from "react";
import { SEVERITY_COLORS, SEVERITY_LABELS } from "../utils/constants";

export default function ConditionCard({ condition, index = 0 }) {
  const [expanded, setExpanded] = useState(index === 0); // first card open by default
  const {
    name, medicalTerm, severity = "unknown", icon,
    plainEnglish, precautions = [], risksIfUntreated = [],
    triggerMetric, aiGenerated,
  } = condition;

  const c = SEVERITY_COLORS[severity] || SEVERITY_COLORS.unknown;

  return (
    <div style={{
      background: "#fff", borderRadius: 18, border: `1px solid ${c.border}`,
      borderLeft: `4px solid ${c.bar}`,
      boxShadow: "0 2px 16px rgba(14,32,51,.05)",
      marginBottom: 16, overflow: "hidden",
      animation: `fadeUp .4s ease ${index * 0.08}s both`,
    }}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* Header — always visible, click to expand */}
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          width: "100%", background: "none", border: "none", cursor: "pointer",
          padding: "18px 22px", display: "flex", justifyContent: "space-between",
          alignItems: "center", textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{
            width: 46, height: 46, borderRadius: 13, background: c.bg,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, flexShrink: 0, border: `1px solid ${c.border}`,
          }}>{icon || "🩺"}</span>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: "#0e2033" }}>{name}</div>
            <div style={{ fontSize: 11, color: "#6b8499", marginTop: 2 }}>{medicalTerm}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <span style={{
            fontSize: 10, fontWeight: 800, padding: "4px 12px", borderRadius: 20,
            background: c.badge, color: c.badgeText,
          }}>
            {SEVERITY_LABELS[severity]}
          </span>
          <span style={{ color: "#6b8499", fontSize: 14, transition: "transform .2s", display: "inline-block", transform: expanded ? "rotate(180deg)" : "rotate(0)" }}>▼</span>
        </div>
      </button>

      {/* Expandable body */}
      {expanded && (
        <div style={{ padding: "0 22px 22px", borderTop: "1px solid #f0f5fb" }}>

          {/* Trigger metric */}
          {triggerMetric && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: c.bg, border: `1px solid ${c.border}`,
              padding: "5px 14px", borderRadius: 20, margin: "14px 0 16px",
              fontSize: 12, color: c.text, fontWeight: 700,
            }}>
              📊 {triggerMetric.name}: {triggerMetric.value} {triggerMetric.unit}
            </div>
          )}

          {/* Plain English explanation */}
          <div style={{ marginBottom: 20 }}>
            <div style={{
              fontSize: 11, fontWeight: 800, color: "#2db89a",
              letterSpacing: 1, textTransform: "uppercase", marginBottom: 8,
            }}>
              🔬 What does this mean?
              {aiGenerated && (
                <span style={{
                  marginLeft: 8, fontSize: 9, fontWeight: 700,
                  background: "rgba(45,184,154,.1)", color: "#1e8a74",
                  padding: "2px 8px", borderRadius: 10, border: "1px solid rgba(45,184,154,.2)"
                }}>AI Generated</span>
              )}
            </div>
            <p style={{ fontSize: 14, color: "#1e3448", lineHeight: 1.75, margin: 0 }}>
              {plainEnglish || "Explanation being generated…"}
            </p>
          </div>

          {/* Precautions */}
          {precautions.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <div style={{
                fontSize: 11, fontWeight: 800, color: "#1e8a74",
                letterSpacing: 1, textTransform: "uppercase", marginBottom: 10,
              }}>✅ Precautions</div>
              <ul style={{ paddingLeft: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
                {precautions.map((p, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: "#1e3448", lineHeight: 1.55 }}>
                    <span style={{
                      width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                      background: "rgba(45,184,154,.1)", border: "1px solid rgba(45,184,154,.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, color: "#1e8a74", marginTop: 1,
                    }}>✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Risks if untreated */}
          {risksIfUntreated.length > 0 && (
            <div>
              <div style={{
                fontSize: 11, fontWeight: 800, color: "#a06b00",
                letterSpacing: 1, textTransform: "uppercase", marginBottom: 10,
              }}>⚠️ If Left Untreated</div>
              <ul style={{ paddingLeft: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
                {risksIfUntreated.map((r, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: "#1e3448", lineHeight: 1.55 }}>
                    <span style={{
                      width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                      background: "rgba(245,166,35,.12)", border: "1px solid rgba(245,166,35,.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, color: "#a06b00", marginTop: 1,
                    }}>!</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Disclaimer */}
          <div style={{
            marginTop: 18, padding: "10px 14px", borderRadius: 10,
            background: "#fffbea", border: "1px solid #fde68a",
            fontSize: 11, color: "#a06b00", lineHeight: 1.6,
          }}>
            ⚕️ <strong>Disclaimer:</strong> This is for informational purposes only. Always consult your doctor or a qualified healthcare professional about your results.
          </div>
        </div>
      )}
    </div>
  );
}