import {
  Bell,
  User,
  ChevronDown,
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
const Sidebar = ({ isOpen, onClose, isMobile, activeRoute = "dashboard" }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "workshops", label: "Workshops", icon: BookOpen },
    { id: "jobs", label: "Job Board", icon: Briefcase },
    { id: "badges", label: "Badges", icon: Award },
    { id: "profile", label: "Profile", icon: User },
  ];

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
            const isActive = activeRoute === item.id;

            return (
              <a
                key={item.id}
                href="#"
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-white hover:text-gray-800 hover:shadow-sm"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </a>
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
