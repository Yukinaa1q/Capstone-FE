import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function SearchInput({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-full md:w-3/4 lg:w-1/2 left-1/2 -translate-x-1/2",
        className
      )}
    >
      <Input
        id="input-25"
        className="pe-11 rounded-full"
        placeholder="Search..."
        type="search"
      />
      <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2 text-muted-foreground">
        <kbd className="inline-flex h-5 max-h-full items-center rounded border border-border px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
          Ctrl+K
        </kbd>
      </div>
    </div>
  );
}
