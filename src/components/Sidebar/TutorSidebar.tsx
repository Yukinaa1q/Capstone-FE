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

import { BookIcon, ChatIcon, ClockIcon } from "@/assets/icons";
import { useState } from "react";
import { Link } from "react-router";

const menuItemList = [
  {
    name: "Courses",
    icon: BookIcon,
    path: "/",
    subMenuList: [
      { name: "Available Courses", path: "/" },
      { name: "Registered Courses", path: "/registered-courses" },
      { name: "My Teaching Courses", path: "/my-courses" },
    ],
  },
  { name: "Schedule", icon: ClockIcon, path: "/schedule" },
  { name: "Chat Message", icon: ChatIcon, path: "/chat" },
];


const TutorSidebar = () => {
  const [activeMenuItem, setActiveMenuItem] = useState<number[]>([0, 0]);
  const [isOpen, setIsOpen] = useState<boolean>(true);

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
                  open={isOpen}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        asChild
                        className={`h-fit ${
                          activeMenuItem[0] === index
                            ? "active-nav data-[state=open]:hover:bg-t_primary-700 data-[state=open]:hover:text-white hover:bg-t_primary-70 hover:text-white"
                            : ""
                        }`}
                      >
                        <Link
                          to={menuItem.path}
                          onClick={() => {
                            setIsOpen(true);
                            setActiveMenuItem([index, 0]);
                          }}
                          className="flex items-center gap-2"
                        >
                          <img
                            src={menuItem.icon}
                            alt={menuItem.name}
                            className="size-6"
                          />
                          <p>{menuItem.name}</p>
                          <ChevronLeft className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:-rotate-90" />
                        </Link>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="peer">
                      <SidebarMenuSub>
                        {menuItem.subMenuList.map((subMenuItem, idx) => (
                          <SidebarMenuSubItem key={idx}>
                            <SidebarMenuSubButton asChild>
                              <Link
                                onClick={() => setActiveMenuItem([index, idx])}
                                to={subMenuItem.path}
                                className={`${
                                  activeMenuItem[1] === idx
                                    ? "active-subnav data-[state=open]:hover:bg-t_primary-700 data-[state=open]:hover:text-white hover:text-inherit hover:bg-t_primary-100"
                                    : ""
                                }`}
                              >
                                <p>{subMenuItem.name}</p>
                              </Link>
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
                      activeMenuItem[0] === index
                        ? "active-nav data-[state=open]:hover:bg-t_primary-700 data-[state=open]:hover:text-white hover:text-white hover:bg-t_primary-700"
                        : ""
                    }`}
                  >
                    <Link
                      to={menuItem.path}
                      onClick={() => {
                        setIsOpen(false);
                        setActiveMenuItem([index, 0]);
                      }}
                      className="flex items-center gap-2"
                    >
                      <img
                        src={menuItem.icon}
                        alt={menuItem.name}
                        className="size-6"
                      />
                      <p>{menuItem.name}</p>
                    </Link>
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
