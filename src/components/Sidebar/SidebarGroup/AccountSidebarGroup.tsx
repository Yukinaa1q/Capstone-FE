import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { ISidebarGroup } from "./Interface";
import TC_SidebarMenuItem from "../SidebarMenuItem/SidebarMenuItem";
import { Users2 } from "lucide-react";

const AccountSidebarGroup = ({ label }: ISidebarGroup) => {
  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        {/* Add your code here */}
        <TC_SidebarMenuItem
          title="Staff"
          prefixUrl="/staff/accounts"
          icon={<Users2 />}
        />
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default AccountSidebarGroup;
