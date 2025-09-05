import { useEffect, useState } from "react";
import {
  LiveSession,
  RecentActivities,
  States,
  WelcomeMessage,
  MessagesFromMentee,
} from "../components/mentordashboard";
import {
  Home,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  Calendar,
  BarChart3,
  BookOpen,
  Plus,
  Edit3,
  Camera,
  Star,
  Award,
  Clock,
  Video,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  DollarSign,
  Target,
  Activity,
  Search,
  Filter,
  Bell,
  ChevronRight,
  Play,
  Pause,
  MoreVertical,
  Download,
  Share,
  Heart,
  Eye,
  Bookmark,
} from "lucide-react";

import { socket } from "../utils/socket";
import Notification from "../components/Notification";
export default function MentorDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showCreateSession, setShowCreateSession] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    const handleNotification = () => {
      console.log("New Session Has Been Created");
    };
    socket.on("Notification", handleNotification);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-8">
            {/* Welcome Header with Gradient */}
            <WelcomeMessage />
            {/* Stats Cards with Enhanced Design */}
            <States />

            {/* Live Sessions with Enhanced Cards */}
            <LiveSession />

            {/* Recent Activity with Timeline */}
            <RecentActivities />
          </div>
        );

      case "sessions":
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                  Session Management
                </h1>
                <p className="text-gray-400 mt-2">
                  Manage your mentoring sessions and track progress
                </p>
              </div>
              <button
                onClick={() => setShowCreateSession(true)}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
              >
                <Plus size={20} />
                Create Session
              </button>
            </div>

            {/* Session Filters */}
            <div className="bg-gradient-to-br from-gray-900/80 to-black/60 p-6 rounded-2xl border border-red-500/20">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-2">
                  {["All", "Live", "Upcoming", "Completed"].map((filter) => (
                    <button
                      key={filter}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600/20 to-red-700/20 text-red-200 hover:from-red-600/30 hover:to-red-700/30 transition-all duration-300 border border-red-500/30"
                    >
                      {filter}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search
                      size={18}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Search sessions..."
                      className="pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-colors"
                    />
                  </div>
                  <button className="p-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-gray-400 hover:text-white hover:border-red-500/50 transition-colors">
                    <Filter size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Sessions Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                {
                  id: 1,
                  title: "Advanced React Patterns",
                  mentee: "Sarah Johnson",
                  date: "Today",
                  time: "2:00 PM",
                  duration: "60 min",
                  status: "live",
                  rating: null,
                },
                {
                  id: 2,
                  title: "System Design Interview",
                  mentee: "Mike Chen",
                  date: "Today",
                  time: "4:00 PM",
                  duration: "90 min",
                  status: "upcoming",
                  rating: null,
                },
                {
                  id: 3,
                  title: "JavaScript Fundamentals",
                  mentee: "Emily Davis",
                  date: "Yesterday",
                  time: "3:00 PM",
                  duration: "45 min",
                  status: "completed",
                  rating: 5,
                },
                {
                  id: 4,
                  title: "Career Transition Guide",
                  mentee: "Alex Kim",
                  date: "Dec 15",
                  time: "1:00 PM",
                  duration: "75 min",
                  status: "completed",
                  rating: 4,
                },
              ].map((session) => (
                <div
                  key={session.id}
                  className="group relative overflow-hidden bg-gradient-to-br from-gray-900/90 to-black/70 p-6 rounded-2xl border border-red-500/30 hover:border-red-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          session.status === "live"
                            ? "bg-red-600/20 text-red-300 border border-red-500/30"
                            : session.status === "upcoming"
                            ? "bg-yellow-600/20 text-yellow-300 border border-yellow-500/30"
                            : "bg-green-600/20 text-green-300 border border-green-500/30"
                        }`}
                      >
                        {session.status === "live" && (
                          <div className="w-2 h-2 bg-red-400 rounded-full inline-block mr-2 animate-pulse"></div>
                        )}
                        {session.status.toUpperCase()}
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-red-600/20 rounded-lg transition-all duration-300">
                          <Edit3 size={16} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-600/20 rounded-lg transition-all duration-300">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      {session.title}
                    </h3>
                    <p className="text-red-200 font-medium mb-4">
                      {session.mentee}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        <span className="text-gray-300 text-sm">
                          {session.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-400" />
                        <span className="text-gray-300 text-sm">
                          {session.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity size={16} className="text-gray-400" />
                        <span className="text-gray-300 text-sm">
                          {session.duration}
                        </span>
                      </div>
                      {session.rating && (
                        <div className="flex items-center gap-2">
                          <Star size={16} className="text-yellow-400" />
                          <span className="text-yellow-400 text-sm font-medium">
                            {session.rating}/5
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      {session.status === "live" ? (
                        <button className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30">
                          <div className="flex items-center justify-center gap-2">
                            <Video size={18} />
                            Join Now
                          </div>
                        </button>
                      ) : session.status === "upcoming" ? (
                        <>
                          <button className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 py-3 rounded-xl font-medium transition-all duration-300">
                            View Details
                          </button>
                          <button className="px-4 py-3 bg-red-600/20 hover:bg-red-600/30 rounded-xl text-red-300 transition-all duration-300">
                            <Edit3 size={18} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 py-3 rounded-xl font-medium transition-all duration-300">
                            View Summary
                          </button>
                          <button className="px-4 py-3 bg-green-600/20 hover:bg-green-600/30 rounded-xl text-green-300 transition-all duration-300">
                            <Download size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "mentees":
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                  My Mentees
                </h1>
                <p className="text-gray-400 mt-2">
                  Track progress and manage relationships
                </p>
              </div>
              <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30">
                <Plus size={20} />
                Add Mentee
              </button>
            </div>

            {/* Mentees Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Frontend Developer",
                  progress: 85,
                  sessions: 12,
                  rating: 4.9,
                  avatar:
                    "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
                  status: "active",
                },
                {
                  name: "Mike Chen",
                  role: "Full Stack Developer",
                  progress: 72,
                  sessions: 8,
                  rating: 4.7,
                  avatar:
                    "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
                  status: "active",
                },
                {
                  name: "Emily Davis",
                  role: "UI/UX Designer",
                  progress: 90,
                  sessions: 15,
                  rating: 5.0,
                  avatar:
                    "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
                  status: "completed",
                },
                {
                  name: "Alex Kim",
                  role: "Backend Developer",
                  progress: 45,
                  sessions: 5,
                  rating: 4.8,
                  avatar:
                    "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
                  status: "active",
                },
              ].map((mentee, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden bg-gradient-to-br from-gray-900/90 to-black/70 p-6 rounded-2xl border border-red-500/30 hover:border-red-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          mentee.status === "active"
                            ? "bg-green-600/20 text-green-300 border border-green-500/30"
                            : "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                        }`}
                      >
                        {mentee.status.toUpperCase()}
                      </div>
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>

                    <div className="text-center mb-6">
                      <img
                        src={mentee.avatar}
                        alt={mentee.name}
                        className="w-20 h-20 mx-auto rounded-full border-3 border-red-500/30 mb-4"
                      />
                      <h3 className="text-xl font-bold text-white mb-1">
                        {mentee.name}
                      </h3>
                      <p className="text-red-200 text-sm">{mentee.role}</p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400 text-sm">
                            Progress
                          </span>
                          <span className="text-white font-medium">
                            {mentee.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${mentee.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-white">
                            {mentee.sessions}
                          </p>
                          <p className="text-gray-400 text-xs">Sessions</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star size={16} className="text-yellow-400" />
                            <p className="text-xl font-bold text-white">
                              {mentee.rating}
                            </p>
                          </div>
                          <p className="text-gray-400 text-xs">Rating</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105">
                        Message
                      </button>
                      <button className="px-4 py-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-xl text-gray-300 hover:text-white transition-all duration-300">
                        <Eye size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "messages":
        return <MessagesFromMentee />;

      case "analytics":
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-gray-400 mt-2">
                Track your mentoring performance and growth
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  label: "Total Sessions",
                  value: "156",
                  change: "+23%",
                  icon: Calendar,
                  color: "from-red-600 to-red-700",
                },
                {
                  label: "Active Mentees",
                  value: "24",
                  change: "+12%",
                  icon: Users,
                  color: "from-red-700 to-red-800",
                },
                {
                  label: "Avg Rating",
                  value: "4.9",
                  change: "+0.3",
                  icon: Star,
                  color: "from-red-800 to-red-900",
                },
                {
                  label: "Total Earnings",
                  value: "$8,420",
                  change: "+18%",
                  icon: DollarSign,
                  color: "from-red-600 to-red-800",
                },
              ].map((metric, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden bg-gradient-to-br from-gray-900/90 to-black/70 p-6 rounded-2xl border border-red-500/30 hover:border-red-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <metric.icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-1">
                      {metric.value}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp size={14} className="text-green-400" />
                      <span className="text-green-400 text-sm font-medium">
                        {metric.change}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-gray-900/90 to-black/70 p-6 rounded-2xl border border-red-500/30">
                <h3 className="text-xl font-bold text-white mb-4">
                  Session Trends
                </h3>
                <div className="h-64 bg-gradient-to-br from-red-600/10 to-transparent rounded-xl flex items-center justify-center">
                  <p className="text-gray-400">
                    Chart visualization would go here
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-900/90 to-black/70 p-6 rounded-2xl border border-red-500/30">
                <h3 className="text-xl font-bold text-white mb-4">
                  Rating Distribution
                </h3>
                <div className="h-64 bg-gradient-to-br from-red-600/10 to-transparent rounded-xl flex items-center justify-center">
                  <p className="text-gray-400">
                    Chart visualization would go here
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="text-gray-400 mt-2">
                Manage your account and preferences
              </p>
            </div>

            {/* Profile Settings */}
            <div className="bg-gradient-to-br from-red-900/40 via-red-800/30 to-black/50 p-8 rounded-2xl border border-red-500/30">
              <h2 className="text-2xl font-bold text-white mb-6">
                Profile Information
              </h2>

              {!isEditingProfile ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img
                        src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150"
                        alt="profile"
                        className="w-24 h-24 rounded-full border-3 border-red-500/30"
                      />
                      <button className="absolute bottom-0 right-0 bg-red-600 p-2 rounded-full hover:bg-red-700 transition-colors shadow-lg">
                        <Camera size={16} />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        Hardik Singh
                      </h3>
                      <p className="text-red-200">
                        Senior Software Engineer & Mentor
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Star size={16} className="text-yellow-400" />
                          <span className="text-white font-medium">4.9</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award size={16} className="text-green-400" />
                          <span className="text-green-400 font-medium">
                            Top Mentor
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105"
                  >
                    <Edit3 size={18} />
                    Edit Profile
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Hardik Singh"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        defaultValue="Senior Software Engineer & Mentor"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue="hardik@example.com"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Bio
                    </label>
                    <textarea
                      rows={4}
                      defaultValue="Experienced software engineer with 8+ years in full-stack development. Passionate about mentoring and helping others grow in their tech careers."
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-colors resize-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsEditingProfile(false)}
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditingProfile(false)}
                      className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl font-medium transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notification Settings */}
            <div className="bg-gradient-to-br from-gray-900/90 to-black/70 p-8 rounded-2xl border border-red-500/30">
              <h2 className="text-2xl font-bold text-white mb-6">
                Notification Preferences
              </h2>
              <div className="space-y-4">
                {[
                  {
                    label: "Email notifications for new messages",
                    enabled: true,
                  },
                  {
                    label: "Push notifications for session reminders",
                    enabled: true,
                  },
                  { label: "Weekly performance reports", enabled: false },
                  { label: "New mentee requests", enabled: true },
                ].map((setting, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl"
                  >
                    <span className="text-white">{setting.label}</span>
                    <button
                      className={`w-12 h-6 rounded-full transition-all duration-300 ${
                        setting.enabled ? "bg-red-600" : "bg-gray-600"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                          setting.enabled ? "translate-x-6" : "translate-x-1"
                        }`}
                      ></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "notification": {
        return <Notification />;
      }
      default:
        return <div className="text-white">Content for {activeTab}</div>;
    }
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Enhanced Sidebar */}
      <div className="w-72 bg-gradient-to-b from-red-900 via-red-800 to-red-900 flex flex-col justify-between shadow-2xl shadow-red-500/20">
        <div>
          {/* Enhanced Profile Section */}
          <div className="p-8 text-center border-b bg-gradient-to-br from-red-900/40 via-red-800/30 to-black/50">
            <div className="relative inline-block mb-4">
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=120&h=120"
                alt="profile"
                className="w-20 h-20 mx-auto rounded-full border-3 border-white/30 shadow-xl"
              />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 rounded-full border-2 border-red-800 animate-pulse"></div>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Hardik Singh</h2>
            <p className="text-red-200/80 text-sm mb-3">Senior Mentor</p>
            <div className="flex items-center justify-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-400" />
                <span className="text-white font-medium">4.9</span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={14} className="text-blue-400" />
                <span className="text-white font-medium">24</span>
              </div>
            </div>
          </div>

          {/* Enhanced Navigation */}
          <nav className="mt-8 px-4 space-y-2">
            {[
              { id: "dashboard", icon: Home, label: "Dashboard" },
              { id: "notification", icon: Home, label: "Notification" },
              { id: "sessions", icon: Video, label: "Sessions" },
              { id: "mentees", icon: Users, label: "Mentees" },
              { id: "messages", icon: MessageSquare, label: "Messages" },
              { id: "analytics", icon: BarChart3, label: "Analytics" },
              { id: "calendar", icon: Calendar, label: "Calendar" },
              { id: "resources", icon: BookOpen, label: "Resources" },
              { id: "settings", icon: Settings, label: "Settings" },
            ].map((item) => (
              <button
                key={item.id}
                className={`flex items-center gap-4 px-6 py-4 w-full text-left rounded-2xl font-medium transition-all duration-300 hover:scale-105 ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-red-700 to-red-600 text-white shadow-lg shadow-red-500/30 border border-red-400/30"
                    : "text-red-100 hover:bg-red-700/30 hover:text-white"
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon size={20} />
                {item.label}
                {item.id === "messages" && (
                  <div className="ml-auto w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">3</span>
                  </div>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Enhanced Logout Section */}
        <div className="p-6 border-t border-red-400/30 bg-gradient-to-br from-red-900/40 via-red-800/30 to-black/50">
          <button className="flex items-center gap-4 w-full text-left text-red-200 hover:text-white transition-all duration-300 hover:scale-105 px-4 py-3 rounded-xl hover:bg-red-700/30">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto bg-gradient-to-br from-gray-950 via-black to-gray-900">
          <div className="p-8">{renderContent()}</div>
        </div>
      </div>

      {/* Enhanced Modals */}
      {showCreateSession && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-red-500/30 w-full max-w-2xl mx-4 shadow-2xl shadow-red-500/20">
            <h2 className="text-2xl font-bold text-white mb-6">
              Create New Session
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Session Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., React Fundamentals"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Mentee
                  </label>
                  <select className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-colors">
                    <option>Select mentee...</option>
                    <option>Sarah Johnson</option>
                    <option>Mike Chen</option>
                    <option>Emily Davis</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Duration
                  </label>
                  <select className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-colors">
                    <option>30 minutes</option>
                    <option>45 minutes</option>
                    <option>60 minutes</option>
                    <option>90 minutes</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Session objectives and topics to cover..."
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-colors resize-none"
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowCreateSession(false)}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
                >
                  Create Session
                </button>
                <button
                  onClick={() => setShowCreateSession(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-xl font-medium transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
