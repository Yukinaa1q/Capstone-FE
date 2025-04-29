import { ITimeTable } from "@/interfaces/ITimetable";
import { UserBrief } from "@/interfaces/UserProfile";
import TucourApi from "@/utils/http";

export default class TimetableApi {
  public static async getUserList(searchValue: string): Promise<UserBrief[]> {
    try {
      const matchUser = (await TucourApi.get(
        `/phase2_register/search-user-for-timetable?search=${encodeURIComponent(
          searchValue
        )}`
      )) as UserBrief[];
      return matchUser;
    } catch {
      console.log("Error occur");
      return [];
    }
  }

  public static async getUserTimetable(userId: string): Promise<ITimeTable[]> {
    try {
      const userTimetable = (await TucourApi.get(
        "/phase2_register/view-student-tutor-timetable/" + userId
      )) as ITimeTable[];
      return userTimetable;
    } catch {
      return [];
    }
  }
}
