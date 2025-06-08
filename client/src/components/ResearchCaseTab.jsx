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

// Dummy data for research cases
const dummyCases = [
  {
    _id: "1",
    plantName: "Tomato",
    plantIssue: "Leaf spot disease",
    createdAt: new Date().toISOString(),
    farmerName: "Nimal Perera",
    farmerAddress: "No. 12, Main Street, Kandy",
    farmerPhone: "0771234567",
    subCenter: {
      name: "Kandy Sub Center",
      location: "Kandy",
      contactNo: "0812223344",
    },
    assignedAgent: {
      name: "Agent A",
      email: "agenta@email.com",
    },
    status: "Open",
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
    farmerName: "Sunil Silva",
    farmerAddress: "No. 45, Lake Road, Galle",
    farmerPhone: "0719876543",
    subCenter: {
      name: "Galle Sub Center",
      location: "Galle",
      contactNo: "0911234567",
    },
    assignedAgent: {
      name: "Agent B",
      email: "agentb@email.com",
    },
    status: "Closed",
    images: [],
  },
  {
    _id: "3",
    plantName: "Brinjal",
    plantIssue: "Aphid infestation",
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    farmerName: "Kamal Fernando",
    farmerAddress: "No. 78, Temple Lane, Matara",
    farmerPhone: "0755555555",
    subCenter: {
      name: "Matara Sub Center",
      location: "Matara",
      contactNo: "0413344556",
    },
    assignedAgent: {
      name: "Agent C",
      email: "agentc@email.com",
    },
    status: "Pending",
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

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ResearchCaseTab() {
  const [cases, setCases] = useState(dummyCases);
  const [loading, setLoading] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCases(dummyCases);
      setLoading(false);
    }, 800);
  }, []);

  const handleOpenCase = (caseObj) => setSelectedCase(caseObj);

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

        {loading ? (
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
                          {caseObj.subCenter.name}
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
                                      {caseObj.subCenter.name}
                                      <br />
                                      Location: {caseObj.subCenter.location}
                                      <br />
                                      Contact: {caseObj.subCenter.contactNo}
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
                                      {caseObj.farmerName}
                                      <br />
                                      {caseObj.farmerAddress}
                                      <br />
                                      Phone: {caseObj.farmerPhone}
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
                                      {caseObj.images &&
                                      caseObj.images.length > 0 ? (
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
                                    {getStatusIcon(caseObj.status)}
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-green-800 dark:text-green-200">
                                      Status
                                    </h4>
                                    <span
                                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        caseObj.status === "Open"
                                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                                          : caseObj.status === "Closed"
                                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                                          : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                                      }`}
                                    >
                                      {caseObj.status}
                                    </span>
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
                                <div className="flex items-start gap-3">
                                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                                    <User className="w-5 h-5 text-green-600 dark:text-green-300" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-green-800 dark:text-green-200">
                                      Assigned Agent
                                    </h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                      {caseObj.assignedAgent.name}
                                      <br />
                                      <Mail className="inline w-4 h-4 mr-1" />
                                      {caseObj.assignedAgent.email}
                                    </p>
                                  </div>
                                </div>
                              </div>
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
          details.
        </motion.p>
      </div>
    </div>
  );
}

export default ResearchCaseTab;
