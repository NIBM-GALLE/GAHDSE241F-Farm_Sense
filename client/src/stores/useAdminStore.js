import { create } from "zustand";
import { axiosInstance } from "@/lib/axio";
import { toast } from "react-hot-toast";

export const useAdminStore = create((set, get) => ({
  subCenters: [],
  researchCenters: [],
  reports: [],

  loading: {
    subCenters: false,
    researchCenters: false,
    reports: false,
    createSubCenter: false,
    createResearchCenter: false,
    deleteSubCenter: false,
    deleteResearchCenter: false,
  },

  fetchSubCenters: async () => {
    try {
      set({ loading: { subCenters: true } });
      const response = await axiosInstance.get("/admin/get-all-sub-centers");
      set({
        subCenters: response.data.subCenters,
        loading: { subCenters: false },
      });
    } catch (error) {
      set({ loading: { subCenters: false } });
      console.error("Error fetching sub-centers:", error);
    }
  },

  fetchReserachCenters: async () => {
    try {
      set({ loading: { researchCenters: true } });
      const response = await axiosInstance.get(
        "/admin/get-all-research-centers"
      );
      set({
        researchCenters: response.data.researchCenters,
        loading: { researchCenters: false },
      });
    } catch (error) {
      set({ loading: { researchCenters: false } });
      console.error("Error fetching research centers:", error);
    }
  },

  createSubCenter: async (
    adminName,
    adminEmail,
    adminContact,
    centerName,
    centerLocation,
    centerEmail
  ) => {
    try {
      set({ loading: { createSubCenter: true } });
      const response = await axiosInstance.post("/admin/create-sub-center", {
        adminName,
        adminEmail,
        adminContact,
        centerName,
        centerLocation,
        centerEmail,
      });

      set({ loading: { createSubCenter: false } });
      set((state) => ({
        subCenters: [...state.subCenters, response.data.subCenter],
      }));

      toast.success("Sub-center created successfully!");
    } catch (error) {
      set({ loading: { createSubCenter: false } });
      console.error("Error creating sub-center:", error);
    }
  },

  createResearchCenter: async (
    adminName,
    adminEmail,
    adminContact,
    centerName,
    centerLocation,
    centerEmail
  ) => {
    try {
      set({ loading: { createResearchCenter: true } });
      const response = await axiosInstance.post(
        "/admin/create-research-center",
        {
          adminName,
          adminEmail,
          adminContact,
          centerName,
          centerLocation,
          centerEmail,
        }
      );

      set({ loading: { createResearchCenter: false } });
      set((state) => ({
        researchCenters: [
          ...state.researchCenters,
          response.data.researchCenter,
        ],
      }));

      toast.success("Research center created successfully!");
    } catch (error) {
      set({ loading: { createResearchCenter: false } });
      console.error("Error creating research center:", error);
    }
  },

  deleteSubCenter: async (id) => {
    try {
      set({ loading: { deleteSubCenter: true } });
      const response = await axiosInstance.delete(
        `/admin/delete-sub-center/${id}`
      );

      set({ loading: { deleteSubCenter: false } });
      set((state) => ({
        subCenters: state.subCenters.filter((center) => center._id !== id),
      }));

      toast.success("Sub-center deleted successfully!");
    } catch (error) {
      set({ loading: { deleteSubCenter: false } });
      console.error("Error deleting sub-center:", error);
    }
  },

  deleteResearchCenter: async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/admin/delete-research-center/${id}`
      );
      set({ loading: { deleteResearchCenter: false } });
      set((state) => ({
        researchCenters: state.researchCenters.filter(
          (center) => center._id !== id
        ),
      }));
      toast.success("Research center deleted successfully!");
    } catch (error) {
      set({ loading: { deleteResearchCenter: false } });
      console.error("Error deleting research center:", error);
    }
  },

  getAllReports: async () => {
    try {
      set({ loading: { reports: true } });
      const response = await axiosInstance.get("/admin/get-all-reports");
      set({
        reports: response.data.reports,
        loading: { reports: false },
      });
    } catch (error) {
      set({ loading: { reports: false } });
      console.error("Error fetching reports:", error);
    }
  },
}));
