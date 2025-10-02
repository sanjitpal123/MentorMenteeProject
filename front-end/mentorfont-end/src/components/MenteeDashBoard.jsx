import React, { useState, useEffect, useContext } from "react";
import {
  User,
  Target,
  Calendar,
  Star,
  Trophy,
  Flame,
  Clock,
  MessageCircle,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  Award,
  Users,
  Video,
  ChevronRight,
  BookOpen,
  Brain,
  Zap,
  Settings,
  Bell,
  Search,
  Filter,
  MoreVertical,
  Play,
  Pause,
  BarChart3,
  PieChart,
  Calendar as CalendarIcon,
  MapPin,
  Globe,
  Smartphone,
  Laptop,
  Headphones,
  Camera,
  Mic,
  Share2,
  Download,
  Upload,
  Eye,
  Heart,
  Bookmark,
  Send,
  Plus,
  Minus,
  Edit3,
  Trash2,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  X,
  Menu,
  Home,
  FileText,
  Image,
  Music,
  Video as VideoIcon,
  Folder,
  Archive,
  Tag,
  Hash,
  AtSign,
  Phone,
  Mail,
  Lock,
  Unlock,
  Shield,
  Key,
  Database,
  Server,
  Cloud,
  Wifi,
  Battery,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  CloudRain,
  CloudSnow,
  Wind,
  Thermometer,
  Compass,
  Navigation,
  Anchor,
  Flag,
  Gift,
  Coffee,
  Pizza,
  Car,
  Plane,
  Train,
  Bike,
  Ship,
  Rocket,
  Gamepad2,
  Puzzle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  RadialBarChart,
  RadialBar,
} from "recharts";
import { GlobalContext } from "../ContextApiStore/ContextStore";
import { DeleteExpireOne, getTask } from "../services/Task";
import { useNavigate } from "react-router-dom";
function AdvancedTab() {
  return (
    <div className="mb-8 animate-slide-up animation-delay-200">
      <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl p-2 border border-gray-800/60 shadow-xl">
        <div className="flex space-x-2">
          {[
            { id: "overview", label: "Overview", icon: Home },
            { id: "learning", label: "Learning Paths", icon: BookOpen },
            { id: "sessions", label: "Sessions", icon: Video },
            { id: "analytics", label: "Analytics", icon: BarChart3 },
            { id: "community", label: "Community", icon: Users },
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 group ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/40"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/60"
                }`}
              >
                <IconComponent
                  size={18}
                  className="group-hover:animate-pulse"
                />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AdvancedTab;

export const Task = () => {
  const { User } = useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [Tasks, setTasks] = useState([]);
  const navigator = useNavigate();

  async function FetchAllTask() {
    try {
      const res = await getTask(user.token);
      console.log("response to get all task", res);
      setTasks(res);
    } catch (error) {
      console.log("error to fetch error", error);
    }
  }

  function HandleNavigate(id) {
    navigator(`/attendtask/${id}`);
  }

  useEffect(() => {
    FetchAllTask();
  }, []);
  async function DeleteExpireTask(taskid) {
    try {
      const res = await DeleteExpireOne(user.token, taskid);
      console.log("response to delete expire task", res);
      FetchAllTask();
    } catch (error) {
      console.log("error to delete expire one", error);
    }
  }

  useEffect(() => {
    Tasks.forEach((task) => {
      const tasktime = new Date(task.Duedate); // convert string to Date
      const currenttime = new Date();

      if (tasktime < currenttime) {
        DeleteExpireTask(task._id);
      } else {
        console.log(`${task.Duedate} is still valid`);
      }
    });
  }, [Tasks]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-black p-6">
      <h1 className="text-3xl font-bold text-red-500 mb-6 tracking-wide">
        🚀 Your Tasks
      </h1>

      {Tasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {Tasks.map((task) => (
            <div
              key={task._id}
              className="bg-zinc-900 border border-red-600 rounded-2xl p-5 shadow-lg hover:shadow-red-600/50 hover:scale-[1.02] transition-all duration-300"
              onClick={() => HandleNavigate(task._id)}
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-white">
                  {task.Title}
                </h2>
                {task.completed ? (
                  <CheckCircle2 className="text-green-400 w-6 h-6" />
                ) : (
                  <Clock className="text-red-500 w-6 h-6" />
                )}
              </div>

              <p className="text-gray-400 text-sm mb-4">
                {task.Description || "No description provided"}
              </p>

              <div className="flex justify-between items-center text-sm">
                <span className="px-3 py-1 rounded-full bg-red-600 text-white">
                  Due:{" "}
                  {task.Duedate ? new Date(task.Duedate).toDateString() : "NA"}
                </span>
                <span
                  className={`flex items-center gap-1 font-medium ${task.AttendedBy.map(
                    (mentee) =>
                      mentee._id === user._id
                        ? "text-green-400"
                        : "text-red-400"
                  )}`}
                >
                  {task.AttendedBy.map((mentee) =>
                    mentee._id === user._id ? "Completed" : "Pending"
                  )}
                  {task.AttendedBy.map(
                    (mentee) =>
                      mentee._id !== user._id && (
                        <AlertCircle className="w-4 h-4" />
                      )
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-400 text-lg mt-10">
          ❌ You don’t have tasks yet.
        </div>
      )}
    </div>
  );
};
