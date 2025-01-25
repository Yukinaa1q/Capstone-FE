
import { createContext } from "react";
import { CustomElement, CustomText } from "./type";

export interface EditorFormat {
  textFormat: Omit<CustomText, "text">;
  textStyle: Partial<CustomElement>;
}

export type EditorAction = {
  type: string;
  payload?: any;
};

const TextEditorCtx = createContext<{
  state: EditorFormat;
  dispatch: React.Dispatch<EditorAction>;
}>({
  state: {
    textFormat: {
      bold: false,
      italic: false,
      underline: false,
    },
    textStyle: {
      type: "p",
    },
  },
  dispatch: () => {},
});

export default TextEditorCtx;