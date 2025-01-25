import { RenderLeafProps } from "slate-react";

const TextNode = ({ attributes, children, leaf }: RenderLeafProps) => {
  return (
    <span
      {...attributes}
      style={{
        fontWeight: leaf.bold ? "bold" : "normal",
        fontStyle: leaf.italic ? "italic" : "normal",
        textDecoration: leaf.underline ? "underline" : "none",
      }}
    >
      {children}
    </span>
  );
};

export default function buildLeaf(props: RenderLeafProps) {
  return <TextNode {...props} />;
}
