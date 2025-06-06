import SidebarFactory from "@/components/Sidebar";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { setUser } from "@/store/authenSlice";
import { jwtDecoder } from "@/utils/utils";
import { Navigate, Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { setHasNewMessage } from "@/store/notiSlice";

const RootLayout = () => {
  const user = useAppSelector((state) => state.auths);
  const token = window.localStorage.getItem("token");
  const dispatch = useAppDispatch();
  // Initiate the sse notification
  useEffect(() => {
    const sse = new EventSource(`http://localhost:8000/noti/sse`);
    sse.onmessage = (event) => {
      // console.log("New message every one second", JSON.parse(event.data));
      const serverMessage = JSON.parse(event.data);
      // console.log("Server message", serverMessage);
      if (serverMessage && serverMessage.receiverId === user.userId) {
        console.log("This SSE is for you");
        dispatch(setHasNewMessage({ hasNewMessage: true }));
      } 
    };
  }, [user.userId, dispatch]);

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
