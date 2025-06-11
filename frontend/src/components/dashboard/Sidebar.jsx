import React, { useState } from "react";
import {
  Bell,
  User,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Home,
  Users,
  Briefcase,
  Award,
  LogOut,
  Coins,
  BookOpen,
  Star,
  TrendingUp,
  Plus,
  Eye,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, onClose, isMobile }) => {
  const location = useLocation();
  const [workshopsExpanded, setWorkshopsExpanded] = useState(false);

  // Get the current path and remove leading/trailing slashes
  const currentPath = location.pathname.replace(/^\/|\/$/g, "");

  // Auto-expand workshops if one of its sub-items is active
  React.useEffect(() => {
    const isWorkshopSubItemActive = menuItems
      .find((item) => item.id === "workshops")
      ?.subItems?.some(
        (subItem) =>
          currentPath === `dashboard/${subItem.id}` ||
          currentPath === subItem.id
      );

    if (isWorkshopSubItemActive) {
      setWorkshopsExpanded(true);
    }
  }, [currentPath]);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    {
      id: "workshops",
      label: "Workshops",
      icon: BookOpen,
      hasDropdown: true,
      subItems: [
        { id: "my-workshops", label: "My Workshops" },
        { id: "join-workshops", label: "Join Workshop" },
      ],
    },
    { id: "dashboard/collaborate", label: "Collaborate", icon: Users },
    { id: "dashboard/freelance-feed", label: "Freelance", icon: Star },
    { id: "dashboard/profile", label: "Profile", icon: User },
  ];

  const handleWorkshopsClick = () => {
    setWorkshopsExpanded(!workshopsExpanded);
  };

  const SidebarContent = () => (
    <div className="h-full bg-slate-50 border-r border-gray-200">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">CB</span>
          </div>
          <span className="text-xl font-bold text-gray-800">ChalkBox</span>
          {isMobile && (
            <button
              onClick={onClose}
              className="ml-auto p-1 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            // Check if current path matches the item id or starts with it
            const isActive =
              currentPath === item.id ||
              (item.id !== "dashboard" && currentPath.startsWith(item.id));
            const isSubItemActive = item.subItems?.some(
              (subItem) =>
                currentPath === `dashboard/${subItem.id}` ||
                currentPath === subItem.id
            );

            return (
              <div key={item.id}>
                {/* Main Menu Item */}
                {item.hasDropdown ? (
                  <button
                    onClick={handleWorkshopsClick}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive || isSubItemActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-600 hover:bg-white hover:text-gray-800 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {workshopsExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                ) : (
                  <Link
                    to={`/${item.id}`}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-600 hover:bg-white hover:text-gray-800 hover:shadow-sm"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )}

                {/* Dropdown Sub-items */}
                {item.hasDropdown && workshopsExpanded && (
                  <div className="ml-4 mt-2 space-y-1">
                    {item.subItems.map((subItem) => {
                      const isSubActive =
                        currentPath === `dashboard/${subItem.id}` ||
                        currentPath === subItem.id;
                      return (
                        <Link
                          key={subItem.id}
                          to={`/dashboard/${subItem.id}`}
                          className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                            isSubActive
                              ? "bg-blue-100 text-blue-700 font-medium"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                          }`}
                        >
                          <div className="w-2 h-2 rounded-full bg-current opacity-50"></div>
                          <span className="text-sm">{subItem.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <a
            href="#"
            className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-white hover:text-gray-800 rounded-xl transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </a>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
        )}

        {/* Mobile Sidebar */}
        <div
          className={`fixed left-0 top-0 h-full w-80 z-50 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SidebarContent />
        </div>
      </>
    );
  }

  return (
    <div className="w-80 h-screen sticky top-0">
      <SidebarContent />
    </div>
  );
};

export default Sidebar;
