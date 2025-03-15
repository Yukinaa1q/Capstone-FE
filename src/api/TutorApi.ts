import TucourApi from "@/utils/http";

export default class TutorApi {
    public static async addQualification(qualification: {subject: string, level: string}, tutorId: string | undefined) {
        try {
            const res = await TucourApi.post("/staff/add-qualification/" + tutorId, {
                body: JSON.stringify(qualification)
            })
            return res;

        }
        catch (err) {
            console.log(err);
        }
    }

    public static async getTutors() {
        try {
            const res = await TucourApi.get("/tutor/all-tutor-table")
            return res
        }
        catch (err) {
            console.log(err);
        }
    }

    public static async verifyTutor(tutorId: string | undefined) {
        try {
            const res = await TucourApi.get("/staff/verify-tutor/" + tutorId)
            return res
        }
        catch (err) {
            console.log(err);
        }
    }
}