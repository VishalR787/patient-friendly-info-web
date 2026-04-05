import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
const client = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

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
      icon: "B",
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
      icon: "H",
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
      icon: "P",
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
  return data;
};

export const loadDemo = async () => {
  try {
    const { data } = await client.get("/demo");
    if (isValidDemoPayload(data)) {
      return data;
    }
    return LOCAL_DEMO_RESPONSE;
  } catch {
    return LOCAL_DEMO_RESPONSE;
  }
};

export const login = async (identifier, password) => {
  const { data } = await client.post("/auth/login", { identifier, password });
  return data;
};

export const register = async ({ name, email, password }) => {
  const { data } = await client.post("/auth/register", { name, email, password });
  return data;
};

export const logout = async () => {
  const { data } = await client.post("/auth/logout");
  return data;
};

export const checkAuth = async () => {
  const { data } = await client.get("/auth/me");
  return data;
};

export const requestPasswordOtp = async (email) => {
  const { data } = await client.post("/auth/forgot-password/request", { email });
  return data;
};

export const resetPasswordWithOtp = async ({ email, otp, newPassword }) => {
  const { data } = await client.post("/auth/forgot-password/reset", {
    email,
    otp,
    newPassword,
  });
  return data;
};

export const getVipsContent = async () => {
  const { data } = await client.get("/vips-content");
  return data;
};

export const updateVipsContent = async (content) => {
  const { data } = await client.put("/vips-content", content);
  return data;
};

export const getMainPageContent = async () => {
  const { data } = await client.get("/main-page-content");
  return data;
};

export const updateMainPageContent = async (content) => {
  const { data } = await client.put("/main-page-content", content);
  return data;
};
