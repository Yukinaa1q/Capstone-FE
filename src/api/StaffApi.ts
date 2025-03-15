import INewStaffAccount from "@/interfaces/IStaffCRUD";
import TucourApi from "@/utils/http";

export default class StaffApi {
  public static async createStaff(staff: INewStaffAccount) {
    const staffbody = {
      name: staff.staffName,
      phone: staff.staffPhone,
      email: staff.staffEmail,
      password: staff.staffPassword,
      role: staff.staffRole,
    };
    try {
      const res = await TucourApi.post("/staff/create", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(staffbody),
      });
      return res;
    } catch (err) {
      return err;
    }
  }
}
