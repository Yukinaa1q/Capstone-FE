import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ClassSection, ContentType } from "@/interfaces/IClassroom";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import ChooseContentType from "./ChooseContent";
import EditContent from "./EditContent";
import NewContentCtx from "./NewContentCtx";

export type SectionBrief = Omit<ClassSection, "contents">;

const ContentControl = () => {
  // const classId = useParams().id; // used to call api
  // 1. API to get all sections available in the class
  const [sectionsBrief] = React.useState<SectionBrief[]>([]);
  const [step, setStep] = React.useState(1);
  const [contentType, setContentType] = React.useState<ContentType>("file");
  return (
    <NewContentCtx.Provider value={{ contentType, setContentType }}>
      <div className="h-full flex flex-col min-h-0">
        <h1 className="text-xl font-semibold">Class Content</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className={cn(step === 1 && "text-gray-950")}>
                Choose Content
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className={cn(step === 2 && "text-gray-950")}>
                Edit Content
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {step === 1 && (
          <>
            <ChooseContentType sections={sectionsBrief} />
            <div className="flex justify-end gap-4 mt-4">
              <Button
                variant="outline"
                className="border-amber-500 hover:bg-amber-500 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                className="bg-t_primary-500 hover:bg-t_primary-500/80"
                onClick={() => setStep(2)}
              >
                Next <ChevronRight />
              </Button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <EditContent />
            <div className="flex justify-end gap-4 mt-4">
              <Button
                variant="outline"
                className="border-t_primary-500 hover:bg-t_primary-500 hover:text-white"
                onClick={() => setStep(1)}
              >
                <ChevronLeft />
                Back
              </Button>
              <Button className="bg-green-600 hover:bg-green-500/80" form="contentSubmit">
                Create
              </Button>
            </div>
          </>
        )}
      </div>
    </NewContentCtx.Provider>
  );
};

export default ContentControl;
