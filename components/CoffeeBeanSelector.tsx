"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  coffeeBeans: { id: number; name: string }[];
  onSelect: (value: string) => void;
}

const CoffeeBeanSelector: React.FC<Props> = ({ coffeeBeans, onSelect }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">Select a Coffee Bean</h2>
      <Select onValueChange={onSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a coffee bean" />
        </SelectTrigger>
        <SelectContent>
          {coffeeBeans.map((bean) => (
            <SelectItem key={bean.id} value={bean.name}>
              {bean.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CoffeeBeanSelector;
