import React from "react";
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
const DashboardCard = ({
  title,
  description,
  icon: Icon,
  onClick,
  gradient = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        gradient
          ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-500"
          : "bg-white border-gray-200 hover:border-blue-300"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-3 rounded-xl ${
            gradient ? "bg-white/20" : "bg-blue-50"
          }`}
        >
          <Icon
            className={`w-6 h-6 ${gradient ? "text-white" : "text-blue-600"}`}
          />
        </div>
      </div>

      <h3
        className={`text-lg font-semibold mb-2 ${
          gradient ? "text-white" : "text-gray-800"
        }`}
      >
        {title}
      </h3>
      <p className={`text-sm ${gradient ? "text-blue-100" : "text-gray-600"}`}>
        {description}
      </p>
    </div>
  );
};
const Dashboard = () => {
  const dashboardCards = [
    {
      title: "Host a Workshop",
      description: "Share your knowledge and earn tokens by teaching others",
      icon: Users,
      gradient: true,
    },
    {
      title: "Apply for Internships",
      description: "Find exciting opportunities to grow your career",
      icon: Briefcase,
    },
    {
      title: "View Earned Badges",
      description: "See all the achievements you've unlocked",
      icon: Award,
    },
    {
      title: "Workshop Reviews",
      description: "Check feedback from your recent sessions",
      icon: Star,
    },
    {
      title: "Token Balance",
      description: "Track your earnings and spending",
      icon: Coins,
    },
    {
      title: "ML Suggestions",
      description: "Get personalized recommendations for your learning path",
      icon: TrendingUp,
    },
  ];
  return (
    <div>
      <div className="p-6">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Namaste, Rajesh! 👋</h2>
              <p className="text-blue-100 text-lg">
                Ready to continue your learning journey today?
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card, index) => (
            <DashboardCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              gradient={card.gradient}
              onClick={() => console.log(`Clicked: ${card.title}`)}
            />
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Recent Activity
          </h3>
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    Badge Earned: React Fundamentals
                  </p>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    Completed Workshop: JavaScript Basics
                  </p>
                  <p className="text-sm text-gray-600">1 day ago</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Coins className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    Tokens Earned: +150 tokens
                  </p>
                  <p className="text-sm text-gray-600">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
