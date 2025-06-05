import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { Button } from "./ui/button";

const initialSubCenters = [
  { id: "gampaha", name: "Gampaha Regional Center" },
  { id: "matara", name: "Matara Sub-Center" },
  { id: "anuradhapura", name: "Anuradhapura Field Office" },
  { id: "jaffna", name: "Jaffna District Branch" },
];

function SubCentersTab() {
  const navigate = useNavigate();
  const [subCenters, setSubCenters] = useState(initialSubCenters);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    location: "",
    email: "",
    phone: "",
    admin: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const newId = form.name.toLowerCase().replace(/\s+/g, "-");
    setSubCenters([...subCenters, { ...form, id: newId }]);
    setForm({ name: "", location: "", email: "", phone: "", admin: "" });
    setShowForm(false);
  };

  return (
    <div className="py-16 sm:py-20 px-4 bg-white dark:bg-[#111827] bg-gradient-to-b from-green-900/10 to-green-900/5 dark:from-green-900/20 dark:to-green-900/5 transition-colors">
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
              Regional Centers
            </h2>
            <p className="text-lg text-green-800 dark:text-green-100 max-w-2xl">
              Our network of regional support centers across Sri Lanka
            </p>
          </div>
        </motion.div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#1f2937] border border-green-200 dark:border-green-700 rounded-xl p-6 sm:p-8 mb-10 max-w-2xl mx-auto shadow-md"
          >
            <h3 className="text-xl font-bold mb-4 text-green-900 dark:text-green-100 text-center">
              Add Sub Center
            </h3>
            <form onSubmit={handleAdd} className="space-y-4">
              {[
                { name: "name", type: "text", placeholder: "Sub Center Name" },
                { name: "location", type: "text", placeholder: "Location" },
                { name: "email", type: "email", placeholder: "Email" },
                { name: "phone", type: "text", placeholder: "Phone Number" },
                { name: "admin", type: "text", placeholder: "Admin Name" },
              ].map((field) => (
                <input
                  key={field.name}
                  name={field.name}
                  type={field.type}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                  className="w-full px-4 py-2 rounded-md border border-green-300 dark:border-green-600 bg-white dark:bg-[#222b3a] text-green-900 dark:text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              ))}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium transition"
                >
                  Add Sub Center
                </button>
              </div>
            </form>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {subCenters.map((center) => (
            <motion.div
              key={center.id}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-green-50 dark:bg-[#1f2937] backdrop-blur-sm rounded-xl border border-green-200 dark:border-green-800/50 p-6 text-center hover:shadow-lg hover:shadow-green-900/20 transition-all cursor-pointer group"
              onClick={() => navigate(`/dashboard/sub-centers/${center.id}`)}
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
                Click to view details
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Add New Sub Center Button at the bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex justify-center mt-12"
        >
          <Button
            variant="outline"
            className="border-green-600 text-green-700 dark:text-green-300 dark:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/30 px-8 py-3 rounded-lg font-medium transition-colors"
            onClick={() => setShowForm(!showForm)}
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            {showForm ? "Close Form" : "Add New Sub Center"}
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center text-green-700 dark:text-green-100/70 text-sm mt-8"
        >
          More sub-centers coming soon across all districts
        </motion.p>
      </div>
    </div>
  );
}

export default SubCentersTab;
