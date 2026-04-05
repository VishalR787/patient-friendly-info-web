require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/patientfriendlyinfo';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`MongoDB connected: ${MONGO_URI}`);
    app.listen(PORT, () => {
      console.log(`PatientFriendlyInfo backend running on port ${PORT}`);
      console.log(`Ollama model: ${process.env.OLLAMA_MODEL || 'llama3'}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
