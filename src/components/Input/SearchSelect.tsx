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
import { ChevronDown } from "lucide-react";
import { JSX, useId, useState } from "react";

export interface ListItem {
  value: string;
  label: string;
  display?: any;
}

export type SearchSelectProps = {
  value?: string;
  list: ListItem[];
  placeholder: string;
  renderChild: (item: ListItem, value: string) => JSX.Element;
  filterFn: (value: string, search: string, keywords?: string[]) => number;
  onValueChange?: (value: string) => void;
  className?: string;
};

export default function SearchSelect(props: SearchSelectProps) {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(props?.value ?? "");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20",
            props.className
          )}
        >
          <span className={cn("truncate", !value && "text-muted-foreground")}>
            {value
              ? props.list.find((item) => item.value === value)?.label
              : props.placeholder}
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
        <Command filter={props.filterFn}>
          <CommandInput placeholder="Search keyword ..." />
          <CommandList>
            <CommandEmpty>No result found.</CommandEmpty>
            <CommandGroup>
              {props.list.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    if (props?.onValueChange) props.onValueChange(item.value);
                    setOpen(false);
                  }}
                >
                  {props.renderChild(item, value)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
