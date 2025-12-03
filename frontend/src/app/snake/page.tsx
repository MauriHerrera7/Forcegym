"use client";
import { useEffect, useState } from "react";

type Point = { x: number; y: number };

export default function Home() {
  const [snake, setSnake] = useState<Point[]>([{ x: 8, y: 8 }]);
  const [direction, setDirection] = useState<Point>({ x: 0, y: -1 });
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const gridSize = 16;
  const speed = 150; // velocidad fija (ms)

  useEffect(() => {
    const savedHigh = localStorage.getItem("snakeHighScore");
    if (savedHigh) setHighScore(parseInt(savedHigh));
  }, []);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setSnake((prev) => {
        let head = { x: prev[0].x + direction.x, y: prev[0].y + direction.y };

        // Teletransportar en bordes
        if (head.x < 0) head.x = gridSize - 1;
        if (head.x >= gridSize) head.x = 0;
        if (head.y < 0) head.y = gridSize - 1;
        if (head.y >= gridSize) head.y = 0;

        const newSnake = [head, ...prev];

        // Colisión consigo mismo
        if (prev.some((p) => p.x === head.x && p.y === head.y)) {
          setGameOver(true);
          if (score > highScore) {
            localStorage.setItem("snakeHighScore", score.toString());
            setHighScore(score);
          }
          return prev;
        }

        // Comer
        if (head.x === food.x && head.y === food.y) {
          setScore((s) => s + 10);
          setFood({
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize),
          });
          return newSnake; // no se hace pop, crece
        }

        newSnake.pop();
        return newSnake;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [direction, food, gameOver]);

  // Controles teclado
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 1) break;
          setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (direction.y === -1) break;
          setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (direction.x === 1) break;
          setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x === -1) break;
          setDirection({ x: 1, y: 0 });
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction]);

  const resetGame = () => {
    setSnake([{ x: 8, y: 8 }]);
    setDirection({ x: 0, y: -1 });
    setFood({ x: 5, y: 5 });
    setScore(0);
    setGameOver(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-extrabold mb-4 tracking-wide text-green-400 drop-shadow-[0_0_6px_#22c55e]">
        🐍 Snake Game
      </h1>

      {/* Marcadores */}
      <div className="flex gap-6 mb-6">
        <div className="bg-gray-800 px-6 py-2 rounded-xl shadow-lg border border-green-500">
          <p className="text-lg text-white font-semibold">
            Score: <span className="text-green-400">{score}</span>
          </p>
        </div>
        <div className="bg-gray-800 px-6 py-2 rounded-xl shadow-lg border border-yellow-500">
          <p className="text-white text-lg font-semibold">
            High Score: <span className="text-yellow-400">{highScore}</span>
          </p>
        </div>
      </div>

      {/* Tablero */}
      <div
        className="grid gap-0 border-4 border-green-600 rounded-lg shadow-[0_0_20px_#22c55e]"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 24px)`,
          gridTemplateRows: `repeat(${gridSize}, 24px)`,
          background: "#1a1a1a",
        }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, i) => {
          const x = i % gridSize;
          const y = Math.floor(i / gridSize);
          const isSnake = snake.some((p) => p.x === x && p.y === y);
          const isFood = food.x === x && food.y === y;
          return (
            <div
              key={i}
              className={`w-6 h-6 border border-gray-900 ${
                isFood ? "animate-pulse" : ""
              }`}
              style={{
                background: isSnake
                  ? "limegreen"
                  : isFood
                  ? "radial-gradient(circle, red 40%, darkred 100%)"
                  : "transparent",
                boxShadow: isSnake
                  ? "0 0 6px #22c55e"
                  : isFood
                  ? "0 0 10px red"
                  : "none",
              }}
            />
          );
        })}
      </div>

      {/* Game Over */}
      {gameOver && (
        <div className="mt-6 flex flex-col items-center animate-bounce">
          <p className="text-red-500 text-xl font-bold mb-3 drop-shadow-[0_0_6px_#ef4444]">
            💀 Game Over
          </p>
          <button
            onClick={resetGame}
            className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg text-lg font-semibold shadow-md transition-transform transform hover:scale-105"
          >
            Reiniciar
          </button>
        </div>
      )}
    </main>
  );
}