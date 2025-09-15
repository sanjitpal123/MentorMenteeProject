// ContextStore.js
import { createContext, useEffect, useState } from "react";
import GetAllMentosService from "../services/GetAllmentors";
import GetMenteeprofileser from "../services/GetMenteeProfile";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [mentorCount, setMentorCount] = useState(0);
  const [menteeCount, setMenteeCount] = useState(0);
  const [selectedMentees, setselectedMentees] = useState([]);

  const [filterMentors, setFilterMentors] = useState([]);
  const [pages, Setpages] = useState(1);
  const [User, setUser] = useState();
  const [Suser, setSUser] = useState();

  // Load user from localStorage on first render
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  async function GetMenteeProfile() {
    try {
      if (User?._id) {
        const res = await GetMenteeprofileser(User._id);
        setSUser(res);
      }
    } catch (error) {
      console.error("Failed to fetch mentee profile", error);
    }
  }

  useEffect(() => {
    if (User?._id) {
      GetMenteeProfile();
    }
  }, [User]);

  useEffect(() => {
    GetMenteeProfile();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        mentorCount,
        setMentorCount,
        menteeCount,
        setMenteeCount,
        setFilterMentors,
        filterMentors,
        Setpages,
        pages,
        User,
        setUser,
        GetMenteeProfile,
        Suser,
        setSUser,
        selectedMentees,
        setselectedMentees,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
