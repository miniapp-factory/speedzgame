"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";

const COLORS = ["red", "green", "blue", "yellow"] as const;
type Color = typeof COLORS[number];

export default function ReactionGame() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [counter, setCounter] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startRound = () => {
    if (gameOver) return;
    const next = Math.floor(Math.random() * COLORS.length);
    setActiveIndex(next);
    timeoutRef.current = setTimeout(() => {
      setActiveIndex(null);
    }, 1000);
  };

  const handleClick = (index: number) => {
    if (gameOver) return;
    if (index === activeIndex) {
      setCounter((c) => c + 1);
      startRound();
    } else {
      setGameOver(true);
    }
  };

  useEffect(() => {
    startRound();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-2xl font-bold">Score: {counter}</div>
      <div className="flex gap-2">
        {COLORS.map((color, idx) => (
          <Button
            key={color}
            variant={activeIndex === idx ? "default" : "outline"}
            className={`w-16 h-16 bg-${color}-500 ${activeIndex === idx ? "ring-4 ring-white" : ""}`}
            onClick={() => handleClick(idx)}
          />
        ))}
      </div>
      {gameOver && (
        <div className="text-xl text-red-600 font-semibold">
          Game Over! Final Score: {counter}
        </div>
      )}
    </div>
  );
}
