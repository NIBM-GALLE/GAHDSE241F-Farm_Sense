import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const initialAdmins = [
  {
    id: "admin-001",
    name: "Nimal Perera",
    phoneNumber: "077-1234567",
    email: "nimal@farmsense.lk",
  },
  {
    id: "admin-002",
    name: "Samanthi Jayasinghe",
    phoneNumber: "071-9876543",
    email: "samanthi@farmsense.lk",
  },
];

function AdminsTab() {
  const [admins, setAdmins] = useState(initialAdmins);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editId, setEditId] = useState(null);
  const [adminToDelete, setAdminToDelete] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    if (editId) {
      setAdmins(
        admins.map((admin) =>
          admin.id === editId ? { ...admin, ...form } : admin
        )
      );
    } else {
      const newId = `admin-${Math.floor(Math.random() * 10000)}`;
      setAdmins([...admins, { ...form, id: newId }]);
    }

    setForm({ name: "", email: "" });
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (admin) => {
    setForm({
      name: admin.name,
      email: admin.email,
    });
    setEditId(admin.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setAdmins(admins.filter((admin) => admin.id !== id));
    setAdminToDelete(null);
  };

  return (
    <div className="py-16 sm:py-20 px-4 bg-transparent transition-colors">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col justify-center items-center text-center gap-4 mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-900 dark:text-white">
              <span className="bg-gradient-to-r from-green-400 to-green-200 bg-clip-text text-transparent dark:from-green-300 dark:to-green-100">
                FarmSense
              </span>{" "}
              Admins
            </h2>
            <p className="text-lg text-green-800 dark:text-green-100 max-w-2xl">
              Manage admin accounts for FarmSense platform
            </p>
          </div>
        </motion.div>

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
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr
                key={admin.id}
                className="border-b border-green-200 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
              >
                <td className="px-4 py-3 font-medium text-green-900 dark:text-white">
                  {admin.name}
                </td>
                <td className="px-4 py-3 text-green-700 dark:text-green-300">
                  {admin.email}
                </td>
                <td className="px-4 py-3 text-green-700 dark:text-green-300">
                  {admin.phoneNumber}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Dialog
                      open={adminToDelete === admin.id}
                      onOpenChange={(open) => !open && setAdminToDelete(null)}
                    >
                      <DialogTrigger asChild>
                        <button
                          onClick={() => setAdminToDelete(admin.id)}
                          title="Delete"
                          className="p-2 rounded-full bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/60 text-red-700 dark:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Deletion</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete this admin? This
                            action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end gap-4 mt-4">
                          <Button
                            variant="outline"
                            onClick={() => setAdminToDelete(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleDelete(admin.id)}
                          >
                            Delete Admin
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
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
              setForm({ name: "", email: "" });
            }}
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            {showForm ? "Close Form" : "Add Admin"}
          </Button>
        </motion.div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#1f2937] border border-green-200 dark:border-green-700 rounded-xl p-6 sm:p-8 mt-8 max-w-2xl mx-auto shadow-md"
          >
            <h3 className="text-xl font-bold mb-4 text-green-900 dark:text-green-100 text-center">
              {editId ? "Edit Admin" : "Add Admin"}
            </h3>
            <form onSubmit={handleAdd} className="space-y-4">
              {["name", "email"].map((field) => (
                <input
                  key={field}
                  name={field}
                  type={field === "email" ? "email" : "text"}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={
                    field.charAt(0).toUpperCase() +
                    field.slice(1).replace(/([A-Z])/g, " $1")
                  }
                  required
                  className="w-full px-4 py-2 rounded-md border border-green-300 dark:border-green-600 bg-white dark:bg-[#222b3a] text-green-900 dark:text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              ))}
              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition shadow hover:shadow-green-700/30"
                >
                  {editId ? "Update Admin" : "Add Admin"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditId(null);
                    setForm({ name: "", email: "" });
                  }}
                  className="border border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 px-6 py-2 rounded-lg font-medium transition hover:bg-green-50 dark:hover:bg-green-900/30"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center text-green-700 dark:text-green-100/70 text-sm mt-10"
        >
          Admin accounts are managed by the FarmSense platform superuser.
        </motion.p>
      </div>
    </div>
  );
}

export default AdminsTab;
