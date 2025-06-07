import { create } from "zustand";
import { axiosInstance } from "@/lib/axio";
import toast from "react-hot-toast";

export const useFarmerStore = create((set, get) => ({
  plantCases: [],
  plantCase: null,
  subCenters: [],
  loading: {
    fetchingCasesLoading: false,
    fetchingCaseByIdLoading: false,
    creatingCaseLoading: false,
    updatingCaseLoading: false,
    deletingCaseLoading: false,
    fetchingSubCentersLoading: false,
  },
  pagination: {},

  createPlantCase: async (
    plantName,
    plantIssue,
    images,
    assignedSubCenterId
  ) => {
    try {
      set({ loading: { creatingCaseLoading: true } });
      const response = await axiosInstance.post("/farmer/case", {
        plantName,
        plantIssue,
        images,
        assignedSubCenterId,
      });

      set({ loading: { creatingCaseLoading: false } });
      set((state) => ({
        plantCases: [...state.plantCases, response.data.case],
      }));

      toast.success("Plant case created successfully");
    } catch (error) {
      set({ loading: { creatingCaseLoading: false } });
      console.error("Error creating plant case:", error);
      toast.error(
        error.response?.data?.message || "Failed to create plant case"
      );
    }
  },

  getAllSubCenters: async () => {
    try {
      set({ loading: { fetchingSubCentersLoading: true } });
      const response = await axiosInstance.get("/farmer/sub-centers");
      set({ loading: { fetchingSubCentersLoading: false } });
      set({ subCenters: response.data.subCenters });
    } catch (error) {
      set({ loading: { fetchingSubCentersLoading: false } });
      console.error("Error fetching sub-centers:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch sub-centers"
      );
    }
  },

  getAllPlantCases: async () => {
    try {
    } catch (error) {}
  },

  getPlantCaseById: async () => {
    try {
    } catch (error) {}
  },

  createReport: async () => {
    try {
    } catch (error) {}
  },
}));
