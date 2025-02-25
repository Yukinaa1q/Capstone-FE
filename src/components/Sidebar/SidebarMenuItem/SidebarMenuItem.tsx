import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { matchUrl } from "@/utils/utils";
import React from "react";
import { Link, useLocation } from "react-router";

const TC_SidebarMenuItem = ({
  prefixUrl,
  icon,
  title,
}: {
  prefixUrl: string;
  icon: React.ReactNode;
  title: string;
}) => {
  const location = useLocation();
  let matchNav: boolean = matchUrl(prefixUrl, location.pathname);
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={matchNav}
        className="h-fit data-[active=true]:bg-t_primary-700 data-[active=true]:text-white data-[active=true]:font-semibold"
      >
        <Link to={prefixUrl}>
          {icon}
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default TC_SidebarMenuItem;
