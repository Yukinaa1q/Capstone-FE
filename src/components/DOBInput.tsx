import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear = new Date().getFullYear();

const DOBInput = () => {
  return (
    <div>
      <Label htmlFor="dob">Date of Birth</Label>
      <div className="flex gap-2">
        {/* Day select */}
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="Day" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
              <SelectItem key={d} value={String(d)}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>



        {/* Month select */}
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {month.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>



        {/* Year select */}
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {
              Array.from({ length: 100 }, (_, i) => currentYear - 30 - (50 - i)).map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))
            }
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DOBInput;
