import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function PriceInput({
  handleFormChange,
  initValue,
}: {
  initValue: number;
  handleFormChange: (value: number | undefined) => void;
}) {
  const [value, setValue] = React.useState<string>(initValue.toString());
  const formattedNumber =
    value.length === 0 ? "" : parseInt(value, 10).toLocaleString();
  return (
    <div className="border-1 rounded-md shadow-xs flex h-9">
      <Input
        type="text"
        value={formattedNumber}
        className="focus-visible:ring-0 border-none shadow-none h-full"
        onChange={(e) => {
          const asciiValue = e.target.value.charCodeAt(
            e.target.value.length - 1
          );
          if (asciiValue < 48 || asciiValue > 57) return;
          // Deformat the text, inorder to format it again
          const deformatted = e.target.value.replace(/,/g, "");
          setValue(deformatted);
          handleFormChange(
            deformatted === "" ? undefined : parseInt(deformatted, 10)
          );
        }}
      />
      <div className="flex flex-col border-l">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="w-8 h-1/2 hover:rounded-none hover:rounded-se-[5px]"
          onClick={() => {
            setValue((old) => (old === "" ? "1" : parseInt(old, 10) + 1 + ""));
            const deformatted = formattedNumber.replace(/,/g, "");
            handleFormChange(
              deformatted === "" ? undefined : parseInt(deformatted, 10) + 1
            );
          }}
        >
          <ChevronUp stroke="gray" />
        </Button>
        <Separator />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="w-8 h-1/2 hover:rounded-none hover:rounded-ee-[5px]"
          onClick={() => {
            setValue((old) => (old === "" ? "0" : parseInt(old, 10) - 1 + ""));
            const deformatted = formattedNumber.replace(/,/g, "");
            handleFormChange(
              deformatted === "" ? undefined : parseInt(deformatted, 10) - 1
            );
          }}
        >
          <ChevronDown stroke="gray" />
        </Button>
      </div>
    </div>
  );
}
