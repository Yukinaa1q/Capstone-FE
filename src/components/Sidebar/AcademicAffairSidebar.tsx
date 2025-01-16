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

const currentPath = window.location.pathname.slice(1);

function isActiveNav(checkPath: string): boolean {
  console.log("Check Path: ", checkPath, " Current Path: ", currentPath);
  const path = checkPath.slice(1);
  // handle the case when the current path is the root path
  if (currentPath === "") {
    if (path === "home" || path === "") return true;
  } else {
    if (path !== "" && currentPath.startsWith(path))
      return true; //  the normal case
    else if (
      path === "home" &&
      (currentPath.startsWith("registered-courses") ||
        currentPath.startsWith("my-courses"))
    )
      return true;
  }
  return false;
}

const AcademicAffairSidebar = () => {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {menuItemList.map((menuItem, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild>
                  <a
                    href={menuItem.path}
                    className={cn(
                      "flex items-center gap-2 h-fit",
                      isActiveNav(menuItem.path) &&
                        "active-nav data-[state=open]:hover:bg-t_primary-700 data-[state=open]:hover:text-white hover:bg-t_primary-700 hover:text-white"
                    )}
                  >
                    <menuItem.icon
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                    <p>{menuItem.name}</p>
                  </a>
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
