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

  // Light up buttons in order
  useEffect(() => {
    if (sequence.length === 0) return;
    const timer = setTimeout(() => {
      setActiveButton(sequence[currentIndex]);
      const next = currentIndex + 1;
      if (next < sequence.length) {
        setCurrentIndex(next);
      } else {
        // finished showing sequence
        setActiveButton(null);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [currentIndex, sequence]);

  const handleClick = (idx: number) => {
    if (gameOver || activeButton !== null) return;
    if (idx === sequence[score]) {
      setScore((s) => s + 1);
      if (score + 1 === sequence.length) {
        // player completed the sequence
        setGameOver(true);
      }
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
