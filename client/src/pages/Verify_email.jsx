import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";
function VerifyEmail() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { verifyEmail, loading } = useUserStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;

    // Allow only digits, up to 6 characters
    if (/^\d{0,6}$/.test(value)) {
      setCode(value);
      if (value.length === 6) {
        setError("");
      } else {
        setError("Code must be exactly 6 digits");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError("Please enter a valid 6-digit code");
    } else {
      setError("");
      await verifyEmail(code, navigate);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Verify Your Email
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            maxLength={6}
            value={code}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter 6-digit code"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg font-semibold"
          >
            {loading.verifyEmailLoading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;
