import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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

// For demo only
import { Switch } from "@/components/ui/switch"
import { Label } from "@radix-ui/react-label";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { togglePhase } from "@/store/phaseSlice";
import { Link } from "react-router";
import { changeNav } from "@/store/sidebarSlice";


const menuItemList = [
  {
    name: "Courses",
    icon: BookIcon,
    path: "home",
    subMenuList: [
      { name: "Available Courses", path: "/", navSymbol: "ac" },
      { name: "Registered Courses", path: "/registered-courses", navSymbol: "rc" },
      { name: "My Courses", path: "/my-courses", navSymbol: "mc" },
    ],
  },
  { name: "Schedule", icon: ClockIcon, path: "/schedule/studentid" },
  { name: "Payment", icon: CardIcon, path: "/payment/studentid" },
  { name: "Chat Message", icon: ChatIcon, path: "/chat/studentid" },
];

const currentPath = window.location.pathname;

function isActiveNav(checkPath: string): boolean {
  if (
    // Specifially made for Courses nav bar
    menuItemList[0].subMenuList!.some((subMenuItem) =>
      currentPath.startsWith(subMenuItem.path)
    ) &&
    checkPath === "home"
  ) {
    return true;
  } else if (checkPath === "/" && currentPath === "/") {
    return true;
  } else if (checkPath === "/" && currentPath !== "/") {
    return false;
  } else if (currentPath.startsWith(checkPath)) {
    return true;
  }
  return false;
}

const StudentSidebar = () => {
  // For demo only
  const dispatch = useAppDispatch();
  const nav = useAppSelector(state => state.sidebars.activeNav);
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
                              <Link
                                to={subMenuItem.path}
                                onClick={() => dispatch(changeNav(subMenuItem.navSymbol))}
                                className={`${
                                  subMenuItem.navSymbol == nav //isActiveNav(subMenuItem.path)
                                    ? "active-subnav hover:text-inherit hover:bg-t_primary-100"
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
                      isActiveNav(menuItem.path)
                        ? "active-nav data-[state=open]:hover:bg-t_primary-700 data-[state=open]:hover:text-white"
                        : ""
                    }`}
                  >
                    <a href={menuItem.path} className="flex items-center gap-2">
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
      <SidebarGroup>
        <SidebarGroupLabel>Demo Control Panel</SidebarGroupLabel>
        <SidebarGroupContent>
          <Label>Switch Phase</Label><br/>
          Phase 1
          <Switch onCheckedChange={() => {dispatch(togglePhase())}}/>
          Phase 2
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default StudentSidebar;
