import { create } from "zustand";
import { axiosInstance } from "@/lib/axio";

export const useFarmerStore = create((set, get) => ({
  plantCases: [],
  plantCase: null,
  loading: {
    fetchingCasesLoading: false,
    fetchingCaseByIdLoading: false,
    creatingCaseLoading: false,
    updatingCaseLoading: false,
    deletingCaseLoading: false,
  },
  pagination: {},

  createPlantCase: async () => {
    try {
    } catch (error) {}
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
