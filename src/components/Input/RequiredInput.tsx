import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface RequiredInputProps {
  label: string;
  orientation?: "horizontal" | "vertical";
  isRequired?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function RequiredInput({
  label,
  children,
  isRequired = true,
  className,
  orientation = "vertical",
}: RequiredInputProps) {
  return (
    <FormItem className={className}>
      <div className={cn(orientation === "horizontal" && "flex gap-8")}>
        <FormLabel>
          {label} {isRequired && <span className="text-destructive">*</span>}
        </FormLabel>
        <FormControl>{children}</FormControl>
      </div>
      <FormMessage />
    </FormItem>
  );
}
