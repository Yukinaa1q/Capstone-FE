import SidebarFactory from "@/components/Sidebar";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { setUser } from "@/store/authenSlice";
import { jwtDecoder } from "@/utils/utils";
import { Navigate, Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner"


const RootLayout = () => {
  const user = useAppSelector((state) => state.auths);
  const token = window.localStorage.getItem("token");
  const dispatch = useAppDispatch();
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  } else {
    // If integrating, uncomment this
    dispatch(setUser(jwtDecoder(token).payload.payload));

    if (!user.role) {
      return <Navigate to="/login" replace={true} />;
    }
    return (
      <SidebarFactory>
        <Outlet />
        <Toaster />
      </SidebarFactory>
    );
  }
};

export default RootLayout;
