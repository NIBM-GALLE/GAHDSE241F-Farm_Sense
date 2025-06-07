import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Leaf, ImagePlus, Send, X, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

function CreateCase() {
  const [form, setForm] = useState({
    plantName: "",
    symptoms: "",
    location: "",
    image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Please upload an image smaller than 5MB.");
      return;
    }

    if (!file.type.match("image.*")) {
      alert("Please upload an image file (JPEG, PNG, etc.)");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Case Submitted", form);
      alert("Your case has been submitted successfully!");
      setForm({ plantName: "", symptoms: "", location: "", image: null });
      setIsSubmitting(false);
      navigate("/cases"); // Redirect after submission
    }, 1500);
  };

  const removeImage = () => {
    setForm((prev) => ({ ...prev, image: null }));
    fileRef.current.value = "";
  };

  return (
    <div className="min-h-screen py-16 sm:py-20 px-4 bg-balck transition-colors">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-green-200 dark:border-green-700 shadow-lg p-6 sm:p-8 mb-6"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mb-3">
              <Leaf className="w-8 h-8 text-green-600 dark:text-green-300" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-900 dark:text-white">
              <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent dark:from-green-300 dark:to-green-100">
                Report Plant Issue
              </span>
            </h2>
            <p className="text-green-700 dark:text-green-300 text-center mt-2">
              Get expert advice by submitting details about your crop problem
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-green-800 dark:text-green-200">
                Plant Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                name="plantName"
                value={form.plantName}
                onChange={handleChange}
                placeholder="e.g., Tomato, Rice, Banana"
                required
                className="w-full px-4 py-3 rounded-lg border border-green-200 dark:border-green-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-green-800 dark:text-green-200">
                Symptoms / Description
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                name="symptoms"
                value={form.symptoms}
                onChange={handleChange}
                placeholder="Describe the issue in detail (e.g., yellow leaves, black spots, wilting)"
                required
                rows="4"
                className="w-full px-4 py-3 rounded-lg border border-green-200 dark:border-green-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all resize-none"
              ></textarea>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-green-800 dark:text-green-200">
                Location
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g., Matale, Gampaha"
                required
                className="w-full px-4 py-3 rounded-lg border border-green-200 dark:border-green-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-green-800 dark:text-green-200">
                Upload Crop Image
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                (Optional, but helps with diagnosis. Max 5MB)
              </p>

              {form.image ? (
                <div className="relative mt-2">
                  <img
                    src={form.image}
                    alt="Plant preview"
                    className="w-full max-w-xs rounded-lg border-2 border-green-200 dark:border-green-700"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    aria-label="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => fileRef.current.click()}
                    className="flex items-center gap-2 bg-green-100 hover:bg-green-200 dark:bg-green-800/30 dark:hover:bg-green-800/50 text-green-700 dark:text-green-200 px-4 py-3 rounded-lg font-medium transition-all w-full sm:w-auto justify-center"
                  >
                    <ImagePlus className="w-5 h-5" />
                    Choose Image
                  </button>
                  <input
                    type="file"
                    ref={fileRef}
                    onChange={handleImage}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              )}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-between items-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 shadow-md hover:shadow-green-700/30 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Case
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Back Button under the box */}
        <div className="flex justify-center mt-6">
          <Button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-green-100 hover:bg-green-200 dark:bg-green-800/30 dark:hover:bg-green-800/50 text-green-700 dark:text-green-200 px-5 py-2 rounded-full font-medium shadow transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Previous Page
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6"
        >
          <p>
            Our experts typically respond within 2-4 hours during business days
          </p>
          <p className="mt-1">
            For urgent cases, please call our hotline: 0112 345 678
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default CreateCase;
