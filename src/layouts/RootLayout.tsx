import SidebarFactory from "@/components/Sidebar";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { setUser } from "@/store/authenSlice";
import { jwtDecoder } from "@/utils/utils";
import { Navigate, Outlet } from "react-router";

const RootLayout = () => {
  const token = window.localStorage.getItem("token");
  const dispatch = useAppDispatch();
  if (!token) {
    <Navigate to="/login" replace={true} />;
  }
  else {
    dispatch(setUser(jwtDecoder(token).payload.payload));
  }
  const user = useAppSelector((state) => state.auths);
  if (!user.role) {
    <Navigate to="/login" replace={true} />;
  }
  return (
    <SidebarFactory>
      <Outlet />
    </SidebarFactory>
  );
};

export default RootLayout;
