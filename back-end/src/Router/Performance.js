import express from "express";
import { Auth } from "../middleWear/Auth";
import { createPerformance } from "../Controller/Performance.js";
const PerformanceRouter = express.Router();
PerformanceRouter.post("/createscore", Auth, createPerformance);
export default PerformanceRouter;
