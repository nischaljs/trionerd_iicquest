import React, { useState } from 'react';
import girls from "../../../assets/OIP.jpg";
import { 
  Mail, 
  Star, 
  Award, 
  BookOpen, 
  Users, 
  Calendar,
  MapPin,
  Edit,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const StudentProfile= () => {
  const [activeTooltip, setActiveTooltip] = useState(null);

  // Sample student data
  const studentData = {
    name: "Priya Sharma",
    email: "priya.sharma@student.edu",
    profilePicture: girls,
    bio: "Passionate computer science student with a keen interest in web development and AI. Always eager to learn new technologies and collaborate on innovative projects.",
    location: "Kathmandu, Nepal",
    skills: ["React", "JavaScript", "Python", "Machine Learning", "UI/UX Design", "Node.js"],
    badges: [
      { id: 1, name: "Guru", icon: "🎓", description: "Exceptional mentor and knowledge sharer" },
      { id: 2, name: "Acharya", icon: "📚", description: "Master of traditional wisdom" },
      { id: 3, name: "Utsaahi", icon: "🚀", description: "Enthusiastic learner and participant" }
    ],
    reviews: {
      average: 4.8,
      count: 24,
      stars: 5
    },
    workshopsAttended: {
      count: 12,
      recent: [
        { id: 1, title: "React Fundamentals", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=80&h=60&fit=crop" },
        { id: 2, title: "AI Ethics Workshop", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=80&h=60&fit=crop" },
        { id: 3, title: "Design Thinking", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=80&h=60&fit=crop" }
      ]
    },
    workshopsHosted: {
      count: 3,
      rating: 4.9,
      isEligibleHost: true
    },
    applications: [
      { id: 1, title: "Frontend Developer Intern", company: "TechCorp", status: "Pending" },
      { id: 2, title: "UI/UX Designer", company: "Design Studio", status: "Accepted" },
      { id: 3, title: "Full Stack Developer", company: "StartupXYZ", status: "Rejected" }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Accepted': return <CheckCircle className="w-3 h-3" />;
      case 'Rejected': return <XCircle className="w-3 h-3" />;
      case 'Pending': return <Clock className="w-3 h-3" />;
      default: return <AlertCircle className="w-3 h-3" />;
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="max-w-[1000px] mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Profile Picture */}
            <div className="relative">
              <img
                src={studentData.profilePicture}
                alt={studentData.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#2A66DE] shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{studentData.name}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">{studentData.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{studentData.location}</span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">{studentData.bio}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex items-center px-4 py-2 bg-[#2A66DE] text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
              <button className="flex items-center px-4 py-2 border border-[#2A66DE] text-[#2A66DE] rounded-lg hover:bg-blue-50 transition-colors duration-200">
                <Eye className="w-4 h-4 mr-2" />
                View Public
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Skills Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-[#2A66DE]" />
                Skills & Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {studentData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-[#2A66DE] border border-[#2A66DE] rounded-full text-sm font-medium hover:bg-blue-100 transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Workshops Attended */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-[#2A66DE]" />
                Workshops Attended ({studentData.workshopsAttended.count})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {studentData.workshopsAttended.recent.map((workshop) => (
                  <div
                    key={workshop.id}
                    className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  >
                    <img
                      src={workshop.image}
                      alt={workshop.title}
                      className="w-full h-16 object-cover rounded mb-2"
                    />
                    <h4 className="font-medium text-gray-900 text-sm">{workshop.title}</h4>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-[#2A66DE] hover:text-blue-700 font-medium text-sm">
                View All Workshops →
              </button>
            </div>

            {/* Applications */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-[#2A66DE]" />
                Recent Applications
              </h2>
              <div className="space-y-3">
                {studentData.applications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200">
                    <div>
                      <h4 className="font-medium text-gray-900">{app.title}</h4>
                      <p className="text-sm text-gray-600">{app.company}</p>
                    </div>
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(app.status)}`}>
                      {getStatusIcon(app.status)}
                      {app.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Badges */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-[#2A66DE]" />
                Achievements
              </h2>
              <div className="space-y-3">
                {studentData.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="relative flex items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 cursor-pointer hover:shadow-md transition-shadow duration-200"
                    onMouseEnter={() => setActiveTooltip(badge.id)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    <span className="text-2xl mr-3">{badge.icon}</span>
                    <span className="font-medium text-gray-900">{badge.name}</span>
                    
                    {/* Tooltip */}
                    {activeTooltip === badge.id && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-10">
                        {badge.description}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-[#2A66DE]" />
                Reviews
              </h2>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {studentData.reviews.average}
                </div>
                <div className="flex justify-center mb-2">
                  {renderStars(studentData.reviews.average)}
                </div>
                <p className="text-sm text-gray-600">
                  Based on {studentData.reviews.count} reviews
                </p>
              </div>
            </div>

            {/* Workshop Host Stats */}
            {studentData.workshopsHosted.isEligibleHost && (
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-[#2A66DE]" />
                  Workshop Host
                  <span className="ml-2 px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded-full font-medium">
                    Certified
                  </span>
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Workshops Hosted</span>
                    <span className="font-semibold">{studentData.workshopsHosted.count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Host Rating</span>
                    <div className="flex items-center">
                      <span className="font-semibold mr-1">{studentData.workshopsHosted.rating}</span>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;