import React, { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CasesTab() {
  const [cases] = useState([
    {
      id: "case-001",
      plantName: "Tomato",
      farmer: "Kamal Perera",
      status: "In Progress",
      date: "2025-06-01",
      image:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&auto=format&fit=crop",
    },
    {
      id: "case-002",
      plantName: "Chili",
      farmer: "Nirosha Silva",
      status: "Pending",
      date: "2025-06-03",
      image:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&auto=format&fit=crop",
    },
    {
      id: "case-003",
      plantName: "Banana",
      farmer: "Ajith Kumara",
      status: "In Progress",
      date: "2025-06-06",
      image:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&auto=format&fit=crop",
    },
  ]);

  const navigate = useNavigate();

  return (
    <div className="py-16 sm:py-20 px-4 bg-transparent transition-colors">
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

        {/* Case Rows */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          {cases.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 bg-green-50 dark:bg-[#1f2937] rounded-xl border border-green-200 dark:border-green-700 p-5 shadow hover:shadow-green-900/20 transition-all cursor-pointer group"
            >
              {/* Plant Image */}
              <div className="w-16 h-16 rounded-lg overflow-hidden border border-green-100 dark:border-green-700">
                <img
                  src={item.image}
                  alt={item.plantName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Case Details */}
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-4">
                  <Leaf className="w-5 h-5 text-green-500 dark:text-green-400" />
                  <div>
                    <div className="text-green-900 dark:text-green-100 font-semibold">
                      {item.plantName}
                    </div>
                    <div className="text-green-700 dark:text-green-300 text-sm">
                      Farmer: <span className="font-medium">{item.farmer}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`inline-block px-4 py-1 rounded-full text-xs font-semibold shadow-sm ${
                      item.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-800/60 dark:text-gray-200"
                    }`}
                    style={{
                      minWidth: 90,
                      textAlign: "center",
                      letterSpacing: "0.03em",
                      fontSize: "0.95rem",
                    }}
                  >
                    {item.status}
                  </span>
                  <button
                    onClick={() => navigate(`/dashboard/cases/${item.id}`)}
                    className="inline-flex items-center gap-1 px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium shadow transition"
                    title="View Details"
                  >
                    <MoreVertical className="w-4 h-4" />
                    View
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center text-green-700 dark:text-green-100/70 text-sm mt-10"
        >
          All plant cases are managed by the FarmSense sub-center and research
          teams.
        </motion.p>
      </div>
    </div>
  );
}

export default CasesTab;
