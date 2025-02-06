import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

type CustomElement = 
  ParagraphElement | 
  Heading1Element  | 
  Heading2Element  | 
  Heading3Element  |
  OrderedListElement |
  UnorderedListElement | 
  ItemElement;
type CustomText = { text: string; bold?: boolean; italic?: boolean; underline?: boolean; list?: boolean };
type CustomEditor = BaseEditor & ReactEditor;

// List of custom Element Node types
interface ParagraphElement {
  type: "p";
  children: CustomText[];
}

interface Heading1Element {
  type: "h1";
  children: CustomText[];
}

interface Heading2Element {
  type: "h2";
  children: CustomText[];
}

interface Heading3Element {
  type: "h3";
  children: CustomText[];
}

interface ItemElement {
  type: "list-item";
  children: CustomText[];
}

interface OrderedListElement {
  type: "list-ordered";
  children: ItemElement[];
}

interface UnorderedListElement {
  type: "list-unordered";
  children: ItemElement[];
}


export type {CustomElement, CustomText, CustomEditor};