import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import ChooseContentType from "./ChooseContentType";

const ContentControl = () => {
  const [step, setStep] = React.useState(1);
  return (
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
          <ChooseContentType />
          <div className="flex justify-end gap-4 mt-4">
            <Button
              variant="outline"
              className="border-amber-500 hover:bg-amber-500 hover:text-white"
            >
              Cancel
            </Button>
            <Button className="bg-t_primary-500 hover:bg-t_primary-500/80">
              Next <ChevronRight />
            </Button>
          </div>
        </>
      )}
      {/* {step === 2 && <EditContent />} */}
    </div>
  );
};

export default ContentControl;
