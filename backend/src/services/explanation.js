const axios = require("axios");

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3";

const askOllama = async (prompt) => {
  try {
    const response = await axios.post(
      `${OLLAMA_BASE_URL}/api/generate`,
      { model: OLLAMA_MODEL, prompt, stream: false, options: { temperature: 0.4, num_predict: 200 } },
      { timeout: 15000 }
    );
    return response.data.response?.trim() || null;
  } catch (err) {
    console.warn("⚠️  Ollama not available, using fallback.");
    return null;
  }
};

const getFallbackExplanation = (condition) => {
  const metric = condition.triggerMetric;
  const val = metric?.value ?? "unknown";
  const unit = metric?.unit ?? "";

  const fallbacks = {
    "Type 2 Diabetes Mellitus": `Your HbA1c of ${val}% means your blood sugar has been consistently high for the past 3 months. Your body is struggling to manage sugar properly.`,
    "Pre-Diabetes": `Your blood sugar is in a borderline range — not yet diabetes, but a warning sign your body is starting to struggle with managing sugar.`,
    "High Cholesterol": `Your cholesterol reading of ${val} ${unit} is above the ideal level. Think of it like slow-building residue in your artery walls that narrows blood flow over time.`,
    "Stage 1 Hypertension": `Your blood pressure means your heart is pushing blood with slightly more force than it should — like too much pressure in a garden hose.`,
    "Stage 2 Hypertension": `Your blood pressure is significantly elevated. The constant excess force is actively stressing your heart, arteries, kidneys and brain.`,
    "Reduced Kidney Function": `Your kidneys are filtering your blood at a reduced capacity — like a water filter working at lower efficiency than it should.`,
    "Mildly Reduced Kidney Function": `Your kidney filtration rate is slightly below the ideal range — your kidneys are still functioning but worth monitoring closely.`,
    "Anaemia": `Your haemoglobin of ${val} ${unit} is lower than it should be. This means your red blood cells are carrying less oxygen around your body than needed.`,
    "Underactive Thyroid": `Your thyroid is not producing enough hormone — think of it like the throttle on a car being stuck too low, slowing everything down.`,
    "Overactive Thyroid": `Your thyroid is working overtime, speeding up your heart, metabolism and nervous system more than they should be.`,
    "High Uric Acid": `Your uric acid of ${val} ${unit} is above normal. When it builds up, it can form sharp crystals in your joints causing intense pain.`,
  };

  return fallbacks[condition.name] ||
    `Your ${metric?.name || "value"} of ${val} ${unit} is outside the normal range and has been flagged for attention.`;
};

const generateExplanations = async (input) => {
  // Handle both { enrichedMetrics, conditions } and plain conditions array
  const conditions = Array.isArray(input) ? input : (input?.conditions || []);

  console.log("generateExplanations received conditions:", conditions?.length);

  if (!Array.isArray(conditions) || conditions.length === 0) {
    console.warn("No conditions to explain");
    return [];
  }

  const enriched = await Promise.all(
    conditions.map(async (condition) => {
      if (!condition) return null;
      try {
        const aiExplanation = condition.triggerMetric
          ? await askOllama(`Explain in 2 friendly sentences for a patient: ${condition.name} - value ${condition.triggerMetric?.value} ${condition.triggerMetric?.unit}`)
          : null;

        return {
          ...condition,
          plainEnglish: aiExplanation || getFallbackExplanation(condition),
          aiGenerated: !!aiExplanation,
        };
      } catch (err) {
        console.error("Error processing condition:", condition.name, err.message);
        return { ...condition, plainEnglish: getFallbackExplanation(condition), aiGenerated: false };
      }
    })
  );

  return enriched.filter(Boolean);
};

module.exports = { generateExplanations };