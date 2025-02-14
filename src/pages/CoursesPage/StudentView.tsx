import CourseCard from "@/components/CourseCard";
import MyPagination, {
  PaginationGoto,
  PaginationNav,
} from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import { useAppSelector } from "@/hooks/reduxHook";
import { useState } from "react";

const StudentView = () => {
  const courseList = useAppSelector((state) => state.courses.coursesP1);
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

      <MyPagination size={5} total={100}>
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
