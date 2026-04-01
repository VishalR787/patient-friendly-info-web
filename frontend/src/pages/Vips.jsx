import { useNavigate } from "react-router-dom";

export default function Vips() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "Nunito, sans-serif",
        background: "linear-gradient(150deg,#edfaf7 0%,#f7fbff 55%,#fff5f2 100%)",
        color: "#1e3448",
      }}
    >
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "24px 24px 80px" }}>
        <nav
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(255,255,255,.92)",
            border: "1px solid #e0eaf3",
            borderRadius: 14,
            padding: "0 16px",
            marginBottom: 40,
          }}
        >
          <div style={{ fontFamily: "Lora, serif", fontSize: 20, fontWeight: 700, color: "#0e2033" }}>
            Vips<span style={{ color: "#2db89a" }}>Technologies</span>
          </div>
          <button
            onClick={() => navigate("/patientfriendlyinfo")}
            style={{
              padding: "10px 18px",
              borderRadius: 50,
              border: "none",
              background: "#2db89a",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Open PatientFriendlyInfo →
          </button>
        </nav>

        <section
          style={{
            background: "#fff",
            border: "1px solid #e0eaf3",
            borderRadius: 22,
            padding: "40px 34px",
            boxShadow: "0 12px 44px rgba(14,32,51,.07)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#e8f8f5",
              border: "1px solid rgba(45,184,154,.25)",
              color: "#1e8a74",
              borderRadius: 50,
              padding: "6px 14px",
              fontSize: 12,
              fontWeight: 700,
              marginBottom: 18,
            }}
          >
            Health Technology Company
          </div>
          <h1
            style={{
              fontFamily: "Lora, serif",
              fontSize: "clamp(34px,5vw,54px)",
              lineHeight: 1.15,
              letterSpacing: "-0.7px",
              color: "#0e2033",
              margin: "0 0 14px",
            }}
          >
            Building technology that
            <br />
            <em style={{ color: "#2db89a", fontStyle: "italic" }}>cares for patients</em>
          </h1>
          <p style={{ maxWidth: 640, color: "#6b8499", fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
            Vips Technologies builds patient-centered AI tools. Our flagship product, PatientFriendlyInfo,
            converts complex medical reports into clear, plain-English explanations.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={() => navigate("/patientfriendlyinfo")}
              style={{
                padding: "12px 24px",
                borderRadius: 50,
                border: "none",
                background: "linear-gradient(135deg,#2db89a,#1e8a74)",
                color: "#fff",
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 6px 18px rgba(45,184,154,.32)",
              }}
            >
              Go To PatientFriendlyInfo
            </button>
            <button
              onClick={() => navigate("/demo?mode=demo")}
              style={{
                padding: "12px 24px",
                borderRadius: 50,
                border: "1px solid #e0eaf3",
                background: "#f7faf9",
                color: "#1e3448",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Open Live Demo
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
