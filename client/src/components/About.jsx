import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="py-16 sm:py-20 px-4 bg-gradient-to-b from-green-900/10 to-green-900/5 dark:from-green-900/10 dark:to-green-900/5 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent dark:from-green-300 dark:to-green-100">
              About
            </span>{" "}
            FarmSense
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-gray-700 dark:text-green-100 max-w-3xl mx-auto mb-6 leading-relaxed"
          >
            FarmSense is a smart digital platform designed to empower Sri Lankan
            farmers with AI-driven crop disease detection, real-time updates,
            and expert support.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-white/10 p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700 dark:text-green-100">
              We exist to make agriculture more efficient, sustainable, and
              accessible for everyone through innovative technology. Our
              AI-powered solutions help farmers detect crop diseases early and
              take preventive measures.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-white/10 p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              What We Offer
            </h3>
            <p className="text-gray-700 dark:text-green-100">
              With FarmSense, you can upload crop images for instant diagnosis,
              access a knowledge hub, and connect with agricultural experts. Our
              platform is designed specifically for Sri Lankan farming
              conditions.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 bg-green-100/80 dark:bg-green-600/10 border border-green-400/30 dark:border-green-400/20 rounded-xl p-6 text-center"
        >
          <p className="text-green-900 dark:text-green-100 text-lg">
            We are committed to supporting the farming community with reliable
            information and cutting-edge technology tailored for local needs.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
