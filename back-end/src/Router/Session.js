import express from "express";
import { CancelledSessions, CreateSession, GetASession, Reschedule } from "../Controller/SessionBooking.js";
const SessionRouter = express.Router();
SessionRouter.post("/create", CreateSession);
SessionRouter.get("/getbyid/:id",GetASession);
SessionRouter.post('/reschedule',Reschedule);
SessionRouter.post('/cancelled/:id',CancelledSessions);
export default SessionRouter;
