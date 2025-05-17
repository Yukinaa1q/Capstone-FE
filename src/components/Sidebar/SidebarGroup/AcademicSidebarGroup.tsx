import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import {
  BackpackIcon,
  BookMarkedIcon,
  Calendar,
  ChartNoAxesCombined,
  DoorOpen,
  Gauge,
  GraduationCapIcon,
  PresentationIcon,
} from "lucide-react";
import TC_SidebarMenuItem from "../SidebarMenuItem/SidebarMenuItem";
import { IMenuItem } from "./Interface";

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
  {
    title: "Classrooms",
    icon: <DoorOpen />,
    prefixUrl: "/rooms",
  },
  { title: "Tutors", icon: <GraduationCapIcon />, prefixUrl: "/tutors" },
  { title: "Students", icon: <BackpackIcon />, prefixUrl: "/students" },
  {
    title: "Time Table",
    icon: <Calendar />,
    prefixUrl: "/timetables",
  },
  {
    title: "Scores",
    icon: <Gauge />,
    prefixUrl: "/scores",
  },
  {
    title: "Financial Statistics",
    icon: <ChartNoAxesCombined/>,
    prefixUrl: "/financial-statistics",
  }
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
