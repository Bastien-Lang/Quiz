import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// ✅ Route test
app.get("/", (req, res) => {
  res.send("Backend Quiz API is running ✅");
});

// ✅ Route pour récupérer toutes les questions
app.get("/questions", async (req, res) => {
  try {
    const questions = await prisma.question.findMany();
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la récupération des questions" });
  }
});

// ✅ (Optionnel) Ajouter une route pour créer une question
app.post("/questions", async (req, res) => {
  try {
    const { question, answers, correct, theme, difficulty, language } = req.body;

    const newQuestion = await prisma.question.create({
      data: { question, answers, correct, theme, difficulty, language },
    });

    res.status(201).json(newQuestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la création de la question" });
  }
});

// ✅ Démarrage du serveur
const PORT = 4000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
