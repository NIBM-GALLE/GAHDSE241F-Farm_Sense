import React from "react";
import { motion } from "framer-motion";
import {
  UploadCloud,
  Image as ImageIcon,
  Bot,
  UserCheck,
  ShieldCheck,
  SearchCheck,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      icon: <UploadCloud className="w-8 h-8" />,
      title: "Submit a Case",
      description:
        "Upload plant images and describe symptoms through our simple form",
    },
    {
      id: 2,
      icon: <ImageIcon className="w-8 h-8" />,
      title: "Image Processing",
      description: "Our system analyzes images for disease patterns",
    },
    {
      id: 3,
      icon: <SearchCheck className="w-8 h-8" />,
      title: "Case Review",
      description: "Agricultural experts verify each submission",
    },
    {
      id: 4,
      icon: <Bot className="w-8 h-8" />,
      title: "AI Diagnosis",
      description: "Get instant preliminary results from our trained models",
    },
    {
      id: 5,
      icon: <UserCheck className="w-8 h-8" />,
      title: "Personalized Help",
      description: "Receive tailored recommendations for treatment",
    },
  ];

  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
      title: "Farmer-First Design",
      description:
        "Simple interface optimized for rural farmers with minimal tech experience",
    },
    {
      icon: <UserCheck className="w-6 h-6 text-green-600" />,
      title: "Real-Time Support",
      description: "Direct chat with agricultural experts when you need help",
    },
    {
      icon: <SearchCheck className="w-6 h-6 text-green-600" />,
      title: "Smart Workflow",
      description: "Role-specific dashboards streamline the help process",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
      title: "Secure Platform",
      description: "Your data is protected with enterprise-grade security",
    },
  ];

  return (
    <div className="min-h-screen py-16 sm:py-20 px-4 bg-balck transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-green-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent dark:from-green-300 dark:to-green-100">
              How FarmSense Works
            </span>
          </h1>
          <p className="text-lg text-green-700 dark:text-green-200 max-w-3xl mx-auto">
            Get expert help for your crops in just a few simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative mb-24">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-green-100 dark:bg-green-900/30 -z-10"></div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-md border border-green-200 dark:border-green-700 mb-4 flex items-center justify-center w-16 h-16">
                  {step.icon}
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-green-100 dark:border-green-900/50">
                  <h3 className="font-semibold text-lg text-green-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-center text-green-900 dark:text-white mb-12"
          >
            Why Farmers Trust FarmSense
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <div className="h-full bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-green-200 dark:border-green-700 rounded-xl shadow-sm p-6 flex flex-col hover:shadow-md transition-all">
                  <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-green-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-green-200 dark:border-green-700 p-8 sm:p-10 shadow-sm text-center"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-green-900 dark:text-white mb-3">
            Ready to Get Help for Your Crops?
          </h3>
          <p className="text-green-700 dark:text-green-300 mb-6 max-w-2xl mx-auto">
            Submit your plant case now and receive expert advice within hours
          </p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              onClick={() => navigate("/create-case")}
              className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white px-8 py-3 rounded-lg font-medium shadow-md hover:shadow-green-700/30 transition-all flex items-center gap-2 mx-auto"
            >
              Start Your Case <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            Average response time: 2-4 hours during business days
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;
