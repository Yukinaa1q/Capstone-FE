import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RoleInput() {
  return (
    <RadioGroup
      defaultValue="student"
      className="flex"
      style={
        {
          "--primary": "238.7 83.5% 66.7%",
          "--ring": "238.7 83.5% 66.7%",
        } as React.CSSProperties
      }
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
