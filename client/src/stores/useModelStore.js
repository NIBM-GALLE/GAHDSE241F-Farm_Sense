import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";
export const useModelStore = create((set, get) => ({
  cause: null,
  cure: null,
  loading: false,

  getPrediction: async (image) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        image: image,
      });

      if (response.success) {
        set({
          cause: response.data.cause,
          cure: response.data.cure,
          loading: false,
        });
        toast.success("Prediction received successfully");
      }
    } catch (error) {
      set({ loading: false });
      console.error("Error getting prediction:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to get prediction, please try again."
      );
    }
  },
}));
