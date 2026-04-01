import { BrowserRouter, Routes, Route } from "react-router-dom";
import Vips from "./pages/Vips";
import Home from "./pages/Home";
import Demo from "./pages/Demo";
import PatientFriendlyInfo from "./pages/patientfriendlyinfo";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                    element={<PatientFriendlyInfo />} />
        <Route path="/vips"                element={<Vips />} />
        <Route path="/app"                 element={<Home />} />
        <Route path="/demo"                element={<Demo />} />
        <Route path="/patientfriendlyinfo" element={<PatientFriendlyInfo />} />
      </Routes>
    </BrowserRouter>
  );
}
