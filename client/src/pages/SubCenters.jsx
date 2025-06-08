import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Phone, Mail, User } from "lucide-react";

function SubCenters() {
  const { id } = useParams();
  const location = useLocation();
  const centerData = location.state?.centerData;
  console.log("Location state:", location.state);
  console.log("Center Data:", centerData);

  if (!centerData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#111827] bg-gradient-to-b from-green-900/10 to-green-900/5 dark:from-green-900/20 dark:to-green-900/5 transition-colors">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8 bg-white/5 dark:bg-[#1f2937] backdrop-blur-sm rounded-xl border border-white/10 dark:border-green-800"
        >
          <h2 className="text-2xl font-bold text-green-900 dark:text-white mb-4">
            Sub Center Not Found
          </h2>
          <Link
            to="/dashboard/sub-centers"
            className="mt-4 flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sub Centers
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-16 sm:py-20 px-4 bg-balck transition-colors">
      <div className="max-w-4xl w-full">
        <motion.div
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 dark:bg-[#1f2937] backdrop-blur-sm rounded-xl border border-white/10 dark:border-green-800 shadow-lg overflow-hidden cursor-move"
        >
          <div className="flex flex-col md:flex-row">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="md:w-1/3 bg-green-900/20 flex items-center justify-center p-6"
            >
              <img
                src={centerData.image || "https://via.placeholder.com/300"}
                alt={centerData.name}
                className="w-full h-64 md:h-auto object-cover rounded-lg shadow-md"
              />
            </motion.div>

            <div className="md:w-2/3 p-6 md:p-8">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-bold text-green-900 dark:text-white mb-6"
              >
                {centerData.name || "Sub Center Name"}
              </motion.h1>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-green-700 dark:text-green-300">
                      Location
                    </h3>
                    <p className="text-green-800 dark:text-green-100">
                      {centerData.location || "No location provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-green-700 dark:text-green-300">
                      Phone
                    </h3>
                    <p className="text-green-800 dark:text-green-100">
                      {centerData.contactNumber || "No phone number provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-green-700 dark:text-green-300">
                      Email
                    </h3>
                    <p className="text-green-800 dark:text-green-100">
                      {centerData.email || "No email provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <User className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-green-700 dark:text-green-300">
                      Admin
                    </h3>
                    <p className="text-green-800 dark:text-green-100">
                      {centerData.admins && centerData.admins.length > 0
                        ? centerData.admins.map((admin) => (
                            <span key={admin._id} className="block">
                              {admin.name} ({admin.email})
                            </span>
                          ))
                        : "No admins assigned"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Back button under the card */}
              <div className="flex justify-center mt-8">
                <Link
                  to="/dashboard/sub-centers"
                  className="mt-4 flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Sub Centers
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default SubCenters;
