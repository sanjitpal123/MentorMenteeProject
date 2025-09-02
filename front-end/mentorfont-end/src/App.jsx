import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import RegisterPage from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import BrowseMentor from "./pages/BrowseMentor";
import MentorView from "./pages/MentorView";
import Layout from "./components/Layout";
import {
  GlobalContext,
  GlobalContextProvider,
} from "./ContextApiStore/ContextStore";
import BecomeMentor from "./pages/BecomeAMentor";
import Wishlist from "./pages/WishList";
import { useContext } from "react";
import ChatBox from "./pages/Chat";
import MentorDashboard from "./pages/MentorDashboard";
import AiDoubtSolver from "./pages/AiDoubtSolver";
import MenteeDashboard from "./pages/MenteeDashboard";
import ScheduleSession from "./pages/ScheduleSessionPage";

function App() {
  const { setUser, User } = useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("set", user);

  return (
    <Router>
      <Routes>
        {" "}
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              user?.role == "mentor" ? (
                <Navigate to="/mentor/dashboard" />
              ) : (
                <HomePage />
              )
            }
          />

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/browse-mentor" element={<BrowseMentor />} />
          <Route path="/mentor-view" element={<MentorView />} />
          <Route path="/become-mentor" element={<BecomeMentor />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/chat/:id" element={<ChatBox />} />
          <Route
            path="/mentor/dashboard"
            element={
              user?.role == "mentor" ? <MentorDashboard /> : <Navigate to="/" />
            }
          />
          <Route path="mentee/dashboard" element={<MenteeDashboard />} />
          <Route path="/createsession" element={<ScheduleSession />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
