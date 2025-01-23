import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RoleInputProps {
  onChange: (e: string) => void;
  value: string;
}

export default function RoleInput({onChange, value}: RoleInputProps) {
  return (
    <RadioGroup
      // defaultValue="student"
      className="flex"
      style={
        {
          "--primary": "238.7 83.5% 66.7%",
          "--ring": "238.7 83.5% 66.7%",
        } as React.CSSProperties
      }
      onValueChange={onChange}
      value={value}
    >
      <div className="flex items-center gap-2">
        <RadioGroupItem value="student" id="radio-02-r1" />
        <Label htmlFor="radio-02-r1">Student</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="tutor" id="radio-02-r2" />
        <Label htmlFor="radio-02-r2">Tutor</Label>
      </div>
    </RadioGroup>
  );
}
 