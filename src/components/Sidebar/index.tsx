import { useAppSelector } from "@/hooks/reduxHook";
import StudentSidebar from "./StudentSidebar";
import AdminSidebar from "./AdminSidebar";
import ParentSidebar from "./ParentSidebar";
import TutorSidebar from "./TutorSidebar";
import AcademicAffairSidebar from "./AcademicAffairSidebar";
import SupportSidebar from "./SupportSidebar";
import BrandLogo from "../BrandLogo";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Topbar from "../Topbar/Topbar";
import { Role } from "@/interfaces/common";
import { useLocation } from "react-router";
import UserSettingSidebar from "./SidebarGroup/UserSettingSidebar";

interface SidebarFactoryProps {
  children: React.ReactNode;
}

const sidebarContent: Record<Role, React.ReactNode> = {
  admin: <AdminSidebar />,
  student: <StudentSidebar />,
  parent: <ParentSidebar />,
  tutor: <TutorSidebar />,
  academic: <AcademicAffairSidebar />,
  support: <SupportSidebar />,
};

// Factor Method design pattern, maybe?
const SidebarFactory = ({ children }: SidebarFactoryProps) => {
  const url = useLocation();
  const userRole = useAppSelector((state) => state.auths.role);
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="mx-auto">
          <BrandLogo size="md" />
        </SidebarHeader>
        <SidebarContent>
          {url.pathname.startsWith("/user") ? (
            <UserSettingSidebar />
          ) : (
            sidebarContent[userRole]
          )}
        </SidebarContent>
      </Sidebar>
      {/* I don't know why but setting w-1 make the carousel not expand out of the container size  */}
      <SidebarInset className="w-0 md:max-lg:w-screen">
        <header className="sticky z-50 top-0 flex items-center gap-2 border-b bg-background px-4 py-2">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Topbar />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SidebarFactory;
