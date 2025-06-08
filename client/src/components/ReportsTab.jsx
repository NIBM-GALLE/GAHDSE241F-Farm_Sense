import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAdminStore } from "@/stores/useAdminStore";
import { User, Mail, Phone } from "lucide-react";

function ReportsTab() {
  const { reports, getAllReports, loading } = useAdminStore();

  useEffect(() => {
    getAllReports();
  }, []);

  if (loading.reports) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500">
          <div className="sr-only">Loading...</div>
        </div>
      </div>
    );
  }
  return (
    <div className="py-16 sm:py-20 px-4 bg-transparent transition-colors">
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
              Research Reports
            </h2>
            <p className="text-lg text-green-800 dark:text-green-100 max-w-2xl">
              Browse analytical findings and shared knowledge from our research
              divisions
            </p>
          </div>
        </motion.div>

        {/* Reports grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reports.map((report) => (
            <motion.div
              key={report._id}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-green-50 dark:bg-[#1f2937] rounded-xl border border-green-200 dark:border-green-700 p-6 hover:shadow-lg hover:shadow-green-900/20 transition-all cursor-pointer group flex flex-col h-full"
            >
              <div className="flex items-center gap-3 mb-3">
                <User className="w-5 h-5 text-green-600 dark:text-green-300" />
                <span className="font-semibold text-green-900 dark:text-white">
                  {report.createdBy.name}
                </span>
              </div>
              <div className="mb-2 text-green-700 dark:text-green-300 text-sm flex flex-col gap-1">
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {report.createdBy.phone}
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {report.createdBy.email}
                </span>
              </div>
              <div className="bg-green-100 dark:bg-green-900/40 rounded-md p-3 mb-3 text-green-900 dark:text-green-100 text-base">
                {report.message}
              </div>
              <div className="mt-auto text-xs text-green-600 dark:text-green-400 text-right">
                {report.createdAt
                  ? new Date(report.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Unknown Date"}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Add New Report button (disabled, form removed) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex justify-center mt-12"
        ></motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center text-green-700 dark:text-green-100/70 text-sm mt-10"
        >
          More reports coming soon as research progresses across Sri Lanka
        </motion.p>
      </div>
    </div>
  );
}

export default ReportsTab;
