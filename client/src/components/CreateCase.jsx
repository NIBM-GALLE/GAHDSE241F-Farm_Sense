import React from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

function CreateCase() {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-black-100 dark:bg-black-900 border border-green-200 dark:border-black-800 rounded-2xl px-2 py-6 sm:px-4 sm:py-8 mt-10 shadow"
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col items-center text-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Leaf className="w-7 h-7 text-green-700 dark:text-green-300" />
            <h2 className="text-2xl sm:text-3xl font-bold text-green-900 dark:text-white">
              Need Help With Your Plant?
            </h2>
          </div>
          <p className="text-green-800 dark:text-green-100 max-w-xl text-base">
            Quickly create a new case by describing your plant's issue and
            uploading photos. Our experts will review and respond with
            personalized guidance.
          </p>
          <button
            onClick={() => navigate("/create-case")}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold text-base shadow hover:shadow-green-700/30 transition-all focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <PlusCircle className="w-5 h-5" />
            Create New Case
          </button>
        </div>
      </div>
    </motion.section>
  );
}

export default CreateCase;
