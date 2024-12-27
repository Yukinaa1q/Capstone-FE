import SidebarFactory from "@/components/Sidebar"
import Topbar from "@/components/Topbar"
import { Outlet } from "react-router"

const RootLayout = () => {
  return (
    <div className="flex">
      <SidebarFactory/> {/*  Separation of Concern, RootLayout care about positioning the layout
                             not considering about which sidebar of what actor will be rendered */}
      <div className="grow">
        <Topbar/>
        <Outlet/>
      </div>
    </div>
  )
}

export default RootLayout