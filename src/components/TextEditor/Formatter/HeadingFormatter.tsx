import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heading1, Heading2, Heading3, TypeIcon } from "lucide-react";

import { ReactEditor, useSlate } from "slate-react";
import TextEditorCtx from "../EditorContext";
import React, { useContext } from "react";
import handleTextEditor from "../handleTextEditor";
import { CustomElement } from "../type";

const HeadingFormatter = () => {
  const editor = useSlate();
  const [ optionIcon, setOptionIcon ] = React.useState<React.ReactNode>(<TypeIcon size={16} className="mr-2" />);
  // let currentTextStyle: React.ReactNode;
  // switch (textStyle.type) {
  //   case "h1":
  //     currentTextStyle = <Heading1 size={16} className="mr-2" />;
  //     break;
  //   case "h2":
  //     currentTextStyle = <Heading2 size={16} className="mr-2" />;
  //     break;
  //   case "h3":
  //     currentTextStyle = <Heading3 size={16} className="mr-2" />;
  //     break;
  //   default:
  //     currentTextStyle = <TypeIcon size={16} className="mr-2" />;
  // }

  return (
    <Select
      defaultValue="p"
      onValueChange={(value) => {
        
        handleTextEditor.setTextStyle(editor, value as CustomElement["type"]);
        ReactEditor.focus(editor);
        setOptionIcon(() => {
          switch (value) {
            case "h1":
              return <Heading1 size={16} className="mr-2" />;
            case "h2":
              return <Heading2 size={16} className="mr-2" />;
            case "h3":
              return <Heading3 size={16} className="mr-2" />;
            default:
              return <TypeIcon size={16} className="mr-2" />;
          }
        })
      }}
    >
      <SelectTrigger
        type="button"
        className="focus:outline-hidden w-fit"
      >
        {/* {currentTextStyle} */}
        {/* <SelectValue/> */}
        {optionIcon}
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
