import { Role } from "./common";

export default interface INewStaffAccount {
  staffName: string;
  staffRole: Role;
  staffPhone: string;
  staffEmail: string;
  staffPassword: string;
}

export interface IStaffAccount extends Omit<INewStaffAccount, "staffPhone"> {
  staffCode: string;
  staffId: string;
}
