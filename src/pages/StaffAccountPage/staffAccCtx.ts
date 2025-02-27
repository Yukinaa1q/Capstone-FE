import { createContext } from "react";
import { IsEditing, IStaffAccount } from "./StaffAccountPage";

const StaffAccountCtx = createContext<{
  data: (IStaffAccount & IsEditing)[];
  setData: React.Dispatch<React.SetStateAction<(IStaffAccount & IsEditing)[]>>;
}>({
  data: [],
  setData: () => {},
});

export default StaffAccountCtx;