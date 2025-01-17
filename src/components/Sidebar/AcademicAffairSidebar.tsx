import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  BackpackIcon,
  BookMarkedIcon,
  GraduationCapIcon,
  PresentationIcon,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const menuItemList = [
  {
    name: "Courses",
    icon: BookMarkedIcon,
    path: "/courses",
  },
  {
    name: "Classes",
    icon: PresentationIcon,
    path: "/classes",
  },
  { name: "Tutor", icon: GraduationCapIcon, path: "/tutors" },
  { name: "Student", icon: BackpackIcon, path: "/students" },
];

const AcademicAffairSidebar = () => {
  const [activeMenuItem, setActiveMenuItem] = useState<number>(NaN);
  console.log("Rerender AcademicAffairSidebar");
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {menuItemList.map((menuItem, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild>
                  <Link
                    to={menuItem.path}
                    onClick={() => setActiveMenuItem(index)}
                    className={cn(
                      "flex items-center gap-2 h-fit",
                      activeMenuItem == index &&
                        "active-nav active:bg-t_primary-700 active:text-white data-[state=open]:hover:bg-t_primary-700 data-[state=open]:hover:text-white hover:bg-t_primary-700 hover:text-white"
                    )}
                  >
                    <menuItem.icon
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                    <p>{menuItem.name}</p>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default AcademicAffairSidebar;
