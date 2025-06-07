import React, { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import userPng from "../assets/images/user.png";
import { motion } from "framer-motion";
import { useUserStore } from "@/stores/useUserStore";
import { toast } from "react-hot-toast";

function Profile() {
  const { user, updateProfile, updateProfileFarmer } = useUserStore();
  const [imagePreview, setImagePreview] = useState(user?.image || userPng);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // Updated schema to handle optional fields properly
  const formSchema = z.object({
    name: z.string().min(5, {
      message: "Name must be at least 5 characters",
    }),
    phone: z.string().min(10, {
      message: "Phone number must be at least 10 characters",
    }),
    // Make address and plants truly optional for non-farmer users
    address:
      user?.role === "user"
        ? z.string().min(20, {
            message: "Address must be at least 20 characters",
          })
        : z.string().optional(),
    plants:
      user?.role === "user"
        ? z.string().min(5, {
            message: "Plant name must be at least 5 characters",
          })
        : z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || user?.contactNumber || "",
      address: user?.address || "",
      plants: user?.plants?.join(", ") || "",
    },
    mode: "onChange", // This helps with real-time validation
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setIsImageChanged(true);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data) => {
    console.log("Form submission started", data);
    console.log("Form errors:", form.formState.errors);

    setIsSubmitting(true);

    try {
      console.log("Submitting profile update", data);

      if (user?.role === "user") {
        await updateProfileFarmer(
          data.name,
          data.address,
          data.phone,
          data.plants
            ? data.plants.split(",").map((plant) => plant.trim())
            : [],
          isImageChanged ? imagePreview : undefined
        );
      } else {
        await updateProfile(
          data.name,
          data.phone,
          isImageChanged ? imagePreview : undefined
        );
      }

      setIsImageChanged(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add this function to help debug form state
  const handleFormSubmit = (e) => {
    console.log("Form submit event triggered");
    console.log("Form is valid:", form.formState.isValid);
    console.log("Form errors:", form.formState.errors);
    console.log("Form values:", form.getValues());

    // Let react-hook-form handle the rest
    form.handleSubmit(onSubmit)(e);
  };

  return (
    <div className="min-h-screen py-16 sm:py-20 px-4 bg-balck transition-colors">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 dark:text-white">
            <span className="bg-gradient-to-r from-green-400 to-green-200 bg-clip-text text-transparent dark:from-green-300 dark:to-green-100">
              FarmSense
            </span>{" "}
            Profile
          </h2>
          <p className="text-lg text-green-800 dark:text-green-100 max-w-2xl mx-auto mt-2">
            Manage your personal information and preferences
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-[#1f2937] rounded-xl shadow border border-green-200 dark:border-green-700 p-6 sm:p-8"
        >
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <div className="relative group">
              <img
                src={imagePreview}
                alt="Profile"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-green-100 dark:border-green-800 group-hover:border-green-300 transition-colors"
              />
              {isEditing && (
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="absolute bottom-0 right-0 bg-green-600 hover:bg-green-700 text-white p-2 rounded-full cursor-pointer transition-colors shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                    />
                  </svg>
                  <input
                    type="file"
                    id="profileImage"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </button>
              )}
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold text-green-900 dark:text-white">
                {user?.name || "No Name Provided"}
              </h3>
              <p className="text-green-600 dark:text-green-400">
                {user?.email}
              </p>
              <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                {isEditing
                  ? "Edit your profile details below"
                  : "View your profile details"}
              </p>
            </div>
          </div>

          {/* Form Section */}
          <Form {...form}>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-green-800 dark:text-green-200">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          {...field}
                          className="dark:bg-[#1f2937] dark:border-green-800 focus-visible:ring-green-500"
                          disabled={!isEditing}
                        />
                      </FormControl>
                      <FormMessage className="dark:text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Email Field (Read-only) */}
                <FormItem>
                  <FormLabel className="text-green-800 dark:text-green-200">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      value={user?.email || ""}
                      className="dark:bg-[#1f2937] dark:border-green-800 focus-visible:ring-green-500"
                      disabled
                    />
                  </FormControl>
                </FormItem>

                {/* Phone Field */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-green-800 dark:text-green-200">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number"
                          {...field}
                          className="dark:bg-[#1f2937] dark:border-green-800 focus-visible:ring-green-500"
                          disabled={!isEditing}
                        />
                      </FormControl>
                      <FormMessage className="dark:text-red-400" />
                    </FormItem>
                  )}
                />

                {user && user.role === "user" && (
                  <>
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-green-800 dark:text-green-200">
                            Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full address"
                              {...field}
                              className="dark:bg-[#1f2937] dark:border-green-800 focus-visible:ring-green-500"
                              disabled={!isEditing}
                            />
                          </FormControl>
                          <FormMessage className="dark:text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="plants"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-green-800 dark:text-green-200">
                            Your Plants
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Tomato, Chili, Banana"
                              {...field}
                              className="dark:bg-[#1f2937] dark:border-green-800 focus-visible:ring-green-500"
                              disabled={!isEditing}
                            />
                          </FormControl>
                          <FormMessage className="dark:text-red-400" />
                          <FormDescription className="text-green-700 dark:text-green-300">
                            Separate plant names with commas
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex gap-4">
                {!isEditing ? (
                  <Button
                    type="button"
                    variant="default"
                    size="lg"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800 transition-colors"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="flex-1"
                      onClick={() => {
                        setIsEditing(false);
                        form.reset();
                        setImagePreview(user?.image || userPng);
                        setIsImageChanged(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="default"
                      size="lg"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800 transition-colors"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                  </>
                )}
              </div>
            </form>
          </Form>
        </motion.div>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center text-green-700 dark:text-green-100/70 text-sm mt-10"
        >
          Your information is securely stored and only used to improve your
          FarmSense experience
        </motion.p>
      </div>
    </div>
  );
}

export default Profile;
