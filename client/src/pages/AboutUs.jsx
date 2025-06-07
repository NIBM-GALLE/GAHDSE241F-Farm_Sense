import React from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Bot,
  Users,
  ShieldCheck,
  Smartphone,
  Image as ImageIcon,
} from "lucide-react";

const farmerImage =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";
const mlImage =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80";
const teamworkImage =
  "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=800&q=80";

function AboutUs() {
  return (
    <div className="min-h-screen flex items-center justify-center py-16 sm:py-20 px-4 bg-balck transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full mb-6">
            <Leaf className="w-5 h-5 text-green-600 dark:text-green-300 mr-2" />
            <span className="text-green-700 dark:text-green-300 font-medium">
              About FarmSense
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-green-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent dark:from-green-300 dark:to-green-100">
              Empowering Farmers
            </span>{" "}
            with Smart Technology
          </h1>
          <p className="text-lg text-green-700 dark:text-green-300 max-w-3xl mx-auto">
            A revolutionary solution helping Sri Lankan farmers detect crop
            diseases early and protect their livelihoods
          </p>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col lg:flex-row items-center gap-8 bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-green-200 dark:border-green-700 shadow-lg p-6 sm:p-8"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <img
              src={farmerImage}
              alt="Farmer with crops"
              className="w-full rounded-xl shadow-md border border-green-200 dark:border-green-700"
            />
          </motion.div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl font-semibold text-green-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-green-700 dark:text-green-300 mb-4">
              To reduce crop losses and improve farming productivity in Sri
              Lanka through accessible technology. FarmSense connects farmers
              with the tools and expertise they need to protect their crops.
            </p>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
              <p className="text-green-700 dark:text-green-300 italic">
                "Every farmer deserves access to expert knowledge, no matter
                where they're located."
              </p>
            </div>
          </div>
        </motion.section>

        {/* Technology Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col lg:flex-row-reverse items-center gap-8 bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-green-200 dark:border-green-700 shadow-lg p-6 sm:p-8"
        >
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <img
              src={mlImage}
              alt="ML Analysis"
              className="w-full rounded-xl shadow-md border border-green-200 dark:border-green-700"
            />
          </motion.div>
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <Bot className="w-8 h-8 text-green-600 dark:text-green-300" />
              <h2 className="text-2xl font-semibold text-green-900 dark:text-white">
                Smart AI Detection
              </h2>
            </div>
            <p className="text-green-700 dark:text-green-300 mb-4">
              Our advanced machine learning models analyze crop images to detect
              diseases with high accuracy. Farmers get instant preliminary
              results with treatment recommendations.
            </p>
            <ul className="space-y-2 text-green-700 dark:text-green-300">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Trained on thousands of real crop disease images</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Continuously improved with expert feedback</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Optimized for Sri Lankan crops and conditions</span>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Teamwork Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col lg:flex-row items-center gap-8 bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-green-200 dark:border-green-700 shadow-lg p-6 sm:p-8"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <img
              src={teamworkImage}
              alt="Team collaboration"
              className="w-full rounded-xl shadow-md border border-green-200 dark:border-green-700"
            />
          </motion.div>
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-green-600 dark:text-green-300" />
              <h2 className="text-2xl font-semibold text-green-900 dark:text-white">
                Collaborative System
              </h2>
            </div>
            <p className="text-green-700 dark:text-green-300 mb-4">
              FarmSense connects farmers with agricultural experts through a
              streamlined workflow:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800">
                <h3 className="font-medium text-green-800 dark:text-green-200 mb-1">
                  Farmers
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Submit cases and receive advice
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800">
                <h3 className="font-medium text-green-800 dark:text-green-200 mb-1">
                  Field Agents
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Verify cases and provide support
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800">
                <h3 className="font-medium text-green-800 dark:text-green-200 mb-1">
                  Researchers
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Analyze trends and improve solutions
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800">
                <h3 className="font-medium text-green-800 dark:text-green-200 mb-1">
                  Administrators
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Monitor system and coordinate responses
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Vision Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-green-200 dark:border-green-700 shadow-lg p-8"
        >
          <h2 className="text-2xl font-semibold text-green-900 dark:text-white mb-4">
            Our Vision for Sri Lankan Agriculture
          </h2>
          <p className="text-green-700 dark:text-green-300 max-w-3xl mx-auto mb-6">
            We envision a future where technology empowers every farmer with
            real-time support and scientific knowledge, creating a more
            resilient and productive agricultural sector.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full">
              <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-300" />
              <span className="text-green-700 dark:text-green-300">
                Sustainable farming
              </span>
            </div>
            <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full">
              <Smartphone className="w-5 h-5 text-green-600 dark:text-green-300" />
              <span className="text-green-700 dark:text-green-300">
                Accessible technology
              </span>
            </div>
            <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full">
              <Users className="w-5 h-5 text-green-600 dark:text-green-300" />
              <span className="text-green-700 dark:text-green-300">
                Community support
              </span>
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-green-200 dark:border-green-700 shadow-lg p-8"
        >
          <h2 className="text-2xl font-semibold text-center text-green-900 dark:text-white mb-8">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <ImageIcon className="w-8 h-8 text-green-600 dark:text-green-300" />
                ),
                title: "Image Diagnosis",
                description:
                  "Upload crop photos for instant AI analysis and disease detection",
              },
              {
                icon: (
                  <Bot className="w-8 h-8 text-green-600 dark:text-green-300" />
                ),
                title: "Smart Alerts",
                description:
                  "Get real-time notifications via SMS and email about your cases",
              },
              {
                icon: (
                  <Users className="w-8 h-8 text-green-600 dark:text-green-300" />
                ),
                title: "Expert Network",
                description:
                  "Connect with agricultural specialists across Sri Lanka",
              },
              {
                icon: (
                  <ShieldCheck className="w-8 h-8 text-green-600 dark:text-green-300" />
                ),
                title: "Disease Database",
                description:
                  "Access a growing knowledge base of crop diseases and treatments",
              },
              {
                icon: (
                  <Smartphone className="w-8 h-8 text-green-600 dark:text-green-300" />
                ),
                title: "Mobile Access",
                description:
                  "Use FarmSense on any device, even with limited connectivity",
              },
              {
                icon: (
                  <Leaf className="w-8 h-8 text-green-600 dark:text-green-300" />
                ),
                title: "Crop-Specific",
                description:
                  "Tailored solutions for Sri Lanka's most important crops",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-100 dark:border-green-800 hover:shadow-md transition-all"
              >
                <div className="bg-green-100 dark:bg-green-800/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-green-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-green-700 dark:text-green-300 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default AboutUs;
