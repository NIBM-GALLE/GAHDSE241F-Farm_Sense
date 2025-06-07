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
  pagination: {
    totalCases: 0,
    totalPages: 0,
    currentPage: 1,
    hasNext: false,
    hasPrevious: false,
    nextPage: null,
    previousPage: null,
  },

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
      set({ loading: { fetchingCasesLoading: true } });
      const response = await axiosInstance.get("/farmer/cases");
      set({ loading: { fetchingCasesLoading: false } });
      set({
        plantCases: response.data.cases,
        pagination: response.data.pagination,
      });
      console.log(
        "Plant cases pagination successfully:",
        response.data.pagination
      );
      console.log(get().pagination, "save pagination");
    } catch (error) {
      set({ loading: { fetchingCasesLoading: false } });
      console.error("Error fetching plant cases:", error);
    }
  },

  getPlantCaseById: async (id) => {
    try {
      set({ loading: { fetchingCaseByIdLoading: true } });
      const response = await axiosInstance.get(`/farmer/case/${id}`);
      set({ loading: { fetchingCaseByIdLoading: false } });
      set({ plantCase: response.data.case });
    } catch (error) {
      set({ loading: { fetchingCaseByIdLoading: false } });
      console.error("Error fetching plant case by ID:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch plant case"
      );
    }
  },

  createReport: async () => {
    try {
    } catch (error) {}
  },
}));
