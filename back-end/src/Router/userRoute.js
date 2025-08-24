import express from "express";
import {
  GetSpecificMentee,
  GetUsers,
  SearchMentor,
  UpdateUserProfile,
} from "../Controller/UserController.js";
import upload from "../config/MulterConfig.js";
import { GenerateBio } from "../Controller/AiController.js";
const UserRouter = express.Router();
UserRouter.get("/getmenteebyid/:id", GetSpecificMentee);
UserRouter.post(
  "/updateprofile",
  upload.single("profilepicture"),
  UpdateUserProfile
);
UserRouter.post("/generate-bio/:id", GenerateBio);

UserRouter.get("/users", GetUsers);
UserRouter.post("/mentor", SearchMentor);

export default UserRouter;
