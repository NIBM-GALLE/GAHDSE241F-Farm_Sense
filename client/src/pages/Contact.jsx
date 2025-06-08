import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useFarmerStore } from "@/stores/useFarmerStore";
import { useUserStore } from "@/stores/useUserStore";

const contactImage =
  "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=800&q=80";

function Contact() {
  const { createReport, loading } = useFarmerStore();
  const { user } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const message = form.message.value.trim();

    if (!message) {
      alert("Please enter a message.");
      return;
    }

    if (message.length < 5 || message.length > 500) {
      alert("Message must be between 5 and 500 characters.");
      return;
    }

    await createReport(message);
    form.reset();
  };

  return (
    <div className="min-h-screen py-16 sm:py-20 px-4 bg-balck transition-colors">
      <div className="max-w-4xl w-full mx-auto">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full mb-4">
            <Mail className="w-5 h-5 text-green-600 dark:text-green-300 mr-2" />
            <span className="text-green-700 dark:text-green-300 font-medium">
              Get In Touch
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-green-900 dark:text-white mb-3">
            <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent dark:from-green-300 dark:to-green-100">
              Contact Our Support
            </span>{" "}
            Team
          </h1>
          <p className="text-green-700 dark:text-green-300 text-base max-w-2xl mx-auto">
            We're here to help with any questions about FarmSense or crop
            disease assistance.
          </p>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl border border-green-200 dark:border-green-700 shadow-lg p-8"
          >
            <h2 className="text-2xl font-semibold text-green-900 dark:text-white mb-6">
              Send Your Message
            </h2>
            {user ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-green-800 dark:text-green-200 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-green-200 dark:border-green-700 bg-green-50/50 dark:bg-green-900/20 text-green-900 dark:text-green-100 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Type your question or issue here..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading.createReportLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 relative overflow-hidden"
                >
                  {loading.createReportLoading && (
                    <motion.span
                      className="absolute left-0 top-0 h-full bg-green-700 opacity-20"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  <Send className="w-5 h-5" />
                  {loading.createReportLoading ? "Sending..." : "Send Message"}
                </button>
              </form>
            ) : (
              <div className="text-center py-10">
                <p className="text-green-800 dark:text-green-100 mb-4">
                  Please{" "}
                  <a
                    href="/login"
                    className="text-green-600 underline hover:text-green-800"
                  >
                    sign in
                  </a>{" "}
                  to send us a message.
                </p>
                <p className="text-green-700 dark:text-green-300">
                  Or contact us directly using the information on the right.
                </p>
              </div>
            )}
          </motion.div>

          {/* Contact Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl border border-green-200 dark:border-green-700 shadow-lg overflow-hidden">
              <img
                src={contactImage}
                alt="FarmSense Team"
                className="w-full h-48 object-cover"
              />
              <div className="p-6 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                    <Mail className="w-5 h-5 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-green-900 dark:text-white">
                      Email
                    </h4>
                    <a
                      href="mailto:help@farmsense.com"
                      className="text-green-600 dark:text-green-400 hover:underline"
                    >
                      help@farmsense.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                    <Phone className="w-5 h-5 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-green-900 dark:text-white">
                      Phone
                    </h4>
                    <a
                      href="tel:+94112345678"
                      className="text-green-600 dark:text-green-400 hover:underline"
                    >
                      +94 11 234 5678
                    </a>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      Mon–Fri, 8:00 AM – 5:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                    <MapPin className="w-5 h-5 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-green-900 dark:text-white">
                      Address
                    </h4>
                    <p className="text-green-700 dark:text-green-300">
                      Galle Road, Colombo 03, Sri Lanka
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Friendly tip box */}
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-200 dark:border-green-700 p-6 flex items-center gap-3">
              <span className="inline-flex items-center justify-center bg-green-200 dark:bg-green-800 rounded-full w-10 h-10">
                <Mail className="w-6 h-6 text-green-700 dark:text-green-300" />
              </span>
              <div>
                <h4 className="font-semibold text-green-900 dark:text-white mb-1">
                  Quick Tip
                </h4>
                <p className="text-green-700 dark:text-green-300 text-sm">
                  For the fastest response, please include your crop type and a
                  brief description of your issue.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
