import { GoogleIcon, XIcon } from "@/assets/icons";
import PwdInput from "@/components/PwdInput";
import RequiredInput from "@/components/RequiredInput";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType, object, string } from "yup";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import TucourApi, { StatusError } from "@/utils/http";
import { jwtDecoder } from "@/utils/utils";
import { useAppDispatch } from "@/hooks/reduxHook";
import { setUser } from "@/store/authenSlice";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import BrandLogo from "@/components/BrandLogo";

const staffLoginSchema = object({
  email: string().required("Email is required"),
  password: string().required("Password is required"),
});

const StaffLogin = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const form = useForm({
    resolver: yupResolver(staffLoginSchema),
  });
  const onSubmit = async (data: InferType<typeof staffLoginSchema>) => {
    console.log(data);
  };

  return (
    <main className="w-full h-screen p-8">
      <BrandLogo size="lg"/>
      <div className="space-y-4 w-full lg:w-2/5 xl:w-1/3 absolute border p-4 lg:p-10 rounded-lg left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-t_primary-600/10 backdrop-blur-lg">
        <div>
          <h1 className="font-bold text-3xl ">Welcome,</h1>
          <h2 className="font-medium text-xl">
            Sign in to get started with
            <span className="font-bold text-cyan-400 text-xl"> Tucour</span>
          </h2>
        </div>
        {errorMsg && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMsg}</AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <RequiredInput label="Email" isRequired={false}>
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
            <Button className="bg-t_primary-400 hover:bg-t_primary-500 w-full">
              Log In
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default StaffLogin;
