import NewCourseForm from "./CourseForm";

const NewCoursePage = () => {
  return (
    <section className="px-8 py-4">
      <h1 className="text-center font-bold text-2xl">ADD NEW COURSE</h1>
      <NewCourseForm className="mx-auto md:w-3/5 ld:w-3/4 xl:w-1/2" />
    </section>
  );
};

export default NewCoursePage;
