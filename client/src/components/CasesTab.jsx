import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Leaf, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const initialCases = [
  {
    id: "case-001",
    plantName: "Tomato",
    farmer: "Kamal Perera",
  },
  {
    id: "case-002",
    plantName: "Chili",
    farmer: "Nirosha Silva",
  },
  {
    id: "case-003",
    plantName: "Banana",
    farmer: "Ajith Kumara",
  },
];

function CasesTab() {
  const [cases, setCases] = useState(initialCases);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    plantName: "",
    farmer: "",
  });
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setForm({ ...form, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newId = `case-${Math.floor(Math.random() * 10000)}`;
    setCases([...cases, { ...form, id: newId }]);
    setForm({
      plantName: "",
      farmer: "",
      issue: "",
      location: "",
      image: null,
    });
    setPreview(null);
    setShowForm(false);
  };

  return (
    <div className="py-16 sm:py-20 px-4 bg-white dark:bg-[#111827] bg-gradient-to-b from-green-900/10 to-green-900/5 dark:from-green-900/20 dark:to-green-900/5 transition-colors">
      <div className="max-w-6xl mx-auto">
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
            Plant Cases
          </h2>
          <p className="text-lg text-green-800 dark:text-green-100 max-w-2xl mx-auto mt-2">
            Manage farmer-submitted plant disease cases and issue tracking
          </p>
        </motion.div>

        {/* Add Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#1f2937] border border-green-200 dark:border-green-700 rounded-xl p-6 sm:p-8 mb-10 max-w-2xl mx-auto shadow-md"
          >
            <h3 className="text-xl font-bold mb-4 text-green-900 dark:text-green-100 text-center">
              Add New Case
            </h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <input
                name="plantName"
                value={form.plantName}
                onChange={handleChange}
                placeholder="Plant Name"
                required
                className="w-full px-4 py-2 rounded-md border border-green-300 dark:border-green-600 bg-white dark:bg-[#222b3a] text-green-900 dark:text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                name="farmer"
                value={form.farmer}
                onChange={handleChange}
                placeholder="Farmer Name"
                required
                className="w-full px-4 py-2 rounded-md border border-green-300 dark:border-green-600 bg-white dark:bg-[#222b3a] text-green-900 dark:text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                name="issue"
                value={form.issue}
                onChange={handleChange}
                placeholder="Issue Description"
                required
                className="w-full px-4 py-2 rounded-md border border-green-300 dark:border-green-600 bg-white dark:bg-[#222b3a] text-green-900 dark:text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
                required
                className="w-full px-4 py-2 rounded-md border border-green-300 dark:border-green-600 bg-white dark:bg-[#222b3a] text-green-900 dark:text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <label className="block text-green-800 dark:text-green-200 text-sm font-medium mb-1">
                Upload plant image for disease identification
              </label>
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="block w-full text-sm text-green-800 dark:text-green-200 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
              />
              {preview && (
                <div className="mt-4">
                  <p className="text-green-700 dark:text-green-300 text-sm mb-1">
                    Preview:
                  </p>
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full max-h-64 object-cover rounded-lg border border-green-300 dark:border-green-600"
                  />
                </div>
              )}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium transition"
                >
                  Add Case
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Case Cards - Row Style */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          {cases.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center bg-white dark:bg-[#1f2937] border border-green-200 dark:border-green-700 rounded-xl px-6 py-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() => navigate(`/cases/${item.id}`)}
            >
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-4">
                <Leaf className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-green-900 dark:text-white">
                  {item.plantName}
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Submitted by: {item.farmer}
                </p>
                <p className="text-xs text-green-500 dark:text-green-400">
                  {item.issue} | {item.location}
                </p>
              </div>
              {item.image && (
                <img
                  src={
                    typeof item.image === "string"
                      ? item.image
                      : URL.createObjectURL(item.image)
                  }
                  alt={item.plantName}
                  className="w-16 h-16 object-cover rounded-lg ml-4"
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Add Button */}
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
            {showForm ? "Close Form" : "Add Plant Case"}
          </Button>
        </motion.div>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center text-green-700 dark:text-green-100/70 text-sm mt-10"
        >
          All plant cases are managed by the FarmSense sub-center and research
          teams
        </motion.p>
      </div>
    </div>
  );
}

export default CasesTab;
