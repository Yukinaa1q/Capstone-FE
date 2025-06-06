import PwdInput from "@/components/Input/PwdInput";
import RequiredInput from "@/components/Input/RequiredInput";
import RoleInput from "@/components/Input/RoleInput";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PhoneInp from "@/components/Input/PhoneInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TucourApi from "@/utils/http";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface SignUpData {
  role: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  repwd: string;
}

const signupSchema = yup
  .object({
    role: yup.string().required("Role is required"),
    name: yup.string().required("Full name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    password: yup.string().required("Password is required"),
    repwd: yup
      .string()
      .required("Re-enter password is required")
      .oneOf([yup.ref("password")], "Password must match"),
  })
  .required();

const SignupForm = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const form = useForm<SignUpData>({
    defaultValues: {
      name: "",
      role: "",
      email: "",
      phone: "",
      password: "",
      repwd: "",
    },
    resolver: yupResolver<SignUpData>(signupSchema),
  });
  const navigate = useNavigate();
  const handleSubmit = async (formData: SignUpData) => {
    const stringify = JSON.stringify(formData);
    try {
      if (formData.role === "student") {
        await TucourApi.call("/authentication/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: stringify,
        });
      } else if (formData.role === "tutor") {
        await TucourApi.call("/authentication/signup/tutor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: stringify,
        });
      } else {
        throw new Error("Invalid role");
      }
      navigate("/login");
    } catch (error) {
      const signupError = error as { message: string };
      setErrorMsg(signupError.message);
    }
  };

  return (
    <div className="w-full md:w-2/3 lg:w-2/5">
      <div>
        <h1 className="font-bold text-3xl">Sign Up Now!</h1>
        <h2 className="font-medium">To not miss our latest features</h2>
      </div>
      {errorMsg && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Sign Up Error!</AlertTitle>
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form
          className="mt-4 space-y-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          {/* FormField is actually a Controller in react hook form */}
          <FormField
            name="role"
            control={form.control}
            // defaultValue={"student"}
            render={({ field }) => (
              <RequiredInput label="You are" orientation="horizontal">
                <RoleInput
                  onChange={(val) => field.onChange(val)}
                  value={field.value}
                />
              </RequiredInput>
            )}
          />
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <RequiredInput label="Full Name">
                <Input type="text" {...field} />
              </RequiredInput>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <RequiredInput label="Email">
                <Input type="email" {...field} />
              </RequiredInput>
            )}
          />
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <RequiredInput label="Phone Number">
                <PhoneInp onChange={field.onChange} value={field.value} />
              </RequiredInput>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <RequiredInput label="Password">
                <PwdInput onChange={field.onChange} value={field.value} />
              </RequiredInput>
            )}
          />
          <FormField
            name="repwd"
            control={form.control}
            render={({ field }) => (
              <RequiredInput label="Re-enter Password">
                <PwdInput onChange={field.onChange} value={field.value} />
              </RequiredInput>
            )}
          />
          <Button className="bg-t_primary-400 hover:bg-t_primary-500 w-full">
            Register
          </Button>
        </form>
      </Form>
      <p className="text-sm text-center mt-2">
        Already has an account?{" "}
        <span>
          <Link
            to="/login"
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
