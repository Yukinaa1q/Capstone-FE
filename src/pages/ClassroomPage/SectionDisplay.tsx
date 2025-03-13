import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { ISubmissionContent } from "@/interfaces/IClassroom";
import { FileTextIcon, FileUp } from "lucide-react";
import ContentFactory from "./components/ContentDisplay";

const SectionDisplay = () => {
  // An api to fetch all available sections and its contents.
  const props: ISubmissionContent = {
    contentId: "c1",
    contentName: "BTL1 Assignment",
    contentDescription: "Nop Nhanh se co diem \n khong thi cung khong sao",
    contentType: "submission",
    from: new Date(),
    to: new Date(),
  };
  const ContentDisplay = ContentFactory[props.contentType] as React.FC<
    typeof props
  >;
  return (
    <div className="w-full">
      <Accordion
        type="multiple"
        className="w-full space-y-2"
        defaultValue={["section-1", "section-2"]}
      >
        <AccordionItem
          value="section-1"
          className="p-4 border rounded-lg shadow-sm bg-white"
        >
          <AccordionTrigger className="text-lg p-0">Section 1</AccordionTrigger>
          <AccordionContent className="p-0">
            <div className="flex items-center py-4">
              <span className="material-icons mr-2">
                <FileTextIcon />
              </span>
              <a href="#" className="underline text-blue-600">
                file1.ppt
              </a>
            </div>
            <Separator />
            <div className="flex items-center py-4">
              <span className="material-icons mr-2">
                <FileTextIcon />
              </span>
              <a href="#" className="underline text-blue-600">
                file2.ppt
              </a>
            </div>
            <Separator />
            <ContentDisplay {...props} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="section-2"
          className="p-4 border rounded-lg shadow-sm bg-white"
        >
          <AccordionTrigger className="text-lg p-0">Section 1</AccordionTrigger>
          <AccordionContent className="p-0">
            <div className="flex items-center py-4">
              <span className="material-icons mr-2">
                <FileTextIcon />
              </span>
              <a href="#" className="underline text-blue-600">
                file1.ppt
              </a>
            </div>
            <Separator />
            <div className="flex items-center py-4">
              <span className="material-icons mr-2">
                <FileTextIcon />
              </span>
              <a href="#" className="underline text-blue-600">
                file2.ppt
              </a>
            </div>
            <Separator />
            <div className="py-4">
              <div className="flex">
                <span className="material-icons mr-2">
                  <FileUp />
                </span>
                <a href="#" className="underline text-blue-600">
                  Section 1 Submission
                </a>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Deadline: 15:00 21/3/2024 - 23:59 27/3/2024
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SectionDisplay;
