import React, { useState } from "react";
import {
  Plus,
  Star,
  Calendar,
  Users,
  Video,
  ExternalLink,
  Award,
  BookOpen,
  TrendingUp,
  Eye,
  Play,
  Crown,
  Sparkles,
} from "lucide-react";

const MyWorkshop = () => {
  const [activeTab, setActiveTab] = useState("hosted");

  // Mock data for hosted workshops
  const hostedWorkshops = [
    {
      id: 1,
      title: "Advanced JavaScript Concepts",
      date: "2025-06-15",
      time: "10:00 AM",
      skills: ["JavaScript", "ES6", "Async/Await"],
      rating: 4.8,
      attendees: 24,
      zoomLink: "https://zoom.us/j/123456789",
      status: "upcoming",
      reviews: 18,
    },
    {
      id: 2,
      title: "React Hooks Deep Dive",
      date: "2025-06-08",
      time: "2:00 PM",
      skills: ["React", "Hooks", "State Management"],
      rating: 4.9,
      attendees: 32,
      status: "completed",
      reviews: 28,
    },
    {
      id: 3,
      title: "Python for Data Science",
      date: "2025-05-28",
      time: "11:00 AM",
      skills: ["Python", "Pandas", "NumPy"],
      rating: 4.7,
      attendees: 19,
      status: "completed",
      reviews: 15,
    },
  ];

  // Mock data for joined workshops
  const joinedWorkshops = [
    {
      id: 1,
      title: "Machine Learning Fundamentals",
      hostName: "Dr. Priya Sharma",
      hostBadge: "Guru",
      date: "2025-06-05",
      time: "3:00 PM",
      skills: ["ML", "Scikit-learn", "Algorithms"],
      myRating: 5,
      replayAvailable: true,
    },
    {
      id: 2,
      title: "Web Design Principles",
      hostName: "Amit Thapa",
      hostBadge: "Acharya",
      date: "2025-05-20",
      time: "1:00 PM",
      skills: ["UI/UX", "Design", "Figma"],
      myRating: 4,
      replayAvailable: true,
    },
    {
      id: 3,
      title: "DevOps with Docker",
      hostName: "Sanjay Gurung",
      hostBadge: "Expert",
      date: "2025-05-15",
      time: "4:00 PM",
      skills: ["Docker", "DevOps", "Containers"],
      myRating: 5,
      replayAvailable: false,
    },
  ];

  const totalTokens = 1247;
  const suggestedWorkshop = {
    title: "Advanced React Patterns",
    host: "Sarah Johnson",
    date: "2025-06-20",
    skills: ["React", "Advanced Patterns", "Performance"],
    participants: 45,
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Guru":
        return "bg-gradient-to-r from-purple-500 to-pink-500";
      case "Acharya":
        return "bg-gradient-to-r from-blue-500 to-indigo-500";
      case "Expert":
        return "bg-gradient-to-r from-green-500 to-emerald-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                My Workshops
              </h1>
              <p className="text-gray-600">
                Manage your learning journey on ChalkBox
              </p>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Host Workshop
            </button>
          </div>

          {/* Tokens Widget */}
          <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white p-6 rounded-2xl shadow-lg mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Total Tokens Earned
                </h3>
                <p className="text-3xl font-bold">
                  {totalTokens.toLocaleString()}
                </p>
              </div>
              <div className="bg-white/20 p-3 rounded-full">
                <Award className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white rounded-2xl p-2 shadow-md mb-6 max-w-md">
          <button
            onClick={() => setActiveTab("hosted")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
              activeTab === "hosted"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Hosted Workshops
          </button>
          <button
            onClick={() => setActiveTab("joined")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
              activeTab === "joined"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Joined Workshops
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "hosted" && (
              <div className="space-y-4">
                {hostedWorkshops.map((workshop) => (
                  <div
                    key={workshop.id}
                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-bold text-gray-900">
                            {workshop.title}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              workshop.status === "upcoming"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {workshop.status === "upcoming"
                              ? "Upcoming"
                              : "Completed"}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {workshop.date} at {workshop.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {workshop.attendees} attendees
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {workshop.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            {renderStars(workshop.rating)}
                            <span className="text-sm font-semibold text-gray-700 ml-1">
                              {workshop.rating}
                            </span>
                          </div>
                          {workshop.status === "completed" && (
                            <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                              <Eye className="w-4 h-4" />
                              View Reviews ({workshop.reviews})
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {workshop.zoomLink &&
                          workshop.status === "upcoming" && (
                            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition-colors">
                              <Video className="w-4 h-4" />
                              Join Zoom
                            </button>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "joined" && (
              <div className="space-y-4">
                {joinedWorkshops.map((workshop) => (
                  <div
                    key={workshop.id}
                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {workshop.title}
                        </h3>

                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-gray-700 font-medium">
                            Hosted by:
                          </span>
                          <span className="font-semibold text-gray-900">
                            {workshop.hostName}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getBadgeColor(
                              workshop.hostBadge
                            )}`}
                          >
                            {workshop.hostBadge}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                          <Calendar className="w-4 h-4" />
                          {workshop.date} at {workshop.time}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {workshop.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-gray-600">
                              My Rating:
                            </span>
                            {renderStars(workshop.myRating)}
                          </div>
                          {workshop.replayAvailable && (
                            <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                              <Play className="w-4 h-4" />
                              Watch Replay
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Suggested Workshop */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl p-6 shadow-lg mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-bold text-lg">Suggested for You</h3>
              </div>

              <h4 className="font-semibold text-lg mb-2">
                {suggestedWorkshop.title}
              </h4>
              <p className="text-purple-100 text-sm mb-2">
                by {suggestedWorkshop.host}
              </p>
              <p className="text-purple-100 text-sm mb-4">
                {suggestedWorkshop.date}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {suggestedWorkshop.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-white/20 text-white px-2 py-1 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-purple-100">
                  {suggestedWorkshop.participants} interested
                </span>
                <button className="bg-white text-purple-600 px-4 py-2 rounded-xl font-semibold text-sm hover:bg-purple-50 transition-colors">
                  Join Now
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Your Stats
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Workshops Hosted</span>
                  <span className="font-bold text-blue-600">
                    {hostedWorkshops.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Workshops Joined</span>
                  <span className="font-bold text-green-600">
                    {joinedWorkshops.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Avg. Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">4.8</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Students Taught</span>
                  <span className="font-bold text-purple-600">75</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWorkshop;
