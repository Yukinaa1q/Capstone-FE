import * as React from "react";
import { DayPicker } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      fixedWeeks
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        root: "w-fit bg-white",
        month: "w-fit",
        months: "",
        nav: "flex justify-between mb-2",
        weekday: "w-8",
        weekdays: "flex",
        week: "flex",
        weeks: "flex flex-col",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_button: "w-full h-full",
        selected: "bg-t_primary-500 text-white hover:bg-t_primary-600 hover:text-white",
        button_next: "hover:bg-gray-100 p-1 rounded-sm",
        button_previous: "hover:bg-gray-100 p-1 rounded-sm",
        chevron: "size-4",
        outside: "text-neutral-500",
        ...classNames,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
