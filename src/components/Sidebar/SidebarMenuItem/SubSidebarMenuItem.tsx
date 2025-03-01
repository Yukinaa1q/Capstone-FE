import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";
import { IMenuItem } from "../SidebarGroup/Interface";
import { matchUrl } from "@/utils/utils";

interface CollapsibleSidebarMenuItemProps {
  prefixUrl: string;
  icon: React.ReactNode;
  title: string;
  subMenuList: Omit<IMenuItem, "icon">[];
}

const CollapsibleSidebarMenuItem = ({
  prefixUrl,
  icon,
  title,
  subMenuList,
}: CollapsibleSidebarMenuItemProps) => {
  const location = useLocation();
  // let matchNav: boolean = matchUrl(prefixUrl, location.pathname);
  const activeMenu = subMenuList.some((subMenuItem) =>
    matchUrl(subMenuItem.prefixUrl, location.pathname)
  );
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={activeMenu}
        className="h-fit data-[active=true]:bg-t_primary-700 data-[active=true]:text-white data-[active=true]:font-semibold"
      >
        <Link to={prefixUrl}>
          {icon}
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
      {activeMenu && (
        <SidebarMenuSub>
          {subMenuList.map((subMenuItem) => (
            <SidebarMenuSubItem>
              <SidebarMenuSubButton
                asChild
                isActive={matchUrl(subMenuItem.prefixUrl, location.pathname)}
              >
                <Link to={subMenuItem.prefixUrl}>{subMenuItem.title}</Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
};

export default CollapsibleSidebarMenuItem;
