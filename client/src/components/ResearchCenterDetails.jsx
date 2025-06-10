import React, { useState } from "react";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Dummy research center details
const dummyResearchCenter = {
  name: "Peradeniya Research Center",
  location: "Peradeniya",
  email: "peradeniya.research@email.com",
  contactNo: "0811234567",
};

function ResearchCenterDetails() {
  const [editOpen, setEditOpen] = useState(false);
  const [researchCenter, setResearchCenter] = useState(dummyResearchCenter);
  const [editForm, setEditForm] = useState({
    email: dummyResearchCenter.email,
    contactNo: dummyResearchCenter.contactNo,
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setResearchCenter((prev) => ({
      ...prev,
      email: editForm.email,
      contactNo: editForm.contactNo,
    }));
    setEditOpen(false);
  };

  return (
    <div className="py-16 sm:py-20 px-4 bg-transparent transition-colors">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col justify-center items-center text-center gap-4 mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-900 dark:text-white">
              <span className="bg-gradient-to-r from-green-400 to-green-200 bg-clip-text text-transparent dark:from-green-300 dark:to-green-100">
                FarmSense
              </span>{" "}
              Research Center Details
            </h2>
            <p className="text-lg text-green-800 dark:text-green-100 max-w-2xl">
              View and manage your research center's contact information
            </p>
          </div>
        </motion.div>

        <motion.table
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full text-left table-auto"
        >
          <thead className="bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-100">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Contact No</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-green-200 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/20">
              <td className="px-4 py-3 font-medium text-green-900 dark:text-white">
                {researchCenter.name}
              </td>
              <td className="px-4 py-3 text-green-700 dark:text-green-300">
                {researchCenter.location}
              </td>
              <td className="px-4 py-3 text-green-700 dark:text-green-300">
                {researchCenter.email}
              </td>
              <td className="px-4 py-3 text-green-700 dark:text-green-300">
                {researchCenter.contactNo}
              </td>
              <td className="px-4 py-3">
                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-1 border-green-600 text-green-700 dark:text-green-300 dark:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/30"
                      onClick={() => setEditOpen(true)}
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-lg">
                    <DialogHeader>
                      <DialogTitle className="text-green-900 dark:text-green-100">
                        Edit Research Center Contact
                      </DialogTitle>
                      <DialogDescription className="text-green-700 dark:text-green-300">
                        You can only update the email and contact number.
                      </DialogDescription>
                    </DialogHeader>
                    <form
                      onSubmit={handleEditSubmit}
                      className="space-y-4 mt-4"
                    >
                      <div>
                        <label className="block text-sm font-medium mb-1 text-green-900 dark:text-green-200">
                          Email
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={editForm.email}
                          onChange={handleEditChange}
                          required
                          className="w-full px-4 py-2 rounded-md border border-green-300 dark:border-green-600 bg-white dark:bg-[#222b3a] text-green-900 dark:text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-green-900 dark:text-green-200">
                          Contact Number
                        </label>
                        <input
                          name="contactNo"
                          type="text"
                          value={editForm.contactNo}
                          onChange={handleEditChange}
                          required
                          className="w-full px-4 py-2 rounded-md border border-green-300 dark:border-green-600 bg-white dark:bg-[#222b3a] text-green-900 dark:text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                      </div>
                      <div className="flex justify-end gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setEditOpen(false)}
                          className="border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/30"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </td>
            </tr>
          </tbody>
        </motion.table>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center text-green-700 dark:text-green-100/70 text-sm mt-10"
        >
          Research center details are managed by regional administrators
        </motion.p>
      </div>
    </div>
  );
}

export default ResearchCenterDetails;
