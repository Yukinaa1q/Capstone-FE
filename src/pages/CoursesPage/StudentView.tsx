import CourseCard from "@/components/CourseCard/UnregisterCard";
import MyPagination, {
  PaginationGoto,
  PaginationNav,
} from "@/components/Pagination";
import SearchInput from "@/components/Input/SearchInput";
import { useAppSelector } from "@/hooks/reduxHook";
import { ICourseCard } from "@/interfaces/ICourse";
import { coursesPhase1, coursesPhase2 } from "@/utils/fakeData";
import { useState } from "react";

const PRODUCTS_PER_PAGE = 5;

const StudentView = () => {
  const phase = useAppSelector((state) => state.phases.phase);
  const [courseList, setCourseList] = useState<ICourseCard[]>(
    phase === 1 ? coursesPhase1 : coursesPhase2
  );
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("q");
  const [searchKey, setSearchKey] = useState(myParam || "");
  return (
    <div className="py-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const searchValue = (e.currentTarget[0] as HTMLInputElement).value;
          setSearchKey(searchValue);
        }}
      >
        <SearchInput className="" />
      </form>

      <MyPagination
        size={PRODUCTS_PER_PAGE}
        total={100}
        onPageChange={(pageInfo) => console.log(pageInfo)}
      >
        <div className="px-10 mt-10 flex justify-between items-center">
          <p className="text-lg font-semibold">XXX results for "{searchKey}"</p>
          <div className="flex gap-4">
            <PaginationNav className="w-fit mx-0" />
            <PaginationGoto />
          </div>
        </div>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-10">
          {courseList.map((course, idx) => (
            <div>
              <CourseCard key={idx} courseContent={course} />
            </div>
          ))}
        </div>
      </MyPagination>
    </div>
  );
};

export default StudentView;
