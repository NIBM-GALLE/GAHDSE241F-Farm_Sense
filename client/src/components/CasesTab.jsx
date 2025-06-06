import React, { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialCases = [
  {
    id: "case-001",
    plantName: "Tomato",
    farmer: "Kamal Perera",
    status: "In Progress",
  },
  {
    id: "case-002",
    plantName: "Chili",
    farmer: "Nirosha Silva",
    status: "Pending",
  },
  {
    id: "case-003",
    plantName: "Banana",
    farmer: "Ajith Kumara",
    status: "In Progress",
  },
];

function CasesTab() {
  const [cases] = useState(initialCases);
  const navigate = useNavigate();

  return (
    <div className="py-16 sm:py-20 px-4 bg-white dark:bg-[#111827] bg-gradient-to-b from-green-900/10 to-green-900/5 dark:from-green-900/20 dark:to-green-900/5 transition-colors">
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
            Plant Cases
          </h2>
          <p className="text-lg text-green-800 dark:text-green-100 max-w-2xl mx-auto mt-2">
            Manage farmer-submitted plant disease cases and issue tracking
          </p>
        </motion.div>

        {/* Case Cards - User Friendly Table Style */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="overflow-x-auto"
        >
          <table className="min-w-full bg-white dark:bg-[#1f2937] rounded-xl shadow border border-green-200 dark:border-green-700">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-green-700 dark:text-green-200 font-semibold text-base">
                  #
                </th>
                <th className="px-6 py-4 text-left text-green-700 dark:text-green-200 font-semibold text-base">
                  Plant
                </th>
                <th className="px-6 py-4 text-left text-green-700 dark:text-green-200 font-semibold text-base">
                  Farmer
                </th>
                <th className="px-6 py-4 text-left text-green-700 dark:text-green-200 font-semibold text-base">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-green-700 dark:text-green-200 font-semibold text-base">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {cases.map((item, idx) => (
                <tr
                  key={item.id}
                  className="border-t border-green-100 dark:border-green-800 hover:bg-green-100/60 dark:hover:bg-green-900/40 transition rounded-xl"
                  style={{ boxShadow: "0 2px 8px 0 rgba(16, 185, 129, 0.05)" }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-green-700 dark:text-green-200 text-lg">
                        {idx + 1}
                      </span>
                      <Leaf className="w-5 h-5 text-green-500 dark:text-green-400" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-green-900 dark:text-green-100 font-semibold text-base">
                    {item.plantName}
                  </td>
                  <td className="px-6 py-4 text-green-700 dark:text-green-300 text-base">
                    {item.farmer}
                  </td>
                  <td className="px-6 py-4">
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
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/dashboard/cases/${item.id}`)}
                      className="inline-flex items-center gap-1 px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium shadow transition"
                      title="View Details"
                    >
                      <MoreVertical className="w-4 h-4" />
                      Action
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
