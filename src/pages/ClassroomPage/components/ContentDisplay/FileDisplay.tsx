import { IFileContent } from "@/interfaces/IClassroom";
import { File } from "lucide-react";

const FileDisplay = (info: IFileContent) => {
  const urlObj = URL.createObjectURL(info.file);
  return (
    <div>
      <div className="flex items-center py-4">
        <span className="material-icons mr-2">
          <File />
        </span>
        <a href={urlObj} className="underline text-blue-600">
          {info.contentName}
        </a>
      </div>
      <div>{info.contentDescription}</div>
    </div>
  );
};

export default FileDisplay;
