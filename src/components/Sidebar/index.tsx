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
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Topbar from "../Topbar/Topbar";

interface SidebarFactoryProps {
  children: React.ReactNode;
}

// Factor Method design pattern, maybe?
const SidebarFactory = ({ children }: SidebarFactoryProps) => {
  const userRole = useAppSelector((state) => state.auths.role);
  let sidebarContent: JSX.Element;
  switch (userRole) {
    case "admin":
      sidebarContent = <AdminSidebar />;
      break;
    case "student":
      sidebarContent = <StudentSidebar />;
      break;
    case "parent":
      sidebarContent = <ParentSidebar />;
      break;
    case "tutor":
      sidebarContent = <TutorSidebar />;
      break;
    case "academic":
      sidebarContent = <AcademicAffairSidebar />;
      break;
    case "support":
      sidebarContent = <SupportSidebar />;
      break;
    default:
      sidebarContent = <StudentSidebar />;
      break;
  }
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="mx-auto">
          <BrandLogo size="md" />
        </SidebarHeader>
        {/*
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuItemButton/>
                  <SidebarMenuAction>
            <SidebarGroupAction>
        */}
        {sidebarContent}{" "}
        {/*All sidebar content must be wrapped in <SidebarContent></SidebarContent> */}
      </Sidebar>
      {/* I don't know why but setting w-1 make the carousel not expand out of the container size  */}
      <SidebarInset className="w-0">
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
