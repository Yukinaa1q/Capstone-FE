import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClockIcon } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function DateTimeInp({
  initValue,
  setValue,
}: {
  initValue?: Date;
  setValue?: (dateTime: Date | undefined) => void;
}) {
  const [date, setDate] = useState<Date | undefined>(initValue);

  
  return (
    <Popover>
      <PopoverTrigger className="border h-9 px-2 block rounded-md text-sm min-w-44">
        {date ? date.toLocaleString() : "Select time"}
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <div className="rounded-md w-fit">
          <Calendar
            mode="single"
            className="p-2"
            required
            selected={date}
            onSelect={(date) =>
              setDate((oldDate) => {
                if (!oldDate) oldDate = new Date();
                oldDate.setFullYear(
                  date.getFullYear(),
                  date.getMonth(),
                  date.getDate()
                );
                const newDate = new Date(oldDate);
                if (setValue) setValue(newDate);
                return newDate;
              })
            }
          />
          <div className="flex items-center gap-3">
            <Label className="text-xs">
              Enter time
            </Label>
            <div className="relative grow">
              <Input
                type="time"
                step="1"
                onChange={(e) => {
                  const time = e.target.value.split(":");
                  if (time) {
                    setDate((oldDate) => {
                      if (!oldDate) oldDate = new Date();
                      oldDate.setHours(
                        parseInt(time[0]),
                        parseInt(time[1]),
                        parseInt(time[2])
                      );
                      const newDate = new Date(oldDate);
                      if (setValue) setValue(newDate);
                      return newDate;
                    });
                  }
                }}
                defaultValue="12:00:00"
                className="peer appearance-none ps-9 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <ClockIcon size={16} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
