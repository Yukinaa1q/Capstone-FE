import { useAppSelector } from "@/hooks/reduxHook";
import { Role } from "@/interfaces/common";
import React from "react";
import { Navigate } from "react-router";

const RouteGuard = ({ allowed, children }: { allowed?: Role[], children: React.ReactNode }) => {
  const user = useAppSelector(state => state.auths);
  if (!user.role) {
    return <Navigate to="/login" replace={true}/>;
  }
  const jwt = window.localStorage.getItem("token");
  if (!jwt || !allowed?.includes(user.role)) {
    return <Navigate to="/login" replace={true}/>;
  }
  return <>{children}</>;
};

export default RouteGuard;
