import { createContext, useCallback, useState } from "react";
import { createEditor, Descendant, Editor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { ImmerReducer, useImmerReducer } from "use-immer";
import { CustomElement, CustomText, CustomEditor } from "./type";

import buildElement from "./CustomElement";
import buildLeaf from "./CustomLeaf";
import handleTextEditor from "./handleTextEditor";
import TextFormatter from "./Formatter/TextFormatter";

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

interface EditorFormat {
  textFormat: Omit<CustomText, "text">;
}

type EditorAction = {
  type: string;
  payload?: any;
};

export const TextEditorCtx = createContext<{
  state: EditorFormat;
  dispatch: React.Dispatch<EditorAction>;
}>({
  state: {
    textFormat: {
      bold: false,
      italic: false,
      underline: false,
    },
  },
  dispatch: () => {},
});







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
      return state
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
    }
  );

  const renderElement = useCallback(buildElement, []);
  const renderLeaf = useCallback(buildLeaf, []);

  const updateState = () => {
    let mark: keyof Omit<CustomText, "text">;
    const newMarkState: Omit<CustomText, "text"> = {};
    for (mark in state.textFormat) {
      const isActive = handleTextEditor.isMarked(editor, mark);
      console.log(`${mark}: ${isActive}`);
      newMarkState[mark] = isActive;
    }
    dispatch({ type: "UPDATE_TEXT_FORMAT", payload: newMarkState });
  };

  return (
    <TextEditorCtx.Provider value={{ state, dispatch }}>
      <Slate editor={editor} initialValue={initialValue}>
        <div className="border border-gray-300/70 shadow-sm p-4 rounded-md space-y-4 has-[:focus-visible]:border-t_primary-400">
          <div>
            <TextFormatter editor={editor} />
            
          </div>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
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
    </TextEditorCtx.Provider>
  );
};

export default TextEditor;
