const { parseReport } = require("../services/parser");
const { detectConditions } = require("../services/conditionEngine");
const { generateExplanations } = require("../services/explanation");

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

module.exports = { analyseReport, getDemoReport };