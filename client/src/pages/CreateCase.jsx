import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Leaf, ImagePlus, Send, X, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useFarmerStore } from "../stores/useFarmerStore";

function CreateCase() {
  const { createPlantCase, getAllSubCenters, loading, subCenters } =
    useFarmerStore();
  const [form, setForm] = useState({
    plantName: "",
    symptoms: "",
    subCenterId: "",
    images: [],
  });
  const fileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllSubCenters();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    // Check if adding these files would exceed 5 images
    if (form.images.length + files.length > 5) {
      alert("You can upload a maximum of 5 images.");
      return;
    }

    const validFiles = files.filter((file) => {
      // Check file size
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} is too large (max 5MB)`);
        return false;
      }

      // Check file type
      if (!file.type.match("image.*")) {
        alert(`File ${file.name} is not an image file`);
        return false;
      }

      return true;
    });

    if (validFiles.length === 0) return;

    const readers = validFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((newImages) => {
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
    });
  };

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createPlantCase(
      form.plantName,
      form.symptoms,
      form.images,
      form.subCenterId
    );

    setForm({ plantName: "", symptoms: "", subCenterId: "", images: [] });
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
                Sub-Center
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="subCenterId"
                value={form.subCenterId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-green-200 dark:border-green-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
              >
                <option value="">Select a sub-center</option>
                {subCenters.map((center) => (
                  <option key={center._id} value={center._id}>
                    {center.location}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-green-800 dark:text-green-200">
                Upload Crop Images
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                (Optional, but helps with diagnosis. Max 5 images, 5MB each)
              </p>

              {form.images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                  {form.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Plant preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border-2 border-green-200 dark:border-green-700"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        aria-label="Remove image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {form.images.length < 5 && (
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => fileRef.current.click()}
                    disabled={form.images.length >= 5}
                    className="flex items-center gap-2 bg-green-100 hover:bg-green-200 dark:bg-green-800/30 dark:hover:bg-green-800/50 text-green-700 dark:text-green-200 px-4 py-3 rounded-lg font-medium transition-all w-full sm:w-auto justify-center"
                  >
                    <ImagePlus className="w-5 h-5" />
                    {form.images.length === 0
                      ? "Choose Images"
                      : "Add More Images"}
                  </button>
                  <input
                    type="file"
                    ref={fileRef}
                    onChange={handleImages}
                    accept="image/*"
                    className="hidden"
                    multiple
                  />
                </div>
              )}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-between items-center">
              <Button
                type="submit"
                disabled={loading.creatingCaseLoading}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 shadow-md hover:shadow-green-700/30 transition-all"
              >
                {loading.creatingCaseLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                    Submitting...
                  </span>
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
