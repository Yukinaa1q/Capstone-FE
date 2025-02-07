import CourseCard from "@/components/CourseCard";
import MyPagination, {
  PaginationGoto,
  PaginationNav,
} from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import { useAppSelector } from "@/hooks/reduxHook";

const StudentView = () => {
  const courseList = useAppSelector((state) => state.courses.coursesP1);
  return (
    <div className="py-4">
      <SearchInput className="" />

      <MyPagination size={5} total={100}>
        <div className="px-10 mt-10 flex justify-between items-center">
          <p className="text-lg font-semibold">XXX results for "YYYYY"</p>
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
