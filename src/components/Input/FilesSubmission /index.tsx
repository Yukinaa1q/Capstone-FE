import { Button } from "@/components/ui/button";
import { File, UploadCloud, X } from "lucide-react";
import React, { HTMLAttributes, useRef } from "react";

const FilesUpload = (props: HTMLAttributes<HTMLInputElement>) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<File[]>([]);
  return (
    <div className="border rounded-lg p-4">
      <input
        ref={fileRef}
        type="file"
        onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
        className="hidden"
        {...props}
        multiple
      />
      <div
        className="relative w-full h-80 overflow-y-scroll bg-gray-100 rounded-md p-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
        onClick={() => {
          fileRef.current?.click();
        }}
      >
        {!fileRef.current || fileRef.current.files?.length === 0 ? (
          <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400">
            <UploadCloud size={40} />
            <span>Click to upload files</span>
          </div>
        ) : (
          files &&
          Array.from(files).map((file, index) => (
            <div
              key={index}
              className="relative flex items-center gap-2 h-16 bg-t_secondary-500/20 p-2 rounded-md"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 size-4  rounded-full hover:bg-inherit hover:opacity-70"
                onClick={(e) => {
                  e.stopPropagation();
                  setFiles(oldFiles => oldFiles.filter((_, i) => i !== index));
                }}
              >
                <X />
              </Button>
              <File size={40} />
              <p className="text-center w-full truncate">{file.name}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FilesUpload;
