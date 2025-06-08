import React, { useState, useEffect } from "react";
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
  Building2,
  MessageCircle,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { useSubCenter } from "@/stores/useSubCenter";

function Cases() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    case: currentCase,
    loading,
    fetchCase,
    visitAgents,
    researchCenters,
    fetchVisitAgents,
    fetchResearchCenters,
    assignVisitAgentToPlantCase,
    assignResearchCenterToPlantCase,
  } = useSubCenter();

  const [selectedAgent, setSelectedAgent] = useState("");
  const [selectedCenter, setSelectedCenter] = useState("");

  useEffect(() => {
    if (id) {
      fetchCase(id);
      fetchVisitAgents();
      fetchResearchCenters();
    }
  }, [id, fetchCase, fetchVisitAgents, fetchResearchCenters]);

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

  const handleAssignAgent = async () => {
    if (selectedAgent && id) {
      await assignVisitAgentToPlantCase(id, selectedAgent);
      await fetchCase(id); // Refetch the case to update the UI
      setSelectedAgent("");
    }
  };

  const handleAssignCenter = async () => {
    if (selectedCenter && id) {
      console.log("Case ID:", id);
      console.log("Selected Center ID:", selectedCenter);
      await assignResearchCenterToPlantCase(id, selectedCenter);
      await fetchCase(id); // Refetch the case to update the UI
      setSelectedCenter("");
    }
  };

  if (loading.fetchCase) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#111827] transition-colors">
        <div className="flex flex-col items-center gap-6 p-8 bg-white dark:bg-[#181f2a] rounded-xl border border-green-200 dark:border-green-700 shadow-lg">
          <span className="inline-block animate-spin rounded-full border-4 border-green-500 border-t-transparent h-12 w-12 mb-2" />
          <h2 className="text-2xl font-bold text-green-900 dark:text-white">
            Loading case details...
          </h2>
          <p className="text-green-700 dark:text-green-300 text-sm">
            Please wait while we fetch the latest information.
          </p>
        </div>
      </div>
    );
  }

  if (!currentCase) {
    return (
      <div className="min-h-screen py-16 sm:py-20 px-4 bg-white dark:bg-[#111827] transition-colors">
        <div className="text-center space-y-4 p-8 bg-white dark:bg-black rounded-xl border border-green-700 shadow-lg">
          <h2 className="text-2xl font-bold text-green-900 dark:text-white">
            Case Not Found
          </h2>
          <Button
            onClick={() => navigate("/dashboard/cases")}
            className="bg-green-600 hover:bg-green-700 inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Cases
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 sm:py-20 px-4 bg-black transition-colors">
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
                    Case ID: {currentCase._id}
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
              {currentCase.images?.length > 0 ? (
                <img
                  src={currentCase.images[0]}
                  alt="Plant"
                  className="w-full max-w-xs h-64 object-cover rounded-lg border border-green-700 shadow-sm"
                />
              ) : (
                <div className="w-full max-w-xs h-64 bg-green-50 dark:bg-green-900/10 border border-green-700 rounded-lg flex items-center justify-center">
                  <Leaf className="w-12 h-12 text-green-400 dark:text-green-600" />
                </div>
              )}
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
                      {currentCase.createdBy.name || "Unknown Farmer"}
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
                      {new Date(currentCase.createdAt).toLocaleDateString()}
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
                      {currentCase.createdBy.address || "Unknown Location"}
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
                    {currentCase.plantIssue || "No description provided."}
                  </p>
                </div>
              </div>
            </div>

            {/* Visit Agent Assignment */}
            {currentCase.assignedVisitAgent ? (
              <div className="pt-6">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">
                      Assigned Visit Agent
                    </h4>
                    <p className="text-green-900 dark:text-green-100">
                      {currentCase.assignedVisitAgent.name}
                    </p>
                    <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">
                      Email
                    </h4>
                    <p className="text-green-900 dark:text-green-100">
                      {currentCase.assignedVisitAgent.email || "N/A"}
                    </p>
                    {currentCase.visitAgentComment && (
                      <div className="mt-2">
                        <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">
                          Visit Agent Comment
                        </h4>
                        <p className="text-green-900 dark:text-green-100">
                          {currentCase.visitAgentComment}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="pt-6 border-t border-green-200 dark:border-green-800">
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-1">
                      Assign Visit Agent
                    </label>
                    <select
                      value={selectedAgent}
                      onChange={(e) => setSelectedAgent(e.target.value)}
                      className="w-full bg-white dark:bg-gray-800 border border-green-700 rounded-md py-2 px-3 text-green-900 dark:text-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select an agent</option>
                      {visitAgents.map((agent) => (
                        <option key={agent._id} value={agent._id}>
                          {agent.name} ({agent.email})
                        </option>
                      ))}
                    </select>
                  </div>
                  <Button
                    onClick={handleAssignAgent}
                    disabled={
                      !selectedAgent || loading.assignVisitAgentToPlantCase
                    }
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {loading.assignVisitAgentToPlantCase
                      ? "Assigning..."
                      : "Assign Agent"}
                  </Button>
                </div>
              </div>
            )}

            {/* Research Center Assignment */}
            {currentCase.assignedResearchDivision ? (
              <div className="pt-6">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">
                      Research Division
                    </h4>
                    <p className="text-green-900 dark:text-green-100">
                      {currentCase.assignedResearchDivision.name}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      {getStatusBadge(currentCase.answerStatus)}
                      {currentCase.answerStatus === "answered" && (
                        <span className="ml-2 flex items-center text-green-800 dark:text-green-200 text-xs bg-green-100 dark:bg-green-900/30 rounded px-2 py-1">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {currentCase.answer}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              !!currentCase.assignedVisitAgent &&
              currentCase.visitAgentComment != null && (
                <div className="pt-6 border-t border-green-200 dark:border-green-800">
                  <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-1">
                        Assign Research Center
                      </label>
                      <select
                        value={selectedCenter}
                        onChange={(e) => setSelectedCenter(e.target.value)}
                        className="w-full bg-white dark:bg-gray-800 border border-green-700 rounded-md py-2 px-3 text-green-900 dark:text-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select a research center</option>
                        {researchCenters.map((center) => (
                          <option key={center._id} value={center._id}>
                            {center.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Button
                      onClick={handleAssignCenter}
                      disabled={
                        !selectedCenter ||
                        loading.assignResearchCenterToPlantCase
                      }
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {loading.assignResearchCenterToPlantCase
                        ? "Assigning..."
                        : "Assign Center"}
                    </Button>
                  </div>
                </div>
              )
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
              <Button
                onClick={() => navigate("/dashboard/cases")}
                className="bg-green-600 hover:bg-green-700 inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to All Cases
              </Button>
              {currentCase.status !== "resolved" && (
                <Button
                  variant="outline"
                  className="border-green-600 text-green-700 dark:text-green-300"
                >
                  Mark as Solved <ChevronRight className="w-4 h-4 ml-2" />
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
