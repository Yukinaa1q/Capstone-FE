import TucourApi, { StatusResponse } from "@/utils/http";

/**
 * Actually this code is against from developing like this,
 * this violate the SOLID principle, especially the Dependency Inversion Principle.
 * 
 * This code file need to be refactor for better code quality.
 * The same goes for the http.ts file and other files reside in /api folder
 */

export default class AuthenAPI extends TucourApi {
  public static async loginStaff(
    email: string,
    password: string
  ): Promise<boolean> {
    const authen = { email, password };
    try {

      const res = await TucourApi.post("/authentication/login/staff", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authen),
      }) as {token: string};
      console.log(res);
      window.localStorage.setItem("token", res.token);
  
      // return res.token;
      return true;
    }
    catch (err) {
      return false;
    }
  }

  public static async loginAdmin(
    email: string,
    password: string
  ): Promise<string> {
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
