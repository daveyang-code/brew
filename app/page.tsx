"use client";

import { CoffeeBean, EspressoLog } from "../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

import AddCoffeeBean from "../components/AddCoffeeBean";
import LogBrew from "../components/LogBrew";
import LogDisplay from "../components/LogDisplay";

export default function Home() {
  const [coffeeBeans, setCoffeeBeans] = useState<CoffeeBean[]>([]);
  const [selectedBeanId, setSelectedBeanId] = useState<number | null>(null);
  const [logs, setLogs] = useState<EspressoLog[]>([]);

  useEffect(() => {
    const storedBeans = JSON.parse(localStorage.getItem("coffeeBeans") || "[]");
    setCoffeeBeans(storedBeans);

    const storedLogs = JSON.parse(localStorage.getItem("espressoLogs") || "[]");
    setLogs(storedLogs);
  }, []);

  const handleRefresh = () => {
    const storedBeans = JSON.parse(localStorage.getItem("coffeeBeans") || "[]");
    setCoffeeBeans(storedBeans);

    const storedLogs = JSON.parse(localStorage.getItem("espressoLogs") || "[]");
    setLogs(storedLogs);
  };

  const handleSelectChange = (value: string) => {
    setSelectedBeanId(value ? Number(value) : null);  // If the value is empty, set selectedBeanId to null
  };

  const filteredLogs = logs.filter((log) => log.beanId === selectedBeanId);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Coffee Brew Log</h1>
      <AddCoffeeBean onAdd={handleRefresh} />

      {coffeeBeans.length > 0 && (
        <div className="flex items-center justify-center mt-8">
          <Select value={selectedBeanId?.toString()} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full max-w-md p-2 border rounded-md">
              <SelectValue placeholder="Select a Coffee Bean" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="null" disabled>Select a Coffee Bean</SelectItem>

              {coffeeBeans.map((bean) => (
                <SelectItem key={bean.id} value={bean.id.toString()}>
                  {bean.name} ({bean.roastLevel})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      {selectedBeanId && selectedBeanId > 0 && (
        <>
          <LogBrew beanId={selectedBeanId} onLog={handleRefresh} />
          <LogDisplay logs={filteredLogs} />
        </>
      )}
    </div>
  );
}