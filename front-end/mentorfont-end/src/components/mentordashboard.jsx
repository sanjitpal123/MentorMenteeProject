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

// export default function AiDoubt() {
//   const [messages, setMessages] = useState([
//     {
//       id: crypto.randomUUID(),
//       role: "assistant",
//       text: "Hey! I'm your red-on-black AI support. Ask me anything—schemas, sockets, Mongo, React, you name it.",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [busy, setBusy] = useState(false);
//   const [showChips, setShowChips] = useState(true);
//   const viewportRef = useRef(null);

//   useEffect(() => {
//     if (viewportRef.current) {
//       viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
//     }
//   }, [messages, busy]);

//   const send = async (text) => {
//     const value = (text ?? input).trim();
//     if (!value || busy) return;

//     const u = { id: crypto.randomUUID(), role: "user", text: value };
//     setMessages((m) => [...m, u]);
//     setInput("");
//     setBusy(true);

//     // Fake AI latency & reply
//     setTimeout(() => {
//       const a = {
//         id: crypto.randomUUID(),
//         role: "assistant",
//         text: demoReply(value),
//       };
//       setMessages((m) => [...m, a]);
//       setBusy(false);
//     }, 600);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       send();
//     }
//   };

//   return (
//     <div
//       className="min-h-screen w-full flex flex-col"
//       style={{ background: COLORS.bg, color: "#ffffff" }}
//     >
//       {/* Top Bar */}
//       <header
//         className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-black/40"
//         style={{ borderBottom: `1px solid ${COLORS.borderRed}33` }}
//       >
//         <div className="mx-auto w-full max-w-5xl px-4 py-4 flex items-center gap-3">
//           <div
//             className="w-9 h-9 rounded-xl grid place-items-center shadow-lg"
//             style={{ background: COLORS.bubbleUser }}
//           >
//             <Sparkles className="w-5 h-5" />
//           </div>
//           <div className="flex-1">
//             <h1 className="text-lg sm:text-xl font-semibold tracking-wide">
//               AI Chat Support
//             </h1>
//             <p className="text-xs" style={{ color: COLORS.textMuted }}>
//               Black background • Red accents • Smooth transitions
//             </p>
//           </div>
//           <div
//             className="hidden sm:flex items-center gap-2 text-xs"
//             style={{ color: COLORS.textMuted }}
//           >
//             <span className="relative pr-3">
//               Online
//               <span
//                 className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
//                 style={{ background: COLORS.borderRed }}
//               />
//             </span>
//           </div>
//         </div>
//       </header>

//       {/* Body */}
//       <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 grid gap-4">
//         {/* Panel */}
//         <section
//           className="rounded-2xl shadow-2xl flex flex-col overflow-hidden"
//           style={{
//             background: COLORS.panel,
//             border: `1px solid ${COLORS.borderRed}33`,
//           }}
//         >
//           {/* Messages viewport */}
//           <div
//             ref={viewportRef}
//             className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-4"
//           >
//             <AnimatePresence initial={false}>
//               {messages.map((m) => (
//                 <Message key={m.id} role={m.role} text={m.text} />
//               ))}
//             </AnimatePresence>

//             {busy && (
//               <div className="w-full flex justify-start">
//                 <div
//                   className="flex items-center gap-2 text-sm px-3 py-2 rounded-full"
//                   style={{
//                     background: COLORS.bubbleAI,
//                     border: `1px solid ${COLORS.borderRed}33`,
//                   }}
//                 >
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                   Thinking…
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Suggestions */}
//           <div className="px-4 sm:px-6">
//             <QuickChips
//               onPick={(c) => send(c)}
//               hidden={!showChips}
//               onClose={() => setShowChips(false)}
//             />
//           </div>

//           {/* Composer */}
//           <div
//             className="p-4 sm:p-5 border-t"
//             style={{ borderColor: `${COLORS.borderRed}33` }}
//           >
//             <div className="flex items-end gap-3">
//               <textarea
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 placeholder="Type your question… (Enter to send)"
//                 className="flex-1 resize-none outline-none rounded-2xl px-4 py-3 max-h-40 min-h-[48px] placeholder:opacity-60"
//                 style={{
//                   background: COLORS.bubbleAI,
//                   border: `1px solid ${COLORS.borderRed}33`,
//                 }}
//               />
//               <button
//                 onClick={() => send()}
//                 disabled={busy || !input.trim()}
//                 className="rounded-2xl px-4 py-3 font-medium transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//                 style={{
//                   background:
//                     input.trim() && !busy ? COLORS.bubbleUser : "#2a2a2a",
//                   border: `1px solid ${COLORS.borderRed}66`,
//                 }}
//               >
//                 <div className="flex items-center gap-2">
//                   <Send className="w-4 h-4" />
//                   <span>Send</span>
//                 </div>
//               </button>
//             </div>
//             <p className="mt-2 text-xs" style={{ color: COLORS.textMuted }}>
//               Tip: Shift+Enter for a new line.
//             </p>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="mx-auto w-full max-w-5xl px-4 pb-6">
//         <p className="text-center text-xs" style={{ color: COLORS.textMuted }}>
//           © {new Date().getFullYear()} AI Support — Built for speed & clarity.
//         </p>
//       </footer>
//     </div>
//   );
// }

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

