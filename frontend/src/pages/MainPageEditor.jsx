import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMainPageContent, updateMainPageContent } from "../features/analyzer/api";

const EMPTY = {
  heroBadge: "", heroTitleLine1: "", heroTitleHighlight: "", heroTitleLine2: "", heroDescription: "",
  aboutTitle: "", aboutPara1: "", aboutPara2: "",
  hiwTitle: "", hiwSubtitle: "",
  hiwStep1Title: "", hiwStep1Desc: "", hiwStep2Title: "", hiwStep2Desc: "",
  hiwStep3Title: "", hiwStep3Desc: "", hiwStep4Title: "", hiwStep4Desc: "",
  featuresTitle: "", featuresSubtitle: "",
  feat1Title: "", feat1Desc: "", feat2Title: "", feat2Desc: "",
  feat3Title: "", feat3Desc: "", feat4Title: "", feat4Desc: "",
  feat5Title: "", feat5Desc: "", feat6Title: "", feat6Desc: "",
  founder1Name: "", founder1Role: "", founder1Bio: "",
  founder2Name: "", founder2Role: "", founder2Bio: "",
  roadmapTitle: "", roadmapSubtitle: "",
  phase1Title: "", phase1Desc: "", phase2Title: "", phase2Desc: "", phase3Title: "", phase3Desc: "",
  contactEmail: "", contactWebsite: "", contactStatus: "", footerTagline: "",
};

const SECTIONS = [
  {
    key: "hero", label: "Hero Section", emoji: "🏠",
    fields: [
      { key: "heroBadge", label: "Badge Text" },
      { key: "heroTitleLine1", label: "Title Line 1" },
      { key: "heroTitleHighlight", label: "Highlighted Word" },
      { key: "heroTitleLine2", label: "Title Line 2" },
      { key: "heroDescription", label: "Description", textarea: true },
    ],
  },
  {
    key: "about", label: "About Section", emoji: "📖",
    fields: [
      { key: "aboutTitle", label: "Section Title" },
      { key: "aboutPara1", label: "Paragraph 1", textarea: true },
      { key: "aboutPara2", label: "Paragraph 2", textarea: true },
    ],
  },
  {
    key: "hiw", label: "How It Works", emoji: "⚙️",
    fields: [
      { key: "hiwTitle", label: "Section Title" },
      { key: "hiwSubtitle", label: "Section Subtitle", textarea: true },
      { key: "hiwStep1Title", label: "Step 1 Title" }, { key: "hiwStep1Desc", label: "Step 1 Description", textarea: true },
      { key: "hiwStep2Title", label: "Step 2 Title" }, { key: "hiwStep2Desc", label: "Step 2 Description", textarea: true },
      { key: "hiwStep3Title", label: "Step 3 Title" }, { key: "hiwStep3Desc", label: "Step 3 Description", textarea: true },
      { key: "hiwStep4Title", label: "Step 4 Title" }, { key: "hiwStep4Desc", label: "Step 4 Description", textarea: true },
    ],
  },
  {
    key: "features", label: "Features Section", emoji: "🔬",
    fields: [
      { key: "featuresTitle", label: "Section Title" },
      { key: "featuresSubtitle", label: "Section Subtitle", textarea: true },
      { key: "feat1Title", label: "Feature 1 Title (AI Analysis)" }, { key: "feat1Desc", label: "Feature 1 Description", textarea: true },
      { key: "feat2Title", label: "Feature 2 Title (Plain English)" }, { key: "feat2Desc", label: "Feature 2 Description", textarea: true },
      { key: "feat3Title", label: "Feature 3 Title (Metric Viz)" }, { key: "feat3Desc", label: "Feature 3 Description", textarea: true },
      { key: "feat4Title", label: "Feature 4 Title (Video)" }, { key: "feat4Desc", label: "Feature 4 Description", textarea: true },
      { key: "feat5Title", label: "Feature 5 Title (Simulator)" }, { key: "feat5Desc", label: "Feature 5 Description", textarea: true },
      { key: "feat6Title", label: "Feature 6 Title (Languages)" }, { key: "feat6Desc", label: "Feature 6 Description", textarea: true },
    ],
  },
  {
    key: "founders", label: "Founders / Team", emoji: "👥",
    fields: [
      { key: "founder1Name", label: "Founder 1 Name" }, { key: "founder1Role", label: "Founder 1 Role" },
      { key: "founder1Bio", label: "Founder 1 Bio", textarea: true },
      { key: "founder2Name", label: "Founder 2 Name" }, { key: "founder2Role", label: "Founder 2 Role" },
      { key: "founder2Bio", label: "Founder 2 Bio", textarea: true },
    ],
  },
  {
    key: "roadmap", label: "Roadmap Section", emoji: "🗺️",
    fields: [
      { key: "roadmapTitle", label: "Section Title" },
      { key: "roadmapSubtitle", label: "Section Subtitle", textarea: true },
      { key: "phase1Title", label: "Phase 1 Title" }, { key: "phase1Desc", label: "Phase 1 Description", textarea: true },
      { key: "phase2Title", label: "Phase 2 Title" }, { key: "phase2Desc", label: "Phase 2 Description", textarea: true },
      { key: "phase3Title", label: "Phase 3 Title" }, { key: "phase3Desc", label: "Phase 3 Description", textarea: true },
    ],
  },
  {
    key: "contact", label: "Contact & Footer", emoji: "✉️",
    fields: [
      { key: "contactEmail", label: "Contact Email" },
      { key: "contactWebsite", label: "Website URL" },
      { key: "contactStatus", label: "Status Line" },
      { key: "footerTagline", label: "Footer Tagline" },
    ],
  },
];

