import { useAppSelector } from "@/hooks/reduxHook";
import React from "react";
import { Navigate } from "react-router";

const RouteGuard = ({ allowed, children }: { allowed?:string[], children: React.ReactNode }) => {
  const role = useAppSelector(state => state.auths.role);
  const jwt = window.localStorage.getItem("token");
  if (!jwt) {
    return <Navigate to="/login" replace={true}/>;
  }
  return <>{children}</>;
};

export default RouteGuard;
