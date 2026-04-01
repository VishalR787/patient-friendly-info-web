// Regex patterns for extracting lab values from raw report text
// Each pattern: { key, label, unit, regex }

const LAB_PATTERNS = [
  {
    key: 'hba1c',
    label: 'HbA1c',
    unit: '%',
    regex: /hba1c\s*[:\-]?\s*([\d.]+)\s*%?/i,
  },
  {
    key: 'glucose',
    label: 'Fasting Glucose',
    unit: 'mg/dL',
    regex: /(?:fasting\s+)?glucose\s*[:\-]?\s*([\d.]+)\s*(?:mg\/dl|mmol\/l)?/i,
  },
  {
    key: 'totalCholesterol',
    label: 'Total Cholesterol',
    unit: 'mg/dL',
    regex: /total\s+cholesterol\s*[:\-]?\s*([\d.]+)\s*(?:mg\/dl)?/i,
  },
  {
    key: 'ldl',
    label: 'LDL Cholesterol',
    unit: 'mg/dL',
    regex: /ldl\s*[:\-]?\s*([\d.]+)\s*(?:mg\/dl)?/i,
  },
  {
    key: 'hdl',
    label: 'HDL Cholesterol',
    unit: 'mg/dL',
    regex: /hdl\s*[:\-]?\s*([\d.]+)\s*(?:mg\/dl)?/i,
  },
  {
    key: 'triglycerides',
    label: 'Triglycerides',
    unit: 'mg/dL',
    regex: /triglycerides?\s*[:\-]?\s*([\d.]+)\s*(?:mg\/dl)?/i,
  },
  {
    key: 'systolic',
    label: 'Blood Pressure (Systolic)',
    unit: 'mmHg',
    regex: /blood\s+pressure\s*[:\-]?\s*([\d]+)\s*\/\s*[\d]+/i,
  },
  {
    key: 'diastolic',
    label: 'Blood Pressure (Diastolic)',
    unit: 'mmHg',
    regex: /blood\s+pressure\s*[:\-]?\s*[\d]+\s*\/\s*([\d]+)/i,
  },
  {
    key: 'egfr',
    label: 'eGFR',
    unit: 'mL/min',
    regex: /egfr\s*[:\-]?\s*([\d.]+)\s*(?:ml\/min)?/i,
  },
  {
    key: 'haemoglobin',
    label: 'Haemoglobin',
    unit: 'g/dL',
    regex: /h(?:a|e)moglobin\s*[:\-]?\s*([\d.]+)\s*(?:g\/dl)?/i,
  },
  {
    key: 'tsh',
    label: 'TSH',
    unit: 'mIU/L',
    regex: /tsh\s*[:\-]?\s*([\d.]+)\s*(?:miu\/l)?/i,
  },
  {
    key: 'creatinine',
    label: 'Creatinine',
    unit: 'mg/dL',
    regex: /creatinine\s*[:\-]?\s*([\d.]+)\s*(?:mg\/dl)?/i,
  },
  {
    key: 'sodium',
    label: 'Sodium',
    unit: 'mEq/L',
    regex: /sodium\s*[:\-]?\s*([\d.]+)\s*(?:meq\/l)?/i,
  },
  {
    key: 'potassium',
    label: 'Potassium',
    unit: 'mEq/L',
    regex: /potassium\s*[:\-]?\s*([\d.]+)\s*(?:meq\/l)?/i,
  },
];

module.exports = { LAB_PATTERNS };