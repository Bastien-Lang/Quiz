import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
  console.log("📚 Import des questions depuis OpenQuizzDB (fichier local)");

  // Lis ton fichier JSON local
  const raw = fs.readFileSync("prisma/data/OpenQuizzDB_498.json", "utf8");
  const data = JSON.parse(raw);

  const questions = [];

  const theme = data["catégorie-nom-slogan"]?.fr?.nom || "Général";
  const source = data.fournisseur || "OpenQuizzDB";
  const difficultyGlobal = data.difficulté || "N/A";

  // Récupère les niveaux de difficulté dans data.quizz.fr
  const niveaux = data.quizz?.fr ? Object.keys(data.quizz.fr) : [];

  for (const niveau of niveaux) {
    const qList = data.quizz.fr[niveau];

    if (Array.isArray(qList)) {
      for (const q of qList) {
        questions.push({
          question: q.question,
          answers: q.propositions,
          correct: q.réponse,
          theme,
          difficulty: niveau, // "débutant", "confirmé", "expert"
          language: "fr",
          source,
        });
      }
    }
  }

  console.log(`🧩 ${questions.length} questions trouvées. Insertion en base...`);

  for (const q of questions) {
    await prisma.question.create({ data: q });
  }

  console.log("✅ Base de données remplie avec succès !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors de l'import :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
