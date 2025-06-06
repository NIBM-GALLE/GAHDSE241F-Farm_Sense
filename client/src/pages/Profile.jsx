import React from "react";
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
import { Leaf } from "lucide-react";

function Profile() {
  const formSchema = z.object({
    name: z.string().min(5, {
      message: "Name must be at least 5 characters",
    }),
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    address: z.string().min(20, {
      message: "Address must be at least 20 characters",
    }),
    phone: z.string().min(10, {
      message: "Phone number must be at least 10 characters",
    }),
    plants: z.string().min(5, {
      message: "Plant name must be at least 5 characters",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      plants: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
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
                src={userPng}
                alt="Profile"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-green-100 dark:border-green-800 group-hover:border-green-300 transition-colors"
              />
              <label
                htmlFor="profileImage"
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
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold text-green-900 dark:text-white">
                Marcus
              </h3>
              <p className="text-green-600 dark:text-green-400">
                FarmSense User
              </p>
              <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                Update your profile details below
              </p>
            </div>
          </div>

          {/* Form Section */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        />
                      </FormControl>
                      <FormMessage className="dark:text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-green-800 dark:text-green-200">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          className="dark:bg-[#1f2937] dark:border-green-800 focus-visible:ring-green-500"
                        />
                      </FormControl>
                      <FormMessage className="dark:text-red-400" />
                    </FormItem>
                  )}
                />

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
                        />
                      </FormControl>
                      <FormMessage className="dark:text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Plants Field */}
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
                        />
                      </FormControl>
                      <FormMessage className="dark:text-red-400" />
                      <FormDescription className="text-green-700 dark:text-green-300">
                        Separate plant names with commas
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>

              {/* Address Field (full width) */}
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
                      />
                    </FormControl>
                    <FormMessage className="dark:text-red-400" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800 transition-colors"
                >
                  Update Profile
                </Button>
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
