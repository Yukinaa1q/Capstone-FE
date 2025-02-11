"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

const subjects = [
  {
    value: "math",
    label: "Math",
  },
  {
    value: "physic",
    label: "Physic",
  },
  {
    value: "chemistry",
    label: "Chemistry",
  },
  {
    value: "Geography",
    label: "geography",
  },
  {
    value: "history",
    label: "History",
  },
  {
    value: "biology",
    label: "Biology",
  },
  {
    value: "english",
    label: "English",
  },
];

export default function SearchSelect(props: ControllerRenderProps) {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(props?.value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20"
        >
          <span className={cn("truncate", !value && "text-muted-foreground")}>
            {value
              ? subjects.find((subject) => subject.value === value)?.label
              : "Select subject"}
          </span>
          <ChevronDown
            size={16}
            strokeWidth={2}
            className="shrink-0 text-muted-foreground/80"
            aria-hidden="true"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder="Search subject..." />
          <CommandList>
            <CommandEmpty>No subject found.</CommandEmpty>
            <CommandGroup>
              {subjects.map((subject) => (
                <CommandItem
                  key={subject.value}
                  value={subject.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    props?.onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {subject.label}
                  {value === subject.value && (
                    <Check size={16} strokeWidth={2} className="ml-auto" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
