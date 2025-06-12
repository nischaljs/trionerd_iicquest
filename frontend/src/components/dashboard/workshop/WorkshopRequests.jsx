import React, { useState, useEffect } from "react";

const WorkshopRequests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSort, setActiveSort] = useState("recent");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState({
    requester: "",
    topic: "",
  });

  const [requestsData, setRequestsData] = useState([
    {
      id: 1,
      requester: "Arjun Sharma",
      userType: "Shiksharthi",
      avatar: "AS",
      title: "Getting Started with Docker",
      description:
        "I'm new to containerization and would love to learn Docker basics - how to create containers, manage images, and deploy simple applications. Looking for hands-on examples!",
      tags: ["DevOps", "Docker", "Beginner"],
      level: "beginner",
      timing: "Next Week",
      location: "Online",
      popularity: 15,
      bookmarked: false,
    },
    {
      id: 2,
      requester: "Priya Mehta",
      userType: "Guru",
      avatar: "PM",
      title: "Advanced React Patterns",
      description:
        "Looking to dive deep into React patterns like render props, higher-order components, and custom hooks. Want to understand when and how to use each pattern effectively.",
      tags: ["React", "JavaScript", "Intermediate"],
      level: "intermediate",
      timing: "Evenings",
      location: "Campus",
      popularity: 23,
      bookmarked: false,
    },
    {
      id: 3,
      requester: "Ravi Kumar",
      userType: "Shiksharthi",
      avatar: "RK",
      title: "Machine Learning Fundamentals",
      description:
        "Complete beginner wanting to understand ML concepts, supervised vs unsupervised learning, and get hands-on with Python libraries like scikit-learn.",
      tags: ["Machine Learning", "Python", "Beginner"],
      level: "beginner",
      timing: "Weekends",
      location: "Online",
      popularity: 8,
      bookmarked: false,
    },
    {
      id: 4,
      requester: "Shreya Kapoor",
      userType: "Guru",
      avatar: "SK",
      title: "Kubernetes Networking Deep Dive",
      description:
        "Looking for advanced Kubernetes networking concepts - service mesh, network policies, CNI plugins, and troubleshooting network issues in production clusters.",
      tags: ["Kubernetes", "Networking", "Advanced"],
      level: "advanced",
      timing: "This Month",
      location: "Online",
      popularity: 12,
      bookmarked: false,
    },
    {
      id: 5,
      requester: "Amit Nair",
      userType: "Shiksharthi",
      avatar: "AN",
      title: "GraphQL API Design",
      description:
        "Want to learn GraphQL schema design, resolvers, mutations, and how to build efficient GraphQL APIs. Also interested in performance optimization techniques.",
      tags: ["GraphQL", "API Design", "Intermediate"],
      level: "intermediate",
      timing: "Flexible",
      location: "Campus",
      popularity: 19,
      bookmarked: false,
    },
    {
      id: 6,
      requester: "Neha Tiwari",
      userType: "Shiksharthi",
      avatar: "NT",
      title: "Git Version Control Basics",
      description:
        "New to version control and need help understanding Git workflows, branching strategies, merging, and collaboration with teams using GitHub.",
      tags: ["Git", "Version Control", "Beginner"],
      level: "beginner",
      timing: "ASAP",
      location: "Online",
      popularity: 7,
      bookmarked: false,
    },
  ]);

  const [hostForm, setHostForm] = useState({
    hostName: "",
    experience: "",
    approach: "",
    availability: "",
  });

  const filteredRequests = requestsData
    .filter((request) => {
      const matchesSearch =
        request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel =
        activeFilter === "all" || request.level === activeFilter;
      return matchesSearch && matchesLevel;
    })
    .sort((a, b) => {
      if (activeSort === "popular") {
        return b.popularity - a.popularity;
      }
      return Math.random() - 0.5; // Random for "recent"
    });

  const toggleBookmark = (id) => {
    setRequestsData((prev) =>
      prev.map((request) =>
        request.id === id
          ? { ...request, bookmarked: !request.bookmarked }
          : request
      )
    );
  };

  const addInterest = (id) => {
    setRequestsData((prev) =>
      prev.map((request) =>
        request.id === id
          ? { ...request, popularity: request.popularity + 1 }
          : request
      )
    );
  };

  const openModal = (requester, topic) => {
    setSelectedRequest({ requester, topic });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setHostForm({
      hostName: "",
      experience: "",
      approach: "",
      availability: "",
    });
  };

  const submitProposal = () => {
    console.log("Proposal submitted:", hostForm);
    alert(
      "🎉 Your proposal has been submitted! The requester will be notified and can contact you to arrange the workshop."
    );
    closeModal();
  };

  const handleFormChange = (field, value) => {
    setHostForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-5 py-5">
        {/* Header */}
        <div className="text-center mb-8 p-10 bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-xl">
          <h1 className="text-4xl font-bold mb-3">
            📩 Workshop Requests by Students
          </h1>
          <p className="text-lg opacity-90">
            Explore what topics your peers want to learn and volunteer to teach.
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-gray-50 p-5 rounded-xl mb-8 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-64">
            <input
              type="text"
              placeholder="🔍 Search by keyword or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-blue-600 transition-colors"
            />
          </div>

          <div className="flex gap-3 items-center">
            {["all", "beginner", "intermediate", "advanced"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full border-2 transition-all text-sm font-medium capitalize ${
                  activeFilter === filter
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="flex gap-3 items-center">
            {[
              { key: "recent", label: "Recent" },
              { key: "popular", label: "Most Popular" },
            ].map((sort) => (
              <button
                key={sort.key}
                onClick={() => setActiveSort(sort.key)}
                className={`px-4 py-2 rounded-full border-2 transition-all text-sm font-medium ${
                  activeSort === sort.key
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                }`}
              >
                {sort.label}
              </button>
            ))}
          </div>
        </div>

        {/* Requests Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-600 relative overflow-hidden group"
            >
              {/* Animated top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

              {/* Card Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {request.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {request.requester}
                  </h3>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs ${
                      request.userType === "Guru"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {request.userType}
                  </span>
                </div>
                <button
                  onClick={() => toggleBookmark(request.id)}
                  className={`p-2 rounded-full transition-all hover:bg-gray-50 hover:scale-110 ${
                    request.bookmarked ? "text-yellow-500" : "text-gray-400"
                  }`}
                >
                  🔖
                </button>
              </div>

              {/* Topic Title */}
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {request.title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                {request.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {request.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 mb-5 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  📅 {request.timing}
                </div>
                <div className="flex items-center gap-1">
                  📍 {request.location}
                </div>
                <div className="bg-gray-50 px-3 py-1 rounded-full whitespace-nowrap">
                  👍 {request.popularity} interested
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => openModal(request.requester, request.title)}
                  className="flex-1 bg-blue-600 text-white py-3 px-5 rounded-lg font-semibold transition-all hover:bg-blue-700 hover:-translate-y-0.5"
                >
                  💡 Propose to Host
                </button>
                <button
                  onClick={() => addInterest(request.id)}
                  className="flex-1 bg-white text-blue-600 border-2 border-blue-600 py-3 px-5 rounded-lg font-semibold transition-all hover:bg-blue-600 hover:text-white"
                >
                  👍 I Want This Too
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold text-blue-600 mb-5">
              💡 Propose to Host Workshop
            </h2>
            <p className="mb-6 text-gray-700">
              Help{" "}
              <span className="font-semibold">{selectedRequest.requester}</span>{" "}
              learn about <strong>{selectedRequest.topic}</strong>
            </p>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={hostForm.hostName}
                  onChange={(e) => handleFormChange("hostName", e.target.value)}
                  className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Experience with this Topic
                </label>
                <textarea
                  value={hostForm.experience}
                  onChange={(e) =>
                    handleFormChange("experience", e.target.value)
                  }
                  placeholder="Briefly describe your background and expertise in this area..."
                  rows={4}
                  className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-blue-600 resize-vertical"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Teaching Approach
                </label>
                <textarea
                  value={hostForm.approach}
                  onChange={(e) => handleFormChange("approach", e.target.value)}
                  placeholder="How would you structure this workshop? What would you cover?"
                  rows={4}
                  className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-blue-600 resize-vertical"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Availability
                </label>
                <input
                  type="text"
                  value={hostForm.availability}
                  onChange={(e) =>
                    handleFormChange("availability", e.target.value)
                  }
                  placeholder="When are you available to host this workshop?"
                  className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submitProposal}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Submit Proposal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkshopRequests;
