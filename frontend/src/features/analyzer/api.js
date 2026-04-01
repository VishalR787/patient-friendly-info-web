import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
const client = axios.create({ baseURL: API_BASE_URL });

export const analyseReport = async (reportText) => {
  const { data } = await client.post("/analyse", { reportText });
  console.log("API response:", data);
  return data;
};

export const loadDemo = async () => {
  const { data } = await client.get("/demo");
  console.log("Demo response:", data);
  return data;
};
