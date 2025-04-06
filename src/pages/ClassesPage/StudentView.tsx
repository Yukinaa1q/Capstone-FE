import FetchUnregisteredAPI from "@/api/FetchUnregisteredApi";
import StudentClassCard from "@/components/CourseCard/StudentClassCard";
import SearchInput from "@/components/Input/SearchInput";
import MyPagination, {
  PaginationGoto,
  PaginationNav,
} from "@/components/Pagination";
import { IClassCard } from "@/interfaces/ICourse";
import { useEffect, useState } from "react";

const PRODUCTS_PER_PAGE = 5;

const StudentView = () => {
  const [classList, setClassList] = useState<IClassCard[]>([]);
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("q");
  const [searchKey, setSearchKey] = useState(myParam || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(10);

  const getClassesFromServer = async (searchKey: string, currentPage: number) => {
    const courses = (await FetchUnregisteredAPI.getAllClassWithPagination(
      searchKey,
      currentPage
    )) as {
      meta: {
        currentPage: number;
        itemsPerPage: number;
        totalItems: number;
        totalPages: number;
      };
      data: IClassCard[];
    };

    setClassList(courses.data);
    setTotalItems(courses.meta.totalItems);
  };

  useEffect(() => {
    getClassesFromServer(searchKey, currentPage);
  }, [searchKey, currentPage]);

  return (
    <div className="py-4">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const searchValue = (e.currentTarget[0] as HTMLInputElement).value;
          console.log("Search Key", searchValue);
          setSearchKey(searchValue);
          setCurrentPage(1);
          // getClassesFromServer(searchValue, 1);
        }}
      >
        <SearchInput className="" />
      </form>

      <MyPagination
        size={PRODUCTS_PER_PAGE}
        total={totalItems}
        onPageChange={async (currentPage) => {
          setCurrentPage(currentPage);
          // getClassesFromServer(searchKey, currentPage);
        }}
      >
        <div className="px-10 mt-10 flex justify-between items-center">
          <p className="text-lg font-semibold">
            {totalItems} results for "{searchKey}"
          </p>
          <div className="flex gap-4">
            <PaginationNav className="w-fit mx-0" />
            <PaginationGoto />
          </div>
        </div>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-10">
          {classList.map((course, idx) => (
            <div key={idx}>
              <StudentClassCard courseContent={course} />
            </div>
          ))}
        </div>
      </MyPagination>
    </div>
  );
};

export default StudentView;
