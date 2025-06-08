import { create } from "zustand";
import { axiosInstance } from "@/lib/axio";
import toast from "react-hot-toast";

export const useVisitAgentStore = create((set) => ({
  cases: [],
  loading: {
    fetchingCases: false,
    addingComment: false,
  },

  fetchAssignedPlantCases: async () => {
    set({ loading: { fetchingCases: true } });
    try {
      const response = await axiosInstance.get(
        "/visit-agent/assigned-plant-cases"
      );
      set({
        cases: response.data.assignedCases,
        loading: { fetchingCases: false },
      });
    } catch (error) {
      set({ loading: { fetchingCases: false } });
      console.error("Error fetching assigned plant cases:", error);
    }
  },

  addCommentToPlantCase: async (caseId, comment) => {
    try {
      set({ loading: { addingComment: true } });
      const response = await axiosInstance.patch(
        `/visit-agent/plant-case/${caseId}`,
        { comment }
      );
      set((state) => ({
        cases: state.cases.map((plantCase) =>
          plantCase._id === caseId
            ? { ...plantCase, ...response.data.updatedPlantCase }
            : plantCase
        ),
        loading: { ...state.loading, addingComment: false },
      }));
      toast.success("Comment added successfully");
    } catch (error) {
      set({ loading: { addingComment: false } });
      console.error("Error adding comment to plant case:", error);
      toast.error("Failed to add comment");
    }
  },
}));