export default function MainPageEditor() {
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [openSection, setOpenSection] = useState("hero");

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const response = await getMainPageContent();
        if (mounted) setForm({ ...EMPTY, ...(response?.content || {}) });
      } catch {
        if (mounted) setError("Could not load main page content.");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const onChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const response = await updateMainPageContent(form);
      setForm({ ...EMPTY, ...(response?.content || {}) });
      setMessage("Saved! Refresh the home page to see changes.");
    } catch (err) {
      setError(err?.response?.data?.error || "Could not save content.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", fontFamily: "Nunito, sans-serif" }}>Loading editor...</div>;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f7faf9", padding: 24, fontFamily: "Nunito, sans-serif" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h1 style={{ margin: 0, color: "#0e2033", fontSize: 26 }}>Main Page Editor</h1>
            <div style={{ color: "#6b8499", fontSize: 13, marginTop: 4 }}>Click a section to expand and edit it</div>
          </div>
          <button
            onClick={() => navigate("/")}
            style={{ padding: "10px 16px", borderRadius: 10, border: "1px solid #d7e4ef", background: "#fff", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}
          >
            Back To Main Page
          </button>
        </div>

        {message && (
          <div style={{ color: "#1e8a74", background: "#edfaf7", border: "1px solid #b2e8da", borderRadius: 10, padding: "12px 16px", marginBottom: 16, fontWeight: 600 }}>
            {message}
          </div>
        )}
        {error && (
          <div style={{ color: "#b85030", background: "#fff2ee", border: "1px solid #f5c5b0", borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}>
            {error}
          </div>
        )}

        <form onSubmit={onSubmit}>
          {SECTIONS.map((section) => {
            const isOpen = openSection === section.key;
            return (
              <div key={section.key} style={{ background: "#fff", border: "1px solid #e0eaf3", borderRadius: 14, marginBottom: 12, overflow: "hidden" }}>
                {/* Section header */}
                <button
                  type="button"
                  onClick={() => setOpenSection(isOpen ? null : section.key)}
                  style={{
                    width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "16px 20px", background: isOpen ? "#f0faf7" : "#fff",
                    border: "none", borderBottom: isOpen ? "1px solid #e0eaf3" : "none",
                    cursor: "pointer", fontFamily: "inherit",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{section.emoji}</span>
                    <span style={{ fontWeight: 700, fontSize: 15, color: "#0e2033" }}>{section.label}</span>
                    <span style={{ fontSize: 12, color: "#6b8499" }}>{section.fields.length} field{section.fields.length !== 1 ? "s" : ""}</span>
                  </div>
                  <span style={{ color: "#2db89a", fontWeight: 700, fontSize: 18 }}>{isOpen ? "−" : "+"}</span>
                </button>

                {/* Fields */}
                {isOpen && (
                  <div style={{ padding: "16px 20px" }}>
                    {section.fields.map((field) => (
                      <div key={field.key} style={{ marginBottom: 14 }}>
                        <label style={labelStyle}>{field.label}</label>
                        {field.textarea ? (
                          <textarea
                            value={form[field.key] || ""}
                            onChange={onChange(field.key)}
                            style={{ ...inputStyle, minHeight: 90, resize: "vertical" }}
                          />
                        ) : (
                          <input value={form[field.key] || ""} onChange={onChange(field.key)} style={inputStyle} />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <button
            disabled={saving}
            style={{ marginTop: 8, padding: "12px 28px", borderRadius: 10, border: "none", background: "#2db89a", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}
          >
            {saving ? "Saving..." : "Save All Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block", marginBottom: 6, fontWeight: 700, fontSize: 12, color: "#516679",
};

const inputStyle = {
  width: "100%", padding: "10px 12px", borderRadius: 10,
  border: "1px solid #d7e4ef", fontFamily: "inherit", fontSize: 14, boxSizing: "border-box",
};
