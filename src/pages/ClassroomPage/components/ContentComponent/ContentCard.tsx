import { cn } from "@/lib/utils";
import React from "react";

const ContentCard = ({contentType, icon}: {contentType: string, icon: React.ReactNode}) => {
  let contentAfter: string = "after:content-['File']";
  if (contentType === "File") contentAfter = "after:content-['FILE']";
  else if (contentType === "Text") contentAfter = "after:content-['TEXT']";
  else if (contentType === "Submission") contentAfter = "after:content-['ASSIGN']";
  return (
    <button
      className={cn(
        "relative size-16 bg-white rounded-md flex items-center justify-center shadow-md",
        "after:justify-center after:items-center after:inline-flex",
        "after:font-semibold after:text-sm after:text-white after:break-words",
        "after:absolute after:w-full after:h-0  after:overflow-hidden after:bottom-0 after:rounded-md",
        "after:backdrop-blur-sm after:bg-linear-to-t after:from-t_primary-500/50", 
        contentAfter,
        "hover:after:transition-[height] hover:after:delay-1000 hover:after:h-full hover:after:duration-200",
        "after:transition-[height] after:duration-200",
        "focus:ring-1 focus:ring-t_secondary-400 focus:bg-t_secondary-500/10"
      )}
    >
      {icon}
    </button>
  );
};

export default ContentCard;
