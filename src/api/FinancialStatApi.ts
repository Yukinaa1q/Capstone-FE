import TucourApi from "@/utils/http";

export default class FinancialStatApi {
    public static async getIncomeOutcomeOverYear() {
        try {
            const res = await TucourApi.get("/stat/income-outcome");
            return res;
        }
        catch {
            console.log("error while display stat");
        }
    }

    public static async getIncomePerSubject() {
        try {
            const res = await TucourApi.get("/stat/income-subject");
            return res;
        }
        catch {
            console.log("error while display stat");
        }
    }
}