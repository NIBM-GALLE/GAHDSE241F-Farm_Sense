import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useUserStore } from "@/stores/useUserStore";
import { useSubCenter } from "@/stores/useSubCenter";
import { useResearchCenterStore } from "@/stores/useResearchCenterStore";

function AdminsTab() {
  const { user } = useUserStore();
  const { admins, getAdmins, createAdmin, loading } = useSubCenter();
  const {
    researchAdmins,
    getResearchAdmins,
    createResearchAdmin,
    researchLoading,
  } = useResearchCenterStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });

  const currentAdmins =
    user?.role === "sub-center-admin"
      ? admins
      : user?.role === "ResearchDivisionAdmin"
      ? researchAdmins
      : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    try {
      if (user?.role === "sub-center-admin") {
        await createAdmin(form.name, form.email);
      } else if (user?.role === "ResearchDivisionAdmin") {
        await createResearchAdmin(form.name, form.email);
      }

      setForm({ name: "", email: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Failed to create admin:", error);
    }
  };

  useEffect(() => {
    if (user?.role === "sub-center-admin") {
      getAdmins();
    } else if (user?.role === "ResearchDivisionAdmin") {
      getResearchAdmins();
    }
  }, [user, getAdmins, getResearchAdmins]);

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
              Admins
            </h2>
            <p className="text-lg text-green-800 dark:text-green-100 max-w-2xl">
              Manage admin accounts for FarmSense platform
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
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {loading.fetchAdmins || researchLoading.fetchResearchAdmins ? (
              <tr>
                <td colSpan="2" className="text-center py-4">
                  Loading admins...
                </td>
              </tr>
            ) : currentAdmins.length === 0 ? (
              <tr>
                <td colSpan="2" className="text-center py-4">
                  No admins found
                </td>
              </tr>
            ) : (
              currentAdmins.map((admin) => (
                <tr
                  key={admin._id}
                  className="border-b border-green-200 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                >
                  <td className="px-4 py-3 font-medium text-green-900 dark:text-white">
                    {admin.name} {admin._id === user?._id && "(You)"}
                  </td>
                  <td className="px-4 py-3 text-green-700 dark:text-green-300">
                    {admin.email}
                  </td>
                  <td className="px-4 py-3 text-green-700 dark:text-green-300">
                    {admin.contactNumber || "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </motion.table>

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
              setForm({ name: "", email: "" });
            }}
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            {showForm ? "Close Form" : "Add Admin"}
          </Button>
        </motion.div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#1f2937] border border-green-200 dark:border-green-700 rounded-xl p-6 sm:p-8 mt-8 max-w-2xl mx-auto shadow-md"
          >
            <h3 className="text-xl font-bold mb-4 text-green-900 dark:text-green-100 text-center">
              Add Admin
            </h3>
            <form onSubmit={handleAdd} className="space-y-4">
              {["name", "email"].map((field) => (
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
                  disabled={
                    loading.createAdmin || researchLoading.createResearchAdmin
                  }
                >
                  {loading.createAdmin || researchLoading.createResearchAdmin
                    ? "Processing..."
                    : "Add Admin"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setForm({ name: "", email: "" });
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
          Admin accounts that related to the sub-center or research division.
        </motion.p>
      </div>
    </div>
  );
}

export default AdminsTab;
