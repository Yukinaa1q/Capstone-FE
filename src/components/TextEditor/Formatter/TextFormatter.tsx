import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";
import handleTextEditor from "../handleTextEditor";
import { CustomText } from "../type";
import { useContext } from "react";
import { TextEditorCtx } from "../TextEditor";
import { ReactEditor } from "slate-react";

const TextFormatter = ({ editor }: {editor: ReactEditor}) => {
  const { state: { textFormat } , dispatch} = useContext(TextEditorCtx);
  const setValue = () => {
    let mark: keyof Omit<CustomText, "text">;
    const arrRes = [];
    for (mark in textFormat) {
      if (textFormat[mark]) {
        arrRes.push(mark);
      }
    }
    return arrRes;
  };
  return (
    <ToggleGroup type="multiple" variant="outline" value={setValue()}>
      <ToggleGroupItem
        value="bold"
        onClick={(e) => {
          e.preventDefault();
          handleTextEditor.toggleMark(editor, "bold");
          dispatch({ type: "TOGGLE_BOLD" });
          // Focus the text editor
          const editorEle = document.querySelector(
            "div[role=textbox]"
          ) as HTMLElement;
          editorEle?.focus();
        }}
      >
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="italic"
        onClick={() => {
          handleTextEditor.toggleMark(editor, "italic");
          dispatch({ type: "TOGGLE_ITALIC" });
          // Focus the text editor
          const editorEle = document.querySelector(
            "div[role=textbox]"
          ) as HTMLElement;
          editorEle?.focus();
        }}
      >
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="underline"
        onClick={() => {
          handleTextEditor.toggleMark(editor, "underline");
          dispatch({ type: "TOGGLE_UNDERLINE" });
          // Focus the text editor
          const editorEle = document.querySelector(
            "div[role=textbox]"
          ) as HTMLElement;
          editorEle?.focus();
        }}
      >
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default TextFormatter;
