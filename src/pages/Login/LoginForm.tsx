import { GoogleIcon, XIcon } from "@/assets/icons";
import PwdInput from "@/components/PwdInput";
import RequiredInput from "@/components/RequiredInput";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import TucourApi, { ENV } from "@/utils/http";
import { jwtDecoder } from "@/utils/utils";
import { useAppDispatch } from "@/hooks/reduxHook";
import { setUser } from "@/store/authenSlice";

interface LoginForm {
  email: string;
  password: string;
}

const loginSchema = yup
  .object({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const form = useForm<LoginForm>({
    resolver: yupResolver<LoginForm>(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginForm) => {
    const tucourApi = new TucourApi(ENV.DEV);
    try {
      const res = await tucourApi.call({
        url: "/authentication/login",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { payload } = jwtDecoder(res.token);
      console.log("payload", payload);
      dispatch(
        setUser({
          role: payload.role,
          userId: payload.userId,
          name: payload.name,
        })
      );

      window.localStorage.setItem("token", res.token);
    } catch (err) {
      console.log("Catch error login form")
      console.log(err);
    }
  };

  return (
    <div className="space-y-4 w-2/5 my-auto">
      <div>
        <h1 className="font-bold text-3xl ">Welcome,</h1>
        <h2 className="font-medium text-xl">
          Sign in to get started with
          <span className="font-bold text-cyan-400 text-xl"> Tucour</span>
        </h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <RequiredInput label="Email" isRequired={false}>
                {/* <PhoneInp onChange={field.onChange} value={field.value} /> */}
                <Input type="email" {...field} />
              </RequiredInput>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <RequiredInput label="Password" isRequired={false}>
                <PwdInput onChange={field.onChange} value={field.value} />
              </RequiredInput>
            )}
          />
          <div className="">
            <Link
              to="#"
              className="block ml-auto text-right text-sm underline text-t_primary-400 hover:text-t_primary-500 right-0"
            >
              Forgot password
            </Link>
          </div>
          <Button
            onClick={() => {}}
            className="bg-t_primary-400 hover:bg-t_primary-500 w-full"
          >
            Log In
          </Button>
        </form>
      </Form>
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
            to="/signup"
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
