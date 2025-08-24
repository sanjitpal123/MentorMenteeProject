import express from "express";
import Connection from "./config/DbConfig.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import MainRouter from "./Router/index.js";
import http from "http";
import { Server } from "socket.io";
import { SocketServer } from "./Utils/socketFunction.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // ✅ lowercase
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", MainRouter);

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
  console.log("Server is running at", process.env.PORT || 3000);
  Connection();
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true, // ✅ lowercase
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  SocketServer(socket, io);
});
