// src/pages/ScheduleSession.jsx
import { useState } from "react";
import { Calendar, X } from "lucide-react";
import TagInput from "../components/Home/TagInput";

export default function ScheduleSession() {
  const [tags, setTags] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const mentors = [
    { id: 1, name: "John Doe", title: "React Mentor" },
    { id: 2, name: "Jane Smith", title: "System Design Mentor" },
    { id: 3, name: "Alex Carter", title: "DSA Mentor" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column: Form */}
        <div className="bg-gradient-to-br from-[#13080a] to-[#2b0e11] border border-red-900/30 rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Calendar size={22} className="text-red-500" />
            Schedule a Session
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1">Title</label>
              <input
                placeholder="e.g. React Basics"
                className="w-full bg-gray-900/60 border border-gray-700/60 px-3 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-1">
                Date & Time
              </label>
              <input
                type="datetime-local"
                className="w-full bg-gray-900/60 border border-gray-700/60 px-3 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-1">
                Duration (minutes)
              </label>
              <input
                type="number"
                min="15"
                defaultValue="60"
                className="w-full bg-gray-900/60 border border-gray-700/60 px-3 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-1">Topics</label>
              <TagInput tags={tags} setTags={setTags} />
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-1">
                Description
              </label>
              <textarea
                rows={4}
                placeholder="Describe the session goals..."
                className="w-full bg-gray-900/60 border border-gray-700/60 px-3 py-2 rounded-md"
              />
            </div>

            <button className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold">
              Schedule Session
            </button>
          </div>
        </div>

        {/* Right column: Mentor selection */}
        <div className="bg-gradient-to-br from-[#0f1416] to-[#231213] border border-red-900/20 rounded-2xl p-6 shadow-xl">
          <h3 className="text-lg font-bold mb-4">Choose a Mentor</h3>

          <div className="space-y-3 max-h-[65vh] overflow-y-auto pr-2">
            {mentors.map((m) => (
              <div
                key={m.id}
                onClick={() => setSelectedMentor(m)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition ${
                  selectedMentor?.id === m.id
                    ? "border-red-500 bg-red-900/10"
                    : "border-gray-800 hover:border-red-600"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-red-400 font-bold">
                  {m.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-semibold">{m.name}</div>
                  <div className="text-sm text-gray-400">{m.title}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-gray-800 pt-4">
            <h4 className="text-sm text-gray-300 mb-2">Selected Mentor</h4>
            {selectedMentor ? (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-red-400 font-bold">
                  {selectedMentor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-semibold">{selectedMentor.name}</div>
                  <div className="text-xs text-gray-400">
                    {selectedMentor.title}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No mentor selected</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
