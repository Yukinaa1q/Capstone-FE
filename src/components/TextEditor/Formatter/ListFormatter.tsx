import { List, ListOrdered } from "lucide-react";
import { CustomEditor } from "../type";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import handleTextEditor from "../handleTextEditor";
import { useContext } from "react";
import TextEditorCtx from "../EditorContext";

const ListFormatter = ({ editor }: { editor: CustomEditor }) => {
  const {
    state: { textStyle },
    dispatch,
  } = useContext(TextEditorCtx);
  let currentTextStyle =
    textStyle.type === "list-ordered"
      ? "ordered"
      : textStyle.type === "list-unordered"
      ? "unordered"
      : "nothing but a string of text";
  console.log(currentTextStyle);
  console.log("Rendering ListFormatter");
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      value={currentTextStyle}
      onValueChange={(value) => {
        console.log("onValueChange")
        if (value == "ordered") {
          console.log("Detect ordered list clicked");
          handleTextEditor.toggleList(editor, "list-ordered");
          dispatch({ type: "CHANGE_TEXT_STYLE", payload: "list-ordered" });
        } else if (value == "unordered") {
          console.log("Detect unordered list clicked");
          handleTextEditor.toggleList(editor, "list-unordered");
          dispatch({ type: "CHANGE_TEXT_STYLE", payload: "list-unordered" });
        } else {
          console.log("none type detected");
          handleTextEditor.toggleList(
            editor,
            textStyle.type! as "list-ordered" | "list-unordered"
          );
          dispatch({ type: "CHANGE_TEXT_STYLE", payload: "p" });
        }
      }}
    >
      <ToggleGroupItem value="unordered" aria-label="unordered list">
        <List />
      </ToggleGroupItem>
      <ToggleGroupItem value="ordered" aria-label="ordered list">
        <ListOrdered />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ListFormatter;
