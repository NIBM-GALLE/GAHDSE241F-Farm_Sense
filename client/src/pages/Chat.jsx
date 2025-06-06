import React, { useState, useRef, useEffect } from "react";
import {
  Paperclip,
  Send,
  ImagePlus,
  User,
  Bot,
  Leaf,
  PlusCircle,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button";

function Chat() {
  const [chats, setChats] = useState([
    [
      {
        from: "bot",
        type: "text",
        content: "Hello! How can we help you today with your crops?",
      },
    ],
  ]);
  const [currentChatIndex, setCurrentChatIndex] = useState(0);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const [showNewChatButton, setShowNewChatButton] = useState(true);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, currentChatIndex]);

  const handleSend = () => {
    if (!input.trim() && !image) return;

    const newMessage = {
      from: "farmer",
      type: image ? "image" : "text",
      content: image || input,
    };

    const updatedChats = [...chats];
    updatedChats[currentChatIndex] = [
      ...updatedChats[currentChatIndex],
      newMessage,
    ];
    setChats(updatedChats);
    setInput("");
    setImage(null);
    setIsTyping(true);

    setTimeout(() => {
      const botResponses = [
        "Thanks for your message! Our team will analyze your query and respond shortly.",
        "We've received your query. Our agricultural experts are reviewing it now.",
        "Your question has been logged. We'll get back to you with expert advice soon.",
      ];
      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];

      updatedChats[currentChatIndex].push({
        from: "bot",
        type: "text",
        content: randomResponse,
      });
      setChats([...updatedChats]);
      setIsTyping(false);
    }, 1500);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Please upload an image smaller than 5MB");
        return;
      }
      if (!file.type.match("image.*")) {
        alert("Please upload an image file (JPEG, PNG, etc.)");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();

  const startNewChat = () => {
    setChats([...chats, []]);
    setCurrentChatIndex(chats.length);
    setInput("");
    setImage(null);
    setShowNewChatButton(false);
    setTimeout(() => setShowNewChatButton(true), 500);
  };

  const switchChat = (index) => {
    setCurrentChatIndex(index);
    setInput("");
    setImage(null);
  };

  return (
    <div className="min-h-screen py-16 sm:py-20 px-4 bg-balck transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Header with chat tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="flex items-center gap-3">
              <Leaf className="w-6 h-6 text-green-600 dark:text-green-400" />
              <h1 className="text-xl sm:text-2xl font-bold text-green-900 dark:text-white">
                FarmSense Chat Support
              </h1>
            </div>
          </div>

          {/* Chat tabs */}
          <div className="flex overflow-x-auto pb-2 gap-1 scrollbar-hide">
            {chats.map((_, index) => (
              <button
                key={index}
                onClick={() => switchChat(index)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  currentChatIndex === index
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
                aria-label={`Switch to chat ${index + 1}`}
              >
                Chat {index + 1}
                {index === chats.length - 1 && index !== 0 && (
                  <span className="ml-1 text-xs">(New)</span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main chat container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-green-100 dark:border-green-700 shadow-sm flex flex-col h-[70vh]"
        >
          {/* Chat header */}
          <div className="p-3 sm:p-4 border-b border-green-100 dark:border-green-900/50 bg-green-50 dark:bg-green-900/20 rounded-t-xl flex justify-between items-center">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-green-900 dark:text-white">
                {chats[currentChatIndex].length > 1
                  ? "Ongoing conversation"
                  : "New conversation started"}
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
                {isTyping ? "Expert is typing..." : "Online"}
              </span>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
            {chats[currentChatIndex].length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <Leaf className="w-10 h-10 text-green-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start a new conversation
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                  Ask our agricultural experts about crop issues, weather
                  impacts, or farming techniques. Attach photos for better
                  diagnosis.
                </p>
              </div>
            ) : (
              chats[currentChatIndex].map((msg, i) => (
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
                    className={`px-3 py-2 rounded-lg max-w-xs sm:max-w-md shadow-sm flex items-end gap-2 whitespace-pre-wrap ${
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
              ))
            )}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Expert is typing...
                  </span>
                </div>
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input area */}
          <div className="p-3 sm:p-4 border-t border-green-100 dark:border-green-900/50 bg-green-50/60 dark:bg-gray-700/20 rounded-b-xl">
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

            <div className="flex gap-2 items-center">
              <button
                onClick={triggerFileInput}
                className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
                aria-label="Attach image"
                title="Attach image (max 5MB)"
              >
                <ImagePlus className="w-5 h-5 text-green-600 dark:text-green-300" />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageUpload}
              />
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your question about crops..."
                  className="w-full px-4 py-2 rounded-lg border border-green-200 dark:border-green-800 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent pr-12 text-sm"
                  aria-label="Type your message"
                />
                {input && (
                  <button
                    onClick={() => setInput("")}
                    className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    aria-label="Clear message"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <Button
                onClick={handleSend}
                disabled={!input.trim() && !image}
                className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white p-2 rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                size="icon"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              {!image && (
                <span>
                  Tip: Press <kbd>Enter</kbd> to send • Attach photos of crops
                  for better diagnosis
                </span>
              )}
              {image && (
                <span>
                  Image ready to send • Maximum file size: 5MB • Supported
                  formats: JPEG, PNG
                </span>
              )}
            </div>
          </div>
        </motion.div>

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

      {/* New Chat Button directly under the footer */}
      <AnimatePresence>
        {showNewChatButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center mb-8"
          >
            <Button
              onClick={startNewChat}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all hover:shadow-green-700/40"
              aria-label="Start new chat"
            >
              <PlusCircle className="w-5 h-5" />
              <span className="hidden sm:inline">New Chat</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Chat;
