import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Medications from "./pages/Medications";
import Adherence from "./pages/Adherence";
import UploadFiles from "./pages/UploadFiles";
import NotFound from "./pages/NotFound";
import Sidebar from "./components/Sidebar";

import { cn, getTabTitle } from "./lib/utils";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : window.location.href = "/login";
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? window.location.href = "/" : children;
};

export default function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const location = useLocation().pathname;
  const authPage = ["/login", "/signup"].includes(location) && "ml-0";

  useEffect(() => {
    document.title = getTabTitle(location);
  }, [location]);

  const setCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="flex">
      <Sidebar isCollapsed={isCollapsed} setCollapse={setCollapse} />
      <main className={cn("flex-1 bg-gray-100 h-screen", isCollapsed ? "ml-20" : "ml-64", authPage)}>
        <Routes>
          <Route path="/login" element={<PublicRoute> <Login /> </PublicRoute>} />
          <Route path="/signup" element={<PublicRoute> <Signup /> </PublicRoute>} />
          <Route path="/onboarding" element={<PublicRoute> <Onboarding /> </PublicRoute>} />
          <Route path="/" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
          <Route path="/medications" element={<ProtectedRoute> <Medications /> </ProtectedRoute>} />
          <Route path="/adherence" element={<ProtectedRoute> <Adherence /> </ProtectedRoute>} />
          <Route path="/upload" element={<ProtectedRoute> <UploadFiles /> </ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};