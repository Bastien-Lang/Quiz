import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("http://localhost:4000/questions"); // ton backend Express
  const questions = await res.json();
  return NextResponse.json(questions);
}
