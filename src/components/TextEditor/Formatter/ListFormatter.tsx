import { List, ListOrdered } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import handleTextEditor from "../handleTextEditor";
import { ReactEditor, useSlate } from "slate-react";

const ListFormatter = () => {
  const editor = useSlate();
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      value={handleTextEditor.isActiveBlock(editor, "list-ordered") ? "ordered" : handleTextEditor.isActiveBlock(editor, "list-unordered") ? "unordered" : "p"}
      onValueChange={(value) => {
        if (value == "ordered") {
          handleTextEditor.toggleList(editor, "list-ordered");
          ReactEditor.focus(editor);
        } else if (value == "unordered") {
          handleTextEditor.toggleList(editor, "list-unordered");
          ReactEditor.focus(editor);
        } else {

          handleTextEditor.setTextStyle(editor, "p")
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
