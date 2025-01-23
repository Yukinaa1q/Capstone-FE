import { Editor } from "slate";
import { CustomText } from "./type";

export default  {
  isMarked(editor: Editor, mark: keyof Omit<CustomText, "text">) {
    const marks = Editor.marks(editor);
    return marks ? marks[mark] === true : false;
  },
  toggleMark(editor: Editor, mark: keyof Omit<CustomText, "text">) {
    const isActive = this.isMarked(editor, mark);
    if (isActive) {
      Editor.removeMark(editor, mark);
    } else {
      Editor.addMark(editor, mark, true);
    }
  }
}