import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Vips from "./pages/Vips";
import Home from "./pages/Home";
import Demo from "./pages/Demo";
import PatientFriendlyInfo from "./pages/patientfriendlyinfo";
import Login from "./pages/Login";
import MainPageEditor from "./pages/MainPageEditor";
import { checkAuth } from "./features/analyzer/api";

function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        await checkAuth();
        if (mounted) setStatus("ok");
      } catch {
        if (mounted) setStatus("blocked");
      }
    };

    run();

    return () => {
      mounted = false;
    };
  }, []);

  if (status === "loading") {
    return <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>Checking session...</div>;
  }

  if (status === "blocked") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AdminRoute({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        const me = await checkAuth();
        if (mounted) {
          setStatus(me?.isAdmin ? "ok" : "blocked");
        }
      } catch {
        if (mounted) setStatus("blocked");
      }
    };

    run();

    return () => {
      mounted = false;
    };
  }, []);

  if (status === "loading") {
    return <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>Checking admin access...</div>;
  }

  if (status === "blocked") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PatientFriendlyInfo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
        <Route
          path="/admin/main-page"
          element={(
            <AdminRoute>
              <MainPageEditor />
            </AdminRoute>
          )}
        />
        <Route
          path="/vips"
          element={(
            <ProtectedRoute>
              <Vips />
            </ProtectedRoute>
          )}
        />
        <Route path="/patientfriendlyinfo" element={<PatientFriendlyInfo />} />
      </Routes>
    </BrowserRouter>
  );
}
