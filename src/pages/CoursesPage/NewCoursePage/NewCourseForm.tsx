import RequiredInput from "@/components/RequiredInput";
import TextEditor from "@/components/TextEditor/TextEditor";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const courseFormSchema = yup
  .object({
    courseTitle: yup.string().required("Course title is required"),
    courseCode: yup.string().required("Course code is required"),
    courseImage: yup.mixed(),
    courseDescription: yup.mixed(),
    courseOutline: yup.mixed(),
  })
  .required();

const NewCourseForm = ({ className }: { className?: string }) => {
  const form = useForm({ resolver: yupResolver(courseFormSchema) });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log(data);
        })}
        className={cn(className, "space-y-4")}
      >
        <FormField
          name="courseTitle"
          render={({ field }) => (
            <RequiredInput label="Course Title">
              <Input {...field} />
            </RequiredInput>
          )}
        />
        <div className="flex justify-between">
          <FormField
            name="courseCode"
            render={({ field }) => (
              <RequiredInput label="Course Code">
                <Input {...field} className="" />
              </RequiredInput>
            )}
          />
          <FormField
            name="courseImage"
            render={({ field }) => (
              <RequiredInput label="Course Image">
                <Input type="file" {...field} className="py-0 pl-0 file:px-4" />
              </RequiredInput>
            )}
          />
        </div>
        <FormField
          name="courseDescription"
          render={({ field }) => (
            <RequiredInput label="Course Description">
              <TextEditor/>
            </RequiredInput>
          )}
        />
        <FormField
          name="courseOutline"
          render={({ field }) => (
            <RequiredInput label="Course Outline">
              <Textarea {...field} />
            </RequiredInput>
          )}
        />
        <Button type="submit">Create Course</Button>
      </form>
    </Form>
  );
};

export default NewCourseForm;
