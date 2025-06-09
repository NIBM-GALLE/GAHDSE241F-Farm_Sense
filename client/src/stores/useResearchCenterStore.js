import { create } from "zustand";
import { axiosInstance } from "@/lib/axio";
import toast from "react-hot-toast";

export const useResearchCenterStore = create((set, get) => ({
  researchAdmins: [],
  cases: [],
  researchLoading: {
    fetchResearchAdmins: false,
    createResearchAdmin: false,
    fetchCases: false,
    addAnswerToCase: false,
  },

  getResearchAdmins: async () => {
    try {
      set({
        researchLoading: {
          ...get().researchLoading,
          fetchResearchAdmins: true,
        },
      });
      const response = await axiosInstance.get("research-division/get-admins");
      set({
        researchAdmins: response.data.admins,
        researchLoading: {
          ...get().researchLoading,
          fetchResearchAdmins: false,
        },
      });
    } catch (error) {
      set({
        researchLoading: {
          ...get().researchLoading,
          fetchResearchAdmins: false,
        },
      });
      console.error("Error fetching research admins:", error);
    }
  },
  createResearchAdmin: async (name, email) => {
    try {
      set({
        researchLoading: {
          ...get().researchLoading,
          createResearchAdmin: true,
        },
      });
      const response = await axiosInstance.post(
        "research-division/create-admin",
        {
          name,
          email,
        }
      );

      set({
        researchLoading: {
          ...get().researchLoading,
          createResearchAdmin: false,
        },
      });
      set((state) => ({
        researchAdmins: [
          ...state.researchAdmins,
          response.data.researchDivisionAdmin,
        ],
      }));
      toast.success("Research admin created successfully!");
    } catch (error) {
      set({
        researchLoading: {
          ...get().researchLoading,
          createResearchAdmin: false,
        },
      });
      console.error("Error creating research admin:", error);
    }
  },

  fetchCases: async () => {
    try {
      set({
        researchLoading: {
          ...get().researchLoading,
          fetchCases: true,
        },
      });
      const response = await axiosInstance.get("research-division/plant-cases");
      set({
        cases: response.data.plantCases,
        researchLoading: {
          ...get().researchLoading,
          fetchCases: false,
        },
      });
    } catch (error) {
      set({
        researchLoading: {
          ...get().researchLoading,
          fetchCases: false,
        },
      });
      console.error("Error fetching research cases:", error);
    }
  },

  addAnswerToCase: async (caseId, answer) => {
    try {
      set({
        researchLoading: {
          ...get().researchLoading,
          addAnswerToCase: true,
        },
      });
      const response = await axiosInstance.patch(
        `research-division/plant-case/${caseId}`,
        { answer }
      );
      set((state) => ({
        cases: state.cases.map((plantCase) =>
          plantCase._id === caseId ? response.data.updatedPlantCase : plantCase
        ),
        researchLoading: {
          ...get().researchLoading,
          addAnswerToCase: false,
        },
      }));
      toast.success("Answer added to plant case successfully!");
    } catch (error) {
      set({
        researchLoading: {
          ...get().researchLoading,
          addAnswerToCase: false,
        },
      });
      console.error("Error adding answer to plant case:", error);
      toast.error("Failed to add answer to plant case.");
    }
  },
}));
