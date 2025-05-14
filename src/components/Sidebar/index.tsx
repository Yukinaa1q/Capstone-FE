import { useAppSelector } from "@/hooks/reduxHook";
import BrandLogo from "../BrandLogo";
import AcademicAffairSidebar from "./AcademicAffairSidebar";
import AdminSidebar from "./AdminSidebar";
import ParentSidebar from "./ParentSidebar";
import StudentSidebar from "./StudentSidebar";
import SupportSidebar from "./SupportSidebar";
import TutorSidebar from "./TutorSidebar";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Role } from "@/interfaces/common";
import { Link, useLocation } from "react-router";
import Topbar from "../Topbar/Topbar";
import AccountantSidebar from "./AccountantSidebar";
import ClassroomSidebar from "./ClassroomSidebar";
import UserSettingSidebar from "./UserSettingSidebar";

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
  accountant: <AccountantSidebar />,
};

// Factor Method design pattern, maybe?
const SidebarFactory = ({ children }: SidebarFactoryProps) => {
  const url = useLocation();
  const userRole = useAppSelector((state) => state.auths.role);
  return (
    <SidebarProvider className="bg-blue-100">
      <Sidebar className="bg-blue-100">
        <SidebarHeader className="mx-auto">
          <Link to="/">
            <BrandLogo size="md" />
          </Link>
        </SidebarHeader>
        <SidebarContent>
          {url.pathname.startsWith("/user") ? (
            <UserSettingSidebar />
          ) : url.pathname.startsWith("/classroom") ? (
            <ClassroomSidebar />
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
