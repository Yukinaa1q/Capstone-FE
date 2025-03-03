import { ContentType } from "@/interfaces/IClassroom";
import React from "react";

const NewContentCtx = React.createContext<{
  contentType: ContentType;
  setContentType: React.Dispatch<React.SetStateAction<ContentType>>;
}>({
  contentType: "file",
  setContentType: () => {},
});

export default NewContentCtx;
