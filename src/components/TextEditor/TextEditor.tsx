import { useCallback, useState } from "react";
import { createEditor, Descendant, Editor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { CustomElement, CustomText, CustomEditor } from "./type";
import { Separator } from "../ui/separator";
import buildElement from "./CustomElement";
import buildLeaf from "./CustomLeaf";
import handleTextEditor from "./handleTextEditor";
import TextFormatter from "./Formatter/TextFormatter";
import HeadingFormatter from "./Formatter/HeadingFormatter";
import ListFormatter from "./Formatter/ListFormatter";

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const initialValue: Descendant[] = [
  {
    type: "p",
    children: [
      { text: "paragraph 1" },      
    ],
  },
  {
    type: "p",
    children: [
      { text: "paragraph 2" },      
    ],
  },
  {
    type: "p",
    children: [
      { text: "paragraph 2" },      
    ],
  },
];

// {
//   type: "list-ordered",
//   children: [
//     { type: "list-item", children: [ { text: "list 1" }] },
//     { type: "list-item", children: [ { text: "list 2" }] },
//     { type: "list-item", children: [ { text: "list 3" }] },
//     { type: "list-item", children: [ { text: "list 4" }] },
//   ],
// },

const TextEditor = () => {
  // Create a Slate editor object that won't change across renders.
  const [editor] = useState<Editor>(() => withReact(createEditor()));

  const renderElement = useCallback(buildElement, []);
  const renderLeaf = useCallback(buildLeaf, []);

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onSelectionChange={() => {
        console.log("selection change");
      }}
    >
      <div
        id="textEditor"
        className="border border-gray-300/70 shadow-xs p-4 rounded-md space-y-4 has-focus-visible:border-t_primary-400 w-full h-fit"
      >
        <FormatToolbar />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          className="bg-gray-100/40 focus-visible:outline-hidden rounded-md p-2 min-h-40 space-y-2"
          // onMouseUp={() => {
          //   console.log("On mouse up");
          //   updateTextFormatState();
          // }}
        />
      </div>
    </Slate>
  );
};

const FormatToolbar = () => {
  return (
    <div className="flex gap-2 items-center h-fit">
      <TextFormatter />
      <Separator orientation="vertical" className="h-5" />
      <ListFormatter />
      <HeadingFormatter />
    </div>
  );
};

export default TextEditor;
