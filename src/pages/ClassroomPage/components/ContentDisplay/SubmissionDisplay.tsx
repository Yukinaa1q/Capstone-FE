import FilesUpload from "@/components/Input/FilesSubmission ";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/hooks/reduxHook";
import { ISubmissionContent } from "@/interfaces/IClassroom";
import { FileUp } from "lucide-react";
import { Link } from "react-router";

const NewLineText = ({ text }: { text: string }) => {
  return text.split("\n").map((str, index) => {
    return (
      <p key={index} className="text-gray-600">
        {str}
      </p>
    );
  });
};

const SubmissionDisplay = (info: ISubmissionContent) => {
  const user = useAppSelector((state) => state.auths);
  return (
    <div>
      <div className="flex items-center py-4">
        <span className="material-icons mr-2">
          <FileUp />
        </span>
        <p className="">{info.contentName}</p>
      </div>

      <div className="flex gap-2 mb-2">
        <Badge className="bg-t_primary-700 hover:bg-t_primary-700/80 select-none cursor-default">
          Start: {info.from.toLocaleString()}
        </Badge>
        <Badge variant="destructive" className="select-none cursor-default">
          End: {info.to.toLocaleString()}
        </Badge>
      </div>
      <div className="my-4">
        <NewLineText text={info.contentDescription} />
      </div>

      <div className="">
        {user.role === "student" ? (
          <FilesUpload/>
        ) : (
          <Link to="#" className="text-blue-700 underline">
            Click this link to access students' assignment
          </Link>
        )}
      </div>
    </div>
  );
};

export default SubmissionDisplay;
