import { ICourseCard } from "@/interfaces/ICourse";
import TucourApi from "@/utils/http";

export default class FetchUnregisteredAPI {
  public static async getAllWithPagination(
    query: string,
    pageOffSet: number
  ): Promise<{
    data: ICourseCard[];
    meta: {
      currentPage: number;
      itemsPerPage: number;
      totalItems: number;
      totalPages: number;
    };
  }> {
    try {
      const PAGE_LIMIT = 5;
      const res = (await TucourApi.get(
        "/phase1_register/unregister-course-p1",
        {
          queryString: {
            q: query,
            limit: PAGE_LIMIT.toString(),
            page: pageOffSet.toString(),
          },
        }
      )) as {
        data: ICourseCard[];
        meta: {
          currentPage: number;
          itemsPerPage: number;
          totalItems: number;
          totalPages: number;
        };
      };

      return res;
    } catch {
      return {
        data: [],
        meta: {
          currentPage: 1,
          itemsPerPage: 0,
          totalItems: 0,
          totalPages: 0,
        },
      };
    }
  }
}
