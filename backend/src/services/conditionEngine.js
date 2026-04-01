/**
 * conditionEngine.js
 * Compares parsed lab values against clinical reference ranges
 * Returns an array of detected conditions with severity and context
 */

const CONDITION_RULES = [
  {
    key: 'hba1c',
    name: 'Blood Sugar Control (HbA1c)',
    icon: '🩸',
    evaluate: (v) => {
      if (v >= 6.5) return { severity: 'high', flag: 'Diabetic Range', percentOfMax: Math.min((v / 10) * 100, 100) };
      if (v >= 5.7) return { severity: 'medium', flag: 'Pre-Diabetic', percentOfMax: Math.min((v / 10) * 100, 100) };
      return null;
    },
    context: {
      medicalTerm: 'Glycated Haemoglobin / HbA1c',
      referenceRange: 'Normal: below 5.7%',
      bodySystem: 'Endocrine / Metabolic',
    },
  },
  {
    key: 'glucose',
    name: 'Fasting Blood Glucose',
    icon: '💉',
    evaluate: (v) => {
      if (v >= 126) return { severity: 'high', flag: 'Diabetic Range', percentOfMax: Math.min((v / 250) * 100, 100) };
      if (v >= 100) return { severity: 'medium', flag: 'Pre-Diabetic', percentOfMax: Math.min((v / 250) * 100, 100) };
      return null;
    },
    context: {
      medicalTerm: 'Fasting Plasma Glucose',
      referenceRange: 'Normal: 70–99 mg/dL',
      bodySystem: 'Endocrine / Metabolic',
    },
  },
  {
    key: 'ldl',
    name: 'LDL (Bad) Cholesterol',
    icon: '🫀',
    evaluate: (v) => {
      if (v >= 160) return { severity: 'high', flag: 'Very High', percentOfMax: Math.min((v / 220) * 100, 100) };
      if (v >= 130) return { severity: 'medium', flag: 'Borderline High', percentOfMax: Math.min((v / 220) * 100, 100) };
      return null;
    },
    context: {
      medicalTerm: 'Low-Density Lipoprotein Cholesterol',
      referenceRange: 'Normal: below 100 mg/dL',
      bodySystem: 'Cardiovascular',
    },
  },
  {
    key: 'totalCholesterol',
    name: 'Total Cholesterol',
    icon: '🧪',
    evaluate: (v) => {
      if (v >= 240) return { severity: 'high', flag: 'High', percentOfMax: Math.min((v / 300) * 100, 100) };
      if (v >= 200) return { severity: 'medium', flag: 'Borderline', percentOfMax: Math.min((v / 300) * 100, 100) };
      return null;
    },
    context: {
      medicalTerm: 'Serum Total Cholesterol',
      referenceRange: 'Normal: below 200 mg/dL',
      bodySystem: 'Cardiovascular',
    },
  },
  {
    key: 'hdl',
    name: 'HDL (Good) Cholesterol',
    icon: '💚',
    evaluate: (v) => {
      if (v < 40) return { severity: 'high', flag: 'Low — Risk Factor', percentOfMax: Math.min(((60 - v) / 60) * 100, 100) };
      if (v < 50) return { severity: 'medium', flag: 'Below Optimal', percentOfMax: Math.min(((60 - v) / 60) * 100, 100) };
      return null;
    },
    context: {
      medicalTerm: 'High-Density Lipoprotein Cholesterol',
      referenceRange: 'Normal: above 60 mg/dL (protective)',
      bodySystem: 'Cardiovascular',
    },
  },
  {
    key: 'triglycerides',
    name: 'Triglycerides',
    icon: '🫙',
    evaluate: (v) => {
      if (v >= 200) return { severity: 'high', flag: 'High', percentOfMax: Math.min((v / 400) * 100, 100) };
      if (v >= 150) return { severity: 'medium', flag: 'Borderline', percentOfMax: Math.min((v / 400) * 100, 100) };
      return null;
    },
    context: {
      medicalTerm: 'Serum Triglycerides',
      referenceRange: 'Normal: below 150 mg/dL',
      bodySystem: 'Cardiovascular / Metabolic',
    },
  },
  {
    key: 'systolic',
    name: 'Blood Pressure (Systolic)',
    icon: '💢',
    evaluate: (v) => {
      if (v >= 140) return { severity: 'high', flag: 'Stage 1 Hypertension', percentOfMax: Math.min((v / 180) * 100, 100) };
      if (v >= 130) return { severity: 'medium', flag: 'Elevated', percentOfMax: Math.min((v / 180) * 100, 100) };
      return null;
    },
    context: {
      medicalTerm: 'Systolic Blood Pressure',
      referenceRange: 'Normal: below 120 mmHg',
      bodySystem: 'Cardiovascular',
    },
  },
  {
    key: 'egfr',
    name: 'Kidney Function (eGFR)',
    icon: '🫘',
    evaluate: (v) => {
      if (v < 30) return { severity: 'high', flag: 'Severely Reduced', percentOfMax: Math.min(((60 - v) / 60) * 100, 100) };
      if (v < 60) return { severity: 'medium', flag: 'Mildly Reduced', percentOfMax: Math.min(((60 - v) / 60) * 100, 100) };
      return null;
    },
    context: {
      medicalTerm: 'Estimated Glomerular Filtration Rate',
      referenceRange: 'Normal: above 60 mL/min',
      bodySystem: 'Renal',
    },
  },
  {
    key: 'haemoglobin',
    name: 'Haemoglobin',
    icon: '🔴',
    evaluate: (v) => {
      if (v < 11) return { severity: 'high', flag: 'Anaemia', percentOfMax: Math.min(((13.5 - v) / 13.5) * 100, 100) };
      if (v < 13.5) return { severity: 'medium', flag: 'Low Normal — Watch', percentOfMax: Math.min(((13.5 - v) / 13.5) * 100, 100) };
      return null;
    },
    context: {
      medicalTerm: 'Haemoglobin (Hb)',
      referenceRange: 'Normal: 13.5–17.5 g/dL (men), 12–15.5 g/dL (women)',
      bodySystem: 'Haematology',
    },
  },
  {
    key: 'tsh',
    name: 'Thyroid Function (TSH)',
    icon: '🦋',
    evaluate: (v) => {
      if (v > 4.5) return { severity: 'high', flag: 'Elevated — Possible Hypothyroidism', percentOfMax: Math.min((v / 8) * 100, 100) };
      if (v < 0.4) return { severity: 'high', flag: 'Low — Possible Hyperthyroidism', percentOfMax: 80 };
      return null;
    },
    context: {
      medicalTerm: 'Thyroid-Stimulating Hormone',
      referenceRange: 'Normal: 0.4–4.5 mIU/L',
      bodySystem: 'Endocrine / Thyroid',
    },
  },
];

/**
 * detectConditions(metrics) → array of condition objects
 */
const detectConditions = (metrics) => {
  const conditions = [];

  for (const rule of CONDITION_RULES) {
    const metric = metrics.find(m => m.key === rule.key);
    if (!metric) continue;

    const result = rule.evaluate(metric.value);
    if (!result) continue;

    conditions.push({
      key: rule.key,
      name: rule.name,
      icon: rule.icon,
      value: metric.value,
      unit: metric.unit,
      severity: result.severity,
      flag: result.flag,
      percentOfMax: result.percentOfMax,
      context: rule.context,
      // explanation will be filled by explanation.js
      plainEnglish: null,
      precautions: [],
      risks: [],
    });
  }

  // Sort: high → medium → low
  const order = { high: 0, medium: 1, low: 2 };
  return conditions.sort((a, b) => order[a.severity] - order[b.severity]);
  return { enrichedMetrics, conditions };
};

module.exports = { detectConditions };