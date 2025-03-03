import ContentLayout from "@/layouts/ContentLayout";
import { DoorOpen, FileTextIcon, FileUp, GraduationCap } from "lucide-react";
import { useParams } from "react-router";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import EditClass from "./components/EditClass";

const ClassroomPage = () => {
  const params = useParams();

  return (
    <>
      <div className="bg-t_primary-700 text-white p-6 shadow-md relative">
        <h2 className="text-2xl font-bold">Vật Lý 12</h2>
        <p className="mb-4 font-semibold">PHYS001 | CC01</p>

        <div className="flex items-center mb-2">
          <span className="material-icons text-white mr-2">
            <GraduationCap />
          </span>
          <p>Đỗ Kim Sang</p>
        </div>

        <div className="flex items-center">
          <span className="material-icons text-white mr-2">
            <DoorOpen />
          </span>
          <p>B402</p>
        </div>

        <EditClass/>
      </div>
      <ContentLayout>
        <Accordion type="multiple"  className="w-full space-y-2" defaultValue={["section-1", "section-2"]}>
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
      </ContentLayout>
    </>
  );
};

export default ClassroomPage;
