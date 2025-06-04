import React, { useState } from "react";
import {
  Home,
  MapPin,
  FlaskConical,
  FileBarChart2,
  Users,
  Briefcase,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import SubCentersTab from "../components/SubCentersTab";
import ResearchDivisionsTab from "../components/ResearchDivisionsTab";
import ReportsTab from "../components/ReportsTab";
import VisitAgentsTab from "../components/VisitAgentsTab";

import CasesTab from "../components/CasesTab";

const items = [
  { title: "Sub centers", icon: MapPin },
  { title: "Research Divisions", icon: FlaskConical },
  { title: "Reports", icon: FileBarChart2 },
  { title: "Visit Agents", icon: Users },
  { title: "Cases", icon: Briefcase },
];

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Home");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Sub centers":
        return <SubCentersTab />;
      case "Research Divisions":
        return <ResearchDivisionsTab />;
      case "Reports":
        return <ReportsTab />;
      case "Visit Agents":
        return <VisitAgentsTab />;
      case "Cases":
        return <CasesTab />;
      default:
        return <SubCentersTab />;
    }
  };

  return (
    <div className="flex">
      <Sidebar
        items={items}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <main className="flex-1 p-8">{renderTabContent()}</main>
    </div>
  );
}

export default Dashboard;
