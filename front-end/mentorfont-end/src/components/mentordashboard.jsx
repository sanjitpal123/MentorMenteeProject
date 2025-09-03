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
  MoreHorizontal,
  HourglassIcon,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../ContextApiStore/ContextStore";
import {
  GetMentorByidSer,
  GetMentorConvo,
} from "../services/MentorDashBoard/MentorDashBoardsApi";

import { socket } from "../utils/socket";

export const WelcomeMessage = () => {
  const { User } = useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-red-900/40 via-red-800/30 to-black/50 p-8 rounded-3xl border border-red-500/30 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent"></div>
      <div className="relative z-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent mb-2">
          {`Welcome Back, ${user?.name} 👋`}
        </h1>
        <p className="text-red-200/80 text-lg">
          Ready to inspire and guide your mentees today?
        </p>
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-300">Online</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-red-300" />
            <span className="text-sm text-red-200">5 sessions today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const States = () => {
  const { User } = useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [Mentees, setMentess] = useState(0);
  // calling this api for getting mentee profile also
  async function GetMentorProfile() {
    try {
      const res = await GetMentorByidSer(user._id, user.token);
      console.log("resuser", res);
      setMentess(res.mentees.length);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    socket.emit("join", user._id);
  }, [user._id]);

  useEffect(() => {
    GetMentorProfile();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[
        {
          icon: Users,
          label: "Active Mentees",
          value: `${Mentees}`,
          change: "+12%",
          color: "from-red-600 to-red-700",
        },
        {
          icon: Calendar,
          label: "Sessions This Month",
          value: "48",
          change: "+8%",
          color: "from-red-700 to-red-800",
        },
        {
          icon: DollarSign,
          label: "Earnings",
          value: "$2,840",
          change: "+15%",
          color: "from-red-800 to-red-900",
        },
        {
          icon: Star,
          label: "Average Rating",
          value: "4.9",
          change: "+0.2",
          color: "from-red-600 to-red-800",
        },
      ].map((stat, i) => (
        <div
          key={i}
          className="group relative overflow-hidden bg-gradient-to-br from-gray-900/80 to-black/60 p-6 rounded-2xl border border-red-500/20 hover:border-red-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div
              className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
            >
              <stat.icon size={24} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
            <div className="flex items-center gap-1">
              <TrendingUp size={14} className="text-green-400" />
              <span className="text-green-400 text-sm font-medium">
                {stat.change}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

import React, { useMemo, useRef } from "react";
import { motion, AnimatePresence, time } from "framer-motion";
import {
  Send,
  Bot,
  User as UserIcon,
  Sparkles,
  Loader2,
  X,
} from "lucide-react";
import {
  DeleteForMeSer,
  DeleteMessageForEveryoneService,
  EditMessage,
  GetAllMessageSer,
  SeenMessageMessage,
  sendMessage,
} from "../services/Message";

// Exact colors (no Tailwind palette approximations)
const COLORS = {
  bg: "#000000", // pure black
  panel: "#0b0b0b", // near-black panel
  bubbleUser: "#ff1a1a", // vivid red
  bubbleAI: "#121212", // dark bubble for AI
  borderRed: "#ff1a1a",
  textMuted: "#b3b3b3",
  chipBg: "#111111",
};

// Demo canned responses
const demoReply = (input) => {
  if (!input) return "How can I help?";
  const lower = input.toLowerCase();
  if (lower.includes("error") || lower.includes("bug"))
    return "Let's squash that bug. Share the error message and a minimal code snippet, and I'll propose a fix + why it happens.";
  if (lower.includes("schema") || lower.includes("model"))
    return "For mentor/mentee, prefer separate collections if they diverge in fields/queries; otherwise a single Users collection with a `role` and role-specific subdocs works. I can sketch both!";
  if (lower.includes("optimize") || lower.includes("performance"))
    return "Profile first. Measure slow paths, then cache, paginate, and ship fewer bytes. I can give you a step-by-step checklist.";
  return "Got it. I'll break this down, propose an approach, and provide code you can paste in.";
};

const QuickChips = ({ onPick, hidden, onClose }) => {
  if (hidden) return null;
  const chips = [
    "Debug my API route",
    "Design mentor/mentee schema",
    "Fix Mongo duplicate entries",
    "Optimize React re-renders",
  ];
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {chips.map((c) => (
        <button
          key={c}
          onClick={() => onPick(c)}
          className="px-3 py-1 rounded-2xl text-sm transition-all"
          style={{
            background: COLORS.chipBg,
            border: `1px solid ${COLORS.borderRed}40`,
          }}
        >
          {c}
        </button>
      ))}
      <button
        onClick={onClose}
        aria-label="Hide suggestions"
        className="ml-auto px-2 py-1 rounded-full"
        title="Hide suggestions"
        style={{ border: `1px dashed ${COLORS.borderRed}40` }}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const Message = ({ role, text }) => {
  const isUser = role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`max-w-[85%] sm:max-w-[70%] flex gap-3 items-end`}>
        {!isUser && (
          <div
            className="shrink-0 w-8 h-8 rounded-full grid place-items-center"
            style={{
              background: COLORS.bubbleAI,
              border: `1px solid ${COLORS.borderRed}33`,
            }}
          >
            <Bot className="w-4 h-4" />
          </div>
        )}

        <div
          className="rounded-2xl px-4 py-2 shadow-lg"
          style={{
            background: isUser
              ? `linear-gradient(135deg, ${COLORS.bubbleUser}, #cc1515)`
              : COLORS.bubbleAI,
            border: isUser ? "none" : `1px solid ${COLORS.borderRed}33`,
          }}
        >
          <p className="leading-relaxed text-sm sm:text-base whitespace-pre-wrap">
            {text}
          </p>
        </div>

        {isUser && (
          <div
            className="shrink-0 w-8 h-8 rounded-full grid place-items-center"
            style={{ background: COLORS.bubbleUser }}
          >
            <UserIcon className="w-4 h-4" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const LiveSession = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          Live & Upcoming Sessions
        </h2>
        <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30">
          <Plus size={18} />
          New Session
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "JavaScript Fundamentals",
            mentee: "Sarah Johnson",
            time: "2:00 PM",
            status: "live",
            avatar:
              "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100",
          },
          {
            title: "React Best Practices",
            mentee: "Mike Chen",
            time: "4:00 PM",
            status: "upcoming",
            avatar:
              "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100",
          },
          {
            title: "Career Guidance",
            mentee: "Emily Davis",
            time: "6:00 PM",
            status: "upcoming",
            avatar:
              "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100",
          },
        ].map((session, i) => (
          <div
            key={i}
            className="group relative overflow-hidden bg-gradient-to-br from-gray-900/90 to-black/70 p-6 rounded-2xl border border-red-500/30 hover:border-red-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    session.status === "live"
                      ? "bg-red-600/20 text-red-300 border border-red-500/30"
                      : "bg-yellow-600/20 text-yellow-300 border border-yellow-500/30"
                  }`}
                >
                  {session.status === "live" && (
                    <div className="w-2 h-2 bg-red-400 rounded-full inline-block mr-2 animate-pulse"></div>
                  )}
                  {session.status.toUpperCase()}
                </div>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <MoreVertical size={16} />
                </button>
              </div>
              <h3 className="font-bold text-white text-lg mb-2">
                {session.title}
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={session.avatar}
                  alt={session.mentee}
                  className="w-8 h-8 rounded-full border-2 border-red-500/30"
                />
                <div>
                  <p className="text-red-200 font-medium text-sm">
                    {session.mentee}
                  </p>
                  <p className="text-gray-400 text-xs">{session.time}</p>
                </div>
              </div>
              <button
                className={`w-full py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                  session.status === "live"
                    ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white hover:shadow-lg hover:shadow-red-500/30"
                    : "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white"
                }`}
              >
                {session.status === "live" ? (
                  <div className="flex items-center justify-center gap-2">
                    <Video size={18} />
                    Join Session
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Clock size={18} />
                    View Details
                  </div>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const RecentActivities = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
      <div className="bg-gradient-to-br from-gray-900/80 to-black/60 p-6 rounded-2xl border border-red-500/20">
        <div className="space-y-6">
          {[
            {
              action: "Completed session with Sarah Johnson",
              time: "2 hours ago",
              type: "session",
            },
            {
              action: "New mentee request from Alex Kim",
              time: "4 hours ago",
              type: "request",
            },
            {
              action: "Received 5-star rating from Mike Chen",
              time: "1 day ago",
              type: "rating",
            },
            {
              action: "Updated profile information",
              time: "2 days ago",
              type: "profile",
            },
          ].map((activity, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-red-600/5 to-transparent hover:from-red-600/10 transition-all duration-300"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === "session"
                    ? "bg-green-600/20 text-green-400"
                    : activity.type === "request"
                    ? "bg-blue-600/20 text-blue-400"
                    : activity.type === "rating"
                    ? "bg-yellow-600/20 text-yellow-400"
                    : "bg-red-600/20 text-red-400"
                }`}
              >
                {activity.type === "session" && <Video size={16} />}
                {activity.type === "request" && <Users size={16} />}
                {activity.type === "rating" && <Star size={16} />}
                {activity.type === "profile" && <Edit3 size={16} />}
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">{activity.action}</p>
                <p className="text-gray-400 text-sm">{activity.time}</p>
              </div>
              <ChevronRight size={16} className="text-gray-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const MessagesFromMentee = () => {
  const scroll = useRef();
  const { User } = useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [Mentees, setMentees] = useState([]);
  const [OnlyMentees, SetOnlyMentees] = useState([]);
  const [MenteeToPass, setMenteeToPass] = useState(null);
  const [Message, setMessage] = useState("");
  const [Convoid, setConvoId] = useState(null);
  const [AllMessage, setAllMessage] = useState([]);
  const [isTyping, setisTyping] = useState(false);
  const [updatedMessage, setUpdatedMessage] = useState([]);
  const [OpenId, setOpenId] = useState(null);
  const [Open, setisOpen] = useState(false);
  const [EditClick, setEditClick] = useState(false);
  const [UpdatedText, setUpdatedText] = useState("");

  // ✅ Fetch all conversations of mentor
  async function GetMentorConversation() {
    try {
      const convo = await GetMentorConvo(user?.token);
      setMentees(convo);

      const mentee = convo.map((c) =>
        c.participants.find((p) => p._id !== user._id)
      );

      SetOnlyMentees(mentee);
      console.log("All mentor conversations:", convo);
    } catch (error) {
      console.log("Error fetching mentor conversations:", error);
    }
  }

  // ✅ Handle mentee selection + set conversation ID
  function HandleNavigate(id) {
    setMenteeToPass(id);

    const convo = Mentees.find((c) =>
      c.participants.some((participantId) => participantId === id)
    );

    setConvoId(convo ? convo._id : null);
  }

  // ✅ Update seen status API
  async function UpdateMessage() {
    try {
      const res = await SeenMessageMessage(Convoid, user?.token);
      setUpdatedMessage(res.allMessage);
      console.log("Seen status updated:", res);
    } catch (error) {
      console.log("Error updating message status:", error);
    }
  }

  // ✅ Send message API
  async function handleSubmit() {
    if (!Message.trim()) return;
    try {
      const data = {
        conversation: Convoid,
        text: Message,
        isRead: false,
      };
      const res = await sendMessage(data, user?.token);
      console.log("Message sent:", res);
      setMessage("");

      // Emit new message to socket
      socket.emit("sendMessage", res.data);

      GetMessages();
    } catch (error) {
      console.log("Error sending message:", error);
    }
  }

  // ✅ Fetch all messages of current conversation
  async function GetMessages() {
    if (!Convoid) return;
    try {
      const res = await GetAllMessageSer(Convoid, user?.token);
      setAllMessage(res);
      console.log("Fetched messages:", res);
    } catch (error) {
      console.log("Error fetching messages:", error);
    }
  }

  // ✅ Typing event handler
  let timeout;
  function handleSetMessage(e) {
    setMessage(e.target.value);
    socket.emit("typing", MenteeToPass._id);

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      socket.emit("stop typing", MenteeToPass._id);
    }, 3000);
  }

  // handle Edit message change
  function handleSetMessage1(e) {
    setUpdatedText(e.target.value);
  }

  // ✅ On conversation change → Fetch messages & emit "seen"
  useEffect(() => {
    GetMessages();

    if (Convoid && MenteeToPass._id) {
      socket.emit("seen", {
        convoId: Convoid,
        receiverId: MenteeToPass._id,
      });
      UpdateMessage();
    }
  }, [Convoid, MenteeToPass]);

  // ✅ On first render → Get all mentor conversations
  useEffect(() => {
    GetMentorConversation();
  }, []);

  // ✅ Listen for incoming messages
  useEffect(() => {
    const handler = async (sms) => {
      setAllMessage((prev) => [...prev, sms]);

      // Mark messages as seen if open chat matches
      if (Convoid && MenteeToPass._id) {
        console.log("sending message after receving");
        socket.emit("seen", {
          convoId: Convoid,
          receiverId: MenteeToPass._id,
        });
      }
      await UpdateMessage();
      await GetMessages();
    };

    socket.on("receiveMessage", handler);

    return () => {
      socket.off("receiveMessage", handler);
    };
  }, [Convoid, MenteeToPass]);

  // ✅ Listen for "seenMessage" → Update DB & UI
  useEffect(() => {
    const handleSeenMessage = async (convoId) => {
      console.log(`Messages in convo ${convoId} are seen ✅`);

      if (Convoid === convoId) {
        try {
          await UpdateMessage();
          await GetMessages();
        } catch (error) {
          console.error("Error updating seen status:", error);
        }
      }
    };

    socket.on("seenMessage", handleSeenMessage);

    return () => {
      socket.off("seenMessage", handleSeenMessage);
    };
  }, [Convoid, user.token]);

  // ✅ Typing listener
  useEffect(() => {
    socket.on("typing", () => {
      setisTyping(true);
    });

    socket.on("stop typing", () => {
      setisTyping(false);
    });

    return () => {
      socket.off("typing");
      socket.off("stop typing");
    };
  }, [MenteeToPass]);

  // open menu to delete and edit

  function handleOpen(id) {
    console.log("opening", id);
    setOpenId(id);
    setisOpen((prev) => !prev);
    setMessage("");
  }
  // handle Edit message

  function handleEdit(id, value) {
    setUpdatedText(value);
    setisOpen(false);
    setEditClick(true);
  }

  async function handleSubmitOfEdit() {
    try {
      const res = await EditMessage(OpenId, UpdatedText, user.token);
      console.log("edit message response", res);
      setUpdatedText("");
      GetMessages();
      socket.emit("EditMessage", { receiverId: MenteeToPass._id });
    } catch (error) {
      console.log("error to edit message", error);
    }
  }
  async function DeleteMessageForEveryone() {
    try {
      const res = await DeleteMessageForEveryoneService(OpenId);
      setisOpen(false);
      GetMessages();
      socket.emit("EditMessage", { receiverId: MenteeToPass._id });
      console.log("deleted Message", res);
    } catch (error) {
      console.log("error to delete", error);
    }
  }

  async function DeleteForMe() {
    try {
      const res = await DeleteForMeSer(OpenId, user.token);
      setisOpen(false);
      GetMessages();
      console.log("responsive to delete for me ", res);
    } catch (error) {
      console.log("error to delete for me", error);
    }
  }
  // scroll to last message
  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [AllMessage]);
  return (
    <div className="h-full flex">
      {/* Chat List */}
      <div className="w-1/3 bg-gradient-to-br from-gray-900/90 to-black/70 border-r border-red-500/30">
        <div className="p-6 border-b border-red-500/30">
          <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-colors"
            />
          </div>
        </div>

        <div className="overflow-y-auto max-h-[100vh]">
          {OnlyMentees?.map((mentee, i) => (
            <div
              key={i}
              className="p-4 border-b border-gray-800/50 hover:bg-red-600/10 cursor-pointer transition-all duration-300"
              onClick={() => HandleNavigate(mentee)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  {mentee.participants?.avatar ? (
                    <img
                      src={mentee.participants.avatar}
                      alt={mentee?.name}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-600 text-white text-lg font-bold">
                      {mentee?.name?.charAt(0).toUpperCase()}
                    </div>
                  )}

                  {mentee.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-white truncate">
                      {mentee.name}
                    </h3>
                    <span className="text-xs text-gray-400">{mentee.time}</span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">
                    {mentee.message}
                  </p>
                </div>
                {mentee.unread > 0 && (
                  <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">
                      {mentee.unread}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 border-b border-red-500/30 bg-gradient-to-r from-gray-900/50 to-black/30">
          <div className="flex items-center gap-3">
            <img
              src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50"
              alt="Sarah"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-medium text-white">{MenteeToPass?.name}</h3>
              <p className="text-sm text-green-400">Online</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {/* All messages */}
          <div className="space-y-3 px-3 py-2">
            {AllMessage?.map((msg, i) => {
              const isSender =
                msg.sender?._id?.toString() === user?._id?.toString();

              return (
                <div
                  key={i}
                  className={`flex ${
                    isSender ? "justify-end" : "justify-start"
                  } mb-4`}
                >
                  <div
                    className={`relative group px-4 py-3 rounded-2xl shadow-lg max-w-[70%] break-words 
                    transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl ${
                      isSender
                        ? "bg-gradient-to-r from-red-600 to-red-700 text-white"
                        : "bg-gradient-to-r from-gray-900 to-gray-800 text-white border border-red-600/30"
                    }`}
                  >
                    {/* Dropdown (only for sender) */}
                    {Open && OpenId === msg._id && (
                      <div className="absolute right-10 top-[-4rem] w-52 bg-white/95 border border-gray-200 rounded-2xl shadow-2xl z-30 animate-fade-in">
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-2xl transition-colors"
                          onClick={() => handleEdit(msg._id, msg.text)}
                        >
                          Edit
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          onClick={DeleteMessageForEveryone}
                        >
                          Delete for Everyone
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-2xl transition-colors"
                          onClick={DeleteForMe}
                        >
                          Delete for Me
                        </button>
                      </div>
                    )}

                    {/* Message + Options */}
                    {msg.text !== "" && !msg.deletedBy.includes(user._id) ? (
                      <div className="text-base leading-relaxed flex items-start gap-3">
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                        {isSender && (
                          <div
                            className="cursor-pointer text-white/70 hover:text-white transition-colors z-50"
                            role="button"
                            onClick={() => handleOpen(msg._id)}
                          >
                            ⋮
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <i className="text-gray-500 italic">
                          This message was deleted
                        </i>
                      </div>
                    )}
                    {/* {msg.text == "" &&
                      msg.deletedBy.includes(user._id)?(
                        <div>
                          <i className="text-gray-500 italic">
                            This message was deleted
                          </i>
                        </div>
                      ):} */}

                    {/* {msg.deletedBy.includes(user._id) && (
                      <div>
                        <i className="text-gray-500 italic">
                          This message was deleted
                        </i>
                      </div>
                    )} */}

                    {/* Time + Seen */}
                    <div className="flex items-center gap-2 mt-2 justify-end">
                      <span
                        className={`text-xs ${
                          isSender ? "text-red-200" : "text-gray-400"
                        }`}
                      >
                        {msg.updatedAt &&
                          new Date(msg.updatedAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </span>

                      {isSender &&
                      msg.text !== "" &&
                      !msg.deletedBy.includes(user._id) ? (
                        <span
                          className={`text-xs font-semibold ${
                            msg.isRead ? "text-blue-400" : "text-gray-400"
                          }`}
                        >
                          {msg.isRead ? "✓✓" : "✓"}
                        </span>
                      ) : null}
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 bg-white transition duration-300 pointer-events-none"></div>
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="px-4 py-2 bg-gray-700 text-white rounded-2xl text-sm animate-pulse">
                  Typing...
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-red-500/30">
          {!EditClick && (
            <div className="flex gap-3">
              <input
                type="text"
                onChange={handleSetMessage}
                value={Message}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-colors"
              />
              <button
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                onClick={handleSubmit}
              >
                Send
              </button>
            </div>
          )}

          {EditClick && (
            <div className="flex gap-3">
              <input
                type="text"
                onChange={handleSetMessage1}
                value={UpdatedText}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-colors"
              />
              <button
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                onClick={handleSubmitOfEdit}
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
