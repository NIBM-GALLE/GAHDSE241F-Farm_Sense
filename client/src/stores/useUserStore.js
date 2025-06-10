import { create } from "zustand";
import { axiosInstance } from "@/lib/axio";
import toast from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: {
    loginLoading: false,
    registerLoading: false,
    checkingAuthLoading: false,
    verifyEmailLoading: false,
    updatingProfileFarmerLoading: false,
    updatingProfileLoading: false,
    logoutLoading: false,
    forgetPasswordLoading: false,
    resetPasswordLoading: false,
  },

  signup: async (email, password, navigate) => {
    try {
      set({ loading: { ...get().loading, registerLoading: true } });
      const response = await axiosInstance.post("/auth/signup", {
        email,
        password,
      });

      set({
        user: response.data.user,
        loading: { ...get().loading, registerLoading: false },
      });
      toast.success(
        response.data.message || "Signup successful!, please verify your email"
      );
      setTimeout(() => {
        navigate("/verify-email");
      }, 1000);
    } catch (error) {
      console.error("Error during signup:", error);
      set({
        loading: { ...get().loading, registerLoading: false },
      });
      toast.error(
        error.response?.data?.message || "Signup failed, please try again"
      );
    }
  },

  verifyEmail: async (code, navigate) => {
    try {
      set({ loading: { ...get().loading, verifyEmailLoading: true } });
      const response = await axiosInstance.post("/auth/verify-email", {
        code,
      });

      set({
        user: response.data.user,
        loading: { ...get().loading, verifyEmailLoading: false },
      });
      toast.success(response.data.message || "Email verified successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error during email verification:", error);
      set({
        loading: { ...get().loading, verifyEmailLoading: false },
      });
      toast.error(
        error.response?.data?.message ||
          "Email verification failed, please try again"
      );
    }
  },

  login: async (email, password, navigate) => {
    try {
      set({ loading: { ...get().loading, loginLoading: true } });
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      set({
        user: response.data.user,
        loading: { ...get().loading, loginLoading: false },
      });
      toast.success(response.data.message || "Login successful!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error during login:", error);
      set({
        loading: { ...get().loading, loginLoading: false },
      });
      toast.error(
        error.response?.data?.message || "Login failed, please try again"
      );
    }
  },

  checkingAuth: async () => {
    try {
      set({ loading: { ...get().loading, checkingAuthLoading: true } });
      const response = await axiosInstance.get("/auth/profile");
      set({
        user: response.data.user,
        loading: { ...get().loading, checkingAuthLoading: false },
      });
      console.log("Auth Check is successfully", response.data.user);
    } catch (error) {
      console.error("Error during checking auth:", error);
      set({
        loading: { ...get().loading, checkingAuthLoading: false },
      });
    }
  },

  updateProfile: async (name, contactNumber, image) => {
    try {
      set({ loading: { ...get().loading, updatingProfileLoading: true } });
      const response = await axiosInstance.patch("/auth/update-profile", {
        name,
        contactNumber,
        image,
      });
      set({
        loading: { ...get().loading, updatingProfileLoading: false },
        user: response.data.user,
      });
      toast.success(response.data.message || "Profile updated successfully!");
    } catch (error) {
      console.error("Error during profile update:", error);
      set({
        loading: { ...get().loading, updatingProfileLoading: false },
      });
      toast.error(
        error.response?.data?.message ||
          "Profile update failed, please try again"
      );
    }
  },

  updateProfileFarmer: async (name, address, phone, plants, image) => {
    try {
      set({
        loading: { ...get().loading, updatingProfileFarmerLoading: true },
      });

      const response = await axiosInstance.patch("/farmer/update-profile", {
        name,
        address,
        phone,
        plants,
        image,
      });
      set({
        loading: { ...get().loading, updatingProfileFarmerLoading: false },
        user: response.data.farmer,
      });
      toast.success(
        response.data.message || "Farmer profile updated successfully!"
      );
    } catch (error) {
      console.error("Error during farmer profile update:", error);
      set({
        loading: { ...get().loading, updatingProfileFarmerLoading: false },
      });
      toast.error(
        error.response?.data?.message ||
          "User profile update failed, please try again"
      );
    }
  },

  logout: async (navigate) => {
    try {
      set({ loading: { ...get().loading, logoutLoading: true } });
      const response = await axiosInstance.post("/auth/logout");
      set({
        user: null,
        loading: { ...get().loading, logoutLoading: false },
      });
      toast.success(response.data.message || "Logout successful!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Error during logout:", error);
      set({
        loading: { ...get().loading, logoutLoading: false },
      });
      toast.error(
        error.response?.data?.message || "Logout failed, please try again"
      );
    }
  },

  forgetPassword: async (email) => {
    try {
      set({ loading: { ...get().loading, forgetPasswordLoading: true } });
      const response = await axiosInstance.post("/auth/forget-password", {
        email,
      });

      set({
        loading: { ...get().loading, forgetPasswordLoading: false },
      });
      toast.success(
        response.data.message || "Check your email for reset link!"
      );
    } catch (error) {
      set({
        loading: { ...get().loading, forgetPasswordLoading: false },
      });
      console.error("Error during forget password:", error);
      toast.error(
        error.response?.data?.message ||
          "Forget password failed, please try again"
      );
    }
  },

  resetPassword: async (password, token, navigate) => {
    try {
      set({ loading: { ...get().loading, resetPasswordLoading: true } });
      const response = await axiosInstance.post(
        `/auth/reset-password/${token}`,
        {
          password,
        }
      );

      set({
        loading: { ...get().loading, resetPasswordLoading: false },
      });
      toast.success(response.data.message || "Password reset successfully!");
    } catch (error) {
      console.error("Error during reset password:", error);
      set({
        loading: { ...get().loading, resetPasswordLoading: false },
      });
      toast.error(
        error.response?.data?.message ||
          "Reset password failed, please try again"
      );
    }
  },
}));
