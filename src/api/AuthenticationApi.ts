import TucourApi from "@/utils/http";

export default class AuthenAPI extends TucourApi {
  public static async loginStaff(email: string, password: string): Promise<string> {
    const authen = { email, password };
    try {
      const res = (await TucourApi.post("/authentication/login/staff", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authen),
      })) as { token: string };
      window.localStorage.setItem("token", res.token);
      return res.token;
    } catch (_) {
      return "Incorrect email or password";
    }
  }

  public static async loginAdmin(email: string, password: string): Promise<string> {
    const authen = { email, password };
    try {
      const res = (await TucourApi.post("/authentication/login/admin", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authen),
      })) as { token: string };
      window.localStorage.setItem("token", res.token);
      return res.token;
    } catch (_) {
      return "Incorrect email or password";
    }
  }
}
