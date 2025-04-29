import {
  ContentType,
  IFileContent,
  ISubmissionContent,
  ITextContent,
} from "@/interfaces/IClassroom";
import React from "react";
import FileDisplay from "./FileDisplay";
import SubmissionDisplay from "./SubmissionDisplay";
import TextDisplay from "./TextDisplay";

const ContentFactory: Record<
  ContentType,
  React.FC<IFileContent> | React.FC<ITextContent> | React.FC<ISubmissionContent>
> = {
  file: FileDisplay,
  text: TextDisplay,
  submission: SubmissionDisplay,
};

export default ContentFactory;
