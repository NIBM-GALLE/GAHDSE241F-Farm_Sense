import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSubCenter } from "../stores/useSubCenter";

function VisitAgentsTab() {
  const {
    loading,
    deleteVisitAgent,
    fetchVisitAgents,
    createVisitAgent,
    visitAgents,
  } = useSubCenter();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phoneNumber: "" });
  const [agentToDelete, setAgentToDelete] = useState(null);

  useEffect(() => {
    fetchVisitAgents();
  }, [fetchVisitAgents]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phoneNumber.trim())
      return;

    try {
      await createVisitAgent(form.name, form.email, form.phoneNumber);
      setForm({ name: "", email: "", phoneNumber: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Failed to create agent:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVisitAgent(id);
      setAgentToDelete(null);
    } catch (error) {
      console.error("Failed to delete agent:", error);
    }
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
              Visit Agents
            </h2>
            <p className="text-lg text-green-800 dark:text-green-100 max-w-2xl">
              Manage and assign sub-center visit agents across FarmSense
              locations
            </p>
          </div>
        </motion.div>

        {loading.fetchVisitAgents && visitAgents.length === 0 ? (
          <div className="text-center py-8 text-green-700 dark:text-green-300">
            Loading agents...
          </div>
        ) : (
          <motion.table
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full text-left table-auto"
          >
            <thead className="bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-100">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visitAgents.map((agent) => (
                <tr
                  key={agent._id}
                  className="border-b border-green-200 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                >
                  <td className="px-4 py-3 font-medium text-green-900 dark:text-white">
                    {agent.name}
                  </td>
                  <td className="px-4 py-3 text-green-700 dark:text-green-300">
                    {agent.email}
                  </td>
                  <td className="px-4 py-3 text-green-700 dark:text-green-300">
                    {agent.contactNumber || "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Dialog
                        open={agentToDelete === agent._id}
                        onOpenChange={(open) => !open && setAgentToDelete(null)}
                      >
                        <DialogTrigger asChild>
                          <button
                            onClick={() => setAgentToDelete(agent._id)}
                            title="Delete"
                            className="p-2 rounded-full bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/60 text-red-700 dark:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this agent? This
                              action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex justify-end gap-4 mt-4">
                            <Button
                              variant="outline"
                              onClick={() => setAgentToDelete(null)}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => handleDelete(agent._id)}
                              disabled={loading.deleteVisitAgent}
                            >
                              {loading.deleteVisitAgent
                                ? "Deleting..."
                                : "Delete Agent"}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </motion.table>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex justify-center mt-12"
        >
          <Button
            variant="outline"
            className="border-green-600 text-green-700 dark:text-green-300 dark:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/30 px-8 py-3 rounded-lg font-medium transition-colors"
            onClick={() => {
              setShowForm(!showForm);
              setForm({ name: "", email: "", phoneNumber: "" });
            }}
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            {showForm ? "Close Form" : "Add Visit Agent"}
          </Button>
        </motion.div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#1f2937] border border-green-200 dark:border-green-700 rounded-xl p-6 sm:p-8 mt-8 max-w-2xl mx-auto shadow-md"
          >
            <h3 className="text-xl font-bold mb-4 text-green-900 dark:text-green-100 text-center">
              Add Visit Agent
            </h3>
            <form onSubmit={handleAdd} className="space-y-4">
              {["name", "email", "phoneNumber"].map((field) => (
                <input
                  key={field}
                  name={field}
                  type={field === "email" ? "email" : "text"}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={
                    field.charAt(0).toUpperCase() +
                    field.slice(1).replace(/([A-Z])/g, " $1")
                  }
                  required
                  className="w-full px-4 py-2 rounded-md border border-green-300 dark:border-green-600 bg-white dark:bg-[#222b3a] text-green-900 dark:text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              ))}
              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition shadow hover:shadow-green-700/30"
                  disabled={loading.createVisitAgent}
                >
                  {loading.createVisitAgent ? "Adding..." : "Add Agent"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setForm({ name: "", email: "", phoneNumber: "" });
                  }}
                  className="border border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 px-6 py-2 rounded-lg font-medium transition hover:bg-green-50 dark:hover:bg-green-900/30"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center text-green-700 dark:text-green-100/70 text-sm mt-10"
        >
          Visit agent accounts are verified by their assigned sub-center
          administrator
        </motion.p>
      </div>
    </div>
  );
}

export default VisitAgentsTab;
