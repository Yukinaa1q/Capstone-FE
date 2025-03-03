import { ContentType } from "@/interfaces/IClassroom";
import React from "react";
import FileContent from "./FileContent";
import SubmissionContent from "./SubmissionContent";
import TextContent from "./TextContent";
import NewContentCtx from "../NewContentCtx";

const EditContent = () => {
  const { contentType } = React.useContext(NewContentCtx);
  const contentInput: Record<ContentType, React.ReactNode> = {
    file: <FileContent />,
    text: <TextContent />,
    submission: <SubmissionContent />,
  };
  return (
    <div className="h-full min-h-0">{contentInput[contentType]}</div>
  );
};

export default EditContent;
