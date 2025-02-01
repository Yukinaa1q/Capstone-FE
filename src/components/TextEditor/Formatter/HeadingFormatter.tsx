import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Heading1, Heading2, Heading3, TypeIcon } from "lucide-react";

import { ReactEditor, useFocused } from "slate-react";
import TextEditorCtx from "../EditorContext";
import React, { useContext } from "react";
import handleTextEditor from "../handleTextEditor";
import { CustomElement } from "../type";

const HeadingFormatter = ({ editor }: { editor: ReactEditor }) => {
  const {
    state: { textStyle },
    dispatch,
  } = useContext(TextEditorCtx);
  let currentTextStyle: React.ReactNode;
  switch (textStyle.type) {
    case "h1":
      currentTextStyle = <Heading1 size={16} className="mr-2" />;
      break;
    case "h2":
      currentTextStyle = <Heading2 size={16} className="mr-2" />;
      break;
    case "h3":
      currentTextStyle = <Heading3 size={16} className="mr-2" />;
      break;
    default:
      currentTextStyle = <TypeIcon size={16} className="mr-2" />;
  }

  // const useFocused();
  const editableContent = document.querySelector(
    "div[role=textbox]"
  ) as HTMLElement;
  return (
    <Select
      value={textStyle.type}
      onValueChange={(value) => {
        handleTextEditor.setTextStyle(editor, value as CustomElement["type"]);
        dispatch({ type: "CHANGE_TEXT_STYLE", payload: value });
      }}
    >
      <SelectTrigger
        className="focus:outline-hidden w-fit"
      >
        {currentTextStyle}
      </SelectTrigger>
      <SelectContent >
        <SelectItem value="h1">Heading 1</SelectItem>
        <SelectItem value="h2">Heading 2</SelectItem>
        <SelectItem value="h3">Heading 3</SelectItem>
        <SelectItem value="p">Normal Text</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default HeadingFormatter;
