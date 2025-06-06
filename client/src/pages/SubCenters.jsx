import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Phone, Mail, User } from "lucide-react";

const subCenters = {
  gampaha: {
    name: "Gampaha Regional Center",
    location: "No. 12, Yakkala Road, Gampaha",
    email: "gampaha@farmsense.lk",
    phone: "033-2223344",
    admin: "Nimal Perera",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  matara: {
    name: "Matara Sub-Center",
    location: "45 Weligama Road, Matara",
    email: "matara@farmsense.lk",
    phone: "041-2224455",
    admin: "Sunil Silva",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
  },
  anuradhapura: {
    name: "Anuradhapura Field Office",
    location: "Near Thissa Wewa, New Town, Anuradhapura",
    email: "anuradhapura@farmsense.lk",
    phone: "025-2233445",
    admin: "Kamal Jayasuriya",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
  },
  jaffna: {
    name: "Jaffna District Branch",
    location: "KKS Road, Jaffna",
    email: "jaffna@farmsense.lk",
    phone: "021-2255889",
    admin: "Sivakumar Rajan",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
};

function SubCenters() {
  const { id } = useParams();
  const center = subCenters[id];

  if (!center) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#111827] bg-gradient-to-b from-green-900/10 to-green-900/5 dark:from-green-900/20 dark:to-green-900/5 transition-colors">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8 bg-white/5 dark:bg-[#1f2937] backdrop-blur-sm rounded-xl border border-white/10 dark:border-green-800"
        >
          <h2 className="text-2xl font-bold text-green-900 dark:text-white mb-4">
            Sub Center Not Found
          </h2>
          <Link
            to="/dashboard/sub-centers"
            className="mt-4 flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sub Centers
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-16 sm:py-20 px-4 bg-balck transition-colors">
      <div className="max-w-4xl w-full">
        <motion.div
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 dark:bg-[#1f2937] backdrop-blur-sm rounded-xl border border-white/10 dark:border-green-800 shadow-lg overflow-hidden cursor-move"
        >
          <div className="flex flex-col md:flex-row">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="md:w-1/3 bg-green-900/20 flex items-center justify-center p-6"
            >
              <img
                src={center.image}
                alt={center.name}
                className="w-full h-64 md:h-auto object-cover rounded-lg shadow-md"
              />
            </motion.div>

            <div className="md:w-2/3 p-6 md:p-8">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-bold text-green-900 dark:text-white mb-6"
              >
                {center.name}
              </motion.h1>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-green-700 dark:text-green-300">
                      Location
                    </h3>
                    <p className="text-green-800 dark:text-green-100">
                      {center.location}
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
                      {center.phone}
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
                      {center.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <User className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-green-700 dark:text-green-300">
                      Admin
                    </h3>
                    <p className="text-green-800 dark:text-green-100">
                      {center.admin}
                    </p>
                  </div>
                </div>
              </div>

              {/* Back button under the card */}
              <div className="flex justify-center mt-8">

                <Link
                  to="/dashboard/sub-centers"
                  className="mt-4 flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Sub Centers
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default SubCenters;
