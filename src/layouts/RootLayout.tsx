import SidebarFactory from "@/components/Sidebar";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <SidebarFactory>
      <Outlet />
    </SidebarFactory>
  );
};

export default RootLayout;
