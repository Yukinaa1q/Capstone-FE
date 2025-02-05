import { useCallback, useRef, useState } from "react";
import { createEditor, Descendant, Editor, Node } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { ImmerReducer, useImmerReducer } from "use-immer";
import { CustomElement, CustomText, CustomEditor } from "./type";
import { Separator } from "../ui/separator";
import buildElement from "./CustomElement";
import buildLeaf from "./CustomLeaf";
import handleTextEditor from "./handleTextEditor";
import TextFormatter from "./Formatter/TextFormatter";
import HeadingFormatter from "./Formatter/HeadingFormatter";
import TextEditorCtx, { EditorAction, EditorFormat } from "./EditorContext";
import ListFormatter from "./Formatter/ListFormatter";
import { Textarea } from "../ui/textarea";

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

const reducer: ImmerReducer<EditorFormat, EditorAction> = (state, action) => {
  switch (action.type) {
    case "TOGGLE_BOLD":
      state.textFormat.bold = !state.textFormat.bold;
      return state;
    case "TOGGLE_ITALIC":
      state.textFormat.italic = !state.textFormat.italic;
      return state;
    case "TOGGLE_UNDERLINE":
      state.textFormat.underline = !state.textFormat.underline;
      return state;
    case "UPDATE_TEXT_FORMAT":
      state.textFormat = action.payload;
      return state;
    case "CHANGE_TEXT_STYLE":
      console.log("Trigger CHANGE_TEXT_STYLE");
      console.log("Action payload: ", action.payload);
      state.textStyle.type = action.payload;
      return state;
    default:
      console.log("Default case");
      return state;
  }
};

const TextEditor = () => {
  // Create a Slate editor object that won't change across renders.
  const [editor] = useState<Editor>(() => withReact(createEditor()));
  const [state, dispatch] = useImmerReducer<EditorFormat, EditorAction>(
    reducer,
    {
      textFormat: {
        bold: false,
        italic: false,
        underline: false,
      },
      textStyle: {
        type: "p",
      },
    }
  );

  const renderElement = useCallback(buildElement, []);
  const renderLeaf = useCallback(buildLeaf, []);

  const updateTextFormatState = () => {
    console.log("updateTextFormatState() run");
    let mark: keyof Omit<CustomText, "text">;
    const newMarkState: Omit<CustomText, "text"> = {};
    for (mark in state.textFormat) {
      const isActive = handleTextEditor.isMarked(editor, mark);
      newMarkState[mark] = isActive;
    }
    dispatch({ type: "UPDATE_TEXT_FORMAT", payload: newMarkState });
  };

  return (
    <TextEditorCtx.Provider value={{ state, dispatch }}>
      <Slate editor={editor} initialValue={initialValue} onSelectionChange={() => {console.log("selection change")}}>
        <div
          id="textEditor"
          className="border border-gray-300/70 shadow-xs p-4 rounded-md space-y-4 has-focus-visible:border-t_primary-400 w-full h-fit"
        >
          <FormatToolbar/>
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
    </TextEditorCtx.Provider>
  );
};

const FormatToolbar = () => {
  return (
    <div
      className="flex gap-2 items-center h-fit"
    >
      <TextFormatter />
      <Separator orientation="vertical" className="h-5" />
      {/* <ListFormatter editor={editor} /> */}
      <HeadingFormatter />
    </div>
  );
};

export default TextEditor;
