import TucourApi from "@/utils/http";

export default class StudentApi {
  public static async getStudents() {
    try {
      const students = await TucourApi.get("/student/all-student-table");
      return students;
    } catch (err) {
      console.log(err);
    }
  }

  public static async getStudentDetail(studentId: string | undefined) {
    return {
      userCode: "STU2001",
      userId: "1",
      avatarUrl: "https://i.pr",
      fullName: "Kieu Tien Thanh",
      email: "thanhkieu207@gmail.com",
      isVerified: false,
      dob: "20/07/2003",
      ssid: "078267861872",
      address: "148/1/2 Nguyen Van Cu, P.1, Q.5, TP.HCM",
      phoneNumber: "0123456789",
    };
  }
}
