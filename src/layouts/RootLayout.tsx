import SidebarFactory from "@/components/Sidebar";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { setUser } from "@/store/authenSlice";
import { jwtDecoder } from "@/utils/utils";
import { Navigate, Outlet } from "react-router";

const RootLayout = () => {
  const user = useAppSelector((state) => state.auths);
  console.log("Render root layout");
  const token = window.localStorage.getItem("token");
  console.log("token", token);
  const dispatch = useAppDispatch();
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  } else {
    // If integrating, uncomment this
    // dispatch(setUser(jwtDecoder(token).payload.payload));
    dispatch(setUser({role: 'academic', userId: '1', name: 'admin', userCode: 'admin'}));
    if (!user.role) {
      return <Navigate to="/login" replace={true} />;
    }
    return (
      <SidebarFactory>
        <Outlet />
      </SidebarFactory>
    );
  }
};

export default RootLayout;
