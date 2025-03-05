import DateTimeInp from "@/components/Input/DateTimeInp";
import RequiredInput from "@/components/Input/RequiredInput";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import { Info } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { date, InferType, object, string } from "yup";

const SubmissionContentSchema = object({
  contentName: string().required("Required"),
  contentDescription: string(),
  from: date().default(new Date()),
  to: date().required("Required"),
});

const SubmissionContent = () => {
  const form = useForm({
    resolver: yupResolver(SubmissionContentSchema),
    defaultValues: {
      contentName: "",
      contentDescription: "",
    },
  });
  const onSubmit = (data: InferType<typeof SubmissionContentSchema>) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form
        id="contentSubmit"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2"
      >
        <FormField
          name="contentName"
          control={form.control}
          render={({ field }) => (
            <RequiredInput label="Content Name" className="min-h-0">
              <Input {...field} />
            </RequiredInput>
          )}
        />
        <FormField
          name="contentDescription"
          control={form.control}
          render={({ field }) => (
            <RequiredInput
              label="Content Description"
              isRequired={false}
              className="min-h-0 grow"
            >
              <Textarea
                {...field}
                rows={5}
                className="focus-visible:ring-t_primary-400"
              />
            </RequiredInput>
          )}
        />
        <div className="flex">
          <FormField
            name="from"
            control={form.control}
            render={({ field }) => (
              <RequiredInput
                label="Open From"
                isRequired={false}
                className="min-h-0 grow"
              >
                <div>
                  <DateTimeInp
                    initValue={field.value}
                    setValue={field.onChange}
                  />
                  <p className="flex text-xs items-center gap-1 text-gray-500 mt-1">
                    <Info size={12}/>
                    <span>Set to today if blank</span>
                  </p>
                </div>
              </RequiredInput>
            )}
          />
          <FormField
            name="to"
            control={form.control}
            render={({ field }) => (
              <RequiredInput
                label="Until"
                isRequired={false}
                className="min-h-0 grow"
              >
                <DateTimeInp
                  initValue={field.value}
                  setValue={field.onChange}
                />
              </RequiredInput>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default SubmissionContent;
