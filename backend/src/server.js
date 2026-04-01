const app = require('./app');
require('dotenv').config();
 
const PORT = process.env.PORT || 5000;
 
app.listen(PORT, () => {
  console.log(`PatientFriendlyInfo backend running on port ${PORT}`);
  console.log(`Ollama model: ${process.env.OLLAMA_MODEL || 'llama3'}`);
});
 