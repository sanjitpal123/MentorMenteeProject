// routes/MentorRouter.js
import express from "express";
import { SearchMentor } from "../Controller/UserController.js";
import {
  FilterMentor,
  FilterPriceLowToHigh,
  GetAllMentos,
  GetMentorByIdCon,
  GetMentorProfile,
} from "../Controller/Mentor.js";
import { Auth } from "../middleWear/Auth.js";

const MentorRouter = express.Router();

MentorRouter.post("/search", SearchMentor);
// At the top
console.log("✅ Mentor router loaded");

MentorRouter.get("/ping", (req, res) => {
  res.send("Mentor router is working");
});
MentorRouter.get("/allmentor", GetAllMentos);
MentorRouter.post("/filtermentor", FilterMentor);
MentorRouter.get("/lowtohigh", FilterPriceLowToHigh);
MentorRouter.post("/getmentorprofile", GetMentorProfile);
MentorRouter.post("/getmentorbyid", GetMentorByIdCon);

export default MentorRouter;
