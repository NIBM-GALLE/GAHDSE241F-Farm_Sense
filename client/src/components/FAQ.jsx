import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const FarmFaq =
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"; // Farm themed image

const FAQ = () => {
  const [openItem, setOpenItem] = useState(0);
  const [activeTab, setActiveTab] = useState("general");

  const faqContent = {
    general: [
      {
        question: "What is FarmSense?",
        answer:
          "FarmSense is a smart crop disease prediction and monitoring system developed to assist Sri Lankan farmers using machine learning technology and centralized reporting.",
      },
      {
        question: "How do I use FarmSense to detect diseases?",
        answer:
          "You can upload images of your crops via our mobile or web app. Our AI model will analyze the image and provide an instant diagnosis and recommendations.",
      },
      {
        question: "Is FarmSense available as a mobile app?",
        answer:
          "Yes, FarmSense is available for both web and mobile platforms. The mobile app is built using Flutter and optimized for use in rural areas with limited connectivity.",
      },
    ],
    usage: [
      {
        question: "How accurate is the disease prediction?",
        answer:
          "Our ML model is trained on real crop disease datasets and delivers high accuracy under proper lighting and image quality. We continuously improve it with expert feedback.",
      },
      {
        question: "Can I get alerts or follow-up advice?",
        answer:
          "Yes, the system sends real-time alerts and follow-up messages via SMS or email depending on the progress of your case and expert inputs.",
      },
      {
        question: "Do I need internet access to use FarmSense?",
        answer:
          "An internet connection is required for uploading images and receiving diagnosis, but the interface is optimized for slow networks.",
      },
    ],
    support: [
      {
        question: "Is FarmSense free to use?",
        answer:
          "The basic features of FarmSense are available for free to all farmers. Some advanced features for sub-center admins and researchers require registration.",
      },
      {
        question: "How do I contact support?",
        answer:
          "You can contact our support team through the Help section in the app, or by email. Support is available 7 days a week from 8:00 AM to 6:00 PM.",
      },
      {
        question: "Can I contribute research to the platform?",
        answer:
          "Yes, researchers can share insights and upload disease data to the system through their designated portal accounts.",
      },
    ],
  };

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  const changeTab = (tab) => {
    setActiveTab(tab);
    setOpenItem(null);
  };

  const currentFaqItems = faqContent[activeTab] || [];

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
              Frequently Asked
            </span>{" "}
            Questions
          </h2>
          <p className="text-lg text-gray-700 dark:text-green-100 max-w-3xl mx-auto">
            Find answers to common questions about FarmSense and how it helps
            Sri Lankan farmers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-white/10 p-6 sm:p-8 shadow-lg"
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex-shrink-0 lg:w-1/3 flex justify-center items-center"
            >
              <img
                src={FarmFaq}
                alt="Farmer questions"
                className="w-full max-w-xs rounded-lg border border-gray-200 dark:border-white/20 shadow-lg"
              />
            </motion.div>

            {/* FAQ Tabs and Content */}
            <div className="flex-grow lg:w-2/3">
              <div className="flex flex-wrap gap-2 mb-8">
                <Button
                  onClick={() => changeTab("general")}
                  className={`${
                    activeTab === "general"
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                  } transition-colors`}
                >
                  General
                </Button>
                <Button
                  onClick={() => changeTab("usage")}
                  className={`${
                    activeTab === "usage"
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                  } transition-colors`}
                >
                  Usage
                </Button>
                <Button
                  onClick={() => changeTab("support")}
                  className={`${
                    activeTab === "support"
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                  } transition-colors`}
                >
                  Support
                </Button>
              </div>

              <div className="space-y-4">
                {currentFaqItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="border border-gray-200 dark:border-white/20 rounded-lg overflow-hidden bg-white/60 dark:bg-white/5 hover:bg-green-50 dark:hover:bg-white/10 transition-colors"
                  >
                    <button
                      className={`w-full px-4 py-4 text-left flex justify-between items-center transition-colors ${
                        openItem === index
                          ? "bg-green-100 text-green-900 dark:bg-green-600/90 dark:text-white"
                          : "text-gray-900 hover:bg-green-50 dark:text-white dark:hover:bg-white/10"
                      }`}
                      onClick={() => toggleItem(index)}
                    >
                      <span className="font-medium text-left">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          openItem === index ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openItem === index && (
                      <div className="px-4 py-4 bg-green-50 text-green-900 dark:bg-white/5 dark:text-green-100">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
