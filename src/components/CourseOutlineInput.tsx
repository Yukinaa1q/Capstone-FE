import { Button } from "./ui/button";
import { Check, PencilLine, PlusIcon, Trash } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "./ui/input";
import { Updater, useImmer } from "use-immer";

interface CourseOutline {
  sectionTitle: string;
  isEditing: boolean;
  subsections: Subsection[];
}

interface Subsection {
  subsectionTitle: string;
  isEditing: boolean;
}

const CourseOutlineInput = () => {
  const [courseOutline, setCourseOutline] = useImmer<CourseOutline[]>([]);
  return (
    <div>
      <Accordion
        type="multiple"
        className="space-y-2"
        value={Array.from({ length: courseOutline.length }, (_, idx) =>
          String(idx)
        )}
      >
        {courseOutline.map((section, sectionIdx) =>
          section.isEditing ? (
            <SectionInput
              section={section}
              setCourseOutline={setCourseOutline}
              sectionIdx={sectionIdx}
            />
          ) : (
            <SectionDisplay
              section={section}
              setCourseOutline={setCourseOutline}
              sectionIdx={sectionIdx}
            />
          )
        )}
      </Accordion>
      <Tooltip>
        <TooltipTrigger asChild className="mt-4">
          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={() =>
              setCourseOutline((oldOutline) => {
                oldOutline.push({
                  sectionTitle: "",
                  isEditing: true,
                  subsections: [],
                });
              })
            }
          >
            <PlusIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-t_primary-700">
          Add New Section
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

const SectionInput = ({
  section,
  setCourseOutline,
  sectionIdx,
}: {
  section: CourseOutline;
  setCourseOutline: Updater<CourseOutline[]>;
  sectionIdx: number;
}) => {
  return (
    <div className="flex items-center w-full gap-2 my-4">
      <Input
        className="no-underline hover:no-underline w-full"
        placeholder={section.sectionTitle || "Enter Your Course Section"}
        value={section.sectionTitle}
        onChange={(e) => {
          setCourseOutline((oldOutline) => {
            oldOutline[sectionIdx].sectionTitle = e.target.value;
          });
        }}
      />
      <Button
        type="button"
        variant="default"
        size="icon"
        className="bg-green-200 hover:bg-green-300"
        onClick={() => {
          setCourseOutline((oldOutline) => {
            oldOutline[sectionIdx].isEditing = false;
          });
        }}
      >
        <Check color="black" />
      </Button>
    </div>
  );
};

const SectionDisplay = ({
  section,
  setCourseOutline,
  sectionIdx,
}: {
  section: CourseOutline;
  setCourseOutline: Updater<CourseOutline[]>;
  sectionIdx: number;
}) => {
  return (
    <>
      <AccordionItem
        key={sectionIdx}
        value={String(sectionIdx)}
        data-state="open"
        className="border p-2 rounded-md"
      >
        <AccordionTrigger className="no-underline hover:no-underline">
          <div className="flex items-center gap-2 w-full justify-between">
            <p>{section.sectionTitle.toUpperCase()}</p>
            <div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  setCourseOutline((oldOutline) => {
                    e.stopPropagation();
                    oldOutline[sectionIdx].isEditing = true;
                  });
                }}
              >
                <PencilLine />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  setCourseOutline((oldOutline) => {
                    e.stopPropagation();
                    return oldOutline.filter((_, idx) => idx !== sectionIdx);
                  });
                }}
              >
                <Trash />
              </Button>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-2">
          <CourseOutlineSubsection
            section={section}
            setCourseOutline={setCourseOutline}
            sectionIdx={sectionIdx}
          />
        </AccordionContent>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="w-full"
              type="button"
              onClick={() => {
                setCourseOutline((oldOutline) => {
                  oldOutline[sectionIdx].subsections.push({
                    subsectionTitle: "",
                    isEditing: true,
                  });
                });
              }}
            >
              <PlusIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-t_primary-700">
            Add New Sub Section
          </TooltipContent>
        </Tooltip>
      </AccordionItem>
    </>
  );
};

const CourseOutlineSubsection = ({
  section,
  setCourseOutline,
  sectionIdx,
}: {
  section: CourseOutline;
  setCourseOutline: Updater<CourseOutline[]>;
  sectionIdx: number;
}) => {
  return section.subsections.map((subsection, subsectionIdx) =>
    subsection.isEditing ? (
      <div
        className="flex items-center w-full gap-2 my-4 px-1"
        key={subsectionIdx}
      >
        <Input
          className="no-underline hover:no-underline w-full"
          placeholder={
            subsection.subsectionTitle || "Enter Your Course Section"
          }
          value={subsection.subsectionTitle}
          onChange={(e) => {
            setCourseOutline((oldOutline) => {
              oldOutline[sectionIdx].subsections[
                subsectionIdx
              ].subsectionTitle = e.target.value;
            });
          }}
        />
        <Button
          type="button"
          variant="default"
          size="icon"
          className="bg-green-200 hover:bg-green-300"
          onClick={() => {
            setCourseOutline((oldOutline) => {
              oldOutline[sectionIdx].subsections[subsectionIdx].isEditing =
                false;
            });
          }}
        >
          <Check color="black" />
        </Button>
      </div>
    ) : (
      <div className="w-full p-2 border rounded-md flex items-center gap-2">
        <p>{subsection.subsectionTitle}</p>
        <div className="ml-auto">
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={(e) => {
              setCourseOutline((oldOutline) => {
                e.stopPropagation();
                oldOutline[sectionIdx].subsections[subsectionIdx].isEditing =
                  true;
              });
            }}
          >
            <PencilLine />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={(e) => {
              setCourseOutline((oldOutline) => {
                e.stopPropagation();
                oldOutline[sectionIdx].subsections = oldOutline[
                  sectionIdx
                ].subsections.filter((_, idx) => idx !== subsectionIdx);
              });
            }}
          >
            <Trash />
          </Button>
        </div>
      </div>
    )
  );
};

export default CourseOutlineInput;
