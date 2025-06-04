import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PlusCircle,
  Edit2,
  Trash2,
  User,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "./ui/button";

const initialAgents = [
  {
    id: "agent-001",
    name: "Tharindu Senanayake",
    phoneNumber: "077-1234567",
    email: "tharindu@farmsense.lk",
    subCenter: "Gampaha Regional Center",
  },
  {
    id: "agent-002",
    name: "Ishara Fernando",
    phoneNumber: "071-9876543",
    email: "ishara@farmsense.lk",
    subCenter: "Matara Sub-Center",
  },
];

function VisitAgentsTab() {
  const [agents, setAgents] = useState(initialAgents);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    subCenter: "",
    phoneNumber: "",
  });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.subCenter.trim() ||
      !form.phoneNumber.trim()
    )
      return;

    if (editId) {
      setAgents(
        agents.map((agent) =>
          agent.id === editId ? { ...agent, ...form } : agent
        )
      );
    } else {
      const newId = `agent-${Math.floor(Math.random() * 10000)}`;
      setAgents([...agents, { ...form, id: newId }]);
    }

    setForm({
      name: "",
      email: "",
      password: "",
      subCenter: "",
      phoneNumber: "",
    });
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (agent) => {
    setForm({
      name: agent.name,
      email: agent.email,
      password: "",
      subCenter: agent.subCenter,
      phoneNumber: agent.phoneNumber,
    });
    setEditId(agent.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this agent?")) {
      setAgents(agents.filter((agent) => agent.id !== id));
    }
  };

  return (
    <div className="py-16 sm:py-20 px-4 bg-white dark:bg-[#111827] bg-gradient-to-b from-green-900/10 to-green-900/5 dark:from-green-900/20 dark:to-green-900/5 transition-colors">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col justify-center items-center text-center gap-4 mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-900 dark:text-white">
              <span className="bg-gradient-to-r from-green-400 to-green-200 bg-clip-text text-transparent dark:from-green-300 dark:to-green-100">
                FarmSense
              </span>{" "}
              Visit Agents
            </h2>
            <p className="text-lg text-green-800 dark:text-green-100 max-w-2xl">
              Manage and assign sub-center visit agents across FarmSense
              locations
            </p>
          </div>
        </motion.div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#1f2937] border border-green-200 dark:border-green-700 rounded-xl p-6 sm:p-8 mb-10 max-w-2xl mx-auto shadow-md"
          >
            <h3 className="text-xl font-bold mb-4 text-green-900 dark:text-green-100 text-center">
              {editId ? "Edit Visit Agent" : "Add Visit Agent"}
            </h3>
            <form onSubmit={handleAdd} className="space-y-4">
              {["name", "email", "phoneNumber", "password", "subCenter"].map(
                (field) => (
                  <input
                    key={field}
                    name={field}
                    type={
                      field === "password"
                        ? "password"
                        : field === "email"
                        ? "email"
                        : field === "phoneNumber"
                        ? "tel"
                        : "text"
                    }
                    value={form[field]}
                    onChange={handleChange}
                    placeholder={
                      field === "name"
                        ? "Agent Name"
                        : field === "email"
                        ? "Email Address"
                        : field === "phoneNumber"
                        ? "Phone Number"
                        : field === "password"
                        ? "Temporary Password"
                        : "Sub Center Name"
                    }
                    required={field !== "password"}
                    className="w-full px-4 py-2 rounded-md border border-green-300 dark:border-green-600 bg-white dark:bg-[#222b3a] text-green-900 dark:text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                )
              )}
              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition shadow hover:shadow-green-700/30"
                >
                  {editId ? "Update Agent" : "Add Agent"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditId(null);
                    setForm({
                      name: "",
                      email: "",
                      password: "",
                      subCenter: "",
                      phoneNumber: "",
                    });
                  }}
                  className="border border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 px-6 py-2 rounded-lg font-medium transition hover:bg-green-50 dark:hover:bg-green-900/30"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        <motion.table
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full text-left table-auto"
        >
          <thead className="bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-100">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Sub Center</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr
                key={agent.id}
                className="border-b border-green-200 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
              >
                <td className="px-4 py-3 font-medium text-green-900 dark:text-white">
                  {agent.name}
                </td>
                <td className="px-4 py-3 text-green-700 dark:text-green-300">
                  {agent.email}
                </td>
                <td className="px-4 py-3 text-green-700 dark:text-green-300">
                  {agent.phoneNumber}
                </td>
                <td className="px-4 py-3 text-green-700 dark:text-green-300">
                  {agent.subCenter}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(agent)}
                      title="Edit"
                      className="p-2 rounded-full bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/60 text-green-700 dark:text-green-200"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(agent.id)}
                      title="Delete"
                      className="p-2 rounded-full bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/60 text-red-700 dark:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </motion.table>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex justify-center mt-12"
        >
          <Button
            variant="outline"
            className="border-green-600 text-green-700 dark:text-green-300 dark:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/30 px-8 py-3 rounded-lg font-medium transition-colors"
            onClick={() => {
              setShowForm(!showForm);
              setEditId(null);
              setForm({
                name: "",
                email: "",
                password: "",
                subCenter: "",
                phoneNumber: "",
              });
            }}
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            {showForm ? "Close Form" : "Add Visit Agent"}
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center text-green-700 dark:text-green-100/70 text-sm mt-10"
        >
          Visit agent accounts are verified by their assigned sub-center
          administrator
        </motion.p>
      </div>
    </div>
  );
}

export default VisitAgentsTab;
