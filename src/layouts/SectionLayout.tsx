import { cn } from "@/lib/utils";
import React from "react";

const SectionLayout = ({
  sectionTitle,
  children,
  className
}: {
  sectionTitle: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(className, "my-4")}>
      <h3 className="font-semibold text-lg mb-2">{sectionTitle}</h3>
      {children}
    </div>
  );
};

export default SectionLayout;
