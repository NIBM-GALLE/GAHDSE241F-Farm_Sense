import { Button } from "../components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, Search, BarChart3 } from "lucide-react";

const heroPng =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80";

export default function Hero() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Search className="w-5 h-5 text-white-600" />,
      title: "AI-Based Detection",
      description: "Identify crop diseases instantly with our ML model",
      border: "border-2 border-white",
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-white-600" />,
      title: "Centralized Monitoring",
      description: "Track and manage reports from one place",
      border: "border-2 border-white",
    },
    {
      icon: <Leaf className="w-5 h-5 text-white-600" />,
      title: "Farmer Friendly",
      description: "Designed for simplicity and quick use in the field",
      border: "border-2 border-white",
    },
  ];

  return (
    <section className="relative flex items-center justify-center min-h-[90vh] sm:min-h-screen bg-gradient-to-br from-green-100 to-green-300 dark:from-green-800 dark:to-green-900 text-green-900 dark:text-white px-4 py-20 overflow-hidden transition-colors">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroPng}
          alt="Farmer in field"
          className="w-full h-full object-cover opacity-10 dark:opacity-20"
          loading="eager"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center w-full max-w-4xl px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-green-900 dark:text-white"
        >
          <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent dark:from-green-300 dark:to-green-100">
            Smart Crop
          </span>{" "}
          Disease Prediction for Every Farmer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl text-green-800 dark:text-green-100 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Empowering Sri Lankan agriculture with AI-driven diagnosis, real-time
          updates, and field-ready mobile access.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
        >
          <Link to="/Chat">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg font-semibold shadow-lg transition-all hover:shadow-green-700/30"
            >
              Upload a Crop Image
            </Button>
          </Link>
          <Link to="/how-it-works">
            <Button
              variant="outline"
              size="lg"
              className="border-green-600 text-green-700 hover:bg-green-100 hover:text-green-900 px-8 py-6 text-lg font-semibold dark:border-white dark:text-white dark:hover:bg-white/10 dark:hover:text-white"
            >
              How It Works
            </Button>
          </Link>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{
                y: -5,
                boxShadow: "0 8px 32px 0 rgba(34,197,94,0.15)",
              }}
              className={`bg-white/80 dark:bg-white/5 p-6 rounded-xl ${f.border} hover:border-green-400 transition-all hover:shadow-lg hover:shadow-green-900/20`}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-600/10 rounded-full backdrop-blur-sm">
                  {f.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-green-900 dark:text-white mb-2">
                {f.title}
              </h3>
              <p className="text-green-800 dark:text-green-100/80">
                {f.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
