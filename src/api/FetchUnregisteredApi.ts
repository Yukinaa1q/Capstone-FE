import { IClassCard, ICourseCard } from "@/interfaces/ICourse";
import TucourApi from "@/utils/http";

export default class FetchUnregisteredAPI {
  public static async getAllCoursesWithPagination(
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
        "/phase1_register/unregister-course-p1-tutor",
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
      console.log("course list: ", res);

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

  public static async getAllClassWithPagination(
    query: string,
    pageOffSet: number
  ): Promise<{
    data: IClassCard[];
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
        "/phase2_register/view-unregistered-classes-student",
        {
          queryString: {
            q: query,
            limit: PAGE_LIMIT.toString(),
            page: pageOffSet.toString(),
          },
        }
      )) as {
        data: IClassCard[];
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
