import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Serveur HTTP + WebSocket
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("🟢 Un joueur connecté :", socket.id);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`👥 Joueur ${socket.id} rejoint la salle ${room}`);
  });

  socket.on("send_answer", (data) => {
    io.to(data.room).emit("receive_answer", data);
  });

  socket.on("disconnect", () => console.log("🔴 Déconnexion :", socket.id));
});

app.get("/", (_, res) => res.send("QuizMaster API OK ✅"));

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));
