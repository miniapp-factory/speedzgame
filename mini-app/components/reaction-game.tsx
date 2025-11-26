"use client";

import { useEffect, useState } from "react";
import OpenxaiIcon from "./OpenxaiIcon";
import { cn } from "@/lib/utils";

export default function ReactionGame() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Generate a new sequence of 4 button indices (0-3)
  const generateSequence = () => {
    const seq = Array.from({ length: 4 }, () => Math.floor(Math.random() * 4));
    setSequence(seq);
    setCurrentIndex(0);
    setScore(0);
    setGameOver(false);
  };

  // Light up buttons in order with adaptive speed
  useEffect(() => {
    if (sequence.length === 0 || gameOver) return;
    const delay = Math.max(800 - score * 100, 300);
    const interval = setInterval(() => {
      setActiveButton((prev) => {
        if (prev === null) {
          return sequence[currentIndex];
        } else {
          setCurrentIndex((c) => (c + 1) % sequence.length);
          return null;
        }
      });
    }, delay);
    return () => clearInterval(interval);
  }, [currentIndex, sequence, score, gameOver]);

  const handleClick = (idx: number) => {
    if (gameOver || activeButton === null) return;
    if (idx === sequence[score]) {
      setScore((s) => s + 1);
      setActiveButton(null);
    } else {
      setGameOver(true);
    }
  };

  return (
    <main className="flex flex-col items-center gap-6 p-4">
      <h1 className="text-2xl font-bold">Reaction Speed Game</h1>
      <div className="flex gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            className={cn(
              "relative size-20 rounded-full border-4 border-white transition-colors",
              activeButton === idx
                ? "bg-gradient-to-r from-green-400 to-blue-500"
                : "bg-gradient-to-r from-gray-200 to-gray-400",
              gameOver && idx !== sequence[score]
                ? "opacity-50"
                : ""
            )}
          >
            <OpenxaiIcon className="size-10 mx-auto" />
          </button>
        ))}
      </div>
      <div className="text-xl">
        {gameOver
          ? `Game over! Score: ${score}`
          : `Press the highlighted button in order.`}
      </div>
      <button
        onClick={generateSequence}
        className="mt-4 rounded-full bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
      >
        Start / Restart
      </button>
    </main>
  );
}
