"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import React, { ChangeEvent } from "react";
import { DayPicker, DropdownProps } from "react-day-picker";
import { Button } from "./ui/button";

export default function DOBInput({
  init,
  onChange,
}: {
  init?: Date;
  onChange?: (date: Date | undefined) => void;
}) {
  const [date, setDate] = React.useState<Date | undefined>(init);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal hover:bg-white",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? date.toLocaleDateString() : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <DOBCalendar date={date} setDate={setDate} onChange={onChange} />
      </PopoverContent>
    </Popover>
  );
}

export function DOBCalendar({
  date,
  setDate,
  onChange,
}: {
  date?: Date;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  onChange?: (date: Date | undefined) => void;
}) {
  // const [selected, setSelected] = useState<Date>();
  const today = new Date();
  return (
    <DayPicker
      mode="single"
      captionLayout="dropdown"
      showOutsideDays
      fixedWeeks
      defaultMonth={new Date(today.getFullYear(), today.getMonth())}
      startMonth={new Date(today.getFullYear() - 100, today.getMonth())}
      endMonth={new Date(today.getFullYear(), today.getMonth())}
      selected={date}
      onSelect={(date) => {
        setDate(date);
        if (onChange) onChange(date);
      }}
      components={{ Dropdown: CalendarDropdown }}
      classNames={{
        day_button: "text-sm text-center w-full",
        day: " p-1",
        selected: "bg-t_primary-700 text-white font-semibold rounded-md",
        disabled: "text-gray-100",
        dropdowns: "flex gap-2",
        nav: "flex justify-between mb-2",
        button_previous:
          "[&>svg]:size-5 hover:bg-t_secondary-100/50 p-1 rounded-sm disabled:bg-gray-100 disabled:fill-gray-300",
        button_next:
          "[&>svg]:size-5 hover:bg-t_secondary-100/50 p-1 rounded-sm disabled:bg-gray-100 disabled:fill-gray-300",
        month_grid: "w-full mt-2",
        outside: "text-gray-500",
        root: "p-2",
      }}
    />
  );
}

const CalendarDropdown = (props: DropdownProps) => {
  const handleChange = (selectValue: string) => {
    if (props.onChange) {
      const syntheticEvent = {
        target: {
          value: selectValue,
        },
      } as ChangeEvent<HTMLSelectElement>;
      props.onChange(syntheticEvent);
    }
  };

  return (
    <Select value={props.value?.toString()} onValueChange={handleChange}>
      <SelectTrigger className="w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {props.options?.map((option) => (
          <SelectItem key={option.value} value={option.value.toString()}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
