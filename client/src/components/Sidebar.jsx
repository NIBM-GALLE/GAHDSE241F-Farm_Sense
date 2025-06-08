import React from "react";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { useUserStore } from "@/stores/useUserStore";

function Sidebar({ items, activeTab, setActiveTab, role }) {
  const navigate = useNavigate();
  const { logout } = useUserStore();

  const roleDisplayNames = {
    "main-admin": "Admin",
    "sub-center-admin": "Center Admin",
    ResearchDivisionAdmin: "Research Admin",
    "visit-agent": "Visit Agent",
    // add more as needed
  };

  const handleLogout = async () => {
    await logout(navigate);
  };

  return (
    <aside className="w-64 h-screen bg-background border-r flex flex-col shadow-lg dark:bg-gray-900 dark:border-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-800">
        <span className="font-poppins text-xl font-semibold tracking-tight text-foreground block">
          <span className="flex items-center gap-2">
            <img
              src="/Farm-sense.svg"
              alt="FarmSense Logo"
              className="w-7 h-7 rounded-full"
            />
            FarmSense
          </span>
          <span className="block text-sm font-normal text-muted-foreground mt-1">
            You are logged in as:{" "}
            <span className="capitalize font-semibold">
              {roleDisplayNames[role] || role}
            </span>
          </span>
        </span>
        <ModeToggle />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-6">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.title}>
              <button
                className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg font-poppins transition-colors duration-150
                  ${
                    activeTab === item.title
                      ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-200 font-semibold shadow"
                      : "hover:bg-muted hover:text-foreground"
                  }
                `}
                aria-current={activeTab === item.title ? "page" : undefined}
                onClick={() => setActiveTab(item.title)}
              >
                <item.icon
                  size={20}
                  className={`${
                    activeTab === item.title
                      ? "text-green-600 dark:text-green-300"
                      : "text-muted-foreground"
                  }`}
                  aria-hidden="true"
                />
                <span>{item.title}</span>
              </button>
            </li>
          ))}
          <li className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center w-full px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-muted transition-colors font-poppins"
              aria-label="Back to Main Site"
            >
              <span>← Back to Main Site</span>
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors font-poppins"
              aria-label="Logout"
            >
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="mt-auto px-6 py-4 border-t dark:border-gray-800">
        <div>
          <span className="font-poppins text-lg font-medium text-foreground">
            Contact
          </span>
          <div className="mt-3 space-y-1 text-muted-foreground text-sm font-poppins">
            <div>
              <span role="img" aria-label="location">
                📍
              </span>{" "}
              Galle Road, Colombo 03
            </div>
            <div>
              <span role="img" aria-label="email">
                ✉️
              </span>{" "}
              <a href="mailto:help@Farmsense.com" className="hover:underline">
                help@Farmsense.com
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <p className="text-muted-foreground text-xs font-poppins">
            © 2025 Farmsense
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
