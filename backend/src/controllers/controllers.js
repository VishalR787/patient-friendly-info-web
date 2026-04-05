const { parseReport } = require("../services/parser");
const { detectConditions } = require("../services/conditionEngine");
const { generateExplanations } = require("../services/explanation");

const DEFAULT_VIPS_CONTENT = {
  badge: "Health Technology Company",
  title: "Building technology that cares for patients",
  highlightedText: "cares for patients",
  description:
    "Vips Technologies builds patient-centered AI tools. Our flagship product, PatientFriendlyInfo, converts complex medical reports into clear, plain-English explanations.",
};

let vipsContent = { ...DEFAULT_VIPS_CONTENT };

const DEFAULT_MAIN_PAGE_CONTENT = {
  // Hero
  heroBadge: "Health Technology · AI-Powered · Est. 2026",
  heroTitleLine1: "Making health",
  heroTitleHighlight: "understandable",
  heroTitleLine2: "for everyone.",
  heroDescription:
    "PatientFriendlyInfo uses AI to translate complex medical lab reports into plain, friendly language - so every patient leaves their appointment informed, not confused.",

  // About
  aboutTitle: "Why PatientFriendlyInfo exists.",
  aboutPara1:
    "Most patients leave with numbers and abbreviations they do not understand. That confusion leads to fear, missed follow-ups, and delayed action.",
  aboutPara2:
    "PatientFriendlyInfo closes that gap by converting clinical lab reports into clear, plain-language explanations patients can actually use.",

  // How It Works
  hiwTitle: "From report to understanding in under 60 seconds.",
  hiwSubtitle:
    "A simple four-step journey that takes a confusing lab report and turns it into clear, actionable health knowledge.",
  hiwStep1Title: "Upload Your Report",
  hiwStep1Desc:
    "Paste your lab results as text. Your data is processed securely and never stored beyond your session.",
  hiwStep2Title: "AI Parses & Analyses",
  hiwStep2Desc:
    "Our backend extracts every lab value, then the AI engine cross-references clinical thresholds to flag conditions.",
  hiwStep3Title: "Plain English Generated",
  hiwStep3Desc:
    "A local language model generates friendly, clear explanations for every flagged condition — with precautions and risk timelines.",
  hiwStep4Title: "Results Displayed",
  hiwStep4Desc:
    "Condition cards, severity badges, metric bars, and plain-English summaries — all in one clear, friendly interface.",

  // Features
  featuresTitle: "Everything patients need to understand their health.",
  featuresSubtitle:
    "30 features across 6 categories — from core AI analysis to personalised video explainers.",
  feat1Title: "AI Report Analysis",
  feat1Desc:
    "Upload any lab report. The AI detects every flagged condition by cross-referencing clinical thresholds — in seconds.",
  feat2Title: "Plain English Explanations",
  feat2Desc:
    "Every medical term decoded clearly and warmly — the way a knowledgeable, caring friend would explain it.",
  feat3Title: "Metric Visualisation",
  feat3Desc:
    "Colour-coded severity bars for every lab value — so patients instantly see what's normal, borderline, or high.",
  feat4Title: "Personalised Video Explainers",
  feat4Desc:
    "An AI avatar speaks your specific results aloud, with anatomical animations synced to every word.",
  feat5Title: "Behaviour Simulator",
  feat5Desc:
    '"What if I walked 30 mins daily?" Drag sliders to see projected impact on your results over 3–6 months.',
  feat6Title: "20+ Languages",
  feat6Desc:
    "Same care, any language — with culturally relevant lifestyle and dietary advice for diverse communities.",

  // Founders
  founder1Name: "Dr. Pushpakaran Munuswamy",
  founder1Role: "Chief Executive Officer",
  founder1Bio:
    "Dr. Pushpakaran is a Consultant Gastroenterologist with over 25 years of clinical experience. He qualified from Tamil Nadu Dr. MGR Medical University and trained at King's College Hospital, London, holding Fellowship of the Royal College of Physicians.\n\nA digital health pioneer, he holds a postgraduate diploma in Digital Health Leadership and serves as Clinical Lead for AI in Gastroenterology at the British Society of Gastroenterology.",
  founder2Name: "Vishal Raghav V",
  founder2Role: "Chief Technology Officer",
  founder2Bio:
    "Vishal is a computer science researcher and software engineer specialising in AI, machine learning, and NLP. Currently pursuing his degree at SRM Institute of Science and Technology, he has published research in medical AI — including pioneering work on fine-tuning large language models for clinical lab report interpretation.\n\nAt VipsTechnologies, Vishal leads all technical development — from the core AI engine to the full-stack application architecture.",

  // Roadmap
  roadmapTitle: "Where we are. Where we're going.",
  roadmapSubtitle:
    "Our development roadmap across three phases - from the core platform we're building today to the full vision of PatientFriendlyInfo.",
  phase1Title: "Phase 1 - Core Platform",
  phase1Desc:
    "The foundation. A fully working AI report analyser that any patient can use - paste a lab report, get plain English explanations, severity scores, and actionable precautions.",
  phase2Title: "Phase 2 - Video & Intelligence",
  phase2Desc:
    "Taking the core platform to the next level - personalised video explainers, AI avatars, interactive body maps, and behaviour simulation tools that motivate real health change.",
  phase3Title: "Phase 3 - Platform & Scale",
  phase3Desc:
    "Full institutional integration, wearable data, cross-condition intelligence, and white-label solutions for healthcare organisations around the world.",

  // Contact & Footer
  contactEmail: "hello@vips-technologies.com",
  contactWebsite: "https://vips-technologies.vercel.app/",
  contactStatus: "Currently in active development",
  footerTagline: "Making health understandable for everyone",
};

