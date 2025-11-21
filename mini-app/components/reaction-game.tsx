"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const COLORS = ["blue", "red", "green", "yellow"] as const;
type Color = typeof COLORS[number];

export default function ReactionGame() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [counter, setCounter] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const addNext = () => {
    const next = Math.floor(Math.random() * COLORS.length);
    setSequence((s) => [...s, next]);
  };

  const playSequence = async () => {
    for (let i = 0; i < sequence.length; i++) {
      setActiveIndex(sequence[i]);
      await new Promise((r) => setTimeout(r, 1000));
      setActiveIndex(null);
      await new Promise((r) => setTimeout(r, 500));
    }
    setCurrentStep(0);
  };

  const startRound = () => {
    if (gameOver) return;
    addNext();
  };

  useEffect(() => {
    if (sequence.length > 0) {
      playSequence();
    }
  }, [sequence]);

  const handleClick = (index: number) => {
    if (gameOver) return;
    if (index === sequence[currentStep]) {
      setCurrentStep((s) => s + 1);
      if (currentStep + 1 === sequence.length) {
        setCounter((c) => c + 1);
        startRound();
      }
    } else {
      setGameOver(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-2xl font-bold">Score: {counter}</div>
      <div className="flex gap-2">
        {COLORS.map((color, idx) => (
          <Button
            key={color}
            variant={activeIndex === idx ? "default" : "outline"}
            className={`w-20 h-20 bg-${color}-500 ${activeIndex === idx ? "ring-4 ring-red-500 animate-pulse" : ""}`}
            onClick={() => handleClick(idx)}
          >
            <img
              src={`/bored-ape-${idx + 1}.png`}
              alt={`Bored Ape ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </Button>
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
