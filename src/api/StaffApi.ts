import INewStaffAccount from "@/interfaces/IStaffCRUD";
import { IClassRequest } from "@/pages/ClassesPage/RequestClasses";
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

  public static async editStaffAccount(id: string, data: any) {
    try {
      const res = await TucourApi.post("/staff/update/" + id, {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  public static async getAllStaff(): Promise<{
    staffName: string;
    staffId: string;
    staffCode: string;
    staffRole: string;
    staffPhone: string;
    staffEmail: string;
  }> {
    const res = (await TucourApi.get("/staff/all-staff-table")) as {
      staffName: string;
      staffId: string;
      staffCode: string;
      staffRole: string;
      staffPhone: string;
      staffEmail: string;
    };
    return res;
  }

  public static async deleteStaffAccount(id: string) {
    try {
      const res = TucourApi.delete("/staff/delete-staff/" + id);
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  public static async openClass(maxStudents: number, request: IClassRequest) {
    await TucourApi.post(
      "/phase1_register/new-academic-create-class/true/" + request.requestId,
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...request, maxStudents }),
      }
    );
  }

  public static async rejectClass(request: IClassRequest, reason: string) {
    const result = await TucourApi.post(
      "/phase1_register/new-academic-create-class/false/" + request.requestId,
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason }),
      }
    );
    console.log(result);
  }

  public static async getClassRequest(): Promise<IClassRequest[]> {
    const res = (await TucourApi.get(
      "/phase1_register/class-request"
    )) as IClassRequest[];
    return res;
  }
}
