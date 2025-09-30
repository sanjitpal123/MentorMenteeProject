import { useParams } from "react-router-dom";
import { GetAllScoresOfMenteesOfATask } from "../services/Performance";
import { useContext } from "react";
import { GlobalContext } from "../ContextApiStore/ContextStore";
import { useEffect } from "react";
function TaskWinningPage() {
  const { id } = useParams();
  const { User } = useContext(GlobalContext);
  const wholeObj = JSON.parse(localStorage.getItem("user"));
  async function GetAllScore() {
    try {
      const response = await GetAllScoresOfMenteesOfATask(wholeObj.token, id);
      console.log("response to get scores", response);
    } catch (error) {
      console.log("error to get scores", error);
    }
  }
  useEffect(() => {
    GetAllScore();
  }, [id]);
  return (
    <div>
      <h1>Welcome to task wining page </h1>
    </div>
  );
}
export default TaskWinningPage;
