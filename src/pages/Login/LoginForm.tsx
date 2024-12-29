import { GoogleIcon, XIcon } from "@/assets/icons";
import PwdInput from "@/components/PwdInput";
import RequiredInput from "@/components/RequiredInput";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";

const LoginForm = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-4 w-2/5 my-auto">
      <div>
        <h1 className="font-bold text-3xl ">Welcome,</h1>
        <h2 className="font-medium text-xl">
          Sign in to get started with
          <span className="font-bold text-cyan-400 text-xl"> Tucour</span>
        </h2>
      </div>
      <form action="" className="space-y-2">
        <RequiredInput label="Email" type="text" placeholder="Email" />
        <PwdInput label="Password" />
        <div className="">
          <Link
            to="#"
            className="block ml-auto text-right text-sm underline text-t_primary-400 hover:text-t_primary-500 right-0"
          >
            Forgot password
          </Link>
        </div>
        <Button onClick={() => { navigate("/") }} className="bg-t_primary-400 hover:bg-t_primary-500 w-full">
          Log In
        </Button>
      </form>
      <div className="flex items-center space-x-4">
        <div className="flex-1 border-t border-black"></div>
        <span className="text-black text-md font-sans">Or With</span>
        <div className="flex-1 border-t border-black"></div>
      </div>
      <div className="flex justify-center space-x-4">
        <Button variant="outline" size="icon" className="rounded-full">
          <img src={GoogleIcon} alt="Google icon" className="w-12 h-12" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full">
          <img src={XIcon} alt="X icon" className="w-12 h-12" />
        </Button>
      </div>
      <p className="text-sm text-center">
        Dont't have an account?{" "}
        <span>
          <Link
            to="#"
            className="underline text-t_primary-400 hover:text-t_primary-500 text-sm"
          >
            Create Now
          </Link>
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
