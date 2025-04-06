import { IClassCard } from "@/interfaces/ICourse";
import TucourApi from "@/utils/http";

export default class FetchRegisteredApi {
  static async fetchRegisteredClasses(): Promise<IClassCard[]> {
    return [{
      courseCode: "CS101",
      courseTitle: "Computer Science 101",
      classCode: "CS101-01",
      classId: "12345",
      courseId: "CS101",
      courseImage: "https://example.com/image.jpg",
      coursePrice: 1250000,
      currentStudents: 20,
      maxStudents: 30,
      registrationEndDate: "2023-12-31",
      registrationStartDate: "2023-01-01",
      tutor: "Nguyen Van A"
    }];
  }

  static async deleteTutorRegistration(tutorId: string, courseId: string) {
    try {
      const res = await TucourApi.delete("/phase1_register/tutor/delete", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tutorId: tutorId,
          courseId: courseId,
        }),
      });
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteStudentRegistration(studentId: string, courseId: string) {
    const sendData = JSON.stringify({
      studentId: studentId,
      courseId: courseId,
    })
    try {
      const res = await TucourApi.delete("/phase1_register/student/delete", {
        headers: {
          "Content-Type": "application/json",
        },
        body: sendData,
      });
      return res;
    } catch (error) {
      console.error(error);
    }
  }
}
