import AcademicSidebarGroup from "./SidebarGroup/AcademicSidebarGroup";
import AccountSidebarGroup from "./SidebarGroup/AccountSidebarGroup";


const AdminSidebar = () => {
  return (
    <>
      <AccountSidebarGroup label="Account Management"/>
      <AcademicSidebarGroup label="Academic Management"/>
    </>
  );
};

export default AdminSidebar;
