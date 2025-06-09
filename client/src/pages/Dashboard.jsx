import React, { useEffect, useMemo } from "react";
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
  Eye,
  ShieldUser,
  FolderSearch2,
  Building,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import SubCentersTab from "../components/SubCentersTab";
import ResearchDivisionsTab from "../components/ResearchDivisionsTab";
import ReportsTab from "../components/ReportsTab";
import VisitAgentsTab from "../components/VisitAgentsTab";
import CasesTab from "../components/CasesTab";
import SubCenters from "./SubCenters";
import ResearchDivisions from "./ResearchDividions";
import Cases from "./Cases";
import AdminsTab from "@/components/AdminsTab";
import ResearchCaseTab from "@/components/ResearchCaseTab";
import VisitCaseTab from "@/components/VisitCaseTab";
import SubCenterDetails from "@/components/SubCenterDetails";
import ResearchCenterDetails from "@/components/ResearchCenterDetails";
import { useUserStore } from "@/stores/useUserStore";

function Dashboard() {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine tabs visible to the user based on role
  const accessibleTabs = useMemo(() => {
    if (!user) return [];

    const role = user.role;

    const tabsByRole = {
      "main-admin": [
        { title: "Sub centers", icon: MapPin, path: "sub-centers" },
        {
          title: "Research Divisions",
          icon: FlaskConical,
          path: "research-divisions",
        },
        { title: "Reports", icon: FileBarChart2, path: "reports" },
      ],
      "visit-agent": [{ title: "Visit Cases", icon: Eye, path: "visit-cases" }],
      ResearchDivisionAdmin: [
        { title: "Admins", icon: ShieldUser, path: "admins" },
        {
          title: "Research Cases",
          icon: FolderSearch2,
          path: "research-cases",
        },
        {
          title: "Research Center",
          icon: Building,
          path: "research-center",
        },
      ],
      "sub-center-admin": [
        { title: "Cases", icon: Briefcase, path: "cases" },
        { title: "Visit Agents", icon: Users, path: "visit-agents" },
        { title: "Admins", icon: ShieldUser, path: "admins" },
        { title: "Sub Center", icon: Building, path: "sub-center" },
      ],
    };

    return tabsByRole[role] || [];
  }, [user]);

  // Redirect to the default tab based on role
  useEffect(() => {
    if (!user) return;

    if (location.pathname === "/dashboard") {
      const defaultPath = accessibleTabs[0]?.path;
      if (defaultPath) {
        navigate(`/dashboard/${defaultPath}`, { replace: true });
      }
    }
  }, [user, location.pathname, accessibleTabs, navigate]);

  // Current active tab from URL
  const currentTab =
    accessibleTabs.find((item) => {
      // Split the pathname and check if the tab's path exists as a segment
      const segments = location.pathname.split("/");
      return segments.includes(item.path);
    })?.title || accessibleTabs[0]?.title;

  const handleTabChange = (tabTitle) => {
    const tab = accessibleTabs.find((i) => i.title === tabTitle);
    if (tab) {
      navigate(`/dashboard/${tab.path}`);
    }
  };

  return (
    <div className="flex">
      <Sidebar
        items={accessibleTabs}
        activeTab={currentTab}
        setActiveTab={handleTabChange}
        role={user.role}
      />
      <main className="flex-1 p-8">
        <Routes>
          {/* Main Admin Routes */}
          <Route
            path="sub-centers"
            element={user?.role === "main-admin" && <SubCentersTab />}
          />
          <Route
            path="sub-centers/:id"
            element={user?.role === "main-admin" && <SubCenters />}
          />
          <Route
            path="research-divisions"
            element={user?.role === "main-admin" && <ResearchDivisionsTab />}
          />
          <Route
            path="research-divisions/:id"
            element={user?.role === "main-admin" && <ResearchDivisions />}
          />
          <Route
            path="reports"
            element={user?.role === "main-admin" && <ReportsTab />}
          />

          {/* Visit Agent Route for sub center admins */}
          <Route
            path="visit-agents"
            element={user?.role === "sub-center-admin" && <VisitAgentsTab />}
          />

          {/* Cases for sub-center-admin) */}
          <Route
            path="cases"
            element={user?.role === "sub-center-admin" && <CasesTab />}
          />
          <Route
            path="cases/:id"
            element={user?.role === "sub-center-admin" && <Cases />}
          />

          {/* Cases for research center admin) */}
          <Route
            path="research-cases"
            element={
              user?.role === "ResearchDivisionAdmin" && <ResearchCaseTab />
            }
          />

          {/* Cases for visit agent) */}
          <Route
            path="visit-cases"
            element={user?.role === "visit-agent" && <VisitCaseTab />}
          />

          {/* Admins Tab (only for sub center admin and search center admin) */}
          <Route
            path="admins"
            element={
              (user?.role === "sub-center-admin" ||
                user?.role === "ResearchDivisionAdmin") && <AdminsTab />
            }
          />
          {/* Sub Center Details tab for sub admin */}
          <Route
            path="sub-center"
            element={user?.role === "sub-center-admin" && <SubCenterDetails />}
          />
          {/* Research Center Details tab for research admin */}
          <Route
            path="research-center"
            element={
              user?.role === "ResearchDivisionAdmin" && (
                <ResearchCenterDetails />
              )
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="." replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default Dashboard;
