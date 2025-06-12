import React, { useState, useMemo } from 'react';
import { Search, Filter, Star, Award, Calendar, MessageCircle, FileText, X, Eye, Users, BookOpen, ChevronDown } from 'lucide-react';

const ProposalInvitationsPanel = () => {
  const [activeTab, setActiveTab] = useState('sent');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for sent proposals
  const sentProposals = [
    {
      id: 1,
      teacher: {
        name: "Dr. Sarah Chen",
        email: "sarah.chen@university.edu",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b69bbfe1?w=150&h=150&fit=crop&crop=face",
        bio: "Machine Learning expert with 10+ years experience in AI research and development. Passionate about teaching cutting-edge technologies.",
        skills: ["Machine Learning", "Python", "TensorFlow", "Data Science"],
        badges: ["Guru", "Research Lead"],
        rating: 4.9,
        reviewsCount: 127,
        workshopsAttended: 45,
        workshopsHosted: 23
      },
      proposalTitle: "Advanced ML Algorithms Workshop",
      status: "pending",
      submittedDate: "2024-06-10",
      contractHash: null
    },
    {
      id: 2,
      teacher: {
        name: "Prof. Michael Rodriguez",
        email: "m.rodriguez@tech.edu",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        bio: "Full-stack developer and educator specializing in modern web technologies and cloud architecture.",
        skills: ["React", "Node.js", "AWS", "DevOps"],
        badges: ["Acharya", "Cloud Expert"],
        rating: 4.7,
        reviewsCount: 89,
        workshopsAttended: 32,
        workshopsHosted: 18
      },
      proposalTitle: "React Advanced Patterns",
      status: "accepted",
      submittedDate: "2024-06-08",
      contractHash: "0x7a8b9c2d..."
    },
    {
      id: 3,
      teacher: {
        name: "Dr. Emily Watson",
        email: "e.watson@design.edu",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        bio: "UX/UI Design specialist with expertise in user research, prototyping, and design systems.",
        skills: ["UI/UX Design", "Figma", "User Research", "Prototyping"],
        badges: ["Design Master"],
        rating: 4.8,
        reviewsCount: 156,
        workshopsAttended: 28,
        workshopsHosted: 31
      },
      proposalTitle: "Design System Workshop",
      status: "declined",
      submittedDate: "2024-06-05",
      contractHash: null
    },
    {
      id: 4,
      teacher: {
        name: "James Thompson",
        email: "j.thompson@crypto.edu",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        bio: "Blockchain developer and cryptocurrency enthusiast. Teaching smart contract development and DeFi protocols.",
        skills: ["Blockchain", "Solidity", "Web3", "DeFi"],
        badges: ["Blockchain Guru"],
        rating: 4.6,
        reviewsCount: 73,
        workshopsAttended: 19,
        workshopsHosted: 12
      },
      proposalTitle: "Smart Contract Development",
      status: "pending",
      submittedDate: "2024-06-12",
      contractHash: null
    }
  ];

  // Filter accepted proposals
  const acceptedProposals = sentProposals.filter(proposal => proposal.status === 'accepted');

  // Get all unique skills for filter dropdown
  const allSkills = [...new Set(sentProposals.flatMap(p => p.teacher.skills))];

  // Filter and sort logic
  const filteredProposals = useMemo(() => {
    const proposals = activeTab === 'sent' ? sentProposals : acceptedProposals;
    
    let filtered = proposals.filter(proposal => {
      const matchesSearch = proposal.teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           proposal.teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSkill = !selectedSkill || proposal.teacher.skills.includes(selectedSkill);
      const matchesStatus = !selectedStatus || proposal.status === selectedStatus;
      
      return matchesSearch && matchesSkill && matchesStatus;
    });

    // Sort logic
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.submittedDate) - new Date(a.submittedDate);
        case 'rating':
          return b.teacher.rating - a.teacher.rating;
        case 'badge':
          const badgePriority = { 'Guru': 3, 'Acharya': 2, 'Master': 1 };
          const aBadge = Math.max(...a.teacher.badges.map(b => badgePriority[b] || 0));
          const bBadge = Math.max(...b.teacher.badges.map(b => badgePriority[b] || 0));
          return bBadge - aBadge;
        default:
          return 0;
      }
    });

    return filtered;
  }, [activeTab, searchTerm, selectedSkill, selectedStatus, sortBy, sentProposals, acceptedProposals]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: '🟡', text: 'Pending' },
      accepted: { color: 'bg-green-100 text-green-800', icon: '🟢', text: 'Accepted' },
      declined: { color: 'bg-red-100 text-red-800', icon: '🔴', text: 'Declined' }
    };
    
    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <span className="mr-1">{config.icon}</span>
        {config.text}
      </span>
    );
  };

  const ProposalCard = ({ proposal }) => (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <img
          src={proposal.teacher.avatar}
          alt={proposal.teacher.name}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
        />
        
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{proposal.teacher.name}</h3>
              <p className="text-sm text-gray-600">{proposal.teacher.email}</p>
            </div>
            {getStatusBadge(proposal.status)}
          </div>
          
          {/* Bio */}
          <p className="text-sm text-gray-700 mb-3 line-clamp-2 leading-relaxed">
            {proposal.teacher.bio}
          </p>
          
          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-3">
            {proposal.teacher.skills.slice(0, 4).map((skill, index) => (
              <span key={index} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">
                {skill}
              </span>
            ))}
            {proposal.teacher.skills.length > 4 && (
              <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                +{proposal.teacher.skills.length - 4} more
              </span>
            )}
          </div>
          
          {/* Badges */}
          <div className="flex gap-2 mb-3">
            {proposal.teacher.badges.map((badge, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
                <Award className="w-3 h-3 mr-1" />
                {badge}
              </span>
            ))}
          </div>
          
          {/* Stats */}
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-medium">{proposal.teacher.rating}</span>
              <span>({proposal.teacher.reviewsCount})</span>
            </div>
            <div className="flex items-center gap-1" title="Workshops Attended">
              <BookOpen className="w-4 h-4 text-blue-500" />
              <span>{proposal.teacher.workshopsAttended}</span>
            </div>
            <div className="flex items-center gap-1" title="Workshops Hosted">
              <Users className="w-4 h-4 text-green-500" />
              <span>{proposal.teacher.workshopsHosted}</span>
            </div>
          </div>
          
          {/* Proposal Title */}
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <h4 className="font-medium text-gray-900 mb-1">Proposal: {proposal.proposalTitle}</h4>
            <p className="text-xs text-gray-500">Submitted on {new Date(proposal.submittedDate).toLocaleDateString()}</p>
          </div>
          
          {/* Actions */}
          <div className="flex gap-2">
            {proposal.status === 'pending' && (
              <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium">
                <X className="w-4 h-4" />
                Withdraw
              </button>
            )}
            {proposal.status === 'accepted' && (
              <>
                {proposal.contractHash && (
                  <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full font-medium">
                    🔗 On-chain Verified
                  </span>
                )}
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  <Calendar className="w-4 h-4" />
                  Join Workshop
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                  <FileText className="w-4 h-4" />
                  View Agreement
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                  <MessageCircle className="w-4 h-4" />
                  Message
                </button>
              </>
            )}
            {proposal.status === 'declined' && (
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                <Eye className="w-4 h-4" />
                View Details
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Proposal Invitations</h1>
        <p className="text-gray-600">Manage your sent proposals and track accepted collaborations</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('sent')}
            className={`px-6 py-3 font-medium text-sm relative transition-colors ${
              activeTab === 'sent'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📨 Sent Proposals ({sentProposals.length})
          </button>
          <button
            onClick={() => setActiveTab('accepted')}
            className={`px-6 py-3 font-medium text-sm relative transition-colors ${
              activeTab === 'accepted'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            ✅ Accepted Proposals ({acceptedProposals.length})
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by teacher name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            {/* Skill Filter */}
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Skills</option>
              {allSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>

            {/* Status Filter (Tab 1 only) */}
            {activeTab === 'sent' && (
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="declined">Declined</option>
              </select>
            )}

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="recent">Most Recent</option>
              <option value="rating">Highest Rating</option>
              <option value="badge">Badge Level</option>
            </select>
          </div>
        )}

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredProposals.length} of {activeTab === 'sent' ? sentProposals.length : acceptedProposals.length} proposals
          </p>
        </div>
      </div>

      {/* Proposals Grid */}
      <div className="space-y-4">
        {filteredProposals.length > 0 ? (
          filteredProposals.map(proposal => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No proposals found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalInvitationsPanel;