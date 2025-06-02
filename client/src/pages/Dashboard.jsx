import React, { useState } from "react";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import Sidebar from "../components/Sidebar";
import SubCentersTab from "../components/SubCentersTab";
import ResearchDivisionsTab from "../components/ResearchDivisionsTab";
import MessagesTab from "../components/MessagesTab";
import SettingsTab from "../components/SettingsTab";
import HomeTab from "../components/HomeTab";

const items = [
  { title: "Home", icon: Home },
  { title: "Sub centers", icon: Inbox },
  { title: "Research Divisions", icon: Calendar },
  { title: "Messages", icon: Search },
  { title: "Settings", icon: Settings },
];

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Home");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Home":
        return <HomeTab />;
      case "Sub centers":
        return <SubCentersTab />;
      case "Research Divisions":
        return <ResearchDivisionsTab />;
      case "Messages":
        return <MessagesTab />;
      case "Settings":
        return <SettingsTab />;
      default:
        return <HomeTab />;
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
