import { useCallback, useState } from "react";
import { createEditor, Descendant, Editor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { CustomElement, CustomText, CustomEditor } from "./type";
import { Separator } from "../ui/separator";
import buildElement from "./CustomElement";
import buildLeaf from "./CustomLeaf";
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
    children: [{ text: "" }],
  },
];

const TextEditor = ({
  initValue = initialValue,
  onTextEditorChange,
}: {
  initValue: Descendant[];
  onTextEditorChange: (tree: Descendant[]) => void;
}) => {
  // Create a Slate editor object that won't change across renders.
  const [editor] = useState<Editor>(() => withReact(createEditor()));

  const renderElement = useCallback(buildElement, []);
  const renderLeaf = useCallback(buildLeaf, []);

  return (
    <Slate
      editor={editor}
      initialValue={initValue}
      onChange={(tree) => onTextEditorChange(tree)}
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
