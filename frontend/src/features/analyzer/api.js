import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
const client = axios.create({ baseURL: API_BASE_URL });

const LOCAL_DEMO_RESPONSE = {
  success: true,
  metrics: [
    { name: "HbA1c", value: 7.9, unit: "%", status: "high", reference: "< 5.7%" },
    { name: "Fasting Glucose", value: 198, unit: "mg/dL", status: "high", reference: "70-99 mg/dL" },
    { name: "LDL Cholesterol", value: 162, unit: "mg/dL", status: "high", reference: "< 100 mg/dL" },
    { name: "Total Cholesterol", value: 241, unit: "mg/dL", status: "borderline", reference: "< 200 mg/dL" },
    { name: "Blood Pressure (Systolic)", value: 148, unit: "mmHg", status: "borderline", reference: "< 120 mmHg" },
    { name: "eGFR", value: 61, unit: "mL/min", status: "watch", reference: "> 60 mL/min" },
    { name: "Haemoglobin", value: 13.8, unit: "g/dL", status: "normal", reference: "13.5-17.5 g/dL" },
  ],
  conditions: [
    {
      name: "Type 2 Diabetes Mellitus",
      medicalTerm: "Hyperglycaemia / HbA1c Elevation",
      severity: "high",
      icon: "🩸",
      plainEnglish:
        "Your HbA1c of 7.9% means your blood sugar has been consistently high for the past 3 months. This is above the diabetic range and needs follow-up care.",
      precautions: [
        "Reduce refined carbohydrates and sugary foods",
        "Walk at least 30 minutes daily",
        "Monitor blood glucose at home",
      ],
      risksIfUntreated: [
        "Nerve and kidney damage",
        "Vision problems",
        "Higher heart and stroke risk",
      ],
      aiGenerated: false,
    },
    {
      name: "High Cholesterol",
      medicalTerm: "Hypercholesterolaemia",
      severity: "high",
      icon: "🫀",
      plainEnglish:
        "Your LDL cholesterol is above the ideal range. Over time, this can narrow blood vessels and increase cardiovascular risk.",
      precautions: [
        "Avoid fried and highly processed foods",
        "Increase fibre-rich foods",
        "Exercise regularly",
      ],
      risksIfUntreated: [
        "Atherosclerosis",
        "Heart attack",
        "Stroke",
      ],
      aiGenerated: false,
    },
    {
      name: "Stage 1 Hypertension",
      medicalTerm: "Hypertension Grade 1",
      severity: "borderline",
      icon: "💢",
      plainEnglish:
        "Your blood pressure is elevated and should be monitored closely. Persistent high pressure can strain the heart and blood vessels.",
      precautions: [
        "Reduce salt intake",
        "Exercise and manage stress",
        "Track blood pressure regularly",
      ],
      risksIfUntreated: [
        "Stroke",
        "Heart failure",
        "Kidney damage",
      ],
      aiGenerated: false,
    },
  ],
};

const isValidDemoPayload = (data) => (
  data &&
  typeof data === "object" &&
  Array.isArray(data.metrics) &&
  Array.isArray(data.conditions)
);

export const analyseReport = async (reportText) => {
  const { data } = await client.post("/analyse", { reportText });
  console.log("API response:", data);
  return data;
};

export const loadDemo = async () => {
  try {
    const { data } = await client.get("/demo");
    if (isValidDemoPayload(data)) {
      console.log("Demo response (API):", data);
      return data;
    }
    console.warn("Demo API returned non-JSON or unexpected payload, using local demo data.");
    return LOCAL_DEMO_RESPONSE;
  } catch (err) {
    console.warn("Demo API unavailable, using local demo data.");
    return LOCAL_DEMO_RESPONSE;
  }
};
