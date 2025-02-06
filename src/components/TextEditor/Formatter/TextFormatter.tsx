import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";
import handleTextEditor from "../handleTextEditor";
import { CustomText } from "../type";
import { ReactEditor, useSlate } from "slate-react";

const TextFormatter = () => {
  const editor = useSlate();
  const setValue = () => {
    let mark: keyof Omit<CustomText, "text">;
    const arrRes = [];
    for (mark of ["bold", "italic", "underline"] as (keyof Omit<
      CustomText,
      "text"
    >)[]) {
      const isActive = handleTextEditor.isMarked(editor, mark);
      if (isActive) {
        arrRes.push(mark);
      }
    }
    return arrRes;
  };
  const handleTextFormat = (mark: keyof Omit<CustomText, "text">) => {
    handleTextEditor.toggleMark(editor, mark);
    ReactEditor.focus(editor);
  };
  return (
    <ToggleGroup type="multiple" variant="outline" value={setValue()}>
      <ToggleGroupItem
        value="bold"
        onClick={(e) => {
          e.preventDefault();
          handleTextFormat("bold");
        }}
      >
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="italic"
        onClick={(e) => {
          e.preventDefault();
          handleTextFormat("italic");
        }}
      >
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="underline"
        onClick={(e) => {
          e.preventDefault();
          handleTextFormat("underline");
        }}
      >
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default TextFormatter;
