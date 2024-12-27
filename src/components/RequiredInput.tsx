import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RequiredInputProps {
  label: string;
  type: string;
  placeholder: string;
}

export default function RequiredInput({label, type, placeholder}: RequiredInputProps) {
  return (
    <div>
      <Label htmlFor="input-02">
        {label} <span className="text-destructive">*</span>
      </Label>
      <Input id="input-02" placeholder={placeholder} type={type} required />
    </div>
  );
}
