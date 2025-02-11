import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { InferType, object, string } from "yup";

const classFormSchema = object({
  courseTitle: string(),
  courseCode: string().required("Course code is required"),
}).required();

const initValue = {
  courseTitle: "",
};

const ClassForm = ({
  className,
  defaultValues = initValue,
}: {
  className?: string;
  defaultValues: InferType<typeof classFormSchema>;
}) => {
  const form = useForm({
    defaultValues,
    resolver: yupResolver(classFormSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(className, "space-y-8 mt-8")}
      >
        <FormField
          control={form.control}
          name="courseTitle"
          render={({ field }) => (
            <Input {...field} placeholder="Enter course title" disabled/>
          )}
        />

        <FormField
          control={form.control}
          name="courseCode"
          render={({ field }) => (
            
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ClassForm;
