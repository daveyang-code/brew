"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { Button } from "./ui/button";
import { CoffeeBean } from "../types";
import { Input } from "./ui/input";
import { useState } from "react";

const AddCoffeeBean: React.FC<{ onAdd: () => void }> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [roastLevel, setRoastLevel] = useState("");

  const handleAddBean = () => {
    if (!name || !roastLevel) {
      alert("Please provide all required details.");
      return;
    }

    const newBean: CoffeeBean = {
      id: Date.now(),
      name,
      roastLevel,
    };

    const existingBeans = JSON.parse(
      localStorage.getItem("coffeeBeans") || "[]"
    );
    localStorage.setItem(
      "coffeeBeans",
      JSON.stringify([...existingBeans, newBean])
    );
    setName("");
    setRoastLevel("");
    onAdd(); // Trigger refresh
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <h2 className="text-lg font-bold">Add Coffee Bean</h2>
      <Input
        placeholder="Coffee Bean Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Select onValueChange={setRoastLevel}>
        <SelectTrigger>
          <SelectValue placeholder="Select Roast Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Light">Light</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="Dark">Dark</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleAddBean}>Add Bean</Button>
    </div>
  );
};

export default AddCoffeeBean;