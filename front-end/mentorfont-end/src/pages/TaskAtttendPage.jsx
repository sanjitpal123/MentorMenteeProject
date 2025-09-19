import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetTaskById } from "../services/Task";
import { GlobalContext } from "../ContextApiStore/ContextStore";
import { Clock, CheckCircle, Trophy, Target, Timer, Award } from "lucide-react";

function TaskAttendPage() {
  const { id } = useParams();
  const { User } = useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [Task, setTask] = useState(null);
  const navigator = useNavigate();
  const [correctedAnswer, setCorrectedAnswer] = useState(0);
  const [answers, setAnswers] = useState({});
  const [attendedQuestion, setAttendedQuestion] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  async function GetATask() {
    try {
      const res = await GetTaskById(user.token, id);
      setTask(res);
    } catch (error) {
      console.log("error to get a task ", error);
    }
  }

  function handleSubmit() {
    try {
      setIsSubmitting(true);
      setTimeout(() => {
        navigator("/result", {
          state: {
            total: Task.Questions.length,
            correct: correctedAnswer,
          },
        });
      }, 1000);
    } catch (error) {
      console.log("error to handle submit");
    }
  }

  function handleAnswering(question, selectedanswer, questionIndex) {
    // Update answers state
    const newAnswers = { ...answers };
    const previousAnswer = newAnswers[questionIndex];
    newAnswers[questionIndex] = selectedanswer;
    setAnswers(newAnswers);
    setAttendedQuestion((prev) => [...prev, questionIndex]);

    // Update correct answer count
    if (previousAnswer && previousAnswer === question.answer) {
      setCorrectedAnswer((prev) => prev - 1);
    }
    if (selectedanswer === question.answer) {
      setCorrectedAnswer((prev) => prev + 1);
    }
  }

  useEffect(() => {
    GetATask();
  }, [id]);

  if (!Task) {
    return (
      <div className="w-full min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-white text-xl">Loading quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-red-400 mb-2">
              {Task.Title}
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl">
              {Task.Description}
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <div className="bg-gray-700 rounded-lg px-4 py-2 flex items-center space-x-2">
              <Timer className="w-5 h-5 text-red-400" />
              <span className="text-white font-mono text-lg">
                {/* {formatTime(timeElapsed)} */}
              </span>
            </div>
            <div className="bg-gray-700 rounded-lg px-4 py-2 flex items-center space-x-2">
              <Award className="w-5 h-5 text-red-400" />
              <span className="text-white font-semibold">
                {correctedAnswer}/{Task.Questions.length}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {/* <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300">Progress</span>
            <span className="text-red-400 font-semibold">
              {Math.round(getProgressPercentage())}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-600 h-2 rounded-full">
            <div
              className="bg-red-500 h-full transition-all duration-500 rounded-full"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div> */}
      </div>

      <div className="flex w-full gap-8 p-8">
        {/* Questions Section */}
        <div className="space-y-6 w-[70%]">
          {Task.Questions.map((q, index) => (
            <div
              key={index}
              className={`bg-gray-800 border rounded-xl p-6 transition-all duration-300 ${
                answers[index]
                  ? "border-red-500"
                  : "border-gray-700 hover:border-gray-600"
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-xl font-semibold text-white leading-relaxed flex-1">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-lg mr-3 text-sm font-bold">
                    {index + 1}
                  </span>
                  {q.question}
                </h2>
                {answers[index] && (
                  <CheckCircle className="w-6 h-6 text-green-400 ml-4" />
                )}
              </div>

              <div className="space-y-3">
                {[q.choice1, q.choice2, q.choice3, q.choice4].map(
                  (choice, i) => {
                    const isSelected = answers[index] === choice;
                    const choiceLabels = ["A", "B", "C", "D"];

                    return (
                      <label
                        key={i}
                        className={`flex items-center gap-4 cursor-pointer p-4 rounded-lg transition-all duration-200 ${
                          isSelected
                            ? "bg-red-500/20 border border-red-500"
                            : "bg-gray-700/50 hover:bg-gray-700"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={choice}
                          checked={isSelected}
                          className="sr-only"
                          onChange={() => handleAnswering(q, choice, index)}
                        />
                        <div
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${
                            isSelected
                              ? "bg-red-500 border-red-500 text-white"
                              : "border-gray-500 text-gray-400"
                          }`}
                        >
                          {choiceLabels[i]}
                        </div>
                        <span
                          className={`text-lg ${
                            isSelected
                              ? "text-white font-medium"
                              : "text-gray-300"
                          }`}
                        >
                          {choice}
                        </span>
                      </label>
                    );
                  }
                )}
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`bg-red-600 hover:bg-red-700 text-white font-bold text-xl px-8 py-4 rounded-xl 
                         transition-all duration-300 flex items-center space-x-3 ${
                           isSubmitting
                             ? "cursor-not-allowed opacity-70"
                             : "hover:scale-105"
                         }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Trophy className="w-6 h-6" />
                  <span>Submit Quiz</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-[30%] space-y-6">
          {/* Question Navigator */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 sticky top-8">
            <div className="flex items-center space-x-3 mb-6">
              <Target className="w-6 h-6 text-red-400" />
              <h2 className="text-xl font-bold text-white">Navigation</h2>
            </div>

            <div className="flex flex-wrap gap-5 justify-start ">
              {Task.Questions.map((q, index) => (
                <div
                  className={`${
                    attendedQuestion.includes(index)
                      ? "bg-red-900"
                      : "bg-gray-900"
                  } py-2 px-4  text-white rounded-full`}
                >
                  {index}
                </div>
              ))}
            </div>
            {/* Stats */}
            {/*
              <div className="mb-6 p-4 bg-gray-700 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300 text-sm">Answered</span>
                  <span className="text-red-400 font-semibold">
                    {Object.keys(answers).length}/{Task.Questions.length}
                  </span>
                </div>
                <div className="w-full bg-gray-600 h-2 rounded-full">
                  <div
                    className="bg-red-500 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
              </div>
            */}

            {/*<div className="grid grid-cols-5 gap-3">
              {Task.Questions.map((_, index) => {
                const isAnswered = answers[index] !== undefined;

                return (
                  <div
                    key={index}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold text-sm 
                               cursor-pointer transition-all duration-200 ${
                                 isAnswered
                                   ? "bg-red-500 text-white"
                                   : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                               }`}
                    onClick={() => {
                      document
                        .querySelector(`input[name="question-${index}"]`)
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                    }}
                  >
                    {isAnswered ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                );
              })}
            </div>*/}
          </div>

          {/* Performance 
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Stats</h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                <span className="text-gray-300">Score</span>
                <span className="text-red-400 font-bold">
                  {Math.round((correctedAnswer / Task.Questions.length) * 100)}%
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                <span className="text-gray-300">Time</span>
                <span className="text-red-400 font-mono">
                  {formatTime(timeElapsed)}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                <span className="text-gray-300">Correct</span>
                <span className="text-green-400 font-bold">
                  {correctedAnswer}
                </span>
              </div>
            </div>
          </div>
          Stats */}
        </div>
      </div>
    </div>
  );
}

export default TaskAttendPage;
