import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetTaskById } from "../services/Task";
import { GlobalContext } from "../ContextApiStore/ContextStore";

function TaskAttendPage() {
  const { id } = useParams();
  const { User } = useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [Task, setTask] = useState(null);

  async function GetATask() {
    try {
      const res = await GetTaskById(user.token, id);
      console.log("response to get task", res);
      setTask(res);
    } catch (error) {
      console.log("error to get a task ", error);
    }
  }

  useEffect(() => {
    GetATask();
  }, [id]);

  if (!Task) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="w-full min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold text-red-500 mb-4">{Task.Title}</h1>
      <p className="text-gray-400 mb-6">{Task.Description}</p>

      <div className="space-y-6">
        {Task.Questions.map((q, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-red-600 rounded-xl p-5 shadow-lg"
          >
            <h2 className="text-lg font-semibold mb-3">
              {index + 1}. {q.question}
            </h2>
            <div className="space-y-2">
              {[q.choice1, q.choice2, q.choice3, q.choice4].map((choice, i) => (
                <label
                  key={i}
                  className="flex items-center gap-2 cursor-pointer hover:text-red-400"
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={choice}
                    className="accent-red-600"
                  />
                  <span>{choice}</span>
                </label>
              ))}
            </div>

            {/* If you want a free-text answer */}
            {q.answer !== undefined && (
              <div className="mt-4">
                <textarea
                  className="w-full bg-black border border-gray-700 rounded-lg p-2 text-sm focus:outline-none focus:border-red-500"
                  placeholder="Write your answer..."
                  rows={2}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskAttendPage;
