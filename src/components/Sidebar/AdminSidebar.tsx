import { Link } from "react-router";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import {
  BackpackIcon,
  BookMarkedIcon,
  GraduationCapIcon,
  PresentationIcon,
  Users,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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

const AdminSidebar = () => {
  const [activeMenuItem, setActiveMenuItem] = useState<number>([0][0]);
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Account Management</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="#" className="flex items-center gap-2 h-fit">
                  <Users style={{ width: "1.5rem", height: "1.5rem" }} />
                  <p>Staff Account</p>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="#">Parent Account</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Academic Action</SidebarGroupLabel>
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

export default AdminSidebar;
