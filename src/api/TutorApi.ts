import { TutorRegistrationSchedule } from "@/interfaces/TutorRegistrationSchedule";
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

  public static async getTutorDetail(tutorId: string | undefined) {
    try {
      const res = await TucourApi.get("/tutor/detail/" + tutorId);
      return res as {
        userCode: string;
        userId: string;
        fullName: string;
        email: string;
        isVerified: boolean;
        dob: string;
        ssid: string;
        address: string;
        phoneNumber: string;
      };
    } catch (err) {
      console.log(err);
    }
  }

  public static async sendTeachingRequest(
    scheduleList: TutorRegistrationSchedule[]
  ) {
    try {
      console.log(
        "Đã gửi thông tin đăng ký dạy học, thông tin là: ",
        scheduleList
      );
    } catch {
      console.log("Error sending teaching request");
    }
  }
}
