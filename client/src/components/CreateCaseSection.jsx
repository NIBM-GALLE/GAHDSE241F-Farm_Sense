import React from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

function CreateCaseSection() {
  const navigate = useNavigate();

  return (
    <div className="py-16 sm:py-20 px-4 bg-gradient-to-b from-green-900/10 to-green-900/5 dark:from-green-900/10 dark:to-green-900/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent dark:from-green-300 dark:to-green-100">
              Need Help With Your Crops?
            </span>
          </h2>
          <p className="text-lg text-gray-700 dark:text-green-100 max-w-3xl mx-auto">
            Get expert advice by creating a new case with photos of your plants.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-white/10 p-8 sm:p-12 shadow-lg"
        >
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Left side - Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex-shrink-0 lg:w-1/3 flex justify-center"
            >
              <div className="bg-green-100 dark:bg-green-900/30 p-8 rounded-full">
                <Leaf className="w-20 h-20 text-green-600 dark:text-green-300" />
              </div>
            </motion.div>

            {/* Right side - Content */}
            <div className="flex-grow lg:w-2/3 text-center lg:text-left">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Create a New Plant Health Case
              </h3>
              <p className="text-gray-700 dark:text-green-100 mb-6 leading-relaxed">
                Quickly submit details about your crop issues with photos. Our
                agricultural experts will analyze your case and provide
                personalized recommendations to help protect your plants.
              </p>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <button
                  onClick={() => navigate("/create-case")}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium text-base shadow hover:shadow-green-700/30 transition-all focus:outline-none focus:ring-2 focus:ring-green-400 mx-auto lg:mx-0"
                >
                  <PlusCircle className="w-5 h-5" />
                  Start New Case
                </button>
              </motion.div>

              <p className="text-sm text-gray-500 dark:text-green-200 mt-4">
                Average response time: 2-4 hours during business hours
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CreateCaseSection;
