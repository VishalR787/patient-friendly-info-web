import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAnalysis from "../hooks/useAnalysis";
import Loader from "../components/Loader";
import Analyzer from "../features/analyzer/Analyzer";
import Showcase from "../features/showcase/Showcase";

export default function Demo() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const mode = params.get("mode"); // "demo" | "analyse"

  const { status, metrics, conditions, error, analyse, runDemo, reset } = useAnalysis();

  useEffect(() => {
    if (mode === "demo") {
      runDemo();
    } else if (mode === "analyse") {
      const text = sessionStorage.getItem("reportText");
      if (text) {
        analyse(text);
      } else {
        navigate("/app");
      }
    } else {
      // No mode param — default to demo
      runDemo();
    }
  }, [mode]);

  const handleReset = () => {
    reset();
    sessionStorage.removeItem("reportText");
    navigate("/app");
  };

  const goMainPage = () => {
    navigate("/");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f7faf9", fontFamily: "Nunito, sans-serif" }}>

      {/* Nav */}
      <nav style={{
        background: "rgba(255,255,255,.94)", backdropFilter: "blur(14px)",
        borderBottom: "1px solid #e0eaf3", padding: "0 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 62,
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => navigate("/")}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}
          >🧬</button>
          <span style={{ fontFamily: "Lora, serif", fontWeight: 700, fontSize: 17, color: "#0e2033" }}>
            PatientFriendly<span style={{ color: "#2db89a" }}>Info</span>
          </span>
          {mode === "demo" && (
            <span style={{
              fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 10,
              background: "rgba(45,184,154,.1)", color: "#1e8a74",
              border: "1px solid rgba(45,184,154,.2)",
            }}>DEMO</span>
          )}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            onClick={handleReset}
            style={{
              padding: "8px 18px", borderRadius: 50, background: "#f7faf9",
              border: "1px solid #e0eaf3", color: "#6b8499", cursor: "pointer",
              fontWeight: 700, fontSize: 13, fontFamily: "Nunito, sans-serif",
            }}
          >← Report Analyzer</button>
          <button
            onClick={goMainPage}
            style={{
              padding: "8px 18px", borderRadius: 50, background: "#0e2033",
              border: "none", color: "#fff", cursor: "pointer",
              fontWeight: 700, fontSize: 13, fontFamily: "Nunito, sans-serif",
            }}
          >Home</button>
        </div>
      </nav>

      {/* Content */}
      <div style={{ padding: "32px 0" }}>
        {status === "idle" && (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "#6b8499" }}>
            Initialising…
          </div>
        )}

        {status === "loading" && (
          <Loader message={mode === "demo" ? "Loading demo report…" : "Analysing your report…"} />
        )}

        {status === "error" && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
            <div style={{ fontWeight: 800, fontSize: 16, color: "#0e2033", marginBottom: 8 }}>
              {mode === "demo" ? "Demo unavailable" : "Analysis failed"}
            </div>
            <div style={{
              fontSize: 13, color: "#6b8499", marginBottom: 8,
              maxWidth: 400, margin: "0 auto 20px",
            }}>{error}</div>
            {mode === "demo" && (
              <div style={{
                fontSize: 12, color: "#a06b00", background: "#fffbea",
                border: "1px solid #fde68a", borderRadius: 12,
                padding: "10px 18px", maxWidth: 400, margin: "0 auto 20px",
              }}>
                💡 Make sure the backend is running:<br />
                <code style={{ fontWeight: 700 }}>cd backend && npm run dev</code>
              </div>
            )}
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button
                onClick={mode === "demo" ? runDemo : () => analyse(sessionStorage.getItem("reportText"))}
                style={btnS("#2db89a", "#fff")}
              >Retry</button>
              <button onClick={handleReset} style={btnS("#f7faf9", "#6b8499")}>← Go Back</button>
            </div>
          </div>
        )}

        {status === "success" && (
          <Analyzer metrics={metrics} conditions={conditions} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}

const btnS = (bg, color) => ({
  padding: "10px 24px", borderRadius: 50, background: bg,
  border: bg === "#f7faf9" ? "1px solid #e0eaf3" : "none",
  color, cursor: "pointer", fontWeight: 700, fontSize: 13,
  fontFamily: "Nunito, sans-serif",
  boxShadow: bg === "#2db89a" ? "0 4px 14px rgba(45,184,154,.3)" : "none",
});
