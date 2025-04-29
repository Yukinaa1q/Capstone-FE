import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from "@/components/ui/select";
import { Heading1, Heading2, Heading3, TypeIcon } from "lucide-react";

import React from "react";
import { ReactEditor, useSlate } from "slate-react";
import handleTextEditor from "../handleTextEditor";
import { CustomElement } from "../type";

const HeadingFormatter = () => {
  const editor = useSlate();
  let currentTextStyle: React.ReactNode;
  let value = "p";
  if (handleTextEditor.isActiveBlock(editor, "h1")) {
    value = "h1";
    currentTextStyle = <Heading1 size={16} className="mr-2" />;
  } else if (handleTextEditor.isActiveBlock(editor, "h2")) {
    currentTextStyle = <Heading2 size={16} className="mr-2" />;
    value = "h2";
  } else if (handleTextEditor.isActiveBlock(editor, "h3")) {
    currentTextStyle = <Heading3 size={16} className="mr-2" />;
    value = "h3";
  } else {
    currentTextStyle = <TypeIcon size={16} className="mr-2" />;
    value = "p";
  }

  return (
    <Select
      value={value}
      onValueChange={(value) => {
        handleTextEditor.setTextStyle(editor, value as CustomElement["type"]);
        ReactEditor.focus(editor);
      }}
    >
      <SelectTrigger type="button" className="focus:outline-hidden w-fit">
        {currentTextStyle}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="h1">Heading 1</SelectItem>
        <SelectItem value="h2">Heading 2</SelectItem>
        <SelectItem value="h3">Heading 3</SelectItem>
        <SelectItem value="p">Normal Text</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default HeadingFormatter;
