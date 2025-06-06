import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Phone, Mail, User } from "lucide-react";

const researchDivisions = {
  "plant-pathology": {
    name: "Plant Pathology Division",
    focus: "Detection and control of plant diseases in tropical crops",
    email: "pathology@farmsense.lk",
    phone: "011-2345678",
    lead: "Dr. Malika Fernando",
    image: "https://picsum.photos/400/300?random=1",
  },
  entomology: {
    name: "Entomology Division",
    focus: "Study and control of insect-related crop threats",
    email: "entomology@farmsense.lk",
    phone: "011-2356789",
    lead: "Dr. K. Seneviratne",
    image: "https://picsum.photos/400/300?random=2",
  },
  "soil-science": {
    name: "Soil Science Division",
    focus: "Research on soil health and sustainable fertilizer use",
    email: "soilscience@farmsense.lk",
    phone: "011-2367890",
    lead: "Dr. Ruwan Jayawardena",
    image: "https://picsum.photos/400/300?random=3",
  },
  "data-analysis": {
    name: "Agro Data Analysis Unit",
    focus: "AI-driven analytics for disease trends and forecasting",
    email: "analytics@farmsense.lk",
    phone: "011-2378901",
    lead: "Dr. Chamari Abeykoon",
    image: "https://picsum.photos/400/300?random=4",
  },
};

function ResearchDivisions() {
  const { id } = useParams();
  const division = researchDivisions[id];

  if (!division) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#111827] bg-gradient-to-b from-green-900/10 to-green-900/5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8 bg-white/5 dark:bg-[#1f2937] backdrop-blur-sm rounded-xl border border-white/10 dark:border-green-800"
        >
          <h2 className="text-2xl font-bold text-green-900 dark:text-white mb-4">
            Research Division Not Found
          </h2>
          <Link
            to="/dashboard/research-divisions"
            className="flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium transition"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Divisions
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 sm:py-20 px-4 bg-balck transition-colors">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 dark:bg-[#1f2937] backdrop-blur-sm rounded-xl border border-white/10 dark:border-green-800 shadow-lg overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="md:w-1/3 bg-green-900/20 flex items-center justify-center p-6"
            >
              <img
                src={division.image}
                alt={division.name}
                className="w-full h-64 md:h-auto object-cover rounded-lg shadow-md"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />
            </motion.div>

            <div className="md:w-2/3 p-6 md:p-8">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-bold text-green-900 dark:text-white mb-6"
              >
                {division.name}
              </motion.h1>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-green-700 dark:text-green-300">
                      Research Focus
                    </h3>
                    <p className="text-green-800 dark:text-green-100">
                      {division.focus}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-green-700 dark:text-green-300">
                      Phone
                    </h3>
                    <p className="text-green-800 dark:text-green-100">
                      {division.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-green-700 dark:text-green-300">
                      Email
                    </h3>
                    <p className="text-green-800 dark:text-green-100">
                      {division.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <User className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-green-700 dark:text-green-300">
                      Lead Researcher
                    </h3>
                    <p className="text-green-800 dark:text-green-100">
                      {division.lead}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <Link
                  to="/dashboard/research-divisions"
                  className="flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium transition"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to All Divisions
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ResearchDivisions;
