"use client";
import { useEffect, useState } from "react";

const COLORS = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"];

export default function GameMasterPage() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [clickedAnswer, setClickedAnswer] = useState(null);

  useEffect(() => {
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  if (!questions.length) return <p>Loading...</p>;

  const q = questions[currentQuestion];

  const handleClick = (ans) => {
    if (clickedAnswer) return; // empêche de cliquer plusieurs fois
    setClickedAnswer(ans);
    if (ans === q.correct) setScore((prev) => prev + 1);

    // passe à la question suivante après 1,5s
    setTimeout(() => {
      setClickedAnswer(null);
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        alert(`Quiz terminé ! Score: ${score + (ans === q.correct ? 1 : 0)} / ${questions.length}`);
      }
    }, 1500);
  };
  console.log(questions);

  return (
    <main className="flex flex-col items-center justify-start min-h-screen p-8 bg-gradient-to-br from-purple-500 to-blue-400 text-white">
      {/* Barre de progression */}
      <div className="w-full max-w-3xl mb-6">
        <div className="text-sm mb-2">
          Question {currentQuestion + 1} / {questions.length}
        </div>
        <div className="w-full bg-white h-2 rounded">
          <div
            className="bg-black h-2 rounded"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Carte question */}
      <div className="bg-white text-black p-6 rounded-xl w-full max-w-3xl mb-6 shadow-lg">
        <div className="text-xl font-semibold text-center">{q.question}</div>
      </div>

      {/* Boutons réponses */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-3xl">
        {q.answers.map((ans, idx) => {
          let btnColor = COLORS[idx % COLORS.length];
          if (clickedAnswer) {
            if (ans === q.correct) btnColor = "bg-green-500";
            else if (ans === clickedAnswer) btnColor = "bg-red-500";
          }
          return (
            <button
              key={idx}
              className={`${btnColor} p-6 rounded-xl font-semibold text-white text-lg shadow-md hover:brightness-110 transition`}
              onClick={() => handleClick(ans)}
            >
              {ans}
            </button>
          );
        })}
      </div>
    </main>
  );
}
