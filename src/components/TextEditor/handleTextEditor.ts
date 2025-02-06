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
  isActiveBlock(editor: Editor, type: CustomElement["type"]) {
    const [match] = Editor.nodes(editor, {
      match: node => Element.isElement(node) && (node as CustomElement).type === type,
    });
    return !!match;

  },
  setTextStyle(editor: Editor, type: CustomElement["type"]) {
    // handle case transforming from list to normal heading block
    Transforms.unwrapNodes(editor, {
      match: n => Element.isElement(n) && !Editor.isEditor(n) && (n.type === "list-ordered" || n.type === "list-unordered"),
      split: true,
    })
    Transforms.setNodes(editor, { type });
  },
  toggleList(editor: Editor, listType: CustomElement["type"]) {
    if (this.isActiveBlock(editor, "list-ordered") || this.isActiveBlock(editor, "list-unordered")) {
      Transforms.unwrapNodes(editor, {
        match: (n, path) => Element.isElement(n) && !Editor.isEditor(n) && path.length === 1,
        split: true,
      })
    }
    Transforms.wrapNodes(editor, { type: listType, children: [] }, {
      match: (n) => Element.isElement(n) && !Editor.isEditor(n) && !["list-ordered", "list-unordered"].includes(n.type as string),
    });
    Transforms.setNodes(editor, {type: "list-item", children: []}, {
      match: (_, path) => path.length === 2
    });
  },
}