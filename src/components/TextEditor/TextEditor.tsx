import { useCallback, useState } from "react";
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
      state.textStyle.type = action.payload;
      return state;
    default:
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

  const updateState = () => {
    let mark: keyof Omit<CustomText, "text">;
    const newMarkState: Omit<CustomText, "text"> = {};
    for (mark in state.textFormat) {
      const isActive = handleTextEditor.isMarked(editor, mark);
      newMarkState[mark] = isActive;
    }
    dispatch({ type: "UPDATE_TEXT_FORMAT", payload: newMarkState });
  };
  const editableContent = document.querySelector("div[role=textbox]") as HTMLElement;

  return (
    <TextEditorCtx.Provider value={{ state, dispatch }}>
      <Slate editor={editor} initialValue={initialValue}>
        <div id="textEditor" onClickCapture={() => editableContent.focus()} className="border border-gray-300/70 shadow-sm p-4 rounded-md space-y-4 has-[:focus-visible]:border-t_primary-400 w-full h-fit">
          <div className="flex gap-2 items-center h-fit">
            <TextFormatter editor={editor} />
            <Separator orientation="vertical" className="h-5" />
            <HeadingFormatter editor={editor} />
          </div>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            className="bg-gray-100 focus-visible:outline-none rounded-md p-2 min-h-40 space-y-2"
            onKeyUp={() => {
              updateState();
              // Update text style size when user select text
              const currentParagraph = Node.parent(
                editor,
                editor.selection?.anchor.path!
              ) as CustomElement;
              dispatch({
                type: "CHANGE_TEXT_STYLE",
                payload: currentParagraph.type,
              });
            }}
            onMouseUp={() => {
              updateState();
              // Update text style size when user select text
              const currentParagraph = Node.parent(
                editor,
                editor.selection?.anchor.path!
              ) as CustomElement;
              dispatch({
                type: "CHANGE_TEXT_STYLE",
                payload: currentParagraph.type,
              });
              // get the editablecontent editor
              const editorEle = document.querySelector(
                "div[role=textbox]"
              ) as HTMLTextAreaElement;
              console.log(editorEle);
              console.log(editorEle.selectionStart);
            }}
          />
        </div>
      </Slate>
    </TextEditorCtx.Provider>
  );
};

export default TextEditor;