// export const CoversationModel = () => {
//   return (
//     <div className="h-full flex">
//       {/* Chat List */}
//       <div className="w-1/3 bg-gradient-to-br from-gray-900/90 to-black/70 border-r border-red-500/30">
//         <div className="p-6 border-b border-red-500/30">
//           <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
//           <div className="relative">
//             <Search
//               size={18}
//               className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//             />
//             <input
//               type="text"
//               placeholder="Search conversations..."
//               className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-colors"
//             />
//           </div>
//         </div>

//         <div className="overflow-y-auto">
//           {[
//             {
//               name: "Sarah Johnson",
//               message: "Thanks for the session today!",
//               time: "2m",
//               unread: 2,
//               avatar:
//                 "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50",
//               online: true,
//             },
//             {
//               name: "Mike Chen",
//               message: "Can we reschedule tomorrow's meeting?",
//               time: "1h",
//               unread: 0,
//               avatar:
//                 "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50&h=50",
//               online: false,
//             },
//             {
//               name: "Emily Davis",
//               message: "I've completed the assignment",
//               time: "3h",
//               unread: 1,
//               avatar:
//                 "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=50&h=50",
//               online: true,
//             },
//           ].map((chat, i) => (
//             <div
//               key={i}
//               className="p-4 border-b border-gray-800/50 hover:bg-red-600/10 cursor-pointer transition-all duration-300"
//             >
//               <div className="flex items-center gap-3">
//                 <div className="relative">
//                   <img
//                     src={chat.avatar}
//                     alt={chat.name}
//                     className="w-12 h-12 rounded-full"
//                   />
//                   {chat.online && (
//                     <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
//                   )}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center justify-between">
//                     <h3 className="font-medium text-white truncate">
//                       {chat.name}
//                     </h3>
//                     <span className="text-xs text-gray-400">{chat.time}</span>
//                   </div>
//                   <p className="text-sm text-gray-400 truncate">
//                     {chat.message}
//                   </p>
//                 </div>
//                 {chat.unread > 0 && (
//                   <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
//                     <span className="text-xs text-white font-medium">
//                       {chat.unread}
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 flex flex-col">
//         <div className="p-6 border-b border-red-500/30 bg-gradient-to-r from-gray-900/50 to-black/30">
//           <div className="flex items-center gap-3">
//             <img
//               src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50"
//               alt="Sarah"
//               className="w-10 h-10 rounded-full"
//             />
//             <div>
//               <h3 className="font-medium text-white">Sarah Johnson</h3>
//               <p className="text-sm text-green-400">Online</p>
//             </div>
//           </div>
//         </div>

//         <div className="flex-1 p-6 overflow-y-auto space-y-4">
//           {[
//             {
//               sender: "mentee",
//               message: "Hi! I have a question about React hooks",
//               time: "10:30 AM",
//             },
//             {
//               sender: "mentor",
//               message: "Sure! What specifically would you like to know?",
//               time: "10:32 AM",
//             },
//             {
//               sender: "mentee",
//               message: "I'm having trouble with useEffect dependencies",
//               time: "10:33 AM",
//             },
//             {
//               sender: "mentor",
//               message: "That's a common issue. Let me explain...",
//               time: "10:35 AM",
//             },
//           ].map((msg, i) => (
//             <div
//               key={i}
//               className={`flex ${
//                 msg.sender === "mentor" ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
//                   msg.sender === "mentor"
//                     ? "bg-gradient-to-r from-red-600 to-red-700 text-white"
//                     : "bg-gray-800 text-white"
//                 }`}
//               >
//                 <p className="text-sm">{msg.message}</p>
//                 <p
//                   className={`text-xs mt-1 ${
//                     msg.sender === "mentor" ? "text-red-200" : "text-gray-400"
//                   }`}
//                 >
//                   {msg.time}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="p-6 border-t border-red-500/30">
//           <div className="flex gap-3">
//             <input
//               type="text"
//               placeholder="Type your message..."
//               className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-colors"
//             />
//             <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl font-medium transition-all duration-300 hover:scale-105">
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export const MessagesFromMentee = () => {
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

        <div className="overflow-y-auto">
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
                  }`}
                >
                  <div
                    className={`relative group px-4 py-3 rounded-2xl shadow-md max-w-[75%] break-words transition-transform duration-300 hover:scale-[1.02] ${
                      isSender
                        ? "bg-gradient-to-r from-red-600 to-red-700 text-white"
                        : "bg-gradient-to-r from-gray-900 to-gray-800 text-white border border-red-600/20"
                    }`}
                  >
                    {/* Message Text */}
                    <p className="text-base leading-relaxed">{msg.text}</p>

                    {/* Time + Seen Ticks */}
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

                      {/* Seen / Sent Indicator */}
                      {isSender && (
                        <span
                          className={`text-xs font-semibold ${
                            msg.isRead ? "text-blue-400" : "text-gray-400"
                          }`}
                        >
                          {msg.isRead ? "✓✓" : "✓"}
                        </span>
                      )}
                    </div>

                    {/* Bubble Hover Effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 bg-white transition-all duration-300"></div>
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
        </div>
      </div>
    </div>
  );
};

// export const ChatArea = ({ mentee }) => {
//   console.log("mentor id here in chatarea", mentee);
//   async function sendMessage(params) {}
//   return (

//   );
// };
