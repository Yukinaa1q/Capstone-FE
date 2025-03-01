import { Input } from "@/components/ui/input";
import { ClassSection } from "@/interfaces/IClassroom";

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
  return (
    <div
      // draggable
      onClick={() => {
        setSectionList((prev) => {
          const index = prev.findIndex(
            (s) => s.sectionId === section.sectionId
          );

          prev[index].isEdit = true;
          return [...prev];
        });
      }}
      className="flex items-center text-sm w-full px-3 h-10 bg-white rounded-md select-none"
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
            onBlur={() => {
              setSectionList((prev) => {
                const index = prev.findIndex(
                  (s) => s.sectionId === section.sectionId
                );
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
    </div>
  );
};

export default SectionCard;
