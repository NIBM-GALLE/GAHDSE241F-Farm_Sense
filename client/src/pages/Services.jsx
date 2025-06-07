import React from "react";
import { motion } from "framer-motion";
import {
  Headset,
  BookOpen,
  MessageSquare,
  UserCircle,
  MapPin,
  Database,
} from "lucide-react";

const serviceImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", // 24/7 Support
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80", // Farmer Training
  "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=800&q=80", // Feedback and Reporting
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80", // Personalized Advisory
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80", // Support Center
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80", // Knowledge Hub
];

const services = [
  {
    title: "24/7 Customer Support",
    desc: "Our dedicated help desk is always online to assist with technical issues, user guidance, and troubleshooting crop disease reports.",
    img: serviceImages[0],
    icon: <Headset className="w-6 h-6 text-green-600 dark:text-green-300" />,
  },
  {
    title: "Farmer Training Programs",
    desc: "We conduct regular training on how to use the app, submit images, and interpret diagnosis and recommendations effectively.",
    img: serviceImages[1],
    icon: <BookOpen className="w-6 h-6 text-green-600 dark:text-green-300" />,
  },
  {
    title: "Feedback & Reporting",
    desc: "Users can easily send feedback or report bugs within the app. Our team ensures issues are resolved quickly and transparently.",
    img: serviceImages[2],
    icon: (
      <MessageSquare className="w-6 h-6 text-green-600 dark:text-green-300" />
    ),
  },
  {
    title: "Personalized Advisory",
    desc: "Receive crop-specific tips and treatment updates tailored to your location and previous disease reports.",
    img: serviceImages[3],
    icon: <UserCircle className="w-6 h-6 text-green-600 dark:text-green-300" />,
  },
  {
    title: "Regional Support Centers",
    desc: "Farmers can visit nearby centers for in-person assistance, hands-on help, and direct access to agricultural officers.",
    img: serviceImages[4],
    icon: <MapPin className="w-6 h-6 text-green-600 dark:text-green-300" />,
  },
  {
    title: "Digital Knowledge Hub",
    desc: "Access guides, FAQs, tutorials, and research updates through our easy-to-navigate knowledge base built for the farming community.",
    img: serviceImages[5],
    icon: <Database className="w-6 h-6 text-green-600 dark:text-green-300" />,
  },
];

function Services() {
  return (
    <div className="min-h-screen flex items-center justify-center py-16 sm:py-20 px-4 transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full mb-6">
            <Headset className="w-5 h-5 text-green-600 dark:text-green-300 mr-2" />
            <span className="text-green-700 dark:text-green-300 font-medium">
              Customer Services
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-green-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent dark:from-green-300 dark:to-green-100">
              Support That Strengthens
            </span>{" "}
            Farming Communities
          </h1>
          <p className="text-lg text-green-700 dark:text-green-300 max-w-3xl mx-auto">
            FarmSense not only predicts and monitors crop diseases but also
            provides robust customer support to ensure farmers have the help
            they need, when they need it.
          </p>
        </motion.section>

        {/* Service Cards */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-green-200 dark:border-green-700 shadow-lg hover:shadow-xl transition-all overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="bg-green-100 dark:bg-green-900/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-green-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-green-700 dark:text-green-300">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* Additional Support Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-green-200 dark:border-green-700 shadow-lg p-8"
        >
          <h2 className="text-2xl font-semibold text-center text-green-900 dark:text-white mb-8">
            Comprehensive Support System
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-100 dark:border-green-800">
              <h3 className="font-semibold text-green-900 dark:text-white mb-3 flex items-center gap-2">
                <Headset className="w-5 h-5 text-green-600 dark:text-green-300" />
                Multi-Channel Assistance
              </h3>
              <p className="text-green-700 dark:text-green-300">
                Get help through our app, phone hotline, WhatsApp, and regional
                support centers. We meet farmers where they're most comfortable.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-100 dark:border-green-800">
              <h3 className="font-semibold text-green-900 dark:text-white mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-600 dark:text-green-300" />
                Language Support
              </h3>
              <p className="text-green-700 dark:text-green-300">
                Services available in Sinhala, Tamil, and English to ensure all
                farmers can access support in their preferred language.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-100 dark:border-green-800">
              <h3 className="font-semibold text-green-900 dark:text-white mb-3 flex items-center gap-2">
                <UserCircle className="w-5 h-5 text-green-600 dark:text-green-300" />
                Farmer Success Stories
              </h3>
              <p className="text-green-700 dark:text-green-300">
                Learn how other farmers have successfully used our support
                services to overcome crop challenges and improve yields.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-100 dark:border-green-800">
              <h3 className="font-semibold text-green-900 dark:text-white mb-3 flex items-center gap-2">
                <Database className="w-5 h-5 text-green-600 dark:text-green-300" />
                Continuous Improvement
              </h3>
              <p className="text-green-700 dark:text-green-300">
                We regularly update our services based on farmer feedback and
                emerging agricultural challenges.
              </p>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-white dark:bg-green-900/80 rounded-xl shadow-lg p-8 border border-green-200 dark:border-green-700"
        >
          <h2 className="text-2xl font-semibold text-green-800 dark:text-white mb-4">
            Need Help With Your Crops?
          </h2>
          <p className="text-green-700 dark:text-green-200 mb-6 max-w-2xl mx-auto">
            Our support team is ready to assist you with any questions about
            crop diseases, app usage, or agricultural best practices.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-lg font-medium shadow-md transition-colors">
              Contact Support
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default Services;
