import TucourApi from "@/utils/http";

export default class ClassApi {
    public static async deleteClass(classId: string) {
        try {
            await TucourApi.delete("/phase2_register/delete-class/" + classId);
            return true;
        }
        catch {
            return false;
        }

    }
}