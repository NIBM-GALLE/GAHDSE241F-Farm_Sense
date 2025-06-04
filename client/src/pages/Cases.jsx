import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Leaf,
  User,
  Calendar,
  Image as ImageIcon,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { Button } from "../components/ui/button";

const casesData = {
  "case-001": {
    id: "case-001",
    plantName: "Tomato",
    farmer: "Kamal Perera",
    issue: "Leaf spots and yellowing",
    status: "pending",
    createdAt: "2024-06-01",
    location: "Gampaha",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  "case-002": {
    id: "case-002",
    plantName: "Chili",
    farmer: "Nirosha Silva",
    issue: "Wilting and stem rot",
    status: "in-progress",
    createdAt: "2024-06-03",
    location: "Matara",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  "case-003": {
    id: "case-003",
    plantName: "Banana",
    farmer: "Ajith Kumara",
    issue: "Fungal infection on roots",
    status: "resolved",
    createdAt: "2024-06-04",
    location: "Anuradhapura",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80",
  },
};

function Cases() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentCase = casesData[id];

  if (!currentCase) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#111827]">
        <div className="text-center space-y-4 p-8 bg-white/90 dark:bg-[#1f2937] rounded-xl border border-green-200 dark:border-green-700 shadow-lg">
          <h2 className="text-2xl font-bold text-green-900 dark:text-white">
            Case Not Found
          </h2>
          <Button
            onClick={() => navigate("/cases")}
            className="bg-green-600 hover:bg-green-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Cases
          </Button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: {
        text: "Pending",
        class:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      },
      "in-progress": {
        text: "In Progress",
        class:
          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      },
      resolved: {
        text: "Resolved",
        class:
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      },
    };

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusMap[status].class}`}
      >
        {statusMap[status].text}
      </span>
    );
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-white dark:bg-[#111827] bg-gradient-to-b from-green-900/10 to-green-900/5 dark:from-green-900/20 dark:to-green-900/5 transition-colors">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#1f2937] border border-green-200 dark:border-green-700 rounded-xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-green-50 dark:bg-[#22311a] p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-green-900 dark:text-white">
                    {currentCase.plantName}
                  </h2>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Case ID: {currentCase.id}
                  </p>
                </div>
              </div>
              <div className="text-right">
                {getStatusBadge(currentCase.status)}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* Image Section */}
            <div className="flex flex-col items-center">
              <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-3 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Plant Image
              </h4>
              <div className="w-full flex justify-center">
                {currentCase.image ? (
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="cursor-pointer"
                  >
                    <img
                      src={currentCase.image}
                      alt={currentCase.plantName}
                      className="w-full max-w-xs h-64 object-cover rounded-lg border border-green-200 dark:border-green-700 shadow-sm"
                    />
                  </motion.div>
                ) : (
                  <div className="w-full max-w-xs h-64 flex items-center justify-center bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700 opacity-60">
                    <ImageIcon className="w-12 h-12 text-green-200" />
                  </div>
                )}
              </div>
              <p className="text-xs text-green-500 dark:text-green-400 mt-2">
                {currentCase.image ? "Uploaded by farmer" : "No image uploaded"}
              </p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">
                      Farmer
                    </h4>
                    <p className="text-green-900 dark:text-green-100">
                      {currentCase.farmer}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">
                      Submitted Date
                    </h4>
                    <p className="text-green-900 dark:text-green-100">
                      {currentCase.createdAt}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">
                      Location
                    </h4>
                    <p className="text-green-900 dark:text-green-100">
                      {currentCase.location}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                  Issue Description
                </h4>
                <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-700 rounded-lg p-4">
                  <p className="text-green-900 dark:text-green-100">
                    {currentCase.issue}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
              <Button
                onClick={() => navigate("/cases")}
                className="bg-green-600 hover:bg-green-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Cases
              </Button>
              {currentCase.status !== "resolved" && (
                <Button
                  variant="outline"
                  className="border-green-600 text-green-700 dark:text-green-300"
                >
                  Update Status <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Cases;
