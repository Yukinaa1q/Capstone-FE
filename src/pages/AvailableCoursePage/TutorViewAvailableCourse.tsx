import FetchUnregisteredAPI from "@/api/FetchUnregisteredApi";
import TutorCourseCard from "@/components/CourseCard/TutorCourseCard";
import SearchInput from "@/components/Input/SearchInput";
import MyPagination, { PaginationNav } from "@/components/Pagination";
import { ICourseCard } from "@/interfaces/ICourse";
import React, { useEffect } from "react";

const TutorViewAvailableCourse = () => {
  const [courseList, setCourseList] = React.useState<ICourseCard[]>([]);
  const [totalProducts, setTotalProducts] = React.useState(0);

  useEffect(() => {
    getCourses("", 1);
  }, []);

  const getCourses = async (searchKey: string, pageOffSet: number) => {
    const courses = await FetchUnregisteredAPI.getAllWithPagination(
      searchKey,
      pageOffSet
    );
    setCourseList(courses.data);
    setTotalProducts(courses.meta.totalItems);
  };

  return (
    <div className="mb-4">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const searchValue = (e.currentTarget[0] as HTMLInputElement).value;
          await getCourses(searchValue, 1);
        }}
      >
        <SearchInput />
      </form>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {courseList.map((course) => (
          <TutorCourseCard key={course.courseCode} cardInfo={course} />
        ))}
      </div>

      <MyPagination
        total={totalProducts}
        size={5}
        onPageChange={(currentPage) => {
          getCourses("", currentPage);
        }}
      >
        <PaginationNav className="mt-4" />
      </MyPagination>
    </div>
  );
};

export default TutorViewAvailableCourse;
