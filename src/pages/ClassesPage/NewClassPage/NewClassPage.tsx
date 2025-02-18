import { Button, buttonVariants } from "@/components/ui/button";
import ClassForm, { IClassForm } from "../ClassForm";
import { Link } from "react-router";

const NewClassPage = () => {
  const onSubmit = (data: IClassForm) => {
    console.log(data);
  };
  return (
    <section className="px-8 py-4">
      <h1 className="text-center font-bold text-2xl">ADD NEW CLASS</h1>
      <ClassForm
        className="mx-auto md:w-3/5 ld:w-3/4 xl:w-1/2"
        onSubmit={onSubmit}
      >
        <Button className="bg-t_primary-400 hover:bg-t_primary-500">Add Class</Button>
        <Link to="/classes" className={buttonVariants({variant: "destructive"})}>Cancel</Link>
      </ClassForm>
    </section>
  );
};

export default NewClassPage;
