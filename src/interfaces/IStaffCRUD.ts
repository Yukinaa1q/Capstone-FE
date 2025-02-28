import { Role } from "./common";

export default interface INewStaffAccount {
  staffName: string;
  staffRole: Role;
  staffEmail: string;
  staffPassword: string;
}

export interface IStaffAccount extends INewStaffAccount {
  staffCode: string;
  staffId: string;
}
