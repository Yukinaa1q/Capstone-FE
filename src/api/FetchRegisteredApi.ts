import TucourApi from "@/utils/http";

export default class FetchRegisteredApi {
  static async fetchRegisteredCourses() {
    try {
      const res = await TucourApi.get("/phase1_register/registered-course-p1");
      console.log(res);
      return res;
    } catch (error) {
      console.error(error);
    }
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
