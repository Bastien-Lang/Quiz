import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Bienvenue au Quiz Game !</h1>
      <p>Choisissez votre rôle :</p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link href="/game-master">
          <button>Game Master</button>
        </Link>
        <Link href="/player">
          <button>Joueur</button>
        </Link>
      </div>
    </main>
  );
}
