import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import { Link } from "react-router";

export interface ISubSection {
  subsection: string;
  contentId: string;
}

export interface ICollapsibleSection {
  section: string;
  subsections: ISubSection[];
}

const CollapsibleSidebarMenuItem = ({
  section,
  subsections,
}: ICollapsibleSection) => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <Collapsible
      defaultOpen
      className="group/collapsible"
      onOpenChange={(open) => setIsOpen(open)}
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="flex justify-between bg-t_primary-700 text-white hover:bg-t_primary-700 hover:text-white data-[state=open]:hover:bg-t_primary-700 data-[state=open]:hover:text-white data-[state=closed]:focus:bg-t_primary-700 data-[state=closed]:focus:text-white font-semibold">
            {section}
            <motion.span animate={{ rotate: isOpen ? 0 : -90 }}>
              <ChevronDown size={20} />
            </motion.span>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {subsections.map((subsection) => (
              <SidebarMenuSubItem key={subsection.contentId}>
                <SidebarMenuSubButton asChild>
                  <Link to={`#${subsection.contentId}`}>{subsection.subsection}</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
            <SidebarMenuSubItem />
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

export default CollapsibleSidebarMenuItem;
