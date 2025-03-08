import CourseCard from "@/components/CourseCard/UnregisterCard";
import MyPagination, {
  PaginationGoto,
  PaginationNav,
} from "@/components/Pagination";
import SearchInput from "@/components/Input/SearchInput";
import { useAppSelector } from "@/hooks/reduxHook";
import { ICourseCard } from "@/interfaces/ICourse";
import { coursesPhase1, coursesPhase2 } from "@/utils/fakeData";
import { useEffect, useState } from "react";
import FetchUnregisteredAPI from "@/api/FetchUnregisteredApi";

const PRODUCTS_PER_PAGE = 5;

const StudentView = () => {
  const phase = useAppSelector((state) => state.phases.phase);
  const [courseList, setCourseList] = useState<ICourseCard[]>(
    phase === 1 ? coursesPhase1 : coursesPhase2
  );
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("q");
  const [searchKey, setSearchKey] = useState(myParam || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(10);

  useEffect(() => {
    const getCourseList = async() => {
      const courses = await FetchUnregisteredAPI.getAllWithPagination(searchKey, currentPage) as {
        meta: {
          currentPage: number;
          itemsPerPage: number;
          totalItems: number;
          totalPages: number;
        },
        data: ICourseCard[]
      };

      setCourseList(courses.data);
      setTotalItems(courses.meta.totalItems);
    }

    getCourseList();
  }, []);

  return (
    <div className="py-4">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const searchValue = (e.currentTarget[0] as HTMLInputElement).value;
          console.log("Search Key", searchValue)
          setSearchKey(searchValue);
          try {
            const res = await FetchUnregisteredAPI.getAllWithPagination(searchValue, currentPage) as {
              meta: {
                currentPage: number;
                itemsPerPage: number;
                totalItems: number;
                totalPages: number;
              },
              data: ICourseCard[]
            };
            setCourseList(res.data);
            setTotalItems(res.meta.totalItems);
          }
          catch(err) {
            console.log(err);
          }
        }}
      >
        <SearchInput className="" />
      </form>

      <MyPagination
        size={PRODUCTS_PER_PAGE}
        total={totalItems}
        onPageChange={ async (pageInfo) => {
          setCurrentPage(pageInfo.currentPage);
          try {
            const courses = await FetchUnregisteredAPI.getAllWithPagination(searchKey, pageInfo.currentPage) as {
              meta: {
                currentPage: number;
                itemsPerPage: number;
                totalItems: number;
                totalPages: number;
              },
              data: ICourseCard[]
            };

            console.log(courses);

            setCourseList(courses.data);
            setTotalItems(courses.meta.totalItems);
          }
          catch(err) {
            console.log(err);
          }
        }}
      >
        <div className="px-10 mt-10 flex justify-between items-center">
          <p className="text-lg font-semibold">{totalItems} results for "{searchKey}"</p>
          <div className="flex gap-4">
            <PaginationNav className="w-fit mx-0" />
            <PaginationGoto />
          </div>
        </div>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-10">
          {courseList.map((course, idx) => (
            <div key={idx}>
              <CourseCard courseContent={course} />
            </div>
          ))}
        </div>
      </MyPagination>
    </div>
  );
};

export default StudentView;
