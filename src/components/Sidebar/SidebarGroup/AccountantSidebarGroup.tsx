import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { HandCoins, Wallet } from "lucide-react";
import TC_SidebarMenuItem from "../SidebarMenuItem/SidebarMenuItem";
import { IMenuItem } from "./Interface";

const itemList: IMenuItem[] = [
  {
    title: "Tutor Payments",
    icon: <HandCoins />,
    prefixUrl: "/tutor-payments",
  },
  {
    title: "Revenue",
    icon: <Wallet />,
    prefixUrl: "/revenue",
  },
];

const AccountantSidebarGroup = ({ label }: { label: string }) => {
  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        {itemList.map((item) => (
          <TC_SidebarMenuItem
            key={item.prefixUrl}
            prefixUrl={item.prefixUrl}
            icon={item.icon}
            title={item.title}
          />
        ))}
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default AccountantSidebarGroup;
