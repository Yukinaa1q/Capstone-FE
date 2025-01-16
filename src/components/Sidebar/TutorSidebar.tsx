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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronLeft } from "lucide-react";

import { BookIcon, ChatIcon, ClockIcon, CardIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";

const menuItemList = [
  {
    name: "Courses",
    icon: BookIcon,
    path: "/home",
    subMenuList: [
      { name: "Available Courses", path: "/" },
      { name: "Registered Courses", path: "/registered-courses" },
      { name: "My Teaching Courses", path: "/my-courses" },
    ],
  },
  { name: "Schedule", icon: ClockIcon, path: "/schedule" },
  { name: "Payment", icon: CardIcon, path: "/payment" },
  { name: "Chat Message", icon: ChatIcon, path: "/chat" },
];

const currentPath = window.location.pathname.slice(1);

function isActiveNav(checkPath: string): boolean {
  console.log("Check Path: ", checkPath, " Current Path: ", currentPath);
  const path = checkPath.slice(1);
  // handle the case when the current path is the root path
  if (currentPath === "") {
    if (path === "home" || path === "") return true;
  } else {
    if (path.startsWith(currentPath)) return true; //  the normal case
    else if (
      path === "home" &&
      (currentPath.startsWith("registered-courses") ||
        currentPath.startsWith("my-courses"))
    )
      return true;
  }
  return false;
}

const TutorSidebar = () => {
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
                            ? "active-nav hover:bg-t_primary-700 active:bg-t_tertiary-700 active:text-white hover:text-white data-[state=open]:hover:bg-t_primary-700 data-[state=open]:hover:text-white data-[active=true]:hover:bg-t_primary-700"
                            : ""
                        }`}
                        onClick={() => {
                          console.log("Clicked");
                        }}
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
                                    ? "active-subnav hover:text-inherit hover:bg-t_primary-100"
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
                  <SidebarMenuButton asChild className={`h-fit`}>
                    <a
                      href={menuItem.path}
                      className={cn(
                        "flex items-center gap-2",
                        isActiveNav(menuItem.path) &&
                          "active-nav data-[state=open]:hover:bg-t_primary-700 data-[state=open]:hover:text-white hover:bg-t_primary-700 hover:text-white"
                      )}
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

export default TutorSidebar;
