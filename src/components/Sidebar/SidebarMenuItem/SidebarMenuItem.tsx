import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
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
  const matchNav: boolean = matchUrl(prefixUrl, location.pathname);
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={matchNav}
        className={cn(
          "h-fit data-[active=true]:bg-t_primary-700 data-[active=true]:text-white data-[active=true]:font-semibold",
          matchNav && "text-white"
        )}
      >
        <Link to={prefixUrl}>
          {icon}
          <span className={cn(matchNav && "text-white")}>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default TC_SidebarMenuItem;
