import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { BookIcon, ChatIcon, ClockIcon, CardIcon } from "@/assets/icons";
import { NavLink } from "react-router";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronLeft } from "lucide-react";

const menuItemList = [
  {
    name: "Courses",
    icon: BookIcon,
    path: "/",
    subMenuList: [
      { name: "Available Courses", path: "/" },
      { name: "Registered Courses", path: "/register-courses/studentid" },
      { name: "My Courses", path: "/courses/studentid" },
    ],
  },
  { name: "Schedule", icon: ClockIcon, path: "/schedule/studentid" },
  { name: "Payment", icon: CardIcon, path: "/payment/studentid" },
  { name: "Chat Message", icon: ChatIcon, path: "/chat/studentid" },
];

console.log(window.location.pathname);
const currentPath = window.location.pathname;

function isActiveNav(checkPath: string): boolean {
  if (checkPath === "/" && currentPath === "/") {
    return true;
  } else if (
    menuItemList[0].subMenuList!.some((subMenuItem) =>
      currentPath.startsWith(subMenuItem.path)
    ) &&
    checkPath === "/"
  ) {
  } else if (checkPath !== "/" && currentPath === "/") {
    return false;
  } else if (currentPath.startsWith(checkPath)) {
    return true;
  }
  return false;
}

const StudentSidebar = () => {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {menuItemList.map((menuItem, index) =>
              menuItem.subMenuList ? (
                <Collapsible
                  defaultOpen
                  className="group/collapsible"
                  key={index}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        className={`h-fit ${
                          isActiveNav(menuItem.path)
                            ? "active-nav data-[state=open]:hover:bg-t_primary-700 data-[state=open]:hover:text-white hover:bg-t_primary-70 hover:text-white"
                            : ""
                        }`}
                      >
                        <img
                          src={menuItem.icon}
                          alt={menuItem.name}
                          className="size-6"
                        />
                        <p>{menuItem.name}</p>
                        <ChevronLeft className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:-rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="peer">
                      <SidebarMenuSub>
                        {menuItem.subMenuList.map((subMenuItem, index) => (
                          <SidebarMenuSubItem key={index}>
                            <SidebarMenuSubButton asChild>
                              <NavLink
                                to={subMenuItem.path}
                                className={`${
                                  isActiveNav(subMenuItem.path)
                                    ? "active-subnav hover:text-inherit hover:bg-t_primary-100"
                                    : ""
                                }`}
                              >
                                <p>{subMenuItem.name}</p>
                              </NavLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    className={`h-fit ${
                      isActiveNav(menuItem.path)
                        ? "active-nav data-[state=open]:hover:bg-t_primary-700 data-[state=open]:hover:text-white"
                        : ""
                    }`}
                  >
                    <NavLink
                      to={menuItem.path}
                      className="flex items-center gap-2"
                    >
                      <img
                        src={menuItem.icon}
                        alt={menuItem.name}
                        className="size-6"
                      />
                      <p>{menuItem.name}</p>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default StudentSidebar;
