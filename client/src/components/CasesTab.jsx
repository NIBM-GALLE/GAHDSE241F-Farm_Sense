import { useEffect } from "react";
import { motion } from "framer-motion";
import { Leaf, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useSubCenter } from "@/stores/useSubCenter";

function CasesTab() {
  const { cases, loading, fetchCases } = useSubCenter();

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Fetch cases on mount
  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  if (loading.fetchCases) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500"></div>
        <p className="ml-4 text-lg">Loading cases...</p>
      </div>
    );
  }

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
              {/* Plant Image - showing first image if available */}
              <div className="w-16 h-16 rounded-lg overflow-hidden border border-green-100 dark:border-green-700">
                {item.images?.length > 0 ? (
                  <img
                    src={item.images[0]}
                    alt={item.plantName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-green-500 dark:text-green-400" />
                  </div>
                )}
              </div>

              {/* Case Details */}
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-green-500 dark:text-green-400" />
                    <div className="text-green-900 dark:text-green-100 font-semibold">
                      {item.plantName}
                    </div>
                  </div>

                  <div className="text-green-700 dark:text-green-300 text-sm">
                    Issue:{" "}
                    <span className="font-medium">{item.plantIssue}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 mt-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(item.createdAt)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`inline-block px-4 py-1 rounded-full text-xs font-semibold shadow-sm ${
                      item.status === "pending"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200"
                        : item.status === "in-progress"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200"
                        : item.status === "resolved"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200"
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
                  <Link
                    to={`/dashboard/cases/${item._id}`}
                    className="inline-flex items-center gap-1 px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium shadow transition"
                    title="View Details"
                  >
                    View Details
                  </Link>
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
