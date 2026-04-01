import { useEffect } from "react";
import { loadDemo } from "../analyzer/api";
import { useState } from "react";
import Loader from "../../components/Loader";
import Analyzer from "../analyzer/Analyzer";

export default function Showcase({ onBack }) {
  const [status, setStatus] = useState("loading");
  const [metrics, setMetrics] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDemo()
      .then((data) => {
        setMetrics(data.metrics || []);
        setConditions(data.conditions || []);
        setStatus("success");
      })
      .catch((err) => {
        setError("Could not load demo. Is the backend running on port 5000?");
        setStatus("error");
      });
  }, []);

  if (status === "loading") return <Loader message="Loading demo report…" />;

  if (status === "error") return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <div style={{ fontSize: 36, marginBottom: 16 }}>⚠️</div>
      <div style={{ fontWeight: 800, fontSize: 16, color: "#0e2033", marginBottom: 8 }}>Demo unavailable</div>
      <div style={{ fontSize: 13, color: "#6b8499", marginBottom: 24 }}>{error}</div>
      <button onClick={() => window.location.reload()} style={{ padding: "10px 24px", borderRadius: 50, background: "#2db89a", border: "none", color: "#fff", cursor: "pointer", fontWeight: 700, fontFamily: "Nunito, sans-serif" }}>Retry</button>
    </div>
  );

  if (status === "success") return (
    <Analyzer metrics={metrics} conditions={conditions} onReset={onBack} />
  );

  return null;
}