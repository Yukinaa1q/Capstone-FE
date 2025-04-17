import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useEffect, useId, useState } from "react";

export default function SearchInput({
  placeholder = "Search",
  className,
  onValueChange,
  onFocus,
}: {
  className?: string;
  onValueChange?: (value: string) => void;
  onFocus?: () => void;
  placeholder?: string;
}) {
  const [search, setSearch] = useState("");
  // Make control + K work for searchInput
  const inputId = useId();
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        const input = document.getElementById(inputId);
        input?.focus();
      }
    });
    return () => {
      document.removeEventListener("keydown", () => {});
    };
  }, []);
  return (
    <div
      className={cn(
        "relative w-full md:w-3/4 lg:w-1/2 left-1/2 -translate-x-1/2",
        className
      )}
    >
      <Input
        id={inputId}
        value={search}
        className="pe-11 rounded-full"
        placeholder={placeholder}
        type="search"
        onChange={(e) => {
          setSearch(e.target.value);
          if (onValueChange) {
            onValueChange(e.target.value);
          }
        }}
        onFocus={onFocus}
      />
      <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2 text-muted-foreground">
        <kbd className="inline-flex h-5 max-h-full items-center rounded border border-border px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
          Ctrl+K
        </kbd>
      </div>
    </div>
  );
}
