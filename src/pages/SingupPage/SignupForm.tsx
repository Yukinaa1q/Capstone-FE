import DOBInput from "@/components/DOBInput";
import PwdInput from "@/components/PwdInput";
import RequiredInput from "@/components/RequiredInput";
import RoleInput from "@/components/RoleInput";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const SignupForm = () => {
  return (
    <div className="mt-8 w-full md:w-2/3 lg:w-2/5">
      <div>
        <h1 className="font-bold text-3xl">Sign Up Now!</h1>
        <h2 className="font-medium">To not miss our latest features</h2>
      </div>
      <form action="" className="space-y-4 mt-4">
        <div className="flex gap-4">
          <p className="font-medium text-sm">You are</p>
          <RoleInput />
        </div>
        <RequiredInput
          label="Full Name"
          type="text"
          placeholder="Your fullname"
        />
        <RequiredInput label="Email" type="email" placeholder="Email" />
        <DOBInput />
        <PwdInput label="Password" placeholder="Password"/>
        <PwdInput label="Re-enter Password" placeholder="Re-enter password"/>
        <Button className="bg-t_primary-400 hover:bg-t_primary-500 w-full">
          Register
        </Button>
      </form>
      <p className="text-sm text-center mt-2">
        Already has an account?{" "}
        <span>
          <Link
            to="#"
            className="underline text-t_primary-400 hover:text-t_primary-500"
          >
            Log In Now
          </Link>
        </span>
      </p>
    </div>
  );
};

export default SignupForm;
