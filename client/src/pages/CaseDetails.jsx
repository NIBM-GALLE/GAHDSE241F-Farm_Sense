import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Loader2,
  ArrowLeft,
  MessageSquare,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useFarmerStore } from "@/stores/useFarmerStore";

function CaseDetails() {
  const { caseId } = useParams();
  console.log("Case ID:", caseId);
  const { plantCase, getPlantCaseById, loading } = useFarmerStore();

  useEffect(() => {
    if (caseId) {
      getPlantCaseById(caseId);
    }
  }, [caseId, getPlantCaseById]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return <Clock className="w-5 h-5 mr-2" />;
      case "resolved":
        return <CheckCircle className="w-5 h-5 mr-2" />;
      case "in progress":
        return <MessageSquare className="w-5 h-5 mr-2" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "in progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  if (loading.fetchingCaseByIdLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (!plantCase || Object.keys(plantCase).length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Case not found</p>
          <Button asChild variant="outline">
            <Link to="/profile" className="text-green-600 dark:text-green-300">
              Back to Profile
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 sm:py-20 px-4 bg-balck transition-colors">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Button asChild variant="ghost">
            <Link
              to="/profile"
              className="flex items-center gap-2 text-green-600 dark:text-green-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Cases
            </Link>
          </Button>
        </div>

        {/* Case Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-[#1f2937] rounded-xl shadow border border-green-200 dark:border-green-700 p-6 mb-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-green-900 dark:text-white">
                Case Details
              </h2>
              <p className="text-green-700 dark:text-green-300">
                Reported on {formatDate(plantCase.createdAt)}
              </p>
            </div>
            <div className="flex items-center">
              <span
                className={`px-3 py-1 inline-flex items-center text-sm leading-5 font-semibold rounded-full ${getStatusColor(
                  plantCase.status
                )}`}
              >
                {getStatusIcon(plantCase.status)}
                {plantCase.status}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Case Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
        >
          {/* Plant Info */}
          <div className="bg-white dark:bg-[#1f2937] rounded-xl shadow border border-green-200 dark:border-green-700 p-6">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4">
              Plant Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Plant Name
                </p>
                <p className="text-green-900 dark:text-white">
                  {plantCase.plantName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Plant Issue
                </p>
                <p className="text-green-900 dark:text-white">
                  {plantCase.plantIssue}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sub-Center
                </p>
                <p className="text-green-900 dark:text-white">
                  {plantCase.assignedSubCenter?.location || "Not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Visit Agent Details */}
          {plantCase.assignedVisitAgent && (
            <div className="bg-white dark:bg-[#1f2937] rounded-xl shadow border border-green-200 dark:border-green-700 p-6 md:col-span-2">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4">
                Visit Agent Details
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Visit Agent Name
                  </p>
                  <p className="text-green-900 dark:text-white whitespace-pre-line">
                    {plantCase.assignedVisitAgent.name || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Visit Agent Email
                  </p>
                  <p className="text-green-900 dark:text-white whitespace-pre-line">
                    {plantCase.assignedVisitAgent.email || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Images Section */}
        {plantCase.images && plantCase.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white dark:bg-[#1f2937] rounded-xl shadow border border-green-200 dark:border-green-700 p-6 mb-6"
          >
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4">
              Images
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {plantCase.images.map((image, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  <img
                    src={image}
                    alt={`Case image ${index + 1}`}
                    className="w-full h-40 object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Research Division Info */}
        {plantCase.assignedResearchDivision && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-white dark:bg-[#1f2937] rounded-xl shadow border border-green-200 dark:border-green-700 p-6"
          >
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4">
              Research Division Location
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <span className="text-green-600 dark:text-green-300 font-medium">
                  {plantCase.assignedResearchDivision.location
                    ?.charAt(0)
                    .toUpperCase() || "R"}
                </span>
              </div>
              <div>
                <p className="text-green-900 dark:text-white font-medium">
                  {plantCase.assignedResearchDivision.email ||
                    "Research Division"}
                </p>
                {plantCase.answer && (
                  <p className="text-green-700 dark:text-green-300">
                    Answer : {plantCase.answer}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default CaseDetails;
