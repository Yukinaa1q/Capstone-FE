import { RenderElementProps } from "slate-react";

const ParagraphNode = ({ attributes, children }: RenderElementProps) => {
  return <p {...attributes} className="text-sm">{children}</p>;
};

const Heading1Node = ({ attributes, children }: RenderElementProps) => {
  return <h1 {...attributes} className="font-semibold text-xl" style={{fontWeight: "bolder"}}>{children}</h1>;
}

const Heading2Node = ({ attributes, children }: RenderElementProps) => {
  return <h2 {...attributes} className="font-semibold text-lg">{children}</h2>;
}

const Heading3Node = ({ attributes, children }: RenderElementProps) => {
  return <h3 {...attributes} className="font-medium text-base">{children}</h3>;
}

const UnorderedListNode = ({ attributes, children }: RenderElementProps) => {
  return <ul {...attributes} className="list-disc">{children}</ul>;
}

const OrderedListNode = ({ attributes, children }: RenderElementProps) => {
  return <ol {...attributes} className="list-decimal">{children}</ol>;
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
    case "list-unordered":
      return <UnorderedListNode {...props} />;
    case "list-ordered":
      return <OrderedListNode {...props} />;
    case "list-item":
      return <li {...props.attributes} className="ml-10">{props.children}</li>;
    default:
      return <ParagraphNode {...props} />;
  }
}
