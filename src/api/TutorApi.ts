import { IClassDetail } from "@/interfaces/ICourseDetail";
import { TutorRegistrationSchedule } from "@/interfaces/TutorRegistrationSchedule";
import { TutorDetail } from "@/interfaces/UserProfile";
import TucourApi from "@/utils/http";

export default class TutorApi {
  public static async addQualification(
    qualification: { subject: string; level: string },
    tutorId: string | undefined
  ) {
    try {
      const res = await TucourApi.post("/staff/add-qualification/" + tutorId, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([qualification]),
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  public static async getQualifications(tutorId: string | undefined) {
    try {
      const res = await TucourApi.get("/staff/get-qualification/" + tutorId);
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  public static async removeQualification(
    qualifications: { subject: string; level: string }[],
    tutorId: string | undefined
  ) {
    console.log(qualifications);
    try {
      const res = await TucourApi.delete(
        "/staff/delete-qualification/" + tutorId,
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(qualifications),
        }
      );
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  public static async getTutors() {
    try {
      const res = await TucourApi.get("/tutor/all-tutor-table");
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  public static async verifyTutor(tutorId: string | undefined) {
    try {
      const res = await TucourApi.get("/staff/verify-tutor/" + tutorId);
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  public static async getTutorDetail(
    tutorId: string | undefined
  ): Promise<TutorDetail> {
    try {
      const res = (await TucourApi.get(
        "/tutor/detail/" + tutorId
      )) as TutorDetail;
      console.log("res", res);
      return res;
    } catch {
      return {} as TutorDetail;
    }
  }

  public static async sendTeachingRequest(
    courseId: string,
    scheduleList: TutorRegistrationSchedule[]
  ) {
    const failRequestList = await TucourApi.post(
      "/phase1_register/new-class-request",
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: courseId,
          registrationList: scheduleList.map((schedule) => ({
            ...schedule,
            online: schedule.isOnline,
          })),
        }),
      }
    );
    return failRequestList;
  }

  public static async getClassHistory(
    tutorId: string | undefined
  ): Promise<
    (Pick<
      IClassDetail,
      | "courseTitle"
      | "courseCode"
      | "classCode"
      | "classSession"
      | "classShift"
      | "studyRoom"
    > & { pricePaid: number })[]
  > {
    console.log("Call class history api");
    try {
      const res = (await TucourApi.get(
        "/tutor/view-tutor-class-history/" + tutorId
      )) as (Pick<
        IClassDetail,
        | "courseTitle"
        | "courseCode"
        | "classCode"
        | "classSession"
        | "classShift"
        | "studyRoom"
      > & { pricePaid: number })[];
      console.log("Return class history", res);
      return res;
    } catch {
      console.log("Error occur when get class history", tutorId);
      return [];
    }
    // return [
    //   {
    //     classCode: "CS101",
    //     classSession: "Monday",
    //     classShift: "Morning",
    //     courseCode: "CS101",
    //     courseTitle: "Introduction to Computer Science",
    //     studyRoom: "Room 101",
    //     pricePaid: 1500000,
    //   },
    //   {
    //     classCode: "CS102",
    //     classSession: "Tuesday",
    //     classShift: "Afternoon",
    //     courseCode: "CS102",
    //     courseTitle: "Data Structures and Algorithms",
    //     studyRoom: "Room 102",
    //     pricePaid: 1350000,
    //   },
    //   {
    //     classCode: "CS103",
    //     classSession: "Wednesday",
    //     classShift: "Evening",
    //     courseCode: "CS103",
    //     courseTitle: "Database Management Systems",
    //     studyRoom: "Room 103",
    //     pricePaid: 800000,
    //   },
    // ];
  }

  public static async updateProfile(
    tutorId: string,
    name: string,
    email: string,
    dob: Date,
    tutorSSN: string,
    phone: string
  ) {
    const sendingData = {
      name: name,
      email: email,
      dob: dob,
      tutorSSN: tutorSSN,
      phoneNumber: phone,
    };

    await TucourApi.post("/tutor/update-tutor-profile/" + tutorId, {
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(sendingData),
    });
    return true;
  }
}
