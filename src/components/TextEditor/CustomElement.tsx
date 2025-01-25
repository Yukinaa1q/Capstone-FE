import { RenderElementProps } from "slate-react";

const ParagraphNode = ({ attributes, children }: RenderElementProps) => {
  return <p {...attributes}>{children}</p>;
};

const Heading1Node = ({ attributes, children }: RenderElementProps) => {
  return <h1 {...attributes} className="font-semibold text-2xl" style={{fontWeight: "bolder"}}>{children}</h1>;
}

const Heading2Node = ({ attributes, children }: RenderElementProps) => {
  return <h2 {...attributes} className="font-semibold text-xl mb-3">{children}</h2>;
}

const Heading3Node = ({ attributes, children }: RenderElementProps) => {
  return <h3 {...attributes} className="font-medium text-lg mb-2">{children}</h3>;
}

export default function buildElement(props: RenderElementProps) {
  switch (props.element.type) {
    case "p":
      return <ParagraphNode {...props} />;
    case "h1":
      return <Heading1Node {...props} />;
    case "h2":
      return <Heading2Node {...props} />;
    case "h3":
      return <Heading3Node {...props} />;
    default:
      return <ParagraphNode {...props} />;
  }
}
