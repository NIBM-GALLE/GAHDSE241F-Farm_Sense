import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Leaf,
  User,
  Calendar,
  Image as ImageIcon,
  ChevronRight,
  MapPin,
  Building2,
  MessageCircle,
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
    assignedVisitAgent: "",
    researchDivision: {
      name: "Plant Pathology Division",
      status: "answered",
      comment:
        "Fungal infection suspected. Recommend field inspection and sample collection for lab analysis.",
    },
  },
  "case-002": {
    id: "case-002",
    plantName: "Chili",
    farmer: "Nirosha Silva",
    issue: "Wilting and brown spots",
    status: "pending",
    createdAt: "2024-06-02",
    location: "Kurunegala",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    assignedVisitAgent: "",
    researchDivision: {
      name: "Plant Pathology Division",
      status: "answered",
      comment:
        "Possible bacterial wilt. Advise to avoid overhead irrigation and monitor soil moisture.",
    },
  },
  "case-003": {
    id: "case-003",
    plantName: "Banana",
    farmer: "Ajith Kumara",
    issue: "Yellowing leaves and stunted growth",
    status: "in-progress",
    createdAt: "2024-06-03",
    location: "Matara",
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=400&q=80",
    assignedVisitAgent: "",
    researchDivision: {
      name: "Plant Pathology Division",
      status: "answered",
      comment:
        "Likely nutrient deficiency. Recommend soil testing and fertilizer adjustment.",
    },
  },
};

const visitAgents = ["Tharindu Senanayake", "Ishara Fernando", "Ajith Kumara"];

function Cases() {
  const { id } = useParams();

  const currentCase = casesData[id];

  // Always default to "" so "Select Agent" is shown unless user picks one
  const [selectedAgent, setSelectedAgent] = useState("");

  if (!currentCase) {
    return (
      <div className="min-h-screen py-16 sm:py-20 px-4 bg-white dark:bg-[#111827] transition-colors">
        <div className="text-center space-y-4 p-8 bg-white dark:bg-black rounded-xl border border-green-700 shadow-lg">
          <h2 className="text-2xl font-bold text-green-900 dark:text-white">
            Case Not Found
          </h2>
          <Link
            to="/dashboard/cases"
            className="bg-green-600 hover:bg-green-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Cases
          </Link>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      "in-progress":
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      resolved:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      answered:
        "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
    };
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusMap[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen py-16 sm:py-20 px-4 bg-balck transition-colors">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#1f2937] border border-green-700 rounded-xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-green-100 dark:bg-[#22311a] p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-200 dark:bg-green-900/50 flex items-center justify-center">
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
              <div>{getStatusBadge(currentCase.status)}</div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* Image */}
            <div className="flex flex-col items-center">
              <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-3 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Plant Image
              </h4>
              <img
                src={currentCase.image}
                alt="Plant"
                className="w-full max-w-xs h-64 object-cover rounded-lg border border-green-700 shadow-sm"
              />
              <p className="text-xs text-green-500 dark:text-green-400 mt-2">
                Uploaded by farmer
              </p>
            </div>

            {/* Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
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
                  <Calendar className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
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
                  <MapPin className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
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
                <div className="bg-green-50 dark:bg-green-900/10 border border-green-700 rounded-lg p-4">
                  <p className="text-green-900 dark:text-green-100">
                    {currentCase.issue}
                  </p>
                </div>
              </div>
            </div>

            {/* Assign Visit Agent */}
            <div className="pt-6">
              <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-300">
                Assign Visit Agent
              </label>
              <select
                className="w-full bg-green-50 dark:bg-[#222b3a] border border-green-700 text-green-900 dark:text-green-100 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
              >
                <option value="" disabled>
                  Select Agent
                </option>
                {visitAgents.map((agent) => (
                  <option key={agent} value={agent}>
                    {agent}
                  </option>
                ))}
              </select>
            </div>

            {/* Research Division Info */}
            {currentCase.researchDivision && (
              <div className="pt-6">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">
                      Research Division
                    </h4>
                    <p className="text-green-900 dark:text-green-100">
                      {currentCase.researchDivision.name}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      {getStatusBadge(currentCase.researchDivision.status)}
                      {currentCase.researchDivision.comment && (
                        <span className="ml-2 flex items-center text-green-800 dark:text-green-200 text-xs bg-green-100 dark:bg-green-900/30 rounded px-2 py-1">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {currentCase.researchDivision.comment}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
              <Link
                to="/dashboard/cases"
                className="bg-green-600 hover:bg-green-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Cases
              </Link>
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
