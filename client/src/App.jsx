import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";

// pages
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Forget_password from "./pages/Forget_password";
import Reset_password from "./pages/Reset_password";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Chat from "./pages/Chat";
import CreateCase from "./pages/CreateCase";
import HowItWorks from "./pages/HowItWork";
import Verify_email from "./pages/Verify_email";
import CaseDetails from "./pages/CaseDetails";

// App component
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const { user, checkingAuth, loading } = useUserStore();

  useEffect(() => {
    checkingAuth();
  }, [checkingAuth]);

  if (loading.checkingAuthLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-lg">Checking authentication...</p>
      </div>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <AppContent user={user} loading={loading.checkingAuthLoading} />
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

function AppContent({ user, loading }) {
  const location = useLocation();

  const hideNavbarPatterns = [
    /^\/dashboard\/sub-centers(\/.*)?$/,
    /^\/dashboard\/research-divisions(\/.*)?$/,
    /^\/dashboard\/reports$/,
    /^\/dashboard\/visit-agents$/,
    /^\/dashboard\/cases(\/.*)?$/,
    /^\/login$/,
    /^\/signup$/,
    /^\/forget-password$/,
    /^\/reset-password$/,
    /^\/verify-email$/,
  ];

  const shouldHideNavbar = hideNavbarPatterns.some((pattern) =>
    pattern.test(location.pathname)
  );

  const adminRoles = [
    "main-admin",
    "ResearchDivisionAdmin",
    "sub-center-admin",
    "visit-agent",
  ];

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forget-password" element={<Forget_password />} />
        <Route path="/reset-password" element={<Reset_password />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/" replace />}
        />
        <Route
          path="/dashboard/*"
          element={
            user && adminRoles.includes(user.role) ? (
              <Dashboard />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/chat" element={<Chat />} />
        <Route
          path="/create-case"
          element={
            user && user.role === "user" ? (
              <CreateCase />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/verify-email" element={<Verify_email />} />
        <Route
          path="/case/:caseId"
          element={
            user && user.role === "user" ? (
              <CaseDetails />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
      {!shouldHideNavbar && <Footer />}
    </>
  );
}

export default App;
