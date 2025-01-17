"use client";

import { Button } from "./ui/button";
import { EspressoLog } from "../types";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

const tasteOptions = [
  { id: "sour", label: "Sour 🍋" },
  { id: "sweet", label: "Sweet 🍬" },
  { id: "bitter", label: "Bitter 🍫" },
  { id: "good", label: "Good 🙂" },
  { id: "neutral", label: "Neutral 😐" },
  { id: "bad", label: "Bad 🙁" },
];

const LogBrew: React.FC<{ beanId: number; onLog: () => void }> = ({
  beanId,
  onLog,
}) => {
  const [grindSize, setGrindSize] = useState("");
  const [weight, setWeight] = useState<number | "">("");
  const [brewTime, setBrewTime] = useState<number | "">("");
  const [temperature, setTemperature] = useState<number | "">("");
  const [yieldGrams, setYieldGrams] = useState<number | "">("");
  const [notes, setNotes] = useState("");
  const [tastes, setTastes] = useState<string[]>([]);

  const handleLog = () => {
    if (!grindSize || !weight || !brewTime || !yieldGrams) {
      alert("Please provide all required details.");
      return;
    }

    const newLog: EspressoLog = {
      id: Date.now(),
      beanId,
      grindSize,
      weight: Number(weight),
      brewTime: Number(brewTime),
      temperature: temperature ? Number(temperature) : undefined,
      yield: Number(yieldGrams),
      notes,
      timestamp: new Date().toISOString(),
      tastes,
    };

    const existingLogs = JSON.parse(
      localStorage.getItem("espressoLogs") || "[]"
    );
    localStorage.setItem(
      "espressoLogs",
      JSON.stringify([...existingLogs, newLog])
    );
    onLog();
  };

  const toggleTaste = (taste: string) => {
    setTastes((prev) =>
      prev.includes(taste) ? prev.filter((t) => t !== taste) : [...prev, taste]
    );
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4 mt-8">
      <h2 className="text-lg font-bold">Brew Recipe</h2>
      <Input
        placeholder="Grind Size (e.g., Fine, Medium)"
        value={grindSize}
        onChange={(e) => setGrindSize(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Weight In (grams)"
        value={weight}
        onChange={(e) =>
          setWeight(e.target.value ? Number(e.target.value) : "")
        }
      />
      <Input
        type="number"
        placeholder="Brew Time (seconds)"
        value={brewTime}
        onChange={(e) =>
          setBrewTime(e.target.value ? Number(e.target.value) : "")
        }
      />
      <Input
        type="number"
        placeholder="Yield (grams)"
        value={yieldGrams}
        onChange={(e) =>
          setYieldGrams(e.target.value ? Number(e.target.value) : "")
        }
      />
      <Input
        type="number"
        placeholder="Temperature (°C, optional)"
        value={temperature}
        onChange={(e) =>
          setTemperature(e.target.value ? Number(e.target.value) : "")
        }
      />
      <Textarea
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <div className="space-y-2">
        <h3 className="text-md font-bold">Taste Attributes</h3>
        <div className="flex flex-wrap gap-2">
          {tasteOptions.map((option) => (
            <button
              key={option.id}
              className={`px-3 py-1 border rounded-md ${
                tastes.includes(option.id)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => toggleTaste(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <Button onClick={handleLog}>Log Results</Button>
    </div>
  );
};

export default LogBrew;
