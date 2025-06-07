import React, { useState, useRef, useEffect } from "react";
import { User, Bot, Leaf, ImagePlus, X } from "lucide-react";
import { motion } from "framer-motion";
import { useModelStore } from "@/stores/useModelStore";
import toast from "react-hot-toast";

function Chat() {
  const { getPrediction, loading: modelLoading } = useModelStore();
  const [chats, setChats] = useState([
    {
      from: "bot",
      type: "text",
      content: "Hello! Upload an image of your crop for diagnosis.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [image, setImage] = useState(null);
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-scroll to bottom when chats update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const handleSendImage = async () => {
    if (!image) return;

    // Add user's image to chat
    setChats((prev) => [
      ...prev,
      {
        from: "farmer",
        type: "image",
        content: image,
      },
    ]);

    try {
      setIsTyping(true);

      // Get prediction from model
      const result = await getPrediction(image);

      // Format the bot's response
      const botResponse = `Cause: ${result.cause}\n\nTreatment: ${result.cure}`;

      // Add bot's response to chat
      setChats((prev) => [
        ...prev,
        {
          from: "bot",
          type: "text",
          content: botResponse,
        },
      ]);
    } catch (error) {
      console.error("Prediction error:", error);
      setChats((prev) => [
        ...prev,
        {
          from: "bot",
          type: "text",
          content:
            "Sorry, I couldn't analyze that image. Please try again with a clearer photo of the affected plant.",
        },
      ]);
    } finally {
      setIsTyping(false);
      setImage(null);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Please upload an image smaller than 5MB");
      return;
    }
    if (!file.type.match("image.*")) {
      toast.error("Please upload an image file (JPEG, PNG, etc.)");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => fileInputRef.current.click();
  const handleBack = () => window.history.back();

  return (
    <div className="min-h-screen py-16 sm:py-20 px-4 bg-black transition-colors">
      <div className="max-w-3xl w-full mx-auto flex flex-col flex-1">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <Leaf className="w-8 h-8 text-green-600 dark:text-green-400 drop-shadow" />
            <h1 className="text-2xl sm:text-3xl font-bold text-green-900 dark:text-white tracking-tight">
              FarmSense Chat Support
            </h1>
          </div>
          <p className="text-green-700 dark:text-green-300 text-sm sm:text-base">
            Upload a crop image for fast, expert help.
          </p>
        </motion.div>

        {/* Main chat container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex flex-col bg-white dark:bg-gray-800 rounded-2xl border border-green-100 dark:border-green-700 shadow-xl min-h-[75vh] h-[85vh]"
        >
          {/* Chat header */}
          <div className="p-4 border-b border-green-100 dark:border-green-900/50 bg-green-50 dark:bg-green-900/20 rounded-t-2xl flex justify-between items-center">
            <div>
              <h3 className="text-base font-semibold text-green-900 dark:text-white">
                {chats.length > 1 ? "Ongoing conversation" : "Ask Your Problem"}
              </h3>
              <p className="text-xs text-green-600 dark:text-green-300">
                {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  isTyping ? "bg-yellow-500 animate-pulse" : "bg-green-500"
                }`}
              ></span>
              <span className="text-xs text-gray-600 dark:text-gray-300">
                {isTyping ? "Analyzing image..." : "Online"}
              </span>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-green-50/30 dark:bg-gray-900/30 rounded-b-2xl">
            {chats.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${
                  msg.from === "farmer" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-xl max-w-xs sm:max-w-md shadow flex items-end gap-2 whitespace-pre-wrap ${
                    msg.from === "farmer"
                      ? "bg-green-600 text-white rounded-br-none"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none"
                  }`}
                >
                  {msg.type === "image" ? (
                    <div className="flex flex-col gap-1">
                      <img
                        src={msg.content}
                        alt="Uploaded crop photo"
                        className="max-w-[180px] max-h-[180px] object-contain rounded border border-green-200 dark:border-green-800"
                      />
                      <span className="text-xs text-green-100 dark:text-green-300">
                        Photo sent
                      </span>
                    </div>
                  ) : (
                    <span>{msg.content}</span>
                  )}
                  {msg.from === "bot" ? (
                    <Bot className="w-4 h-4 text-gray-500 dark:text-gray-300 flex-shrink-0" />
                  ) : (
                    <User className="w-4 h-4 text-green-100 flex-shrink-0" />
                  )}
                </div>
              </motion.div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Image upload area */}
          <div className="p-4 border-t border-green-100 dark:border-green-900/50 bg-green-50/60 dark:bg-gray-700/20 rounded-b-2xl">
            {image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-3 relative inline-block"
              >
                <div className="flex items-center gap-2 bg-white dark:bg-gray-700 p-2 rounded-lg border border-green-200 dark:border-green-800">
                  <img
                    src={image}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    Ready to send
                  </div>
                </div>
                <button
                  onClick={() => setImage(null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  aria-label="Remove image"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            )}

            <div className="flex gap-2 items-center justify-center">
              <button
                onClick={triggerFileInput}
                className="p-3 rounded-full bg-green-100 hover:bg-green-200 dark:bg-green-800/30 dark:hover:bg-green-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
                aria-label="Attach image"
                title="Attach image (max 5MB)"
                disabled={modelLoading}
              >
                <ImagePlus className="w-6 h-6 text-green-600 dark:text-green-300" />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageUpload}
                disabled={modelLoading}
              />
              <button
                onClick={handleSendImage}
                disabled={!image || modelLoading}
                className={`px-6 py-2 rounded-lg font-medium shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-green-400 ${
                  !image || modelLoading
                    ? "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white"
                }`}
                aria-label="Send image"
              >
                {modelLoading ? "Analyzing..." : "Send Image"}
              </button>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              <span>
                Only image upload is enabled • Maximum file size: 5MB •
                Supported formats: JPEG, PNG
              </span>
            </div>
          </div>
        </motion.div>

        {/* Back Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-green-100 hover:bg-green-200 dark:bg-green-800/40 dark:hover:bg-green-800/70 text-green-800 dark:text-green-200 font-semibold shadow transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4 mb-8"
        >
          <p>FarmSense support team available 24/7</p>
          <p className="mt-1">
            Average response time: 15-30 minutes during business hours
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Chat;
