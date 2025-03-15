import TucourApi from "@/utils/http";

export default class StudentApi {
    public static async getStudents() {
        try {
            const students = await TucourApi.get("/student/all-student-table")
            return students
        }
        catch(err) {
            console.log(err);
        }
    }
}