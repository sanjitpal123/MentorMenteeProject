import { Plus, Send, Users } from "lucide-react";
import { useEffect, useState } from "react";
import FetchAllMentee from "../services/GetAllMentee";
import MenteeListedInTaskMangementOfMentorDashboard from "./SelectedMentee";
function CreateTask() {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [choice1, setChoice1] = useState("");
  const [choice2, setChoice2] = useState("");
  const [choice3, setChoice3] = useState("");
  const [choice4, setchoice4] = useState("");
  const [answer, setAnswer] = useState("");

  function handleAddQuestion() {
    const data = {
      question: question,
      choice1: choice1,
      choice2: choice2,
      choice3: choice3,
      choice4: choice4,
      answer: answer,
    };
    console.log("data", data);
    setQuestions((prev) => [...prev, data]);
    console.log("click");
  }

  useEffect(() => {
    console.log("questionds", questions);
  }, [questions]);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Task Creation Form */}
      <div className="lg:col-span-2">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <Plus className="w-5 h-5 mr-2 text-red-400" />
            Create New Task
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Task Title
              </label>
              <input
                type="text"
                // value={taskForm.title}
                // onChange={(e) =>
                //   setTaskForm({ ...taskForm, title: e.target.value })
                // }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter task title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                // value={taskForm.description}
                // onChange={(e) =>
                //   setTaskForm({
                //     ...taskForm,
                //     description: e.target.value,
                //   })
                // }
                rows={4}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                placeholder="Describe the task in detail..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  //   value={taskForm.dueDate}
                  //   onChange={(e) =>
                  //     setTaskForm({ ...taskForm, dueDate: e.target.value })
                  //   }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Priority
                </label>
                <select
                  //   value={taskForm.priority}
                  //   onChange={(e) =>
                  //     setTaskForm({ ...taskForm, priority: e.target.value })
                  //   }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mentee Type
                </label>
                <select
                  //   value={taskForm.type}
                  //   onChange={(e) =>
                  //     setTaskForm({ ...taskForm, type: e.target.value })
                  //   }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="All">All Types</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
            {/* question and answer */}

            <div className="w-full gap-10 items-center  flex justify-between ">
              <div>Make Question And Answer </div>
            </div>

            <div>
              <label className="text-white">Question</label>
              <br />
              <input
                type="text"
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter Question here"
                className="w-full bg-black border border-red-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="text-white">First</label>
                  <input
                    type="text"
                    value={choice1}
                    onChange={(e) => setChoice1(e.target.value)}
                    placeholder="Enter first choice"
                    className="w-full bg-black border border-red-500 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="text-white">Second</label>
                  <input
                    type="text"
                    value={choice2}
                    onChange={(e) => setChoice2(e.target.value)}
                    placeholder="Enter second choice"
                    className="w-full bg-black border border-red-500 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="text-white">Third</label>
                  <input
                    type="text"
                    value={choice3}
                    onChange={(e) => setChoice3(e.target.value)}
                    placeholder="Enter third choice"
                    className="w-full bg-black border border-red-500 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="text-white">Fourth</label>
                  <input
                    type="text"
                    value={choice4}
                    onChange={(e) => setchoice4(e.target.value)}
                    placeholder="Enter fourth choice"
                    className="w-full bg-black border border-red-500 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div className="w-full">
                  <label>Choose Answer</label>
                  <select
                    value={answer ? answer : "Choose"}
                    onSelect={(e) => setAnswer(e.target.value)}
                    className="w-full bg-black border border-red-500 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option>{choice1} </option>
                    <option>{choice2}</option>
                    <option>{choice3}</option>
                    <option>{choice4}</option>
                  </select>
                </div>

                <div className="w-full flex justify-center items-center">
                  <button
                    className=" w-full h-[40px] mt-5 bg-red-500 hover:bg-red-600 text-white font-semibold  rounded-lg transition-colors flex items-center justify-center"
                    onClick={handleAddQuestion}
                  >
                    Add Question{" "}
                  </button>{" "}
                </div>
              </div>
            </div>
            <div>
              <p>View All Questions </p>
            </div>
            <div className="w-full">
              {questions?.length > 0 &&
                questions.map((question, index) => (
                  <div id={index}>
                    <p>{`${index + 1} . ${question.question}`}</p>
                    <div className="grid grid-cols-4">
                      <p>{`A. ${question.choice1}`}</p>
                      <p>{`B. ${question.choice2}`}</p>
                      <p>{`C. ${question.choice3}`}</p>
                      <p>{`D. ${question.choice4}`}</p>
                    </div>
                  </div>
                ))}
            </div>

            <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center">
              <Send className="w-5 h-5 mr-2" />
              Assign Task to Selected Mentees
            </button>
          </div>
        </div>
      </div>

      <MenteeListedInTaskMangementOfMentorDashboard />
    </div>
  );
}
export default CreateTask;
