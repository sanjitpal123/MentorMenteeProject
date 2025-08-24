import e from "express";
import { Login, Signup } from "../Controller/UserController.js";
const AuthRouter = e.Router();
AuthRouter.post("/singup", Signup);
AuthRouter.post("/login", Login);
export default AuthRouter;
