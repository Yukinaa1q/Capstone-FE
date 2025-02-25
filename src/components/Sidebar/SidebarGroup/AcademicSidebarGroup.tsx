import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { IMenuItem, SidebarGroupProps } from "./Interface";
import TC_SidebarMenuItem from "../SidebarMenuItem/SidebarMenuItem";
import {
  BackpackIcon,
  BookMarkedIcon,
  GraduationCapIcon,
  PresentationIcon,
} from "lucide-react";

const itemList: IMenuItem[] = [
  {
    title: "Courses",
    icon: <BookMarkedIcon />,
    prefixUrl: "/courses",
  },
  {
    title: "Classes",
    icon: <PresentationIcon />,
    prefixUrl: "/classes",
  },
  { title: "Tutor", icon: <GraduationCapIcon />, prefixUrl: "/tutors" },
  { title: "Student", icon: <BackpackIcon />, prefixUrl: "/students" },
];

const AcademicSidebarGroup = ({ label }: { label?: string }) => {
  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        {itemList.map((item) => (
          <TC_SidebarMenuItem
            key={item.prefixUrl}
            prefixUrl={item.prefixUrl}
            icon={item.icon}
            title={item.title}
          />
        ))}
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default AcademicSidebarGroup;
