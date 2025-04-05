import { createContext } from "react";
import { IsEditing } from "./StaffAccountPage";
import { IStaffAccount } from "@/interfaces/IStaffCRUD";

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
