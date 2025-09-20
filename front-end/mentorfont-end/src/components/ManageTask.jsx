import { GlobalContext } from "../ContextApiStore/ContextStore";
import { getTask } from "../services/Task";
import { useContext, useEffect, useState } from "react";
import { Calendar } from "lucide-react";
function ManageTask() {
  const { User } = useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [tasks, setTasks] = useState([]);
  async function GetAllTask() {
    try {
      const res = await getTask(user.token);
      console.log("response to get task", res);
      setTasks(res);
    } catch (error) {
      console.log("error to get task", error);
    }
  }
  useEffect(() => {
    GetAllTask();
    console.log("task", tasks);
  }, []);
  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            ?{" "}
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500">
              <option>All Status</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <select className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500">
              <option>All Types</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks?.map((task) => (
          <div
            key={task.id}
            className="bg-gray-900 rounded-xl border border-gray-800 p-6 hover:border-gray-700 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                {/* {getStatusIcon(task.status)} */}
                <span className="text-sm text-gray-400">{task.status}</span>
              </div>
              {/* <span
                className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(
                  task.priority
                )}`}
              >
                {task.priority}
              </span> */}
              {/* <span
                className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(
                  task.priority
                )}`}
              >
                {task.priority}
              </span> */}
            </div>

            <h3 className="text-lg font-bold text-white mb-2">{task.title}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {task.description}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {task.dueDate}
              </div>
              <span className="bg-gray-800 px-2 py-1 rounded">{task.type}</span>
            </div>
            {/* 
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Assigned to:</span>
              <div className="flex -space-x-1">
                {task.assignedTo.slice(0, 3).map((menteeId) => {
                  const mentee = mentees.find((m) => m.id === menteeId);
                  return (
                    <div
                      key={menteeId}
                      className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-semibold border-2 border-gray-900"
                    >
                      {mentee?.avatar}
                    </div>
                  );
                })}
                {task.assignedTo.length > 3 && (
                  <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs font-semibold border-2 border-gray-900">
                    +{task.assignedTo.length - 3}
                  </div>
                )}
              </div>
            </div> */}

            {/* {task.questions && task.questions.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <HelpCircle className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-400">Questions:</span>
                    <span className="text-sm font-semibold text-blue-400">
                      {task.questions.length}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {task.questions.reduce((sum, q) => sum + q.points, 0)} pts
                    total
                  </div>
                </div>
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageTask;
