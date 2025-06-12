import React, { useState } from "react";
import {
  Edit,
  Eye,
  Brain,
  Calendar,
  Users,
  Star,
  Award,
  ExternalLink,
  CheckCircle,
  Filter,
  Search,
  Plus,
  MapPin,
  Clock,
  X,
  User,
  Mail,
  Phone,
  Globe,
  MessageCircle,
  DollarSign,
  FileText,
} from "lucide-react";

const EmployerJobDashboard = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedCandidates, setSelectedCandidates] = useState(new Set());
  const [showProposalsModal, setShowProposalsModal] = useState(false);
  const [proposalsForJob, setProposalsForJob] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const jobs = [
    {
      id: 1,
      title: "React Dashboard Developer",
      postedDate: "2025-06-08",
      description:
        "Real-time data visualization dashboard with user management",
      skills: ["React", "JavaScript", "Tailwind", "Chart.js"],
      proposalCount: 12,
      deadline: "2025-07-15",
      status: "Open",
      budget: "Rs. 2,500",
    },
    {
      id: 2,
      title: "MERN E-commerce Platform",
      postedDate: "2025-06-05",
      description: "Full-stack solution with payments and inventory",
      skills: ["MongoDB", "Express", "React", "Node.js"],
      proposalCount: 8,
      deadline: "2025-08-01",
      status: "Under Review",
      budget: "Rs. 4,200",
    },
    {
      id: 3,
      title: "Fitness App UI/UX",
      postedDate: "2025-06-10",
      description: "Modern mobile app design with intuitive UX",
      skills: ["Figma", "UI/UX", "Mobile", "Prototyping"],
      proposalCount: 15,
      deadline: "2025-06-30",
      status: "In Progress",
      budget: "Rs. 1,800",
    },
  ];

  const proposals = {
    1: [
      {
        id: 1,
        userId: 101,
        name: "Priya Sharma",
        avatar: "PS",
        title: "React Specialist",
        location: "Mumbai",
        submittedDate: "2025-06-09",
        bidAmount: "Rs. 2,300",
        timeframe: "3 weeks",
        coverLetter:
          "I have 5+ years of experience building React dashboards with real-time data visualization. I've worked on similar projects involving Chart.js and can deliver a responsive, user-friendly dashboard within your timeline.",
        rating: 4.8,
        reviewCount: 23,
        skills: ["React", "JavaScript", "Tailwind", "Chart.js"],
        completedJobs: 45,
        email: "priya.sharma@email.com",
        phone: "+91 9876543210",
        portfolio: "https://priyasharma.dev",
        experience: "5+ years",
        languages: ["English", "Hindi"],
        education: "B.Tech Computer Science",
        certifications: ["React Developer Certification", "AWS Certified"],
      },
      {
        id: 2,
        userId: 102,
        name: "Arjun Patel",
        avatar: "AP",
        title: "Frontend Developer",
        location: "Delhi",
        submittedDate: "2025-06-10",
        bidAmount: "Rs. 2,400",
        timeframe: "4 weeks",
        coverLetter:
          "As a frontend specialist with extensive React experience, I can create an intuitive dashboard with excellent UX. My previous work includes several data visualization projects.",
        rating: 4.6,
        reviewCount: 18,
        skills: ["React", "JavaScript", "TypeScript"],
        completedJobs: 32,
        email: "arjun.patel@email.com",
        phone: "+91 9876543211",
        portfolio: "https://arjunpatel.dev",
        experience: "4+ years",
        languages: ["English", "Hindi", "Gujarati"],
        education: "MCA",
        certifications: ["Frontend Master", "Google Analytics"],
      },
      {
        id: 3,
        userId: 103,
        name: "Sneha Reddy",
        avatar: "SR",
        title: "UI Developer",
        location: "Bangalore",
        submittedDate: "2025-06-11",
        bidAmount: "Rs. 2,200",
        timeframe: "3.5 weeks",
        coverLetter:
          "I specialize in creating beautiful, responsive dashboards. With my React and Tailwind expertise, I can deliver a modern dashboard that exceeds your expectations.",
        rating: 4.9,
        reviewCount: 31,
        skills: ["React", "Tailwind", "CSS", "UI/UX"],
        completedJobs: 58,
        email: "sneha.reddy@email.com",
        phone: "+91 9876543212",
        portfolio: "https://snehareddy.dev",
        experience: "6+ years",
        languages: ["English", "Telugu", "Hindi"],
        education: "B.E. Information Technology",
        certifications: ["UI/UX Design", "React Advanced"],
      },
    ],
    2: [
      {
        id: 4,
        userId: 104,
        name: "Rahul Kumar",
        avatar: "RK",
        title: "Full Stack Developer",
        location: "Pune",
        submittedDate: "2025-06-06",
        bidAmount: "Rs. 4,000",
        timeframe: "6 weeks",
        coverLetter:
          "I'm a MERN stack expert with 7+ years of experience building e-commerce platforms. I can handle the complete development including payment integration and inventory management.",
        rating: 4.7,
        reviewCount: 27,
        skills: ["MongoDB", "Express", "React", "Node.js", "Payment Gateways"],
        completedJobs: 67,
        email: "rahul.kumar@email.com",
        phone: "+91 9876543213",
        portfolio: "https://rahulkumar.dev",
        experience: "7+ years",
        languages: ["English", "Hindi"],
        education: "M.Tech Computer Science",
        certifications: ["Full Stack Developer", "MongoDB Certified"],
      },
      {
        id: 5,
        userId: 105,
        name: "Anita Singh",
        avatar: "AS",
        title: "MERN Developer",
        location: "Chennai",
        submittedDate: "2025-06-07",
        bidAmount: "Rs. 3,800",
        timeframe: "7 weeks",
        coverLetter:
          "I have extensive experience in MERN stack development and have built multiple e-commerce solutions. I can deliver a scalable platform with all required features.",
        rating: 4.5,
        reviewCount: 14,
        skills: ["React", "Node.js", "MongoDB", "Express"],
        completedJobs: 29,
        email: "anita.singh@email.com",
        phone: "+91 9876543214",
        portfolio: "https://anitasingh.dev",
        experience: "4+ years",
        languages: ["English", "Hindi", "Tamil"],
        education: "B.Tech IT",
        certifications: ["MERN Stack", "React Certified"],
      },
    ],
    3: [
      {
        id: 6,
        userId: 106,
        name: "Kavya Nair",
        avatar: "KN",
        title: "UX Designer",
        location: "Kochi",
        submittedDate: "2025-06-11",
        bidAmount: "Rs. 1,600",
        timeframe: "4 weeks",
        coverLetter:
          "I'm passionate about creating user-centered designs for mobile applications. With my Figma expertise and mobile UX knowledge, I can design an engaging fitness app interface.",
        rating: 4.9,
        reviewCount: 42,
        skills: ["Figma", "UI/UX", "Mobile", "Prototyping"],
        completedJobs: 73,
        email: "kavya.nair@email.com",
        phone: "+91 9876543215",
        portfolio: "https://kavyanair.design",
        experience: "6+ years",
        languages: ["English", "Malayalam", "Hindi"],
        education: "M.Des Interaction Design",
        certifications: ["UX Design", "Figma Expert"],
      },
    ],
  };

  const candidates = {
    1: [
      {
        id: 1,
        name: "Priya Sharma",
        avatar: "PS",
        title: "React Specialist",
        location: "Mumbai",
        matchingSkills: ["React", "JavaScript", "Tailwind", "Chart.js"],
        rating: 4.8,
        reviewCount: 23,
        badges: ["Expert"],
        matchScore: 94,
        hourlyRate: "Rs. 35",
      },
      {
        id: 2,
        name: "Arjun Patel",
        avatar: "AP",
        title: "Frontend Developer",
        location: "Delhi",
        matchingSkills: ["React", "JavaScript"],
        rating: 4.6,
        reviewCount: 18,
        badges: ["Pro"],
        matchScore: 87,
        hourlyRate: "Rs. 28",
      },
      {
        id: 3,
        name: "Sneha Reddy",
        avatar: "SR",
        title: "UI Developer",
        location: "Bangalore",
        matchingSkills: ["React", "Tailwind"],
        rating: 4.9,
        reviewCount: 31,
        badges: ["Expert"],
        matchScore: 82,
        hourlyRate: "Rs. 32",
      },
    ],
    2: [
      {
        id: 4,
        name: "Rahul Kumar",
        avatar: "RK",
        title: "Full Stack Developer",
        location: "Pune",
        matchingSkills: ["MongoDB", "Express", "React", "Node.js"],
        rating: 4.7,
        reviewCount: 27,
        badges: ["Expert"],
        matchScore: 96,
        hourlyRate: "Rs. 40",
      },
      {
        id: 5,
        name: "Anita Singh",
        avatar: "AS",
        title: "MERN Developer",
        location: "Chennai",
        matchingSkills: ["React", "Node.js", "MongoDB"],
        rating: 4.5,
        reviewCount: 14,
        badges: ["Pro"],
        matchScore: 85,
        hourlyRate: "Rs. 30",
      },
    ],
    3: [
      {
        id: 6,
        name: "Kavya Nair",
        avatar: "KN",
        title: "UX Designer",
        location: "Kochi",
        matchingSkills: ["Figma", "UI/UX", "Mobile", "Prototyping"],
        rating: 4.9,
        reviewCount: 42,
        badges: ["Expert"],
        matchScore: 98,
        hourlyRate: "Rs. 45",
      },
    ],
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-emerald-500";
      case "Under Review":
        return "bg-amber-500";
      case "In Progress":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleCandidateSelect = (candidateId) => {
    const newSelected = new Set(selectedCandidates);
    if (newSelected.has(candidateId)) {
      newSelected.delete(candidateId);
    } else {
      newSelected.add(candidateId);
    }
    setSelectedCandidates(newSelected);
  };

  const handleViewProposals = (jobId) => {
    setProposalsForJob(jobId);
    setShowProposalsModal(true);
  };

  const handleViewProfile = (proposal) => {
    setSelectedProfile(proposal);
    setShowProfileModal(true);
  };

  const JobCard = ({ job }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {job.title}
              </h3>
              <div
                className={`w-2 h-2 rounded-full ${getStatusColor(job.status)}`}
              ></div>
            </div>
            <p className="text-gray-600 text-sm mb-3">{job.description}</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-gray-900">{job.budget}</div>
            <div className="text-xs text-gray-500">Budget</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs font-medium"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="bg-gray-50 text-gray-600 px-2.5 py-1 rounded-md text-xs">
              +{job.skills.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>
                {new Date(job.postedDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{job.proposalCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>
                {new Date(job.deadline).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-colors text-sm">
            <Edit className="w-3.5 h-3.5" />
            Edit
          </button>
          <button
            onClick={() => handleViewProposals(job.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-colors text-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            Proposals
          </button>
          <button
            onClick={() => {
              setSelectedJob(job.id.toString());
              setActiveTab("candidates");
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors text-sm ml-auto"
          >
            <Brain className="w-3.5 h-3.5" />
            AI Match
          </button>
        </div>
      </div>
    </div>
  );

  const CandidateCard = ({ candidate }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-semibold">
              {candidate.avatar}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
              <p className="text-sm text-gray-600">{candidate.title}</p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">
                  {candidate.location}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">
              <div className="text-2xl font-bold text-emerald-600">
                {candidate.matchScore}
              </div>
              <div className="text-xs text-gray-500 mt-1">%</div>
            </div>
            <div className="text-xs text-gray-500">Match</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {candidate.matchingSkills.map((skill, index) => (
            <span
              key={index}
              className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-current" />
              <span>{candidate.rating}</span>
              <span className="text-gray-400">({candidate.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="w-3 h-3 text-purple-500" />
              <span>{candidate.badges[0]}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-gray-900">
              {candidate.hourlyRate}
            </div>
            <div className="text-xs text-gray-500">/hour</div>
          </div>
        </div>
      </div>

      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <button
          onClick={() => handleCandidateSelect(candidate.id)}
          className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-colors ${
            selectedCandidates.has(candidate.id)
              ? "bg-emerald-600 text-white hover:bg-emerald-700"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {selectedCandidates.has(candidate.id) ? "Invited" : "Invite to Apply"}
        </button>
      </div>
    </div>
  );

  const ProposalCard = ({ proposal }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-semibold text-lg">
            {proposal.avatar}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">
              {proposal.name}
            </h3>
            <p className="text-gray-600">{proposal.title}</p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-gray-400" />
              <span className="text-sm text-gray-500">{proposal.location}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-emerald-600">
            {proposal.bidAmount}
          </div>
          <div className="text-sm text-gray-500">{proposal.timeframe}</div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed">{proposal.coverLetter}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {proposal.skills.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm font-medium"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-current" />
            <span>{proposal.rating}</span>
            <span className="text-gray-400">
              ({proposal.reviewCount} reviews)
            </span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>{proposal.completedJobs} jobs completed</span>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Submitted on {new Date(proposal.submittedDate).toLocaleDateString()}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => handleViewProfile(proposal)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          <User className="w-4 h-4" />
          View Profile
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          <MessageCircle className="w-4 h-4" />
          Message
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
          <CheckCircle className="w-4 h-4" />
          Hire
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Job Manager
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Manage posts and discover talent
              </p>
            </div>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <Plus className="w-4 h-4" />
              New Job
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-gray-100 rounded-lg mb-8 w-fit">
          <button
            onClick={() => setActiveTab("jobs")}
            className={`px-6 py-2.5 rounded-md font-medium text-sm transition-colors ${
              activeTab === "jobs"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Your Jobs ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab("candidates")}
            className={`px-6 py-2.5 rounded-md font-medium text-sm transition-colors ${
              activeTab === "candidates"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            AI Matches
          </button>
        </div>

        {/* Content */}
        {activeTab === "jobs" ? (
          <div className="grid gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div>
            {/* Job Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Job
                  </label>
                  <select
                    value={selectedJob}
                    onChange={(e) => setSelectedJob(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  >
                    <option value="">Choose a job...</option>
                    {jobs.map((job) => (
                      <option key={job.id} value={job.id.toString()}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedJob && (
                  <div className="flex gap-2">
                    <button className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <Filter className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <Search className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Candidates */}
            {selectedJob ? (
              <div className="grid gap-6">
                {candidates[selectedJob]?.map((candidate) => (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                )) || (
                  <div className="text-center py-12 text-gray-500">
                    <Brain className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p>No matches found for this job</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-lg font-medium text-gray-900 mb-2">
                  AI-Powered Matching
                </p>
                <p>Select a job to see perfectly matched candidates</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Proposals Modal */}
      {showProposalsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Proposals for{" "}
                  {jobs.find((j) => j.id === proposalsForJob)?.title}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  {proposals[proposalsForJob]?.length || 0} proposals received
                </p>
              </div>
              <button
                onClick={() => setShowProposalsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {proposals[proposalsForJob]?.map((proposal) => (
                <ProposalCard key={proposal.id} proposal={proposal} />
              )) || (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p>No proposals found for this job</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && selectedProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-semibold text-xl">
                  {selectedProfile.avatar}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {selectedProfile.name}
                  </h2>
                  <p className="text-gray-600">{selectedProfile.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {selectedProfile.location}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowProfileModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Rating & Stats */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-amber-400 fill-current" />
                        <span className="text-lg font-semibold">
                          {selectedProfile.rating}
                        </span>
                        <span className="text-gray-500">
                          ({selectedProfile.reviewCount} reviews)
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          {selectedProfile.completedJobs}
                        </div>
                        <div className="text-xs text-gray-500">
                          Jobs Completed
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Experience</div>
                        <div className="font-medium">
                          {selectedProfile.experience}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Education</div>
                        <div className="font-medium">
                          {selectedProfile.education}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">
                          {selectedProfile.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">
                          {selectedProfile.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <a
                          href={selectedProfile.portfolio}
                          className="text-blue-600 hover:underline"
                        >
                          {selectedProfile.portfolio}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Languages
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProfile.languages.map((language, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Skills */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProfile.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Certifications
                    </h3>
                    <div className="space-y-2">
                      {selectedProfile.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-purple-500" />
                          <span className="text-gray-700">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Proposal Details */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Proposal Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bid Amount:</span>
                        <span className="font-semibold text-blue-600">
                          {selectedProfile.bidAmount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Timeframe:</span>
                        <span className="font-semibold">
                          {selectedProfile.timeframe}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Submitted:</span>
                        <span className="font-semibold">
                          {new Date(
                            selectedProfile.submittedDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Cover Letter
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedProfile.coverLetter}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  <ExternalLink className="w-4 h-4" />
                  View Portfolio
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  <MessageCircle className="w-4 h-4" />
                  Send Message
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                  <CheckCircle className="w-4 h-4" />
                  Hire Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerJobDashboard;
