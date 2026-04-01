const S = {
  wrap: {
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", padding: "60px 24px", gap: 16,
  },
  spinner: {
    width: 48, height: 48, borderRadius: "50%",
    border: "4px solid #e0eaf3",
    borderTop: "4px solid #2db89a",
    animation: "spin .8s linear infinite",
  },
  title: { fontWeight: 800, fontSize: 16, color: "#0e2033" },
  sub: { fontSize: 13, color: "#6b8499", textAlign: "center", maxWidth: 280, lineHeight: 1.6 },
  skeletonWrap: { width: "100%", maxWidth: 560, display: "flex", flexDirection: "column", gap: 14, marginTop: 8 },
  skeletonCard: {
    background: "#f7faf9", borderRadius: 16, padding: "20px 22px",
    border: "1px solid #e0eaf3", display: "flex", flexDirection: "column", gap: 10,
  },
  skeletonLine: (w, h = 12) => ({
    height: h, borderRadius: 6, background: "linear-gradient(90deg, #e0eaf3 25%, #f0f5fb 50%, #e0eaf3 75%)",
    backgroundSize: "200% 100%", animation: "shimmer 1.4s ease-in-out infinite",
    width: w,
  }),
};

export default function Loader({ message = "Analysing your report…" }) {
  return (
    <>
      <style>{`
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
      `}</style>
      <div style={S.wrap}>
        <div style={S.spinner} />
        <div style={S.title}>{message}</div>
        <div style={S.sub}>Parsing lab values, detecting conditions, and generating your plain-English explanations…</div>

        {/* Skeleton cards */}
        <div style={S.skeletonWrap}>
          {[1, 2, 3].map(i => (
            <div key={i} style={S.skeletonCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={S.skeletonLine("40%", 14)} />
                <div style={S.skeletonLine("18%", 20)} />
              </div>
              <div style={S.skeletonLine("90%")} />
              <div style={S.skeletonLine("75%")} />
              <div style={S.skeletonLine("55%")} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}