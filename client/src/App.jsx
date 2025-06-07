import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./components/ui/ThemeProvider";

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

// App component
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

function AppContent() {
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
  ];

  const shouldHideNavbar = hideNavbarPatterns.some((pattern) =>
    pattern.test(location.pathname)
  );

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forget-password" element={<Forget_password />} />
        <Route path="/reset-password" element={<Reset_password />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/create-case" element={<CreateCase />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
      </Routes>
      {!shouldHideNavbar && <Footer />}
    </>
  );
}

export default App;
