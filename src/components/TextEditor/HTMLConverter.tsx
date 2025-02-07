import { cn } from "@/lib/utils";
import escapeHTML from "escape-html";
import { Descendant, Text } from "slate";

const HTMLConverter = ({ nodeList }: { nodeList: Descendant[] }) => {
  return (
    <>
      {nodeList.map((node, index) => {
        // base case the node is TextNode
        if (Text.isText(node)) {
          return (
            <span
              key={index}
              className={cn(
                node.bold && "font-bold",
                node.italic && "italic",
                node.underline && "underline"
              )}
            >
              {escapeHTML(node.text)}
            </span>
          );
        }

        const childEle = <HTMLConverter nodeList={node.children} />;
        switch (node.type) {
          case "h1":
            return (
              <h1 className="text-2xl" key={index}>
                {childEle}
              </h1>
            );
          case "h2":
            return (
              <h2 className="text-xl" key={index}>
                {childEle}
              </h2>
            );
          case "h3":
            return (
              <h3 className="text-lg" key={index}>
                {childEle}
              </h3>
            );
          case "p":
            return <p key={index}>{childEle}</p>;
          case "list-unordered":
            return (
              <ul className="list-disc" key={index}>
                {childEle}
              </ul>
            );
          case "list-ordered":
            return (
              <ol className="list-decimal" key={index}>
                {childEle}
              </ol>
            );
          case "list-item":
            return (
              <li className="ml-8" key={index}>
                {childEle}
              </li>
            );
          default:
            return <p key={index}>{childEle}</p>;
        }
      })}
    </>
  );
};

export default HTMLConverter;