let mainPageContent = { ...DEFAULT_MAIN_PAGE_CONTENT };

// POST /api/analyse
const analyseReport = async (req, res, next) => {
  try {
    const { reportText } = req.body;

    if (!reportText || reportText.trim().length < 10) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid report text.",
      });
    }

    // Step 1: Parse raw text → extract lab values
    const metrics = parseReport(reportText);

    if (metrics.length === 0) {
      return res.status(422).json({
        success: false,
        error: "No lab values were found in your report. Please check the format.",
      });
    }

    // Step 2: Detect conditions from parsed metrics
    const { enrichedMetrics, conditions } = detectConditions(metrics);

    // Step 3: Generate plain-English explanations via Ollama
    const enrichedConditions = await generateExplanations({ enrichedMetrics, conditions });

    return res.status(200).json({
      success: true,
      metrics: enrichedMetrics,
      conditions: enrichedConditions,
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/feature (admin-only)
const createFeature = (req, res) => {
  // TODO: replace with DB save
  const { name, config } = req.body;
  return res.status(201).json({
    success: true,
    message: "Feature created",
    feature: { name, config },
  });
};

// DELETE /api/feature/:id (admin-only)
const deleteFeature = (req, res) => {
  // TODO: replace with DB delete
  const { id } = req.params;
  return res.status(200).json({
    success: true,
    message: `Feature ${id} deleted`,
  });
};

const getVipsContent = (req, res) => {
  res.status(200).json({
    success: true,
    content: vipsContent,
  });
};

const updateVipsContent = (req, res) => {
  const { badge, title, highlightedText, description } = req.body || {};

  if (!badge || !title || !highlightedText || !description) {
    return res.status(400).json({
      success: false,
      error: "All fields are required: badge, title, highlightedText, description.",
    });
  }

  vipsContent = {
    badge: String(badge).trim(),
    title: String(title).trim(),
    highlightedText: String(highlightedText).trim(),
    description: String(description).trim(),
  };

  return res.status(200).json({
    success: true,
    content: vipsContent,
  });
};

const getMainPageContent = (req, res) => {
  res.status(200).json({
    success: true,
    content: mainPageContent,
  });
};

const updateMainPageContent = (req, res) => {
  const body = req.body || {};

  // Merge incoming fields over current content, sanitising each to a string
  const updated = {};
  for (const key of Object.keys(DEFAULT_MAIN_PAGE_CONTENT)) {
    updated[key] = key in body ? String(body[key]).trim() : String(mainPageContent[key] || "").trim();
  }

  mainPageContent = updated;

  return res.status(200).json({
    success: true,
    content: mainPageContent,
  });
};


// GET /api/demo — returns hardcoded demo data (no Ollama needed)
const getDemoReport = (req, res) => {
  res.status(200).json({
    success: true,
    metrics: [
      { name: "HbA1c", value: 7.9, unit: "%", status: "high", reference: "< 5.7%" },
      { name: "Fasting Glucose", value: 198, unit: "mg/dL", status: "high", reference: "70–99 mg/dL" },
      { name: "LDL Cholesterol", value: 162, unit: "mg/dL", status: "high", reference: "< 100 mg/dL" },
      { name: "Total Cholesterol", value: 241, unit: "mg/dL", status: "borderline", reference: "< 200 mg/dL" },
      { name: "Blood Pressure (Systolic)", value: 148, unit: "mmHg", status: "borderline", reference: "< 120 mmHg" },
      { name: "eGFR", value: 61, unit: "mL/min", status: "watch", reference: "> 60 mL/min" },
      { name: "Haemoglobin", value: 13.8, unit: "g/dL", status: "normal", reference: "13.5–17.5 g/dL" },
    ],
    conditions: [
      {
        name: "Type 2 Diabetes Mellitus",
        medicalTerm: "Hyperglycaemia / HbA1c Elevation",
        severity: "high",
        icon: "🩸",
        plainEnglish:
          "Your HbA1c of 7.9% means your blood sugar has been consistently high for the past 3 months. Think of it like a long-term average — your body is struggling to manage sugar properly. This is above the diabetic threshold of 6.5%, which means your cells aren't getting the energy they need efficiently.",
        precautions: [
          "Reduce refined carbohydrates and sugary foods",
          "Walk at least 30 minutes every day — it helps cells absorb sugar",
          "Monitor your blood glucose at home regularly",
          "Take any prescribed medication consistently",
          "Schedule a follow-up blood test in 3 months",
        ],
        risksIfUntreated: [
          "Nerve damage causing tingling or numbness in hands and feet",
          "Kidney damage that may require dialysis",
          "Vision loss from diabetic retinopathy",
          "Higher risk of heart attack and stroke",
          "Slow-healing wounds and infections",
        ],
      },
      {
        name: "High Cholesterol",
        medicalTerm: "Hypercholesterolaemia",
        severity: "high",
        icon: "🫀",
        plainEnglish:
          "Imagine your arteries like water pipes. Cholesterol — especially your LDL of 162 mg/dL — is like sludge building up on the pipe walls. Over time, this narrows the pipes, making your heart work harder and raising the risk of a blockage.",
        precautions: [
          "Avoid fried foods, processed meats, and full-fat dairy",
          "Eat oily fish like salmon or mackerel twice a week",
          "Increase fibre intake — oats, lentils, and vegetables help clear LDL",
          "Exercise regularly — even brisk walking helps",
          "Discuss medication options with your doctor",
        ],
        risksIfUntreated: [
          "Atherosclerosis — hardening and narrowing of arteries",
          "Heart attack from blocked coronary arteries",
          "Stroke if arteries supplying the brain are affected",
          "Peripheral artery disease causing leg pain when walking",
        ],
      },
      {
        name: "Stage 1 Hypertension",
        medicalTerm: "Hypertension Grade 1",
        severity: "borderline",
        icon: "💢",
        plainEnglish:
          "Your blood pressure of 148/92 means your heart is pushing blood through your body with more force than it should. Like too much pressure in a garden hose, this strains your blood vessel walls over time — silently damaging your heart, brain, and kidneys.",
        precautions: [
          "Reduce salt intake — aim for under 6g per day",
          "Limit alcohol consumption",
          "Practice stress-reduction techniques like deep breathing",
          "Take any prescribed blood pressure medication consistently",
          "Monitor blood pressure at home with a cuff device",
        ],
        risksIfUntreated: [
          "Stroke from bursting or blocked blood vessels in the brain",
          "Heart failure as the heart muscle weakens from overwork",
          "Accelerated kidney disease",
          "Vision damage from hypertensive retinopathy",
        ],
      },
    ],
  });
};

module.exports = {
  analyseReport,
  getDemoReport,
  createFeature,
  deleteFeature,
  getVipsContent,
  updateVipsContent,
  getMainPageContent,
  updateMainPageContent,
};
