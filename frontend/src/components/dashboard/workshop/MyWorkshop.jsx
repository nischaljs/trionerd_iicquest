'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Plus,
  Star,
  Calendar,
  Users,
  Video,
  Award,
  BookOpen,
  TrendingUp,
  Eye,
  Play,
  Sparkles,
  X,
  Link,
  Loader2,
} from 'lucide-react';

const MyWorkshop = () => {
  const [activeTab, setActiveTab] = useState('hosted');
  const [showHostModal, setShowHostModal] = useState(false);
  const [hostedWorkshops, setHostedWorkshops] = useState([]);
  const [joinedWorkshops, setJoinedWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: '60',
    skills: '',
    maxAttendees: '50',
    zoomMeetingId: '',
    zoomPassword: '',
    isRecorded: true,
  });

  const totalTokens = 1247;

  // API Functions
  const fetchWorkshops = async (status = 'UPCOMING') => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/workshops?page=1&limit=10&status=${status}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching workshops:', error);
      throw error;
    }
  };

  // Load workshops data
  useEffect(() => {
    const loadWorkshops = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch different statuses
        const [upcomingData, ongoingData, completedData] = await Promise.all([
          fetchWorkshops('UPCOMING'),
          fetchWorkshops('ONGOING'),
          fetchWorkshops('COMPLETED'),
        ]);

        // Combine all workshops for hosted (assuming current user is the host)
        const allHostedWorkshops = [
          ...(upcomingData || []),
          ...(ongoingData || []),
          ...(completedData || []),
        ];

        setHostedWorkshops(allHostedWorkshops);

        // For joined workshops, we'll use the same data but filter differently
        // In a real app, you'd have a separate endpoint for joined workshops
        setJoinedWorkshops(allHostedWorkshops.slice(0, 3)); // Mock joined workshops
      } catch (err) {
        setError('Failed to load workshops');
        console.error('Error loading workshops:', err);
      } finally {
        setLoading(false);
      }
    };

    loadWorkshops();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here you would make an API call to create the workshop
      console.log('Workshop data:', formData);

      // Mock API call
      // await axios.post('http://localhost:3000/api/workshops', formData)

      setShowHostModal(false);
      // Reset form
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        duration: '60',
        skills: '',
        maxAttendees: '50',
        zoomMeetingId: '',
        zoomPassword: '',
        isRecorded: true,
      });

      // Refresh workshops list
      // You could call loadWorkshops() here
    } catch (error) {
      console.error('Error creating workshop:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'UPCOMING':
        return 'bg-green-100 text-green-800';
      case 'ONGOING':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'UPCOMING':
        return 'Upcoming';
      case 'ONGOING':
        return 'Ongoing';
      case 'COMPLETED':
        return 'Completed';
      default:
        return status;
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getBadgeColor = (badgeName) => {
    switch (badgeName) {
      case 'GURU':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'ACHARYA':
        return 'bg-gradient-to-r from-blue-500 to-indigo-500';
      case 'EXPERT':
        return 'bg-gradient-to-r from-green-500 to-emerald-500';
      default:
        return 'bg-gray-500';
    }
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const suggestedWorkshop = {
    title: 'Advanced React Patterns',
    host: 'Sarah Johnson',
    date: '2025-06-20',
    skills: ['React', 'Advanced Patterns', 'Performance'],
    participants: 45,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex items-center gap-3 text-blue-600">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="text-lg font-semibold">Loading workshops...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg font-semibold mb-2">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
            <button
              onClick={() => setShowHostModal(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
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
            onClick={() => setActiveTab('hosted')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
              activeTab === 'hosted'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Hosted Workshops
          </button>
          <button
            onClick={() => setActiveTab('joined')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
              activeTab === 'joined'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Joined Workshops
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'hosted' && (
              <div className="space-y-4">
                {hostedWorkshops.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 text-center shadow-md">
                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No workshops yet
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Start sharing your knowledge by hosting your first
                      workshop
                    </p>
                    <button
                      onClick={() => setShowHostModal(true)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      Host Your First Workshop
                    </button>
                  </div>
                ) : (
                  hostedWorkshops.map((workshop) => (
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
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                workshop.status
                              )}`}
                            >
                              {getStatusText(workshop.status)}
                            </span>
                          </div>

                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {workshop.description}
                          </p>

                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(workshop.startDate)} at{' '}
                              {formatTime(workshop.startDate)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {workshop.attendees?.length || 0}/
                              {workshop.totalSeats} attendees
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {workshop.skillsTaught?.map((skill, index) => (
                              <span
                                key={index}
                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-4">
                            {workshop.reviews &&
                              workshop.reviews.length > 0 && (
                                <div className="flex items-center gap-1">
                                  {renderStars(
                                    calculateAverageRating(workshop.reviews)
                                  )}
                                  <span className="text-sm font-semibold text-gray-700 ml-1">
                                    {calculateAverageRating(workshop.reviews)}
                                  </span>
                                </div>
                              )}
                            {workshop.status === 'COMPLETED' &&
                              workshop.reviews && (
                                <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                                  <Eye className="w-4 h-4" />
                                  View Reviews ({workshop.reviews.length})
                                </button>
                              )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          {workshop.zoomLink &&
                            (workshop.status === 'UPCOMING' ||
                              workshop.status === 'ONGOING') && (
                              <a
                                href={workshop.zoomLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition-colors"
                              >
                                <Video className="w-4 h-4" />
                                Join Zoom
                              </a>
                            )}
                          <div className="text-xs text-gray-500 text-center">
                            ${workshop.price} • {workshop.tokensEarned} tokens
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'joined' && (
              <div className="space-y-4">
                {joinedWorkshops.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 text-center shadow-md">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No workshops joined yet
                    </h3>
                    <p className="text-gray-600">
                      Explore and join workshops to start learning
                    </p>
                  </div>
                ) : (
                  joinedWorkshops.map((workshop) => (
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
                              {workshop.host?.name}
                            </span>
                            {workshop.host?.badges &&
                              workshop.host.badges.length > 0 && (
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getBadgeColor(
                                    workshop.host.badges[0].badge.name
                                  )}`}
                                >
                                  {workshop.host.badges[0].badge.name}
                                </span>
                              )}
                          </div>

                          <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                            <Calendar className="w-4 h-4" />
                            {formatDate(workshop.startDate)} at{' '}
                            {formatTime(workshop.startDate)}
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {workshop.skillsTaught?.map((skill, index) => (
                              <span
                                key={index}
                                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-4">
                            {workshop.reviews &&
                              workshop.reviews.length > 0 && (
                                <div className="flex items-center gap-1">
                                  <span className="text-sm text-gray-600">
                                    Rating:
                                  </span>
                                  {renderStars(
                                    calculateAverageRating(workshop.reviews)
                                  )}
                                </div>
                              )}
                            {workshop.status === 'COMPLETED' && (
                              <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                                <Play className="w-4 h-4" />
                                Watch Replay
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
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
                  <span className="font-bold text-purple-600">
                    {hostedWorkshops.reduce(
                      (total, workshop) =>
                        total + (workshop.attendees?.length || 0),
                      0
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Host Workshop Modal */}
      {showHostModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Host New Workshop
                  </h2>
                  <p className="text-gray-600">
                    Create an engaging learning experience
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowHostModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Workshop Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Workshop Details
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Workshop Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="e.g., Advanced React Patterns"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Describe what participants will learn..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills/Tags *
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="React, JavaScript, Hooks (comma separated)"
                    required
                  />
                </div>
              </div>

              {/* Schedule */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Schedule
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time *
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (minutes)
                    </label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="90">1.5 hours</option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Attendees
                    </label>
                    <input
                      type="number"
                      name="maxAttendees"
                      value={formData.maxAttendees}
                      onChange={handleInputChange}
                      min="1"
                      max="500"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Zoom Integration */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Video className="w-5 h-5 text-green-600" />
                  Zoom Meeting Details
                </h3>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Link className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-900 mb-1">
                        Zoom Integration
                      </h4>
                      <p className="text-sm text-green-700">
                        Connect your Zoom account or manually enter meeting
                        details
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zoom Meeting ID *
                  </label>
                  <input
                    type="text"
                    name="zoomMeetingId"
                    value={formData.zoomMeetingId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="123-456-7890"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meeting Password (Optional)
                  </label>
                  <input
                    type="text"
                    name="zoomPassword"
                    value={formData.zoomPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter meeting password"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isRecorded"
                    name="isRecorded"
                    checked={formData.isRecorded}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="isRecorded"
                    className="text-sm font-medium text-gray-700"
                  >
                    Record this workshop for replay
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowHostModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Video className="w-5 h-5" />
                  Create Workshop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyWorkshop;
