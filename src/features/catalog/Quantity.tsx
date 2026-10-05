import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuantityProps {
  value: number;
  onChange: (value: number) => void;
}

export function Quantity({ value, onChange }: QuantityProps) {
  return (
    <div className="quantity">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onChange(value - 1)}
        aria-label="Decrease quantity"
      >
        <Minus />
      </Button>
      <span>{value}</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
      >
        <Plus />
      </Button>
    </div>
  );
}
