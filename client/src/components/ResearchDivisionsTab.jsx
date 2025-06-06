import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom"; // Add this import

const initialDivisions = [
  { id: "plant-pathology", name: "Plant Pathology Division" },
  { id: "entomology", name: "Entomology Division" },
  { id: "soil-science", name: "Soil Science Division" },
  { id: "data-analysis", name: "Agro Data Analysis Unit" },
];

function ResearchDivisionsTab() {
  const [divisions, setDivisions] = useState(initialDivisions);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    lead: "",
    email: "",
    phone: "",
    focus: "",
    adminEmail: "",
    adminContact: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const newId = form.name.toLowerCase().replace(/\s+/g, "-");
    setDivisions([...divisions, { ...form, id: newId }]);
    setForm({ name: "", lead: "", email: "", phone: "", focus: "" });
    setShowForm(false);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100);
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
          {divisions.map((division) => (
            <motion.div
              key={division.id}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={`/dashboard/research-divisions/${division.id}`}
                className="block bg-green-50 dark:bg-[#1f2937] backdrop-blur-sm rounded-xl border border-green-200 dark:border-green-800/50 p-6 text-center hover:shadow-lg hover:shadow-green-900/20 transition-all cursor-pointer group"
                style={{ textDecoration: "none" }}
              >
                <div className="h-16 flex items-center justify-center mb-4">
                  {/* ...icon code... */}
                </div>
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
                  {division.name}
                </h3>
                <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                  {division.focus ||
                    "Researching plant health and sustainability"}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Add New Division Button at the bottom */}
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
            {showForm ? "Close Form" : "Add New Division"}
          </Button>
        </motion.div>

        {/* Show the form under the button, user-friendly */}
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
                { name: "name", type: "text", placeholder: "Division Name" },
                {
                  name: "focus",
                  type: "text",
                  placeholder: "Research Focus Area",
                },
                { name: "email", type: "email", placeholder: "Email Address" },
                { name: "phone", type: "text", placeholder: "Phone Number" },
                { name: "lead", type: "text", placeholder: "Admin name" },
                {
                  name: "adminEmail",
                  type: "email",
                  placeholder: "Admin Email",
                },
                {
                  name: "adminContact",
                  type: "text",
                  placeholder: "Admin Contact",
                },
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
                  Add Division
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
