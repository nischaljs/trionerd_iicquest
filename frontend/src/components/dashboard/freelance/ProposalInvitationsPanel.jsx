import React, { useState, useEffect, useContext } from "react";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Star,
  Award,
  Users,
  Book,
  MessageCircle,
  Eye,
  X,
  Check,
  ExternalLink,
  Hash,
} from "lucide-react";
import { get, post } from "../../../utils/api";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";

const ProposalInvitationsPanel = () => {
  const { currentUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("sent");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    skill: "",
    type: "",
    status: "",
    sort: "recent",
  });

  // State for API data
  const [sentProposals, setSentProposals] = useState([]);
  const [acceptedProposals, setAcceptedProposals] = useState([]);
  const [jobInvites, setJobInvites] = useState([]);

  // Fetch job invites
  const fetchJobInvites = async () => {
    try {
      setLoading(true);
      const res = await get("/api/jobs/invites");
      console.log("Job invites response:", res);

      if (res.status === "success" && Array.isArray(res.data)) {
        setJobInvites(res.data);
      }
    } catch (error) {
      console.error("Error fetching job invites:", error);
      toast.error("Failed to fetch job invitations");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts or tab changes
  useEffect(() => {
    if (currentUser) {
      if (activeTab === "companies") {
        fetchJobInvites();
      }
      // Add fetching for other tabs as needed
    }
  }, [activeTab, currentUser]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
      case "ACCEPTED":
        return "bg-green-100 text-green-800";
      case "declined":
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAcceptOffer = async (inviteId) => {
    try {
      setLoading(true);
      const res = await post(`/api/jobs/invites/${inviteId}/accept`);
      console.log("Accept invite response:", res);

      if (res.status === "success") {
        toast.success("Invitation accepted successfully");
        fetchJobInvites(); // Refresh the list
      } else {
        toast.error(res.message || "Failed to accept invitation");
      }
    } catch (error) {
      console.error("Error accepting invite:", error);
      toast.error(
        error.response?.data?.message || "Failed to accept invitation"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRejectOffer = async (inviteId) => {
    try {
      setLoading(true);
      const res = await post(`/api/jobs/invites/${inviteId}/reject`);
      console.log("Reject invite response:", res);

      if (res.status === "success") {
        toast.success("Invitation rejected");
        fetchJobInvites(); // Refresh the list
      } else {
        toast.error(res.message || "Failed to reject invitation");
      }
    } catch (error) {
      console.error("Error rejecting invite:", error);
      toast.error(
        error.response?.data?.message || "Failed to reject invitation"
      );
    } finally {
      setLoading(false);
    }
  };

  const JobInviteCard = ({ invite }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="relative">
          {invite.job?.employer?.profilePic ? (
            <img
              src={invite.job.employer.profilePic}
              alt={invite.job.employer.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-blue-100 text-blue-600 text-xl font-semibold">
              {invite.job?.employer?.name?.charAt(0) || "E"}
            </div>
          )}
          {invite.job?.employer?.verified && (
            <div className="absolute -top-1 -right-1 bg-blue-600 rounded-full p-1">
              <Check className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {invite.job?.employer?.name || "Company"}
              </h3>
              <p className="text-sm text-gray-600">
                {invite.job?.employer?.email || "No email provided"}
              </p>
              {invite.job?.employer?.website && (
                <a
                  href={`https://${invite.job.employer.website}`}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  <ExternalLink className="w-3 h-3 inline mr-1" />
                  {invite.job.employer.website}
                </a>
              )}
            </div>
            <div className="flex items-center gap-1">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  invite.status
                )}`}
              >
                {invite.status}
              </span>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-blue-900 mb-2">
              {invite.job?.title || "Job Invitation"}
            </h4>
            <p className="text-sm text-gray-700 mb-3">
              {invite.job?.description?.substring(0, 150) || "No description"}
              ...
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm mb-3">
              <div className="flex items-center gap-1 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>
                  Posted: {new Date(invite.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>
                  {invite.job?.location || "Location not specified"} (
                  {invite.job?.locationType || "Not specified"})
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {invite.job?.requiredSkills?.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {invite.status === "PENDING" && (
            <div className="flex gap-3">
              <button
                onClick={() => handleAcceptOffer(invite.id)}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
              >
                <Check className="w-4 h-4 inline mr-2" />
                Accept Offer
              </button>
              <button
                onClick={() => handleRejectOffer(invite.id)}
                disabled={loading}
                className="flex-1 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-medium disabled:opacity-50"
              >
                <X className="w-4 h-4 inline mr-2" />
                Reject Offer
              </button>
            </div>
          )}

          {invite.status === "ACCEPTED" && (
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                <MessageCircle className="w-4 h-4 inline mr-2" />
                Contact Employer
              </button>
              <button className="flex-1 px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                <Eye className="w-4 h-4 inline mr-2" />
                View Contract
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: "sent", label: "Sent Proposals", count: sentProposals.length },
    {
      id: "accepted",
      label: "Accepted by Teachers",
      count: acceptedProposals.length,
    },
    { id: "companies", label: "Job Invitations", count: jobInvites.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Proposal Manager
          </h1>
          <p className="text-gray-600">
            Track and manage your proposals and job invitations
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, title, or company..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Skills</option>
                <option value="react">React</option>
                <option value="python">Python</option>
                <option value="ml">Machine Learning</option>
              </select>
              <select className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Types</option>
                <option value="workshop">Workshop</option>
                <option value="mentorship">Mentorship</option>
                <option value="job">Job</option>
              </select>
              <select className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="recent">Most Recent</option>
                <option value="skill-match">Skill Match</option>
                <option value="badge-level">Badge Level</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Loading state */}
            {loading && (
              <div className="text-center py-10">
                <div className="inline-block animate-spin mr-2">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-600">Loading...</span>
              </div>
            )}

            {/* Sent Proposals Tab */}
            {!loading && activeTab === "sent" && (
              <div className="space-y-6">
                {sentProposals.length > 0 ? (
                  sentProposals.map((proposal) => (
                    <ProposalCard
                      key={proposal.id}
                      proposal={proposal}
                      type="sent"
                    />
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <p>You haven't sent any proposals yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* Accepted by Teachers Tab */}
            {!loading && activeTab === "accepted" && (
              <div className="space-y-6">
                {acceptedProposals.length > 0 ? (
                  acceptedProposals.map((proposal) => (
                    <ProposalCard
                      key={proposal.id}
                      proposal={proposal}
                      type="accepted"
                    />
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <p>No accepted proposals yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* Job Invitations Tab */}
            {!loading && activeTab === "companies" && (
              <div className="space-y-6">
                {jobInvites.length > 0 ? (
                  jobInvites.map((invite) => (
                    <JobInviteCard key={invite.id} invite={invite} />
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <p>No job invitations yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalInvitationsPanel;
