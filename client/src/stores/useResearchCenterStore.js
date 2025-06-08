import { create } from "zustand";
import { axiosInstance } from "@/lib/axio";
import toast from "react-hot-toast";

export const useResearchCenterStore = create((set, get) => ({
  researchAdmins: [],
  researchLoading: {
    fetchResearchAdmins: false,
    createResearchAdmin: false,
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
}));
