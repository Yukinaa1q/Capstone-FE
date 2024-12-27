import DOBInput from "@/components/DOBInput";
import PwdInput from "@/components/PwdInput";
import RequiredInput from "@/components/RequiredInput";
import RoleInput from "@/components/RoleInput";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const SignupForm = () => {
  return (
    <div className="space-y-4 w-2/5">
      <div>
        <h1 className="font-bold text-3xl">Sign Up Now!</h1>
        <h2 className="font-medium">To not miss our latest features</h2>
      </div>
      <form action="" className="space-y-2">
        <div className="flex gap-4">
          <p className="font-medium text-sm">You are</p>
          <RoleInput />
        </div>
        <RequiredInput
          label="Full Name"
          type="text"
          placeholder="Your Full Name"
        />
        <RequiredInput label="Email" type="email" placeholder="Email" />
        <DOBInput />
        <PwdInput label="Password" />
        <PwdInput label="Re-enter Password" />
        <Button className="bg-t_primary-400 hover:bg-t_primary-500 w-full">
          Register
        </Button>
      </form>
      <p className="text-xs text-center">
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
