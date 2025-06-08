import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useAdminStore } from "../stores/useAdminStore";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function ResearchDivisionsTab() {
  const navigate = useNavigate();
  const {
    fetchReserachCenters,
    researchCenters,
    loading,
    createResearchCenter,
    deleteResearchCenter,
  } = useAdminStore();

  const [showForm, setShowForm] = useState(false);
  const [centerToDelete, setCenterToDelete] = useState(null);
  const [form, setForm] = useState({
    name: "",
    location: "",
    email: "",
    admin: "",
    adminEmail: "",
    adminPhone: "",
  });

  useEffect(() => {
    fetchReserachCenters();
  }, [fetchReserachCenters]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    await createResearchCenter(
      form.admin,
      form.adminEmail,
      form.adminPhone,
      form.name,
      form.location,
      form.email
    );

    setForm({
      name: "",
      location: "",
      email: "",
      admin: "",
      adminEmail: "",
      adminPhone: "",
    });
    setShowForm(false);

    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100);
  };

  const handleDelete = async (id) => {
    await deleteResearchCenter(id);
    setCenterToDelete(null);
  };

  if (loading.researchCenters) {
    return (
      <div className="py-10 px-4 bg-transparent transition-colors">
        <div className="max-w-6xl mx-auto text-center">
          <p>Loading research centers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 bg-transparent transition-colors">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col justify-center items-center text-center gap-4 mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-900 dark:text-white">
              <span className="bg-gradient-to-r from-green-400 to-green-200 bg-clip-text text-transparent dark:from-green-300 dark:to-green-100">
                FarmSense
              </span>{" "}
              Research Divisions
            </h2>
            <p className="text-lg text-green-800 dark:text-green-100 max-w-2xl">
              Explore the specialized divisions driving innovation and research
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {researchCenters.map((center) => (
            <motion.div
              key={center._id}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="relative bg-green-50 dark:bg-[#1f2937] rounded-xl border border-green-200 dark:border-green-800/50 hover:shadow-lg hover:shadow-green-900/20 transition-all"
            >
              <div className="flex flex-col h-full">
                <div
                  onClick={() =>
                    navigate(`/dashboard/research-divisions/${center._id}`, {
                      state: { centerData: center },
                    })
                  }
                  className="cursor-pointer p-6 text-center flex-grow"
                  tabIndex={0}
                  role="button"
                  aria-label={`View details for ${center.name}`}
                >
                  <div className="h-16 flex items-center justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5 text-green-600 dark:text-green-400"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
                    {center.name}
                  </h3>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                    {center.location || "Research division location"}
                  </p>
                </div>

                <div className="absolute top-4 right-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        className="bg-red-100 dark:bg-red-900/40 hover:bg-red-200 dark:hover:bg-red-800 text-red-700 dark:text-red-300 rounded-full p-2 transition"
                        title="Delete Division"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCenterToDelete(center._id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this research
                          division? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end gap-4 mt-4">
                        <Button
                          variant="outline"
                          onClick={() => setCenterToDelete(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(centerToDelete)}
                          disabled={loading.deleteResearchCenter}
                        >
                          {loading.deleteResearchCenter
                            ? "Deleting..."
                            : "Delete Division"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex justify-center mt-12"
        >
          <Button
            variant="outline"
            className="border-green-600 text-green-700 dark:text-green-300 dark:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/30 px-8 py-3 rounded-lg font-medium"
            onClick={() => setShowForm(!showForm)}
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            {showForm ? "Close Form" : "Add New Division"}
          </Button>
        </motion.div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#1f2937] border border-green-200 dark:border-green-700 rounded-xl p-6 sm:p-8 mt-8 max-w-2xl mx-auto shadow-md"
          >
            <h3 className="text-xl font-bold mb-4 text-green-900 dark:text-green-100 text-center">
              Add Research Division
            </h3>
            <form onSubmit={handleAdd} className="space-y-4">
              {[
                "name",
                "location",
                "email",
                "admin",
                "adminEmail",
                "adminPhone",
              ].map((field) => (
                <input
                  key={field}
                  name={field}
                  type={field.includes("email") ? "email" : "text"}
                  value={form[field] || ""}
                  onChange={handleChange}
                  placeholder={field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^\w/, (c) => c.toUpperCase())}
                  required
                  className="w-full px-4 py-2 rounded-md border border-green-300 dark:border-green-600 bg-white dark:bg-[#222b3a] text-green-900 dark:text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              ))}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium"
                  disabled={loading.createResearchCenter}
                >
                  {loading.createResearchCenter
                    ? "Creating..."
                    : "Create Research Division"}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center text-green-700 dark:text-green-100/70 text-sm mt-8"
        >
          More divisions coming soon as we expand our research efforts.
        </motion.p>
      </div>
    </div>
  );
}

export default ResearchDivisionsTab;
