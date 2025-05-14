import { Button, buttonVariants } from "@/components/ui/button";
import ClassForm, { IClassForm } from "../ClassForm";
import { Link, useNavigate } from "react-router";
import TucourApi from "@/utils/http";
import { toast } from "sonner";

const NewClassPage = () => {
  const navigate = useNavigate();
  const onSubmit = async (data: IClassForm) => {
    console.log("Sending data: ", data);
    try {
      // await TucourApi.call("/class/create-class", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      //   body: JSON.stringify(data),
      // });
      // navigate("/classes");
      
    } catch (e) {
      console.log(e);
      toast.error((e as { message: string }).message, {
        style: {
          backgroundColor: "#d14960",
          color: "#fff",
        },
      });
    }
  };
  return (
    <section className="px-8 py-4">
      <h1 className="text-center font-bold text-2xl">ADD NEW CLASS</h1>
      <ClassForm
        className="mx-auto md:w-3/5 ld:w-3/4 xl:w-1/2"
        onSubmit={onSubmit}
      >
        <Button className="bg-t_primary-400 hover:bg-t_primary-500">
          Add Class
        </Button>
        <Link
          to="/classes"
          className={buttonVariants({ variant: "destructive" })}
        >
          Cancel
        </Link>
      </ClassForm>
    </section>
  );
};

export default NewClassPage;
