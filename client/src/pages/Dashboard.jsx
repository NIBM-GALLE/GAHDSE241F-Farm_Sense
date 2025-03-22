import React from "react";
import Dashboard_Sidebar from "@/components/Dashboard_Sidebar";

function Dashboard() {
  return (
    <div className="min-h-screen grid grid-cols-4 ">
      <div>
        <Dashboard_Sidebar />
      </div>
      <div className="col-span-3">Text area</div>
    </div>
  );
}

export default Dashboard;
