import { IClass } from "@/interfaces/IClass";
import { IClassCard } from "@/interfaces/ICourse";
import TucourApi from "@/utils/http";

export default class FetchRegisteredApi {
  static async fetchRegisteredClasses(): Promise<IClassCard[]> {
    try {
      const res = (await TucourApi.get(
        "/phase2_register/view-registered-classes"
      )) as IClassCard[];
      console.log(res);
      return res;
    } catch {
      throw new Error("Error fetching registered classes");
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

  static async deleteStudentRegistration(classId: string) {
    try {
      const res = await TucourApi.get(
        "/phase2_register/unregister-class/" + classId
      );
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  static async getPaidAndDoneClassesFromStudent(): Promise<IClass[]> {
    try {
      const res = (await TucourApi.get("/student/view-registered-classes-simple")) as IClass[];
      return res;
    } catch {
      return [];
    }
  }
  static async getPaidAndDoneClassesFromTutor(): Promise<IClass[]> {
    try {
      const res = (await TucourApi.get("/tutor/view-registered-classes-simple")) as IClass[];
      return res;
    } catch {
      return [];
    }
  }
}
