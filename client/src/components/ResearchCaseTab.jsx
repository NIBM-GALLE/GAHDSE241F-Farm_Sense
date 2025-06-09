import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  FileText,
  MapPin,
  Calendar,
  AlertCircle,
  Leaf,
  ImagePlus,
  User,
  Mail,
  Home,
  Phone,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useResearchCenterStore } from "../stores/useResearchCenterStore";

function getStatusIcon(status) {
  if (status === "in-progress")
    return (
      <span title="Open">
        <AlertCircle className="w-4 h-4 text-yellow-500" />
      </span>
    );
  if (status === "resolved")
    return (
      <span title="Closed">
        <Leaf className="w-4 h-4 text-green-500" />
      </span>
    );
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ResearchCaseTab() {
  const { cases, researchLoading, fetchCases, addAnswerToCase } =
    useResearchCenterStore();
  const [selectedCase, setSelectedCase] = useState(null);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  const handleOpenCase = (caseObj) => {
    setSelectedCase(caseObj);
    setAnswer("");
  };

  const handleAddAnswer = async (e) => {
    e.preventDefault();
    if (!answer.trim() || !selectedCase) return;

    try {
      await addAnswerToCase(selectedCase._id, answer);
      setSelectedCase((prev) =>
        prev ? { ...prev, researchAnswer: answer } : prev
      );
      setAnswer("");
      setSelectedCase(null); // Close the dialog after submitting
    } catch (error) {
      console.error("Failed to add answer:", error);
    }
  };

  return (
    <div className="py-10 px-4 bg-transparent transition-colors">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full mb-6">
            <FileText className="w-5 h-5 text-green-600 dark:text-green-300 mr-2" />
            <span className="text-green-700 dark:text-green-300 font-medium">
              Research Cases
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 dark:text-white">
            <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent dark:from-green-300 dark:to-green-100">
              Research
            </span>{" "}
            Cases
          </h2>
          <p className="text-lg text-green-700 dark:text-green-300 max-w-2xl mx-auto mt-4">
            Review and manage research cases assigned to your sub-center
          </p>
        </motion.div>

        {researchLoading.fetchCases ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600 mb-4"></div>
            <p className="text-green-700 dark:text-green-300">
              Loading cases...
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium">
                      Plant
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium">
                      Issue
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium">
                      Sub Center
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cases.map((caseObj) => (
                    <tr
                      key={caseObj._id}
                      className="hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <Leaf className="h-5 w-5 text-green-600 dark:text-green-300" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {caseObj.plantName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {caseObj.farmerName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-200">
                          {caseObj.plantIssue}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(caseObj.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-200">
                          {caseObj.assignedSubCenter?.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(caseObj.status)}
                          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                            {caseObj.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Dialog
                          open={selectedCase?._id === caseObj._id}
                          onOpenChange={(open) =>
                            !open && setSelectedCase(null)
                          }
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenCase(caseObj)}
                              className="flex items-center gap-1 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="text-green-800 dark:text-green-200">
                                Research Case Details
                              </DialogTitle>
                              <DialogDescription>
                                {caseObj.plantName} - {caseObj.plantIssue}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                              <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                                    <Home className="w-5 h-5 text-green-600 dark:text-green-300" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-green-800 dark:text-green-200">
                                      Sub Center
                                    </h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                      {caseObj.assignedSubCenter?.name}
                                      <br />
                                      Location:{" "}
                                      {caseObj.assignedSubCenter?.location}
                                      <br />
                                      Contact:{" "}
                                      {caseObj.assignedSubCenter?.contactNumber}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                                    <User className="w-5 h-5 text-green-600 dark:text-green-300" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-green-800 dark:text-green-200">
                                      Farmer
                                    </h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                      {caseObj.createdBy?.name}
                                      <br />
                                      {caseObj.createdBy?.address}
                                      <br />
                                      Phone: {caseObj.createdBy?.phone}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                                    <Leaf className="w-5 h-5 text-green-600 dark:text-green-300" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-green-800 dark:text-green-200">
                                      Plant Details
                                    </h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                      Name: {caseObj.plantName}
                                      <br />
                                      Issue: {caseObj.plantIssue}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                                    <ImagePlus className="w-5 h-5 text-green-600 dark:text-green-300" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-green-800 dark:text-green-200">
                                      Images
                                    </h4>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                      {caseObj.images?.length > 0 ? (
                                        caseObj.images.map((img, idx) => (
                                          <img
                                            key={idx}
                                            src={img}
                                            alt={`case-img-${idx}`}
                                            className="w-20 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all"
                                          />
                                        ))
                                      ) : (
                                        <p className="text-sm text-gray-400 dark:text-gray-500 italic">
                                          No images attached
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                                    <User className="w-5 h-5 text-green-600 dark:text-green-300" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-green-800 dark:text-green-200">
                                      Assigned Agent
                                    </h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                      {caseObj.assignedVisitAgent?.name}
                                      <br />
                                      <Mail className="inline w-4 h-4 mr-1" />
                                      {caseObj.assignedVisitAgent?.email}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                                    <Calendar className="w-5 h-5 text-green-600 dark:text-green-300" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-green-800 dark:text-green-200">
                                      Created Date
                                    </h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                      {new Date(
                                        caseObj.createdAt
                                      ).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Research Answer Section */}
                            <div className="mt-6 space-y-4">
                              <div className="flex items-start gap-3">
                                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                                  <FileText className="w-5 h-5 text-green-600 dark:text-green-300" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-green-800 dark:text-green-200">
                                    Research Answer
                                  </h4>
                                  <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3 mt-1">
                                    {selectedCase?.answerStatus ===
                                    "answered" ? (
                                      <p className="text-sm text-gray-700 dark:text-gray-300">
                                        {selectedCase.answer}
                                      </p>
                                    ) : (
                                      <p className="text-sm text-gray-400 dark:text-gray-500 italic">
                                        No research answer provided yet
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {(!selectedCase?.answerStatus === "answered" ||
                                !selectedCase?.answer) && (
                                <form
                                  onSubmit={handleAddAnswer}
                                  className="mt-4"
                                >
                                  <label className="block text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                                    Add Your Research Findings
                                  </label>
                                  <textarea
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    rows={4}
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    placeholder="Enter your research findings and recommendations..."
                                    required
                                  />
                                  <div className="flex justify-end mt-3">
                                    <Button
                                      type="submit"
                                      className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white px-6 py-2 rounded-lg font-medium shadow transition"
                                      disabled={researchLoading.addAnswerToCase}
                                    >
                                      {researchLoading.addAnswerToCase ? (
                                        <span className="flex items-center gap-2">
                                          <svg
                                            className="animate-spin h-5 w-5 text-white"
                                            viewBox="0 0 24 24"
                                          >
                                            <circle
                                              className="opacity-25"
                                              cx="12"
                                              cy="12"
                                              r="10"
                                              stroke="currentColor"
                                              strokeWidth="4"
                                              fill="none"
                                            />
                                            <path
                                              className="opacity-75"
                                              fill="currentColor"
                                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                            />
                                          </svg>
                                          Submitting...
                                        </span>
                                      ) : (
                                        "Submit Answer"
                                      )}
                                    </Button>
                                  </div>
                                </form>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center text-green-700 dark:text-green-300 text-sm mt-8"
        >
          Showing {cases.length} research cases. Click on any case to view
          details and provide answers.
        </motion.p>
      </div>
    </div>
  );
}

export default ResearchCaseTab;
