import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";

export const useModelStore = create((set, get) => ({
  prediction: null,
  loading: false,
  error: null,

  getPrediction: async (imageData) => {
    set({ loading: true, error: null });

    try {
      // Create FormData to send the image
      const formData = new FormData();
      // Convert data URL to blob if needed
      const blob = await fetch(imageData).then((r) => r.blob());
      formData.append("image", blob, "uploaded-image.jpg");

      const response = await axios.post(
        "http://localhost:5000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        set({
          prediction: response.data.prediction,
          loading: false,
        });
        toast.success("Diagnosis complete!");
        return response.data.prediction;
      } else {
        throw new Error(response.data.error || "Prediction failed");
      }
    } catch (error) {
      console.error("Prediction error:", error);
      set({
        error: error.response?.data?.error || error.message,
        loading: false,
      });
      toast.error(
        error.response?.data?.error || "Diagnosis failed. Please try again."
      );
      throw error;
    }
  },

  clearPrediction: () => set({ prediction: null, error: null }),
}));
