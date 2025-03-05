import HTMLConverter from "@/components/TextEditor/HTMLConverter";
import { ITextContent } from "@/interfaces/IClassroom";
import { FileText } from "lucide-react";

const TextDisplay = (info: ITextContent) => {
  return (
    <div>
      <div className="flex items-center py-4">
        <span className="material-icons mr-2">
          <FileText />
        </span>
        <p className="">{info.contentName}</p>
      </div>
      <div>{HTMLConverter({ nodeList: info.contentText })}</div>
    </div>
  );
};

export default TextDisplay;
