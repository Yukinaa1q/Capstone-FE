import TucourApi from "@/utils/http";

export default class AuthenAPI extends TucourApi {
  public static async loginStaff(email: string, password: string) {
    return "You login as staff:" + " email:" + email + " password" + password;
  }

}