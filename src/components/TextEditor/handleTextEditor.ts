import { Editor, Element, Transforms } from "slate";
import { CustomText, CustomElement } from "./type";

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
  },
  setTextStyle(editor: Editor, type: CustomElement["type"]) {
    Transforms.setNodes(editor, { type });
  },
  toggleList(editor: Editor, listType: ("list-ordered" | "list-unordered")) {
    const [match] = Editor.nodes(editor, {
      match: node => (node as CustomElement).type === listType,
    });   

    Transforms.setNodes(
      editor, 
      { type: !match ? listType : (match[0] as CustomElement) .type },
      { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
    editor.insertNode({ type: "list-item", children: [{ text: "a list item" }] }, {
      at: editor.selection?.focus!.path
    })
  },
}