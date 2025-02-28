import { createContext } from "react";
import { IsEditing, IStaffAccount } from "./StaffAccountPage";

const StaffAccountCtx = createContext<{
  data: (IStaffAccount & IsEditing)[];
  setData: React.Dispatch<React.SetStateAction<(IStaffAccount & IsEditing)[]>>;
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  data: [],
  showForm: false,
  setShowForm: () => {},
  setData: () => {},
});

export default StaffAccountCtx;