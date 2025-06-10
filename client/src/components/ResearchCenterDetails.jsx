import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import { toast } from "react-hot-toast";

// Dummy research center details
const dummyResearchCenter = {
  name: "Peradeniya Research Division",
  location: "Peradeniya",
  email: "peradeniya.research@email.com",
  contactNo: "0811234567",
};

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  contactNo: z
    .string()
    .min(9, { message: "Contact number must be at least 9 digits" }),
});

function ResearchCenterDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [researchCenter, setResearchCenter] = useState(dummyResearchCenter);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: researchCenter.email,
      contactNo: researchCenter.contactNo,
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      setResearchCenter((prev) => ({
        ...prev,
        email: data.email,
        contactNo: data.contactNo,
      }));
      setIsEditing(false);
      toast.success("Research center details updated!");
    } catch (error) {
      toast.error("Failed to update details");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 sm:py-20 px-4 bg-transparent transition-colors">
      <div className="max-w-2xl mx-auto">
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
            Research Division Details
          </h2>
          <p className="text-lg text-green-800 dark:text-green-100 max-w-2xl mx-auto mt-2">
            View and manage your research division's contact information
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-[#1f2937] rounded-xl shadow border border-green-200 dark:border-green-700 p-6 sm:p-8"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Research Division Name (read-only) */}
                <FormItem>
                  <FormLabel className="text-green-800 dark:text-green-200">
                    Research Division Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      value={researchCenter.name}
                      disabled
                      className="dark:bg-[#1f2937] dark:border-green-800 focus-visible:ring-green-500"
                    />
                  </FormControl>
                </FormItem>

                {/* Location (read-only) */}
                <FormItem>
                  <FormLabel className="text-green-800 dark:text-green-200">
                    Location
                  </FormLabel>
                  <FormControl>
                    <Input
                      value={researchCenter.location}
                      disabled
                      className="dark:bg-[#1f2937] dark:border-green-800 focus-visible:ring-green-500"
                    />
                  </FormControl>
                </FormItem>

                {/* Email (editable) */}
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
                          placeholder="Enter email"
                          {...field}
                          disabled={!isEditing}
                          className="dark:bg-[#1f2937] dark:border-green-800 focus-visible:ring-green-500"
                        />
                      </FormControl>
                      <FormMessage className="dark:text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Contact Number (editable) */}
                <FormField
                  control={form.control}
                  name="contactNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-green-800 dark:text-green-200">
                        Contact Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter contact number"
                          {...field}
                          disabled={!isEditing}
                          className="dark:bg-[#1f2937] dark:border-green-800 focus-visible:ring-green-500"
                        />
                      </FormControl>
                      <FormMessage className="dark:text-red-400" />
                    </FormItem>
                  )}
                />
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
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit Details
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
                        form.reset({
                          email: researchCenter.email,
                          contactNo: researchCenter.contactNo,
                        });
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
          Research division details are managed by regional administrators
        </motion.p>
      </div>
    </div>
  );
}

export default ResearchCenterDetails;
