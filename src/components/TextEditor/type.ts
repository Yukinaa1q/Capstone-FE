import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

type CustomElement = 
  ParagraphElement | 
  Heading1Element  | 
  Heading2Element  | 
  Heading3Element  | 
  Heading4Element;
type CustomText = { text: string; bold?: boolean; italic?: boolean; underline?: boolean; };
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

interface Heading4Element {
  type: "h4";
  children: CustomText[];
}


export type {CustomElement, CustomText, CustomEditor};