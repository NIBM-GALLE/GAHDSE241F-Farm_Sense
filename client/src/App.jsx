import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";

function App() {
  return (
    <div className="bg-gradient-to-r from-green-50 to-slate-200 min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
