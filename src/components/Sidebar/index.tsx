import { useAppSelector } from "@/hooks/reduxHook"
import StudentSidebar from "./StudentSidebar"
import AdminSidebar from "./AdminSidebar"
import ParentSidebar from "./ParentSidebar"
import TutorSidebar from "./TutorSidebar"
import AcademicAffairSidebar from "./AcademicAffairSidebar"
import SupportSidebar from "./SupportSidebar"

const SidebarFactory = () => {
  const userRole = useAppSelector(state => state.auths.role)
  switch (userRole) {
    case "admin":
      return <AdminSidebar/>
    case "student":
      return <StudentSidebar/>
    case "parent":
      return <ParentSidebar/>
    case "tutor":
      return <TutorSidebar/>
    case "academic":
      return <AcademicAffairSidebar/>
    case "support":
      return <SupportSidebar/>
    default:
      return <StudentSidebar/>
  }
}

export default SidebarFactory