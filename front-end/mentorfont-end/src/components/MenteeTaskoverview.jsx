function MenteeTaskOverViewForMentorDashBoard() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {["Beginner", "Intermediate", "Advanced"].map((type) => {
          const count = mentees.filter((m) => m.type === type).length;
          return (
            <div
              key={type}
              className="bg-gray-900 rounded-xl border border-gray-800 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{type} Mentees</p>
                  <p className="text-2xl font-bold text-white">{count}</p>
                </div>
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-red-400" />
                </div>
              </div>
            </div>
          );
        })}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Tasks</p>
              <p className="text-2xl font-bold text-white">{tasks.length}</p>
            </div>
            <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Mentees List */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h2 className="text-xl font-bold text-white mb-6">All Mentees</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentees.map((mentee) => (
            <div
              key={mentee.id}
              className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {mentee.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{mentee.name}</h3>
                  <span className="text-sm text-gray-400">{mentee.type}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400">
                    {mentee.tasksCompleted}
                  </p>
                  <p className="text-xs text-gray-400">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-400">
                    {mentee.tasksActive}
                  </p>
                  <p className="text-xs text-gray-400">Active</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default MenteeTaskOverViewForMentorDashBoard;
