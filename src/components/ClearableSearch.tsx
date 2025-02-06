import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CircleX } from "lucide-react";
import { useId, useRef, useState } from "react";

export default function ClearableSearch({
  className,
  handleChange,
}: {
  className?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const id = useId();
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClearInput = () => {
    setInputValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={cn("relative", className)}>
      <Input
        id={id}
        ref={inputRef}
        type="text"
        placeholder="Search"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          handleChange(e);
        }}
      />
      {inputValue && (
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Clear input"
          onClick={handleClearInput}
        >
          <CircleX size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
