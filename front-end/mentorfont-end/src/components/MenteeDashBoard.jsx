import React, { useState, useEffect } from "react";
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
