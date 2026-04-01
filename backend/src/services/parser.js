const { LAB_PATTERNS } = require('../utils/regex');

/**
 * parseReport(text) → array of { key, label, value, unit }
 * Extracts all detectable lab values from raw report text
 */
const parseReport = (text) => {
  const results = [];

  for (const pattern of LAB_PATTERNS) {
    const match = text.match(pattern.regex);
    if (match && match[1]) {
      const value = parseFloat(match[1]);
      if (!isNaN(value)) {
        results.push({
          key: pattern.key,
          label: pattern.label,
          value,    
          unit: pattern.unit,
        });
      }
    }
  }

  return results;
};

module.exports = { parseReport };