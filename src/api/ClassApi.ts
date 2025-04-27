import TucourApi from "@/utils/http";

export default class ClassApi {
  public static async deleteClass(classId: string) {
    try {
      await TucourApi.delete("/phase2_register/delete-class/" + classId);
      return true;
    } catch {
      return false;
    }
  }

  public static async getClassroomDetail(classId: string) {
    const res = await TucourApi.get("/class/view-class-detail/" + classId);
    console.log(res);
    return res;
  }
}
