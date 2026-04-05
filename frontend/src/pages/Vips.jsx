import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuth, getVipsContent, logout, updateVipsContent } from "../features/analyzer/api";

const EMPTY_FORM = {
  badge: "",
  title: "",
  highlightedText: "",
  description: "",
};

export default function Vips() {
  const navigate = useNavigate();
  const [content, setContent] = useState(EMPTY_FORM);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const me = await checkAuth();
        if (mounted) {
          setIsAdmin(!!me?.isAdmin);
        }

        const response = await getVipsContent();
        const nextContent = response?.content || EMPTY_FORM;
        if (mounted) {
          setContent(nextContent);
          setForm(nextContent);
        }
      } catch {
        if (mounted) {
          setError("Could not load website content.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const onChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const onSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await updateVipsContent(form);
      setContent(response.content);
      setForm(response.content);
      setMessage("Website content updated.");
    } catch (err) {
      setError(err?.response?.data?.error || "Could not save website content.");
    } finally {
      setSaving(false);
    }
  };

  const onLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/login", { replace: true });
    }
  };

  const titleParts = content.title.split(content.highlightedText);

  if (loading) {
    return <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>Loading Vips dashboard...</div>;
  }

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
            marginBottom: 24,
          }}
        >
          <div style={{ fontFamily: "Lora, serif", fontSize: 20, fontWeight: 700, color: "#0e2033" }}>
            Vips<span style={{ color: "#2db89a" }}>Technologies</span>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
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
              Open PatientFriendlyInfo
            </button>
            <button
              onClick={onLogout}
              style={{
                padding: "10px 18px",
                borderRadius: 50,
                border: "1px solid #d7e4ef",
                background: "#fff",
                color: "#1e3448",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        </nav>

        <section
          style={{
            background: "#fff",
            border: "1px solid #e0eaf3",
            borderRadius: 22,
            padding: "40px 34px",
            boxShadow: "0 12px 44px rgba(14,32,51,.07)",
            marginBottom: 24,
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
            {content.badge}
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
            {titleParts.length > 1 ? (
              <>
                {titleParts[0]}
                <em style={{ color: "#2db89a", fontStyle: "italic" }}>{content.highlightedText}</em>
                {titleParts.slice(1).join(content.highlightedText)}
              </>
            ) : (
              content.title
            )}
          </h1>
          <p style={{ maxWidth: 640, color: "#6b8499", fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
            {content.description}
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

        {isAdmin ? (
          <section
            style={{
              background: "#fff",
              border: "1px solid #e0eaf3",
              borderRadius: 18,
              padding: "24px",
              boxShadow: "0 8px 30px rgba(14,32,51,.05)",
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: 16, color: "#0e2033" }}>Admin Content Editor</h2>

            <form onSubmit={onSave}>
              <label style={labelStyle}>Badge Text</label>
              <input value={form.badge} onChange={onChange("badge")} style={inputStyle} />

              <label style={labelStyle}>Main Title</label>
              <input value={form.title} onChange={onChange("title")} style={inputStyle} />

              <label style={labelStyle}>Highlighted Text</label>
              <input value={form.highlightedText} onChange={onChange("highlightedText")} style={inputStyle} />

              <label style={labelStyle}>Description</label>
              <textarea value={form.description} onChange={onChange("description")} style={{ ...inputStyle, minHeight: 110, resize: "vertical" }} />

              {message && <div style={{ color: "#1e8a74", marginBottom: 10, fontSize: 13 }}>{message}</div>}
              {error && <div style={{ color: "#b85030", marginBottom: 10, fontSize: 13 }}>{error}</div>}

              <button
                disabled={saving}
                style={{
                  padding: "10px 18px",
                  borderRadius: 10,
                  border: "none",
                  background: "#2db89a",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {saving ? "Saving..." : "Save Website Content"}
              </button>
            </form>
          </section>
        ) : (
          <section
            style={{
              background: "#fff",
              border: "1px solid #e0eaf3",
              borderRadius: 18,
              padding: "20px 24px",
              color: "#6b8499",
            }}
          >
            You are logged in as a user. Only the admin account can edit website content.
          </section>
        )}
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: 6,
  marginTop: 12,
  fontSize: 12,
  fontWeight: 700,
  color: "#516679",
};

const inputStyle = {
  width: "100%",
  marginBottom: 8,
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #d7e4ef",
  fontFamily: "inherit",
};
