import DOBInput from "@/components/DOBInput";
import PwdInput from "@/components/PwdInput";
import RequiredInput from "@/components/RequiredInput";
import RoleInput from "@/components/RoleInput";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface SignUpData {
  role: string;
  fullname: string;
  email: string;
  dob: Date;
  pwd: string;
  repwd: string;
}

const SignupForm = () => {
  const form = useForm<SignUpData>({
    defaultValues: {
      fullname: "",
      role: "",
      email: "",
      pwd: "",
      repwd: "",
    },
  });
  const handleSubmit = (formData: SignUpData) => {
    console.log(formData);
    console.log("Date: ", formData.dob.getDay(), formData.dob.getMonth(), formData.dob.getFullYear());
  };

  return (
    <div className="mt-8 w-full md:w-2/3 lg:w-2/5">
      <div>
        <h1 className="font-bold text-3xl">Sign Up Now!</h1>
        <h2 className="font-medium">To not miss our latest features</h2>
      </div>
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
            name="fullname"
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
            name="dob"
            control={form.control}
            render={({ field }) => (
              <RequiredInput label="Date of Birth" isRequired={false}>
                <DOBInput onSelect={field.onChange} value={field.value}/>
              </RequiredInput>
            )}
          />
          <FormField
            name="pwd"
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
