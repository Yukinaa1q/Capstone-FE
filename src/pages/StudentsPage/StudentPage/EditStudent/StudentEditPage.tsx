import BasicInput from "@/components/Input/BasicInput";
import DOBInput from "@/components/Input/DOBInput";
import RequiredInput from "@/components/Input/RequiredInput";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import ContentLayout from "@/layouts/ContentLayout";
import { cn } from "@/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useLoaderData } from "react-router";
import { date, InferType, object, string } from "yup";

const StudentEditSchema = object({
  fullName: string().required(),
  email: string().email().required(),
  dob: date().required(),
  address: string().required(),
  phoneNumber: string().required(),
});

const StudentEdit = () => {
  const query = useLoaderData();
  const { studentDetail } = query;
  const form = useForm({
    resolver: yupResolver(StudentEditSchema),
    defaultValues: {
      fullName: studentDetail.fullName,
      email: studentDetail.email,
      dob: new Date(studentDetail.dob),
      address: studentDetail.address,
      phoneNumber: studentDetail.phoneNumber,
    },
  });
  const onSubmit = (data: InferType<typeof StudentEditSchema>) => {
    console.log(data);
  };
  return (
    <ContentLayout>
      <Form {...form}>
        <form
          className="w-full p-8 shadow-lg border border-gray-50  rounded-lg space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h3 className="font-semibold text-2xl text-center">
            Update Tutor {studentDetail.userCode}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BasicInput form={form} field="fullName" label="Full Name" />
            <BasicInput form={form} field="email" label="Email" />
            <BasicInput form={form} field="address" label="Address" />
            <BasicInput form={form} field="phoneNumber" label="Phone Number" />
            <FormField
              name="dob"
              control={form.control}
              render={({ field }) => (
                <RequiredInput label="Date of Birth">
                  <DOBInput init={field.value} onChange={field.onChange} />
                </RequiredInput>
              )}
            />
          </div>
          <div className="flex justify-end gap-4">
            <Link
              className={cn(buttonVariants({ variant: "destructive" }))}
              to={"/students/" + studentDetail.userId}
            >
              Cancel
            </Link>
            <Button
              type="submit"
              className="bg-t_primary-500 hover:bg-t_primary-500/80"
            >
              Update
            </Button>
          </div>
        </form>
      </Form>
    </ContentLayout>
  );
};

export default StudentEdit;
