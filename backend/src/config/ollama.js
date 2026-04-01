// Ollama configuration
// Make sure Ollama is running: `ollama serve`
// Pull a model: `ollama pull llama3`

const OLLAMA_CONFIG = {
  baseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
  model: process.env.OLLAMA_MODEL || "llama3",
  options: {
    temperature: 0.4,      // lower = more consistent, factual
    num_predict: 200,      // max tokens per explanation
    top_p: 0.9,
  },
};

module.exports = OLLAMA_CONFIG;