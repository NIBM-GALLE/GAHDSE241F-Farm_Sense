import { create } from "zustand";
import { axiosInstance } from "@/lib/axio";
import toast from "react-hot-toast";

export const useSubCenter = create((set, get) => ({
  admins: [],
  cases: [],
  case: null,
  visitAgents: [],
  researchCenters: [],
  centerData: null,

  loading: {
    createAdmin: false,
    fetchAdmins: false,
    fetchCases: false,
    fetchCase: false,
    fetchVisitAgents: false,
    createVisitAgent: false,
    fetchResearchCenters: false,
    updatingSubCenterDetails: false,
    assignVisitAgentToPlantCase: false,
    assignResearchCenterToPlantCase: false,
    deleteVisitAgent: false,
    updatePlantCaseStatus: false,
    fetchCenterData: false,
  },

  getAdmins: async () => {
    try {
      set({
        loading: {
          ...get().loading,
          fetchAdmins: true,
        },
      });

      const response = await axiosInstance.get("sub-center-admin/get-admins");
      set({
        admins: response.data.admins,
        loading: {
          ...get().loading,
          fetchAdmins: false,
        },
      });
    } catch (error) {
      set({
        loading: {
          ...get().loading,
          fetchAdmins: false,
        },
      });
      console.error("Error fetching admins:", error);
    }
  },

  createAdmin: async (name, email) => {
    try {
      set({
        loading: {
          ...get().loading,
          createAdmin: true,
        },
      });
      const response = await axiosInstance.post(
        "sub-center-admin/create-admins",
        {
          name,
          email,
        }
      );

      set({
        loading: {
          ...get().loading,
          createAdmin: false,
        },
      });
      set((state) => ({
        admins: [...state.admins, response.data.admin],
      }));
      toast.success("Admin created successfully!");
    } catch (error) {
      set({
        loading: {
          ...get().loading,
          createAdmin: false,
        },
      });
      console.error("Error creating admin:", error);
    }
  },

  fetchCases: async () => {
    try {
      set({
        loading: {
          ...get().loading,
          fetchCases: true,
        },
      });
      const response = await axiosInstance.get(
        "sub-center-admin/get-all-plant-cases"
      );
      set({
        cases: response.data.plantCases,
        loading: {
          ...get().loading,
          fetchCases: false,
        },
      });
      console.log("Fetched cases:", response.data.plantCases);
    } catch (error) {
      set({
        loading: {
          ...get().loading,
          fetchCases: false,
        },
      });
      console.error("Error fetching cases:", error);
    }
  },

  fetchCase: async (id) => {
    try {
      set({
        loading: {
          ...get().loading,
          fetchCase: true,
        },
      });

      const response = await axiosInstance.get(
        `sub-center-admin/get-plant-case/${id}`
      );

      set({
        case: response.data.plantCase,
        loading: {
          ...get().loading,
          fetchCase: false,
        },
      });
    } catch (error) {
      set({
        loading: {
          ...get().loading,
          fetchCase: false,
        },
      });
      console.error("Error fetching case:", error);
    }
  },

  fetchVisitAgents: async () => {
    try {
      set({
        loading: {
          ...get().loading,
          fetchVisitAgents: true,
        },
      });

      const response = await axiosInstance.get(
        "sub-center-admin/get-all-visit-agents"
      );

      set({
        visitAgents: response.data.visitAgents,
        loading: {
          ...get().loading,
          fetchVisitAgents: false,
        },
      });
    } catch (error) {
      set({
        loading: {
          ...get().loading,
          fetchVisitAgents: false,
        },
      });
      console.error("Error fetching visit agents:", error);
    }
  },

  createVisitAgent: async (name, email, contactNumber) => {
    try {
      set({
        loading: {
          ...get().loading,
          createVisitAgent: true,
        },
      });

      const response = await axiosInstance.post(
        "sub-center-admin/create-visit-agent",
        {
          name,
          email,
          contactNumber,
        }
      );

      set({
        loading: {
          ...get().loading,
          createVisitAgent: false,
        },
      });
      set((state) => ({
        visitAgents: [...state.visitAgents, response.data.visitAgent],
      }));

      toast.success("Visit Agent created successfully!");
    } catch (error) {
      set({
        loading: {
          ...get().loading,
          createVisitAgent: false,
        },
      });
      console.error("Error creating visit agent:", error);
      toast.error("Failed to create Visit Agent. Please try again.");
    }
  },

  fetchResearchCenters: async () => {
    try {
      set({
        loading: {
          ...get().loading,
          fetchResearchCenters: true,
        },
      });

      const response = await axiosInstance.get(
        "sub-center-admin/get-all-research-centers"
      );

      set({
        researchCenters: response.data.researchCenters,
        loading: {
          ...get().loading,
          fetchResearchCenters: false,
        },
      });
    } catch (error) {
      set({
        loading: {
          ...get().loading,
          fetchResearchCenters: false,
        },
      });
      console.error("Error fetching research centers:", error);
    }
  },

  updateSubCenterDetails: async (email, contactNumber) => {
    try {
      set({
        loading: {
          ...get().loading,
          updatingSubCenterDetails: true,
        },
      });

      const response = await axiosInstance.patch(
        "sub-center-admin/update-sub-center-details",
        {
          email,
          contactNumber,
        }
      );

      set({
        loading: {
          ...get().loading,
          updatingSubCenterDetails: false,
        },
      });
      toast.success("Sub center details updated successfully!");
    } catch (error) {
      set({
        loading: {
          ...get().loading,
          updatingSubCenterDetails: false,
        },
      });
      console.error("Error updating sub center details:", error);
      toast.error(
        error.response?.data?.message || "Failed to update sub center details"
      );
    }
  },

  assignVisitAgentToPlantCase: async (caseId, visitAgentId) => {
    try {
      set({
        loading: {
          ...get().loading,
          assignVisitAgentToPlantCase: true,
        },
      });

      const response = await axiosInstance.patch(
        `sub-center-admin/assign-visit-agent/${caseId}`,
        { visitAgentId }
      );

      set({
        loading: {
          ...get().loading,
          assignVisitAgentToPlantCase: false,
        },
      });

      set((state) => ({
        cases: state.cases.map((plantCase) =>
          plantCase._id === caseId
            ? { ...plantCase, plantCase: response.data.plantCase }
            : plantCase
        ),
      }));
      toast.success("Visit Agent assigned to Plant Case successfully!");
    } catch (error) {
      set({
        loading: {
          ...get().loading,
          assignVisitAgentToPlantCase: false,
        },
      });
      console.error("Error assigning visit agent to plant case:", error);
    }
  },

  assignResearchCenterToPlantCase: async (caseId, researchCenterId) => {
    try {
      set({
        loading: {
          ...get().loading,
          assignResearchCenterToPlantCase: true,
        },
      });

      const response = await axiosInstance.patch(
        `sub-center-admin/assign-research-center/${caseId}`,
        { researchCenterId }
      );

      set({
        loading: {
          ...get().loading,
          assignResearchCenterToPlantCase: false,
        },
      });

      set((state) => ({
        cases: state.cases.map((plantCase) =>
          plantCase._id === caseId
            ? { ...plantCase, plantCase: response.data.plantCase }
            : plantCase
        ),
      }));
      toast.success("Research Center assigned to Plant Case successfully!");
    } catch (error) {
      set({
        loading: {
          ...get().loading,
          assignResearchCenterToPlantCase: false,
        },
      });
      console.error("Error assigning research center to plant case:", error);
    }
  },

  deleteVisitAgent: async (id) => {
    try {
      set({
        loading: {
          ...get().loading,
          deleteVisitAgent: true,
        },
      });
      await axiosInstance.delete(`sub-center-admin/delete-visit-agent/${id}`);

      set((state) => ({
        visitAgents: state.visitAgents.filter((agent) => agent._id !== id),
        loading: {
          ...get().loading,
          deleteVisitAgent: false,
        },
      }));
      toast.success("Visit Agent deleted successfully!");
    } catch (error) {
      set({
        loading: {
          ...get().loading,
          deleteVisitAgent: false,
        },
      });
      console.error("Error deleting visit agent:", error);
      toast.error("Failed to delete Visit Agent. Please try again.");
    }
  },

  updatePlantCaseStatus: async (caseId, status) => {
    try {
      set({
        loading: {
          ...get().loading,
          updatePlantCaseStatus: true,
        },
      });

      const response = await axiosInstance.patch(
        `sub-center-admin/update-plant-case/${caseId}`,
        { status }
      );
      set({
        loading: {
          ...get().loading,
          updatePlantCaseStatus: false,
        },
      });
      set((state) => ({
        cases: state.cases.map((plantCase) =>
          plantCase._id === caseId
            ? { ...plantCase, ...response.data.plantCase }
            : plantCase
        ),
      }));
      toast.success("Plant case status updated successfully!");
    } catch (error) {
      set({
        loading: {
          ...get().loading,
          updatePlantCaseStatus: false,
        },
      });
      console.error("Error updating plant case status:", error);
      toast.error(
        error.response?.data?.message || "Failed to update plant case status"
      );
    }
  },

  fetchCenterData: async () => {
    try {
      set({
        loading: {
          ...get().loading,
          fetchCenterData: true,
        },
      });

      const response = await axiosInstance.get(
        "sub-center-admin/get-sub-center-details"
      );

      set({
        centerData: response.data.subCenter,
        loading: {
          ...get().loading,
          fetchCenterData: false,
        },
      });
    } catch (error) {
      set({
        loading: {
          ...get().loading,
          fetchCenterData: false,
        },
      });
      console.error("Error fetching sub center data:", error);
    }
  },
}));
