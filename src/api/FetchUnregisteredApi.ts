import TucourApi from "@/utils/http";

export default class FetchUnregisteredAPI {
  public static async getAllWithPagination(query: string, pageOffSet: number) {
    console.log("Page offset: ", pageOffSet);
    try {
      const PAGE_LIMIT = 5;
      const res = await TucourApi.get("/phase1_register/unregister-course-p1", {
        queryString: {
          q: query,
          limit: PAGE_LIMIT.toString(),
          page: pageOffSet.toString(),
        },
      });

      return res;
    } catch (err) {
      console.log(err);
    }
  }
}
