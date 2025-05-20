import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import SubSidebarMenuItem from "../SidebarMenuItem/SubSidebarMenuItem";
import { Calendar, CreditCard, LibraryBig, MessageCircle } from "lucide-react";
import TC_SidebarMenuItem from "../SidebarMenuItem/SidebarMenuItem";
import { useAppSelector } from "@/hooks/reduxHook";
import { IMenuItem } from "./Interface";

const subMenuList: Omit<IMenuItem, "icon">[] = [
  { title: "Available Classes", prefixUrl: "/" },
  { title: "Registered Classes", prefixUrl: "/registered-classes" },
  { title: "My Classes", prefixUrl: "/my-classes" },
];

const StudentSidebarGroup = ({ label }: { label?: string }) => {
  const role = useAppSelector((state) => state.auths.role);
  return (
    <SidebarGroup>
      {label && <SidebarGroupContent>{label}</SidebarGroupContent>}
      <SidebarGroupContent>
        <SubSidebarMenuItem
          prefixUrl="/"
          icon={<LibraryBig />}
          title="Class"
          subMenuList={subMenuList}
        />
        <TC_SidebarMenuItem
          prefixUrl="/schedule"
          icon={<Calendar />}
          title="Schedule"
        />
        <TC_SidebarMenuItem
          prefixUrl="/chat"
          icon={<MessageCircle />}
          title="Chat"
        />
        {role === "student" && (
          <TC_SidebarMenuItem
            prefixUrl="/payment"
            icon={<CreditCard />}
            title="Payment"
          />
        )}
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default StudentSidebarGroup;
