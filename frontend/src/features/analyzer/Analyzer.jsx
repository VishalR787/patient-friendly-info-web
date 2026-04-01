import ConditionCard from "../../components/ConditionCard";
import MetricBar from "../../components/MetricBar";

const severityOrder = { high: 0, borderline: 1, watch: 2, normal: 3, unknown: 4 };

export default function Analyzer({ metrics, conditions, onReset }) {
  const flagged = metrics.filter(m => m.status !== "normal");
  const normal  = metrics.filter(m => m.status === "normal");
  const sorted  = [...conditions].sort((a, b) =>
    (severityOrder[a.severity] ?? 4) - (severityOrder[b.severity] ?? 4)
  );

  const highCount   = conditions.filter(c => c.severity === "high").length;
  const watchCount  = conditions.filter(c => c.severity === "borderline" || c.severity === "watch").length;

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 20px 60px" }}>

      {/* Summary banner */}
      <div style={{
        background: "#fff", border: "1px solid #e0eaf3", borderRadius: 20,
        padding: "22px 28px", marginBottom: 28,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 16,
        boxShadow: "0 2px 16px rgba(14,32,51,.05)",
      }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 20, color: "#0e2033" }}>
            {conditions.length} Condition{conditions.length !== 1 ? "s" : ""} Detected
          </div>
          <div style={{ fontSize: 13, color: "#6b8499", marginTop: 3 }}>
            {metrics.length} lab values analysed
          </div>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {highCount > 0 && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 900, fontSize: 28, color: "#ff8c6b", lineHeight: 1 }}>{highCount}</div>
              <div style={{ fontSize: 11, color: "#6b8499", marginTop: 2 }}>High Risk</div>
            </div>
          )}
          {watchCount > 0 && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 900, fontSize: 28, color: "#f5a623", lineHeight: 1 }}>{watchCount}</div>
              <div style={{ fontSize: 11, color: "#6b8499", marginTop: 2 }}>Watch</div>
            </div>
          )}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 900, fontSize: 28, color: "#2db89a", lineHeight: 1 }}>{normal.length}</div>
            <div style={{ fontSize: 11, color: "#6b8499", marginTop: 2 }}>Normal</div>
          </div>
        </div>

      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24, alignItems: "start" }}>

        {/* Left — Conditions */}
        <div>
          <div style={{
            fontSize: 11, fontWeight: 800, color: "#6b8499",
            letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 16,
          }}>Conditions Found</div>

          {sorted.length === 0 ? (
            <div style={{
              background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 16,
              padding: "28px", textAlign: "center",
            }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>🎉</div>
              <div style={{ fontWeight: 800, fontSize: 16, color: "#065f46" }}>All values look normal!</div>
              <div style={{ fontSize: 13, color: "#6b8499", marginTop: 6 }}>No conditions were flagged. Keep up the good work.</div>
            </div>
          ) : (
            sorted.map((c, i) => <ConditionCard key={i} condition={c} index={i} />)
          )}
        </div>

        {/* Right — Metric Bars */}
        <div style={{ position: "sticky", top: 80 }}>
          <div style={{
            fontSize: 11, fontWeight: 800, color: "#6b8499",
            letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 16,
          }}>Lab Values at a Glance</div>

          {flagged.length > 0 && (
            <>
              <div style={{ fontSize: 11, color: "#ff8c6b", fontWeight: 700, marginBottom: 8 }}>Flagged</div>
              {flagged.map((m, i) => <MetricBar key={i} metric={m} />)}
            </>
          )}
          {normal.length > 0 && (
            <>
              <div style={{ fontSize: 11, color: "#2db89a", fontWeight: 700, margin: "14px 0 8px" }}>Normal</div>
              {normal.map((m, i) => <MetricBar key={i} metric={m} />)}
            </>
          )}
        </div>
      </div>
    </div>
  );
}