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
// import { NavLink } from "react-router";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const menuItemList = [
  {
    name: "Courses",
    icon: BookIcon,
    path: "/",
    subMenuList: [
      { name: "Available Courses", path: "/", navSymbol: "ac" },
      {
        name: "Registered Courses",
        path: "/registered-courses",
        navSymbol: "rc",
      },
      { name: "My Courses", path: "/my-courses", navSymbol: "mc" },
    ],
  },
  { name: "Schedule", icon: ClockIcon, path: "/schedule", subMenuList: null },
  { name: "Payment", icon: CardIcon, path: "/payment", subMenuList: null },
  { name: "Chat Message", icon: ChatIcon, path: "/chat", subMenuList: null },
];

const StudentSidebar = () => {
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
                  open={isOpen}
                  className="group/collapsible"
                  key={index}
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

export default StudentSidebar;
