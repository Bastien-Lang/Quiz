"use client";
import { useEffect, useState } from "react";

export default function GameMasterPage() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  return (
    <main>
      <h1>Game Master</h1>
      <ul>
        {questions.map((q) => (
          <li key={q.id}>
            {q.question} - Thème: {q.theme}
          </li>
        ))}
      </ul>
    </main>
  );
}
