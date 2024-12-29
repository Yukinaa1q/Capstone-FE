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
    path: "home",
    subMenuList: [
      { name: "Available Courses", path: "/" },
      { name: "Registered Courses", path: "/registered-courses" },
      { name: "My Courses", path: "/courses/studentid" },
    ],
  },
  { name: "Schedule", icon: ClockIcon, path: "/schedule/studentid" },
  { name: "Payment", icon: CardIcon, path: "/payment/studentid" },
  { name: "Chat Message", icon: ChatIcon, path: "/chat/studentid" },
];

const currentPath = window.location.pathname;

function isActiveNav(checkPath: string): boolean {
  console.log("Check Path: ", checkPath, " Current Path: ", currentPath);
  if ( // Specifially made for Courses nav bar  
    menuItemList[0].subMenuList!.some((subMenuItem) =>
      currentPath.startsWith(subMenuItem.path)
    ) &&
    checkPath === "home"
  ) {
    console.log("Check from first if")
    return true;
  } else if (checkPath === "/" && currentPath === "/") {
    console.log("Check from second if")
    return true;
  }
  else if (checkPath === "/" && currentPath !== "/") {
    console.log("Check from third if")
    return false;
  } else if (currentPath.startsWith(checkPath)) {
    console.log("Check from fourth if")
    return true;
  } 
  console.log("Check from outside if")
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
                            ? "active-nav data-[state=open]:hover:bg-t_primary-700 data-[state=open]:hover:text-white"
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
                              <a
                                href={subMenuItem.path}
                                className={`${
                                  isActiveNav(subMenuItem.path)
                                    ? "active-subnav hover:bg-t_primary-200 hover:text-inherit"
                                    : ""
                                }`}
                              >
                                <p>{subMenuItem.name}</p>
                              </a>
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
                    <a
                      href={menuItem.path}
                      className="flex items-center gap-2"
                    >
                      <img
                        src={menuItem.icon}
                        alt={menuItem.name}
                        className="size-6"
                      />
                      <p>{menuItem.name}</p>
                    </a>
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
