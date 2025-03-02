import { Button } from "@/components/ui/button";
import SectionCard from "./SectionCard";
import { Plus } from "lucide-react";
import { Tooltip } from "@mui/material";
import React from "react";
import { ClassSection } from "@/interfaces/IClassroom";
import DragNDrop from "./DragNDrop";

const SectionControl = ({ classId }: { classId: string }) => {
  // An api call fetch all existing sections of a class
  const [sectionList, setSectionList] = React.useState<
    (Omit<ClassSection, "contents"> & { isEdit: boolean })[]
  >([
    { section: "Section 1", sectionId: "s1", isEdit: false },
    { section: "Section 2", sectionId: "s2", isEdit: false },
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Class Sections</h1>
        <Tooltip title="Add Section" arrow placement="left">
          <Button
            variant="outline"
            size="icon"
            className="size-8 rounded-full"
            onClick={() => {
              setSectionList((prev) => {
                prev.push({
                  section: `Section ${prev.length + 1}`,
                  sectionId: `${prev.length + 1}`,
                  isEdit: true,
                });
                return [...prev];
              });
            }}
          >
            <Plus className="stroke-gray-400" />
          </Button>
        </Tooltip>
      </div>
      <div className="w-full h-80 bg-gray-100 rounded-md overflow-y-auto p-2 space-y-2">
        <DragNDrop items={sectionList} setItems={setSectionList}>
          {sectionList.map((section) => (
            <SectionCard
              key={section.sectionId}
              section={section}
              setSectionList={setSectionList}
            />
          ))}
        </DragNDrop>
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <Button
          variant="outline"
          className="border-amber-500 hover:bg-amber-500 hover:text-white"
        >
          Cancel
        </Button>
        <Button className="bg-green-500 hover:bg-green-600">Save</Button>
      </div>
    </div>
  );
};

export default SectionControl;
