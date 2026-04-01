import { useState, useCallback } from "react";
import { analyseReport, loadDemo } from "../features/analyzer/api";

const useAnalysis = () => {
  const [status, setStatus]         = useState("idle"); // idle | loading | success | error
  const [metrics, setMetrics]       = useState([]);
  const [conditions, setConditions] = useState([]);
  const [error, setError]           = useState(null);

  const analyse = useCallback(async (reportText) => {
    setStatus("loading");
    setError(null);
    try {
      const data = await analyseReport(reportText);
      setMetrics(data.metrics || []);
      setConditions(data.conditions || []);
      setStatus("success");
    } catch (err) {
      setError(err?.response?.data?.error || "Something went wrong. Please check your report and try again.");
      setStatus("error");
    }
  }, []);

  const runDemo = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const data = await loadDemo();
      setMetrics(data.metrics || []);
      setConditions(data.conditions || []);
      setStatus("success");
    } catch (err) {
      setError("Could not load demo data. Is the backend running on port 5000?");
      setStatus("error");
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setMetrics([]);
    setConditions([]);
    setError(null);
  }, []);

  return { status, metrics, conditions, error, analyse, runDemo, reset };
};

export default useAnalysis;