import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import {
  SearchCheck,
  Database,
  Bell,
  Smartphone,
  UserCheck,
} from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
  const benefits = [
    {
      title: "ML-Based Diagnosis",
      description:
        "Identify crop diseases instantly using our AI-powered image analysis system.",
      icon: <SearchCheck className="w-8 h-8" />,
      color: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900/20",
      border: "border-green-300 dark:border-green-400/30",
    },
    {
      title: "Centralized Database",
      description:
        "All reports, treatments, and research findings are stored for easy access and tracking.",
      icon: <Database className="w-8 h-8" />,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/20",
      border: "border-blue-300 dark:border-blue-400/30",
    },
    {
      title: "Real-Time Alerts",
      description:
        "Receive instant SMS and email notifications for disease status and expert feedback.",
      icon: <Bell className="w-8 h-8" />,
      color: "text-amber-600",
      bg: "bg-amber-100 dark:bg-amber-900/20",
      border: "border-amber-300 dark:border-amber-400/30",
    },
    {
      title: "Farmer-Centered UI",
      description:
        "Simple and responsive interface accessible via mobile or desktop from any location.",
      icon: <Smartphone className="w-8 h-8" />,
      color: "text-purple-600",
      bg: "bg-purple-100 dark:bg-purple-900/20",
      border: "border-purple-300 dark:border-purple-400/30",
    },
    {
      title: "Role-Based Access",
      description:
        "Field agents, researchers, and farmers have specific tools tailored to their tasks.",
      icon: <UserCheck className="w-8 h-8" />,
      color: "text-emerald-600",
      bg: "bg-emerald-100 dark:bg-emerald-900/20",
      border: "border-emerald-300 dark:border-emerald-400/30",
    },
  ];

  return (
    <div className="py-16 sm:py-20 px-4 bg-gradient-to-b from-green-100 to-green-50 dark:from-green-900/10 dark:to-green-900/5 transition-colors">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent dark:from-green-300 dark:to-green-100">
              Why Choose
            </span>{" "}
            FarmSense
          </h2>
          <p className="text-lg text-green-800 dark:text-green-100 max-w-3xl mx-auto">
            Discover how our smart agriculture platform is transforming crop
            disease prediction and field support in Sri Lanka.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className={`${benefit.bg} ${benefit.border} rounded-xl p-6 border backdrop-blur-sm hover:shadow-lg hover:shadow-green-900/20 transition-all duration-300 flex flex-col items-center text-center h-full`}
            >
              <div
                className={`${benefit.color} mb-4 p-3 rounded-full bg-white/60 dark:bg-black/20`}
              >
                {benefit.icon}
              </div>
              <h3 className="font-bold text-lg mb-3 text-green-900 dark:text-white">
                {benefit.title}
              </h3>
              <p className="text-green-800 dark:text-green-100/80 text-sm">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mt-16"
        >
          <Link to="/get-started">
            <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-6 px-8 text-lg rounded-lg shadow-lg hover:shadow-green-700/30 transition-all">
              Start Using FarmSense
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
