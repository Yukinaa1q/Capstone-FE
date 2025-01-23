// Import React dependencies.
import { LegacyRef, useCallback, useRef, useState } from "react";
// Import the Slate editor factory.
import { createEditor, Descendant, Editor } from "slate";
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";
import { CustomElement, CustomText, CustomEditor } from "./type";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";
import buildElement from "./CustomElement";
import buildLeaf from "./CustomLeaf";
import handleTextEditor from "./handleTextEditor";

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

const TextEditor = () => {
  // Create a Slate editor object that won't change across renders.
  const [editor] = useState<Editor>(() => withReact(createEditor()));
  const [activeMark, setActiveMark] = useState<Omit<CustomText, "text">>({
    bold: false,
    italic: false,
    underline: false,
  });

  const renderElement = useCallback(buildElement, []);
  const renderLeaf = useCallback(buildLeaf, []);

  const setValue = () => {
    let mark: keyof Omit<CustomText, "text">;
    const arrRes = [];
    console.log("activeMark", activeMark);
    for (mark in activeMark) {
      if (activeMark[mark]) {
        arrRes.push(mark);
      }
    }
    console.log(arrRes);
    return arrRes;
  };

  const updateState = () => {
    let mark: keyof Omit<CustomText, "text">;
    const newMarkState: Omit<CustomText, "text"> = {};
    for (mark in activeMark) {
      const isActive = handleTextEditor.isMarked(editor, mark);
      console.log(`${mark}: ${isActive}`);
      newMarkState[mark] = isActive;
    }
    setActiveMark(newMarkState);
  };

  const editorRef = useRef<
    HTMLDivElement | undefined
  >() as LegacyRef<HTMLDivElement>;

  return (
    // Add a toolbar with buttons that call the same methods.
    <Slate editor={editor} initialValue={initialValue}>
      <div className="border border-gray-300/70 shadow-sm p-4 rounded-md space-y-4 has-[:focus-visible]:border-t_primary-400">
        <div>
          <ToggleGroup type="multiple" variant="outline" value={setValue()}>
            <ToggleGroupItem
              value="bold"
              tabIndex={-1}
              onClick={(e) => {
                e.preventDefault();
                handleTextEditor.toggleMark(editor, "bold");
                setActiveMark((prev) => ({ ...prev, bold: !prev.bold }));
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
                setActiveMark((prev) => ({ ...prev, italic: !prev.italic }));
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
                setActiveMark((prev) => ({
                  ...prev,
                  underline: !prev.underline,
                }));
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
        </div>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          ref={editorRef}
          className="bg-gray-100 focus-visible:outline-none rounded-md p-2 min-h-40 space-y-2"
          onKeyUp={(e) => {
            e.preventDefault();
            updateState();
          }}
          onMouseUp={(e) => {
            e.preventDefault();
            updateState();
          }}
        />
      </div>
    </Slate>
  );
};

export default TextEditor;
