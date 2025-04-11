import { ITimeTable } from "@/interfaces/ITimetabl";
import { UserBrief } from "@/interfaces/UserProfile";

export default class TimetableApi {
  public static async getUserList(searchValue: string): Promise<UserBrief[]> {
    return [
      {
        userId: "2157982",
        userCode: "2157982",
        name: "Nguyen Van A",
        avatarUrl: "https://example.com/avatar1.jpg",
      },
      {
        userId: "2157983",
        userCode: "2157983",
        name: "Nguyen Van B",
        avatarUrl: "https://example.com/avatar2.jpg",
      },
      {
        userId: "2157984",
        userCode: "2157984",
        name: "Nguyen Van C",
        avatarUrl: "https://example.com/avatar3.jpg",
      },
    ];
  }

  public static async getUserTimetable(userId: string): Promise<ITimeTable[]> {
    return [
      {
        subject: "Math",
        studyWeek: "3-5",
        studyShift: "17h45 - 19h15",
        room: "Room 101",
        address: "123 Main St",
      },
      {
        address: "456 Elm St",
        room: "Room 102",
        studyShift: "19h30 - 21h00",
        studyWeek: "2-4",
        subject: "Physics",
      },
      {
        address: "789 Oak St",
        room: "Room 103",
        studyShift: "08h00 - 11h00",
        studyWeek: "7",
        subject: "Chemistry",
      },
      {
        address: "101 Pine St",
        room: "Room 104",
        studyShift: "19h30 - 21h30",
        studyWeek: "8",
        subject: "Biology",
      },
      {
        address: "202 Maple St",
        room: "Room 105",
        studyShift: "16h15 - 19h15",
        studyWeek: "4-6",
        subject: "History",
      },
    ];
  }
}
