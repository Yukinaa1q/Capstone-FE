import { Input } from "@/components/ui/input";
import { ClassSection } from "@/interfaces/IClassroom";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
const SectionCard = ({
  section,
  setSectionList,
}: {
  section: Omit<ClassSection, "contents"> & { isEdit: boolean };
  setSectionList: React.Dispatch<
    React.SetStateAction<
      (Omit<ClassSection, "contents"> & { isEdit: boolean })[]
    >
  >;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section.sectionId });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      onKeyDown={(e) => {
        if (e.key === "Delete") {
          setSectionList((prev) =>
            prev.filter((s) => s.sectionId !== section.sectionId)
          );
        }
      }}
      onDoubleClick={() => {
        setSectionList((prev) => {
          const index = prev.findIndex(
            (s) => s.sectionId === section.sectionId
          );

          prev[index].isEdit = true;
          return [...prev];
        });
      }}
      className="flex items-center text-sm w-full px-3 h-10 bg-white rounded-md select-none focus:bg-t_primary-100/50 focus:ring-1 focus:ring-t_primary-500"
    >
      {section.isEdit ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            setSectionList((prev) => {
              const index = prev.findIndex(
                (s) => s.sectionId === section.sectionId
              );
              prev[index].section = formData.get("section") as string;
              prev[index].isEdit = false;
              return [...prev];
            });
          }}
          className="flex items-center justify-between w-full gap-4"
        >
          <Input
            defaultValue={section.section}
            autoFocus
            onBlur={(e) => {
              e.preventDefault();
              setSectionList((prev) => {
                const index = prev.findIndex(
                  (s) => s.sectionId === section.sectionId
                );
                prev[index].section = e.target.value;
                prev[index].isEdit = false;
                return [...prev];
              });
            }}
            name="section"
            className="focus-visible:ring-0 border-t-0 border-s-0 border-e-0 h-fit rounded-none border-b shadow-none p-0 focus:border-b-t_primary-500"
          />
        </form>
      ) : (
        <span>{section.section}</span>
      )}
    </button>
  );
};

export default SectionCard;
