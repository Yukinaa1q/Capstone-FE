import { Button, buttonVariants } from "@/components/ui/button";
import ClassForm, { IClassForm } from "../ClassForm";
import { Link } from "react-router";

const EditClassPage = () => {

  const onSubmit = (data: IClassForm) => {
    console.log(data);
  }

  return (
    <section className="px-8 py-4">
      <h1 className="text-center font-bold text-2xl">EDIT CLASS</h1>
      <ClassForm
        onSubmit={onSubmit}
        className="mx-auto md:w-3/5 ld:w-3/4 xl:w-1/2"
        defaultValues={{
          courseTitle: "This is a course title",
          courseCode: "MT1002",
          classCode: "CC16",
          isOnline: true,
          maxStudents: 45,
          studyShift: "19h30 - 21h00",
          studyWeek: "2-4-6",
          classRoom: "B1-104",
          tutorId: "tutoridA",
          studentIdList: []
        }}
      >
        <Button className="bg-t_tertiary-500 hover:bg-t_tertiary-600">Update Class</Button>
        <Link to="/classes" className={buttonVariants({variant: "destructive"})}>Cancel</Link>
      </ClassForm>
    </section>
  );
};

export default EditClassPage;
