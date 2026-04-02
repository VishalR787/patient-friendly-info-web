import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientFriendlyInfo() {
  const navigate = useNavigate();

  // Inject Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,700;1,500&family=Nunito:wght@400;500;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    document.title = "PatientFriendlyInfo — Making Health Understandable";

    // Scroll reveal
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.1 }
    );
    setTimeout(() => {
      document.querySelectorAll(".pfi-reveal").forEach(el => obs.observe(el));
    }, 100);

    return () => obs.disconnect();
  }, []);

  const S = {
    page: { fontFamily: "'Nunito', sans-serif", background: "#fff", color: "#1e3448", fontSize: 16, lineHeight: 1.65 },
  };

  return (
    <div style={S.page}>
      <style>{`
        .pfi-reveal { opacity:0; transform:translateY(28px); transition: opacity .65s ease, transform .65s ease; }
        .pfi-reveal.in { opacity:1; transform:translateY(0); }
        @keyframes pfi-fadeUp  { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pfi-float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes pfi-pulse   { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} }
        @keyframes pfi-marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .pfi-nav-link:hover { color: #2db89a !important; }
        .pfi-feat:hover { transform:translateY(-4px); box-shadow:0 12px 36px rgba(14,32,51,.08); }
        .pfi-fc:hover { transform:translateY(-5px); box-shadow:0 16px 48px rgba(14,32,51,.1); }
        .pfi-hiw-step:hover { border-color: #2db89a !important; }
        .pfi-arch-step:hover { box-shadow:0 8px 28px rgba(14,32,51,.08); transform:translateY(-3px); }
        .pfi-btn-green:hover { background:#1e8a74!important; transform:translateY(-2px); }
        .pfi-btn-ghost:hover { background:#e8f8f5!important; }
        .pfi-form-btn:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(45,184,154,.45)!important; }
        .pfi-footer-link:hover { color:#2db89a!important; }
      `}</style>

      {/* NAV */}
      <nav style={{ position:"sticky", top:0, zIndex:200, background:"rgba(255,255,255,.94)", backdropFilter:"blur(14px)", borderBottom:"1px solid #e0eaf3" }}>
        <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 28px", display:"flex", alignItems:"center", justifyContent:"space-between", height:64 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#2db89a,#1e8a74)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🧬</div>
            <div style={{ fontFamily:"'Lora',serif", fontSize:18, fontWeight:700, color:"#0e2033" }}>Vips<span style={{ color:"#2db89a" }}>Technologies</span></div>
          </div>
          <div style={{ display:"flex", gap:28 }}>
            {["#about","#how-it-works","#product","#roadmap","#founders","#contact"].map((h,i) => (
              <a key={i} href={h} className="pfi-nav-link" style={{ fontSize:14, fontWeight:600, color:"#6b8499", textDecoration:"none", transition:"color .2s" }}>
                {["About","How It Works","Product","Roadmap","Team","Contact"][i]}
              </a>
            ))}
          </div>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <button onClick={() => navigate("/app")} style={{ padding:"10px 20px", borderRadius:50, background:"#2db89a", border:"none", color:"#fff", cursor:"pointer", fontWeight:700, fontSize:13, fontFamily:"Nunito,sans-serif", boxShadow:"0 4px 14px rgba(45,184,154,.3)" }}>Try Demo →</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding:"96px 0 76px", background:"linear-gradient(150deg,#edfaf7 0%,#f7fbff 55%,#fff5f2 100%)", position:"relative", overflow:"hidden" }}>
        <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 28px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1.1fr .9fr", gap:60, alignItems:"center" }}>
            <div style={{ animation:"pfi-fadeUp .7s ease both" }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#fff", border:"1px solid rgba(45,184,154,.3)", padding:"7px 18px", borderRadius:50, marginBottom:24, fontSize:12, fontWeight:700, color:"#1e8a74", boxShadow:"0 2px 12px rgba(45,184,154,.1)" }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:"#2db89a", animation:"pfi-pulse 1.6s ease-in-out infinite" }}></div>
                Health Technology · AI-Powered · Est. 2026
              </div>
              <h1 style={{ fontFamily:"'Lora',serif", fontSize:"clamp(36px,5vw,54px)", color:"#0e2033", letterSpacing:"-.8px", marginBottom:20, lineHeight:1.15 }}>
                Making health<br/><em style={{ fontStyle:"italic", color:"#2db89a" }}>understandable</em><br/>for everyone.
              </h1>
              <p style={{ fontSize:17, color:"#6b8499", lineHeight:1.8, marginBottom:36, maxWidth:470 }}>
                PatientFriendlyInfo uses AI to translate complex medical lab reports into plain, friendly language — so every patient leaves their appointment informed, not confused.
              </p>
              <div style={{ display:"flex", gap:14, flexWrap:"wrap", marginBottom:40 }}>
                <button onClick={() => navigate("/demo?mode=demo")} className="pfi-btn-green" style={{ padding:"13px 28px", borderRadius:50, background:"#2db89a", border:"none", color:"#fff", fontWeight:700, fontSize:15, cursor:"pointer", fontFamily:"Nunito,sans-serif", boxShadow:"0 4px 18px rgba(45,184,154,.32)", transition:"all .22s" }}>Try Live Demo →</button>
                <a href="#how-it-works" className="pfi-btn-ghost" style={{ padding:"13px 28px", borderRadius:50, background:"transparent", border:"2px solid #2db89a", color:"#2db89a", fontWeight:700, fontSize:15, textDecoration:"none", transition:"all .22s" }}>See How It Works</a>
              </div>
              <div style={{ display:"flex", gap:36, flexWrap:"wrap" }}>
                {[["30+","Unique features"],["20+","Languages"],["60s","Report to insight"]].map(([v,l],i) => (
                  <div key={i}>
                    <div style={{ fontFamily:"'Lora',serif", fontSize:30, color:"#0e2033", fontWeight:700, lineHeight:1 }}>{v}</div>
                    <div style={{ fontSize:12, color:"#6b8499", marginTop:3, fontWeight:600 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero mockup */}
            <div style={{ animation:"pfi-fadeUp .7s ease .2s both", animationFillMode:"both", opacity:0 }}>
              <div style={{ background:"#fff", borderRadius:22, padding:24, boxShadow:"0 20px 70px rgba(14,32,51,.11)", border:"1px solid #e0eaf3", animation:"pfi-float 5s ease-in-out infinite" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
                  <div>
                    <div style={{ fontWeight:800, fontSize:13, color:"#0e2033" }}>Lab Report Analysis</div>
                    <div style={{ fontSize:10, color:"#6b8499", marginTop:2 }}>John Smith · 15 Mar 2026</div>
                  </div>
                  <div style={{ fontSize:9, fontWeight:800, padding:"4px 10px", borderRadius:10, background:"#e8f8f5", color:"#1e8a74" }}>✅ Analysed</div>
                </div>
                {[["HbA1c","7.9%","HIGH","rgba(255,140,107,.15)","#c95a3a"],["LDL Cholesterol","162 mg/dL","HIGH","rgba(255,140,107,.15)","#c95a3a"],["Blood Pressure","148/92","WATCH","rgba(245,166,35,.15)","#a06b00"],["Haemoglobin","13.8 g/dL","NORMAL","rgba(45,184,154,.15)","#1e8a74"]].map(([n,v,s,bg,c],i) => (
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom: i < 3 ? "1px solid #e0eaf3" : "none" }}>
                    <span style={{ fontSize:12, color:"#1e3448" }}>{n}</span>
                    <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                      <span style={{ fontSize:12, fontWeight:700, color:"#0e2033", fontFamily:"monospace" }}>{v}</span>
                      <span style={{ fontSize:9, fontWeight:800, padding:"2px 8px", borderRadius:8, background:bg, color:c }}>{s}</span>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop:16, background:"#e8f8f5", borderRadius:12, padding:"12px 14px", display:"flex", gap:10, alignItems:"center", border:"1px solid rgba(45,184,154,.2)" }}>
                  <span style={{ fontSize:20 }}>💬</span>
                  <div>
                    <div style={{ fontWeight:800, fontSize:12, color:"#1e8a74" }}>Plain English explanation ready</div>
                    <div style={{ fontSize:11, color:"#6b8499" }}>AI-generated · Personalised to your results</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div style={{ background:"#0e2033", padding:"13px 0", overflow:"hidden" }}>
        <div style={{ display:"flex", width:"max-content", animation:"pfi-marquee 24s linear infinite" }}>
          {["AI Powered","Plain English","20+ Languages","Secure & Private","Patient First","Built by Clinicians & Engineers","AI Powered","Plain English","20+ Languages","Secure & Private","Patient First","Built by Clinicians & Engineers"].map((t,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"0 36px", whiteSpace:"nowrap" }}>
              <div style={{ width:4, height:4, borderRadius:"50%", background:"#2db89a" }}></div>
              <span style={{ fontSize:11, fontWeight:700, color:"#3a5a7a", letterSpacing:"1.2px", textTransform:"uppercase" }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding:"88px 0", background:"#0e2033" }}>
        <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 28px" }}>
          <div className="pfi-reveal" style={{ textAlign:"center", marginBottom:52 }}>
            <span style={{ display:"inline-block", padding:"5px 16px", borderRadius:50, fontSize:11, fontWeight:800, letterSpacing:"1.3px", textTransform:"uppercase", marginBottom:14, background:"rgba(45,184,154,.15)", color:"#2db89a" }}>How It Works</span>
            <h2 style={{ fontFamily:"'Lora',serif", fontSize:"clamp(26px,3.8vw,40px)", color:"#fff", letterSpacing:"-.6px", marginBottom:14 }}>From report to understanding<br/>in under 60 seconds.</h2>
            <p style={{ fontSize:15, color:"#5a7a99", lineHeight:1.75, maxWidth:520, margin:"0 auto" }}>A simple four-step journey that takes a confusing lab report and turns it into clear, actionable health knowledge.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:18, position:"relative" }}>
            {[
              ["📄","Upload Your Report","Paste your lab results as text. Your data is processed securely and never stored beyond your session."],
              ["🧠","AI Parses & Analyses","Our backend extracts every lab value, then the AI engine cross-references clinical thresholds to flag conditions."],
              ["💬","Plain English Generated","A local language model generates friendly, clear explanations for every flagged condition — with precautions and risk timelines."],
              ["✅","Results Displayed","Condition cards, severity badges, metric bars, and plain-English summaries — all in one clear, friendly interface."],
            ].map(([icon,title,desc],i) => (
              <div key={i} className="pfi-hiw-step pfi-reveal" style={{ background:"#0f2540", borderRadius:18, padding:"26px 20px", border:"1px solid #1a3558", transition:"border-color .2s", position:"relative", transitionDelay:`${i*0.08}s` }}>
                <div style={{ fontFamily:"'Lora',serif", fontSize:48, color:"rgba(255,255,255,.04)", position:"absolute", top:12, right:16, lineHeight:1 }}>0{i+1}</div>
                <div style={{ fontSize:28, marginBottom:14 }}>{icon}</div>
                <div style={{ fontWeight:800, fontSize:14, color:"#fff", marginBottom:8 }}>{title}</div>
                <div style={{ fontSize:12, color:"#5a7a99", lineHeight:1.65 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="product" style={{ padding:"88px 0", background:"#f7faf9" }}>
        <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 28px" }}>
          <div className="pfi-reveal" style={{ textAlign:"center", marginBottom:48 }}>
            <span style={{ display:"inline-block", padding:"5px 16px", borderRadius:50, fontSize:11, fontWeight:800, letterSpacing:"1.3px", textTransform:"uppercase", marginBottom:14, background:"#e8f8f5", color:"#1e8a74" }}>Features</span>
            <h2 style={{ fontFamily:"'Lora',serif", fontSize:"clamp(26px,3.8vw,40px)", color:"#0e2033", letterSpacing:"-.6px", marginBottom:14 }}>Everything patients need to<br/>understand their health.</h2>
            <p style={{ fontSize:15, color:"#6b8499", lineHeight:1.75, maxWidth:520, margin:"0 auto" }}>30 features across 6 categories — from core AI analysis to personalised video explainers.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }}>
            {[
              ["🔬","AI Report Analysis","Upload any lab report. The AI detects every flagged condition by cross-referencing clinical thresholds — in seconds.","#2db89a",null],
              ["💬","Plain English Explanations","Every medical term decoded clearly and warmly — the way a knowledgeable, caring friend would explain it.","#ff8c6b",null],
              ["📊","Metric Visualisation","Colour-coded severity bars for every lab value — so patients instantly see what's normal, borderline, or high.","#7c3aed",null],
              ["🎬","Personalised Video Explainers","An AI avatar speaks your specific results aloud, with anatomical animations synced to every word.","#f5a623","Coming in v1.0"],
              ["🎛️","Behaviour Simulator",'"What if I walked 30 mins daily?" Drag sliders to see projected impact on your results over 3–6 months.',"#2db89a","Coming in v1.0"],
              ["🌍","20+ Languages","Same care, any language — with culturally relevant lifestyle and dietary advice for diverse communities.","#ff8c6b",null],
            ].map(([icon,title,desc,color,soon],i) => (
              <div key={i} className="pfi-feat pfi-reveal" style={{ background:"#fff", borderRadius:18, padding:"24px 20px", border:"1px solid #e0eaf3", borderTop:`3px solid ${color}`, transition:"transform .22s,box-shadow .22s", transitionDelay:`${i*0.06}s` }}>
                <div style={{ fontSize:26, marginBottom:12 }}>{icon}</div>
                <div style={{ fontWeight:800, fontSize:14, color:"#0e2033", marginBottom:7 }}>{title}</div>
                <div style={{ fontSize:13, color:"#6b8499", lineHeight:1.65 }}>{desc}</div>
                {soon && <span style={{ display:"inline-block", marginTop:10, fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:10, background:"#f0f4fa", color:"#6b8499" }}>{soon}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDERS */}
      <section id="founders" style={{ padding:"88px 0", background:"#fff" }}>
        <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 28px" }}>
          <div className="pfi-reveal" style={{ textAlign:"center", marginBottom:48 }}>
            <span style={{ display:"inline-block", padding:"5px 16px", borderRadius:50, fontSize:11, fontWeight:800, letterSpacing:"1.3px", textTransform:"uppercase", marginBottom:14, background:"#fff2ee", color:"#b85030" }}>The Team</span>
            <h2 style={{ fontFamily:"'Lora',serif", fontSize:"clamp(26px,3.8vw,40px)", color:"#0e2033", letterSpacing:"-.6px", marginBottom:14 }}>Meet the founders.</h2>
            <p style={{ fontSize:15, color:"#6b8499", lineHeight:1.75, maxWidth:520, margin:"0 auto" }}>A clinician and an engineer — united by one belief: healthcare communication is broken, and technology can fix it.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:28 }}>
            {[
              { role:"Chief Executive Officer", roleClass:"ceo", name:"Dr. Pushpakaran Munuswamy", icon:"👨‍⚕️", iconBg:"linear-gradient(135deg,#e8f8f5,#c5f0e8)", roleColor:"#1e8a74", topBg:"linear-gradient(90deg,#2db89a,#5dd6be)",
                bio:"Dr. Pushpakaran is a Consultant Gastroenterologist with over 25 years of clinical experience. He qualified from Tamil Nadu Dr. MGR Medical University and trained at King's College Hospital, London, holding Fellowship of the Royal College of Physicians.\n\nA digital health pioneer, he holds a postgraduate diploma in Digital Health Leadership and serves as Clinical Lead for AI in Gastroenterology at the British Society of Gastroenterology.",
                tags:["Consultant Gastroenterologist","BSG AI Lead","Digital Health Leadership","Fellow, Royal College of Physicians"] },
              { role:"Chief Technology Officer", roleClass:"cto", name:"Vishal Raghav V", icon:"👨‍💻", iconBg:"linear-gradient(135deg,#fff2ee,#ffd5c5)", roleColor:"#b85030", topBg:"linear-gradient(90deg,#ff8c6b,#ffb89e)",
                bio:"Vishal is a computer science researcher and software engineer specialising in AI, machine learning, and NLP. Currently pursuing his degree at SRM Institute of Science and Technology, he has published research in medical AI — including pioneering work on fine-tuning large language models for clinical lab report interpretation.\n\nAt VipsTechnologies , Vishal leads all technical development — from the core AI engine to the full-stack application architecture.",
                tags:["AI & Machine Learning","Medical NLP","Full-Stack Engineering","LLM Research"] },
            ].map((f,i) => (
              <div key={i} className="pfi-fc pfi-reveal" style={{ background:"#fff", border:"1px solid #e0eaf3", borderRadius:24, padding:"34px 30px", boxShadow:"0 4px 24px rgba(14,32,51,.05)", transition:"transform .25s,box-shadow .25s", position:"relative", overflow:"hidden", transitionDelay:`${i*0.1}s` }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:4, borderRadius:"24px 24px 0 0", background:f.topBg }}></div>
                <div style={{ width:72, height:72, borderRadius:"50%", marginBottom:16, display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, border:"3px solid #e0eaf3", background:f.iconBg }}>{f.icon}</div>
                <div style={{ fontSize:11, fontWeight:800, letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:5, color:f.roleColor }}>{f.role}</div>
                <h3 style={{ fontFamily:"'Lora',serif", fontSize:21, color:"#0e2033", marginBottom:12 }}>{f.name}</h3>
                <p style={{ fontSize:13.5, color:"#6b8499", lineHeight:1.75, marginBottom:18, whiteSpace:"pre-line" }}>{f.bio}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                  {f.tags.map((t,j) => <span key={j} style={{ fontSize:11, fontWeight:700, padding:"4px 11px", borderRadius:50, background:"#f7faf9", color:"#6b8499", border:"1px solid #e0eaf3" }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" style={{ background:"#fff", padding:"88px 0" }}>
        <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 28px" }}>
          <div className="pfi-reveal" style={{ textAlign:"center", marginBottom:44 }}>
            <span style={{ display:"inline-block", padding:"5px 16px", borderRadius:50, fontSize:11, fontWeight:800, letterSpacing:"1.3px", textTransform:"uppercase", marginBottom:14, background:"#e8f8f5", color:"#1e8a74" }}>Product Roadmap</span>
            <h2 style={{ fontFamily:"'Lora',serif", fontSize:"clamp(26px,3.8vw,40px)", color:"#0e2033", letterSpacing:"-.6px", marginBottom:14 }}>Where we are.<br/>Where we're going.</h2>
            <p style={{ fontSize:15, color:"#6b8499", lineHeight:1.75, maxWidth:660, margin:"0 auto" }}>
              Our development roadmap across three phases - from the core platform we're building today to the full vision of PatientFriendlyInfo.
            </p>
          </div>

          <div style={{ position:"relative" }}>
            <div style={{ position:"absolute", left:"50%", top:0, bottom:0, width:2, transform:"translateX(-50%)", background:"linear-gradient(180deg, rgba(45,184,154,.5), rgba(45,184,154,.15))" }}></div>

            <div className="pfi-reveal" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"center", marginBottom:44, position:"relative" }}>
              <div style={{ textAlign:"right", paddingRight:22 }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(45,184,154,.12)", border:"1px solid rgba(45,184,154,.25)", padding:"5px 12px", borderRadius:20, marginBottom:12 }}>
                  <span style={{ width:8, height:8, borderRadius:"50%", background:"#2db89a", display:"inline-block" }}></span>
                  <span style={{ fontSize:11, fontWeight:800, color:"#1e8a74", letterSpacing:"1px" }}>IN PROGRESS - 2026</span>
                </div>
                <h3 style={{ fontFamily:"'Lora',serif", fontSize:"clamp(28px,3vw,44px)", color:"#0e2033", marginBottom:8, lineHeight:1.15 }}>Phase 1 - Core Platform</h3>
                <p style={{ fontSize:14, color:"#6b8499", lineHeight:1.75 }}>
                  The foundation. A fully working AI report analyser that any patient can use - paste a lab report, get plain English explanations, severity scores, and actionable precautions.
                </p>
              </div>
              <div style={{ background:"#f7faf9", border:"1px solid #d7e4ef", borderRadius:20, padding:"20px 22px", marginLeft:22 }}>
                {[
                  "-> Report upload & text parsing",
                  "-> AI condition detection engine",
                  "-> Plain English via local LLM (Ollama)",
                  "-> Severity scoring & MetricBar UI",
                  "-> Multilingual support (20+ languages)",
                  "-> Secure, GDPR-compliant data handling",
                ].map((item, idx) => (
                  <div key={idx} style={{ fontSize:16, color:"#1e3448", marginBottom:11 }}>{item}</div>
                ))}
              </div>
              <div style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%, -50%)", width:28, height:28, borderRadius:"50%", background:"rgba(45,184,154,.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ width:14, height:14, borderRadius:"50%", background:"#2db89a" }}></div>
              </div>
            </div>

            <div className="pfi-reveal" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"center", marginBottom:44, position:"relative" }}>
              <div style={{ background:"#f7faf9", border:"1px solid #d7e4ef", borderRadius:20, padding:"20px 22px", marginRight:22 }}>
                {[
                  "-> Personalised video explainers",
                  "-> AI consultant avatar twin",
                  "-> Interactive body map with hotspots",
                  "-> Behaviour change simulator with sliders",
                  "-> Doctor summary letter generator",
                  "-> Age-adaptive explanations (30 vs 70 yr old)",
                ].map((item, idx) => (
                  <div key={idx} style={{ fontSize:16, color:"#6b8499", marginBottom:11 }}>{item}</div>
                ))}
              </div>
              <div style={{ textAlign:"left", paddingLeft:22 }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,140,107,.12)", border:"1px solid rgba(255,140,107,.25)", padding:"5px 12px", borderRadius:20, marginBottom:12 }}>
                  <span style={{ fontSize:11, fontWeight:800, color:"#b85030", letterSpacing:"1px" }}>COMING NEXT - 2026-2027</span>
                </div>
                <h3 style={{ fontFamily:"'Lora',serif", fontSize:"clamp(28px,3vw,44px)", color:"#0e2033", marginBottom:8, lineHeight:1.15 }}>Phase 2 - Video & Intelligence</h3>
                <p style={{ fontSize:14, color:"#6b8499", lineHeight:1.75 }}>
                  Taking the core platform to the next level - personalised video explainers, AI avatars, interactive body maps, and behaviour simulation tools that motivate real health change.
                </p>
              </div>
              <div style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%, -50%)", width:28, height:28, borderRadius:"50%", background:"rgba(255,140,107,.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ width:14, height:14, borderRadius:"50%", background:"#ff8c6b" }}></div>
              </div>
            </div>

            <div className="pfi-reveal" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"center", position:"relative" }}>
              <div style={{ textAlign:"right", paddingRight:22 }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#e8eef5", border:"1px solid #c8d8ec", padding:"5px 12px", borderRadius:20, marginBottom:12 }}>
                  <span style={{ fontSize:11, fontWeight:800, color:"#2a4a6a", letterSpacing:"1px" }}>ON THE HORIZON - 2027+</span>
                </div>
                <h3 style={{ fontFamily:"'Lora',serif", fontSize:"clamp(28px,3vw,44px)", color:"#0e2033", marginBottom:8, lineHeight:1.15 }}>Phase 3 - Platform & Scale</h3>
                <p style={{ fontSize:14, color:"#6b8499", lineHeight:1.75 }}>
                  Full institutional integration, wearable data, cross-condition intelligence, and white-label solutions for healthcare organisations around the world.
                </p>
              </div>
              <div style={{ background:"#f7faf9", border:"1px solid #d7e4ef", borderRadius:20, padding:"20px 22px", marginLeft:22 }}>
                {[
                  "-> Multi-report trend tracking over time",
                  "-> Wearable data integration (glucose, HR)",
                  "-> Cross-condition interaction alerts",
                  "-> Institutional clinician dashboard",
                  "-> White-label for healthcare organisations",
                  "-> Global expansion - 50+ languages",
                ].map((item, idx) => (
                  <div key={idx} style={{ fontSize:16, color:"#6b8499", marginBottom:11 }}>{item}</div>
                ))}
              </div>
              <div style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%, -50%)", width:28, height:28, borderRadius:"50%", background:"rgba(200,216,236,.35)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ width:14, height:14, borderRadius:"50%", background:"#b6c8dc" }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CONTACT */}
      <section id="contact" style={{ padding:"88px 0", background:"#f7faf9" }}>
        <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 28px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"start" }}>
            <div className="pfi-reveal">
              <span style={{ display:"inline-block", padding:"5px 16px", borderRadius:50, fontSize:11, fontWeight:800, letterSpacing:"1.3px", textTransform:"uppercase", marginBottom:14, background:"#e8eef5", color:"#2a4a6a" }}>Say Hello</span>
              <h2 style={{ fontFamily:"'Lora',serif", fontSize:"clamp(26px,3.8vw,40px)", color:"#0e2033", letterSpacing:"-.6px", marginBottom:14 }}>We'd love to hear from you.</h2>
              <p style={{ fontSize:15, color:"#6b8499", lineHeight:1.8, marginBottom:28 }}>Whether you're a patient, a healthcare professional, a potential partner, or simply someone who believes in what we're building — our door is always open.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {[["🌐","https://vips-technologies.vercel.app/","Our home on the web"],["✉️","hello@vips-technologies.com","We reply within 24 hours"],["🚀","Currently in active development","Demo available — full launch coming soon"]].map(([icon,text,sub],i) => (
                  <div key={i} style={{ display:"flex", gap:12, alignItems:"center" }}>
                    <div style={{ width:38, height:38, borderRadius:11, flexShrink:0, background:"#e8f8f5", border:"1px solid rgba(45,184,154,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>{icon}</div>
                    <div>
                      <div style={{ fontSize:14, color:"#1e3448", fontWeight:600 }}>{text}</div>
                      <div style={{ fontSize:12, color:"#6b8499" }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pfi-reveal" style={{ transitionDelay:".15s" }}>
              <div style={{ background:"#fff", borderRadius:22, padding:34, border:"1px solid #e0eaf3", boxShadow:"0 4px 20px rgba(14,32,51,.05)" }}>
                <h3 style={{ fontFamily:"'Lora',serif", fontSize:18, color:"#0e2033", marginBottom:22 }}>Send us a message</h3>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:15 }}>
                  {["First Name","Last Name"].map((p,i) => (
                    <div key={i}>
                      <label style={{ display:"block", fontSize:11, fontWeight:800, color:"#6b8499", marginBottom:6, letterSpacing:".5px", textTransform:"uppercase" }}>{p}</label>
                      <input placeholder={p === "First Name" ? "Jane" : "Smith"} style={{ width:"100%", padding:"11px 15px", borderRadius:11, background:"#f7faf9", border:"1.5px solid #e0eaf3", color:"#1e3448", fontSize:14, fontFamily:"Nunito,sans-serif", outline:"none" }} />
                    </div>
                  ))}
                </div>
                {[["Email Address","email","jane@example.com"],["Organisation (optional)","text","Your company or institution"]].map(([label,type,ph],i) => (
                  <div key={i} style={{ marginBottom:15 }}>
                    <label style={{ display:"block", fontSize:11, fontWeight:800, color:"#6b8499", marginBottom:6, letterSpacing:".5px", textTransform:"uppercase" }}>{label}</label>
                    <input type={type} placeholder={ph} style={{ width:"100%", padding:"11px 15px", borderRadius:11, background:"#f7faf9", border:"1.5px solid #e0eaf3", color:"#1e3448", fontSize:14, fontFamily:"Nunito,sans-serif", outline:"none" }} />
                  </div>
                ))}
                <div style={{ marginBottom:15 }}>
                  <label style={{ display:"block", fontSize:11, fontWeight:800, color:"#6b8499", marginBottom:6, letterSpacing:".5px", textTransform:"uppercase" }}>Message</label>
                  <textarea placeholder="Tell us what's on your mind…" style={{ width:"100%", padding:"11px 15px", borderRadius:11, background:"#f7faf9", border:"1.5px solid #e0eaf3", color:"#1e3448", fontSize:14, fontFamily:"Nunito,sans-serif", outline:"none", resize:"vertical", minHeight:100 }} />
                </div>
                <button className="pfi-form-btn" onClick={e => { e.target.textContent="✅ Sent! We'll be in touch."; e.target.style.background="#27ae60"; }} style={{ width:"100%", padding:13, borderRadius:50, background:"linear-gradient(135deg,#2db89a,#1e8a74)", border:"none", color:"#fff", fontSize:15, fontWeight:800, cursor:"pointer", fontFamily:"Nunito,sans-serif", boxShadow:"0 4px 18px rgba(45,184,154,.35)", transition:"transform .2s,box-shadow .2s" }}>Send Message →</button>
                <div style={{ textAlign:"center", fontSize:11, color:"#6b8499", marginTop:11 }}>No spam, ever. We reply within 24 hours.</div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer style={{ background:"#0e2033", padding:"34px 0" }}>
        <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 28px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
            <div>
              <div style={{ fontFamily:"'Lora',serif", fontSize:17, color:"#fff", fontWeight:700 }}>VipsTechnologies<span style={{ color:"#2db89a" }}>Info</span></div>
              <div style={{ fontSize:11, color:"#2a4a6a", marginTop:3 }}>Making health understandable for everyone</div>
            </div>
            <div style={{ display:"flex", gap:22 }}>
              {[["#about","About"],["#how-it-works","How It Works"],["#product","Product"],["#roadmap","Roadmap"],["#founders","Team"],["#contact","Contact"]].map(([h,l],i) => (
                <a key={i} href={h} className="pfi-footer-link" style={{ fontSize:12, color:"#2a4a6a", textDecoration:"none", transition:"color .2s" }}>{l}</a>
              ))}
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ color:"#4a6a8a", fontSize:12 }}>© 2026 Vips Technologies</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

