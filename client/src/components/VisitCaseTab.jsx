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

const dummyCases = [
  {
    _id: "1",
    plantName: "Tomato",
    plantIssue: "Leaf spot disease",
    createdAt: new Date().toISOString(),
    contactNumber: "0771234567",
    farmerName: "Nimal Perera",
    address: "No. 12, Main Street, Kandy",
    farmerPhone: "0771234567",
    status: "Open",
    agentComment: "Initial inspection completed. Needs fungicide treatment.",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    _id: "2",
    plantName: "Chili",
    plantIssue: "Wilting symptoms",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    contactNumber: "0719876543",
    farmerName: "Sunil Silva",
    address: "No. 45, Lake Road, Galle",
    farmerPhone: "0719876543",
    status: "Closed",
    agentComment: "Case resolved. Advised on proper watering techniques.",
    images: [],
  },
  {
    _id: "3",
    plantName: "Brinjal",
    plantIssue: "Aphid infestation",
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    contactNumber: "0755555555",
    farmerName: "Kamal Fernando",
    address: "No. 78, Temple Lane, Matara",
    farmerPhone: "0755555555",
    status: "Pending",
    agentComment: "",
    images: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    ],
  },
];

function getStatusIcon(status) {
  if (status === "Open")
    return (
      <span title="Open">
        <AlertCircle className="w-4 h-4 text-yellow-500" />
      </span>
    );
  if (status === "Closed")
    return (
      <span title="Closed">
        <Leaf className="w-4 h-4 text-green-500" />
      </span>
    );
  return (
    <span title="Pending">
      <Calendar className="w-4 h-4 text-blue-500" />
    </span>
  );
}

function VisitCaseTab() {
  const [visitCases, setVisitCases] = useState(dummyCases);
  const [loading, setLoading] = useState({ fetchVisitCases: false });
  const [selectedCase, setSelectedCase] = useState(null);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading({ fetchVisitCases: true });
    setTimeout(() => {
      setVisitCases(dummyCases);
      setLoading({ fetchVisitCases: false });
    }, 800);
  }, []);

  const handleOpenCase = (visitCase) => {
    setSelectedCase(visitCase);
    setComment("");
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim() || !selectedCase) return;
    setSubmitting(true);
    setTimeout(() => {
      setVisitCases((prev) =>
        prev.map((c) =>
          c._id === selectedCase._id ? { ...c, agentComment: comment } : c
        )
      );
      setSelectedCase((prev) =>
        prev ? { ...prev, agentComment: comment } : prev
      );
      setComment("");
      setSubmitting(false);
    }, 600);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
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
              Visit Cases
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 dark:text-white">
            <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent dark:from-green-300 dark:to-green-100">
              Field Visit
            </span>{" "}
            Cases
          </h2>
          <p className="text-lg text-green-700 dark:text-green-300 max-w-2xl mx-auto mt-4">
            Review and manage plant cases assigned to your sub-center
          </p>
        </motion.div>

        {loading?.fetchVisitCases && visitCases.length === 0 ? (
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {visitCases.map((visitCase) => (
                    <tr
                      key={visitCase._id}
                      className="hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <Leaf className="h-5 w-5 text-green-600 dark:text-green-300" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {visitCase.plantName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {visitCase.farmerName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-200">
                          {visitCase.plantIssue}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(visitCase.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Dialog
                          open={selectedCase?._id === visitCase._id}
                          onOpenChange={(open) =>
                            !open && setSelectedCase(null)
                          }
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenCase(visitCase)}
                              className="flex items-center gap-1 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="text-green-800 dark:text-green-200">
                                Case Details
                              </DialogTitle>
                              <DialogDescription>
                                {visitCase.plantName} - {visitCase.plantIssue}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                              <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                                    <FileText className="w-5 h-5 text-green-600 dark:text-green-300" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-green-800 dark:text-green-200">
                                      Case Summary
                                    </h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                      {visitCase.plantName} showing{" "}
                                      {visitCase.plantIssue.toLowerCase()}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-start gap-3">
                                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                                    <MapPin className="w-5 h-5 text-green-600 dark:text-green-300" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-green-800 dark:text-green-200">
                                      Farmer Details
                                    </h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                      {visitCase.farmerName}
                                      <br />
                                      {visitCase.address}
                                      <br />
                                      Phone: {visitCase.farmerPhone}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-start gap-3">
                                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                                    <Calendar className="w-5 h-5 text-green-600 dark:text-green-300" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-green-800 dark:text-green-200">
                                      Case Timeline
                                    </h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                      Created:{" "}
                                      {new Date(
                                        visitCase.createdAt
                                      ).toLocaleString()}
                                      <br />
                                      Status:{" "}
                                      <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                          visitCase.status === "Open"
                                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                                            : visitCase.status === "Closed"
                                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                                        }`}
                                      >
                                        {visitCase.status}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                                    <AlertCircle className="w-5 h-5 text-green-600 dark:text-green-300" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-green-800 dark:text-green-200">
                                      Agent Comments
                                    </h4>
                                    <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3 mt-1">
                                      {visitCase.agentComment ? (
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                          {visitCase.agentComment}
                                        </p>
                                      ) : (
                                        <p className="text-sm text-gray-400 dark:text-gray-500 italic">
                                          No comments yet
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-start gap-3">
                                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                                    <ImagePlus className="w-5 h-5 text-green-600 dark:text-green-300" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-green-800 dark:text-green-200">
                                      Case Images
                                    </h4>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                      {visitCase.images &&
                                      visitCase.images.length > 0 ? (
                                        visitCase.images.map((img, idx) => (
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
                              </div>
                            </div>

                            <form onSubmit={handleAddComment} className="mt-6">
                              <label className="block text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                                Add New Comment
                              </label>
                              <textarea
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                rows={3}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Enter your observations and recommendations..."
                                required
                              />
                              <div className="flex justify-end mt-3">
                                <Button
                                  type="submit"
                                  className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white px-6 py-2 rounded-lg font-medium shadow transition"
                                  disabled={submitting}
                                >
                                  {submitting ? (
                                    <span className="flex items-center gap-2">
                                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                                      Adding...
                                    </span>
                                  ) : (
                                    "Save Comment"
                                  )}
                                </Button>
                              </div>
                            </form>
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
          Showing {visitCases.length} visit cases. Click on any case to view
          details and add comments.
        </motion.p>
      </div>
    </div>
  );
}

export default VisitCaseTab;
