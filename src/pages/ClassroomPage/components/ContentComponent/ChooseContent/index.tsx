import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { File, FileType, FileUp, Trash } from "lucide-react";
import React from "react";
import ContentCard from "./ContentCard";
import { Content } from "@/interfaces/IClassroom";
import { Button } from "@/components/ui/button";
import { SectionBrief } from "../ContentControl";
import NewContentCtx from "../NewContentCtx";

const ChooseContentType = ({ sections }: { sections: SectionBrief[] }) => {
  const { contentType, setContentType } = React.useContext(NewContentCtx);
  // 1. An api to get all the contents in a section
  const [fileList, setFileList] = React.useState<
    Omit<Content, "contentDescription" | "content">[] | undefined
  >([
    {
      contentId: "file1",
      contentName: "File 1",
      contentType: "file",
    },
    {
      contentId: "file2",
      contentName: "File 2",
      contentType: "submission",
    },
    {
      contentId: "file3",
      contentName: "File 3",
      contentType: "file",
    },
    {
      contentId: "file4",
      contentName: "File 4",
      contentType: "text",
    },
    {
      contentId: "file5",
      contentName: "File 5",
      contentType: "text",
    },
  ]);

  const handleSelectSection = async (value: string) => {
    // Logic for trigger api 1.
  };

  const handleRemoveContent = async (id: string) => {
    // Logic to remove content from the section
  };

  const contentIcon = {
    file: <File className="stroke-t_primary-500" />,
    text: <FileType className="stroke-t_primary-500" />,
    submission: <FileUp className="stroke-t_primary-500" />,
  };

  return (
    <div className="grow flex justify-between gap-4 mt-4 min-h-0">
      <div className="w-full flex flex-col gap-4 min-h-0">
        <Select onValueChange={handleSelectSection}>
          <SelectTrigger>
            <SelectValue placeholder="Select section" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="s1">Section 1</SelectItem>
            <SelectItem value="s2">Section 2</SelectItem>
            <SelectItem value="s3">Section 3</SelectItem>
            <SelectItem value="s4">Section 4</SelectItem>
            <SelectItem value="s5">Section 5</SelectItem>
            <SelectItem value="s6">Section 6</SelectItem>
            <SelectItem value="s7">Section 7</SelectItem>
            <SelectItem value="s8">Section 8</SelectItem>
          </SelectContent>
        </Select>
        <div className="w-full basis-full rounded-lg bg-gray-100 p-2 grow-0 space-y-2 overflow-scroll min-h-0 h-full">
          {!fileList ? (
            <div>Please Select a Section to view the contents inside it.</div>
          ) : (
            fileList.map((file) => (
              <div className="flex py-2 px-1 rounded-md bg-white text-sm items-center justify-between">
                <div className="flex items-center gap-2">
                  {contentIcon[file.contentType]}
                  <span>{file.contentName}</span>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => handleRemoveContent(file.contentId)}
                >
                  <Trash />
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="bg-gray-100 rounded-lg p-2 min-w-56 flex flex-row flex-wrap gap-2 content-start">
        <ContentCard
          contentType="File"
          icon={<File className="stroke-t_primary-500" />}
          isFocused={contentType === "file"}
          onClick={() => setContentType("file")}
        />
        <ContentCard
          contentType="Text"
          icon={<FileType className="stroke-t_primary-500" />}
          isFocused={contentType === "text"}
          onClick={() => setContentType("text")}
        />
        <ContentCard
          contentType="Submission"
          icon={<FileUp className="stroke-t_primary-500" />}
          isFocused={contentType === "submission"}
          onClick={() => setContentType("submission")}
        />
      </div>
    </div>
  );
};

export default ChooseContentType;
