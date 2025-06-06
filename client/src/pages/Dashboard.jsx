import React from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import {
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
import SubCenters from "./SubCenters";
import ResearchDivisions from "./ResearchDividions";
const items = [
  { title: "Sub centers", icon: MapPin, path: "sub-centers" },
  {
    title: "Research Divisions",
    icon: FlaskConical,
    path: "research-divisions",
  },
  { title: "Reports", icon: FileBarChart2, path: "reports" },
  { title: "Visit Agents", icon: Users, path: "visit-agents" },
  { title: "Cases", icon: Briefcase, path: "cases" },
];

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the current tab from the URL
  const currentTab =
    items.find((item) => location.pathname.endsWith(item.path))?.title ||
    "Sub centers";

  const handleTabChange = (tab) => {
    const item = items.find((i) => i.title === tab);
    if (item) {
      navigate(`/dashboard/${item.path}`);
    }
  };

  return (
    <div className="flex">
      <Sidebar
        items={items}
        activeTab={currentTab}
        setActiveTab={handleTabChange}
      />
      <main className="flex-1 p-8">
        <Routes>
          <Route path="sub-centers" element={<SubCentersTab />} />
          <Route path="sub-centers/:id" element={<SubCenters />} />
          <Route path="research-divisions" element={<ResearchDivisionsTab />} />
          <Route
            path="research-divisions/:id"
            element={<ResearchDivisions />}
          />
          <Route path="reports" element={<ReportsTab />} />
          <Route path="visit-agents" element={<VisitAgentsTab />} />
          <Route path="cases" element={<CasesTab />} />
          {/* Redirect default/unknown paths to sub-centers */}
          <Route path="*" element={<Navigate to="sub-centers" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default Dashboard;
