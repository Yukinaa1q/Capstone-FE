import { InferType, mixed, object, string } from "yup";
import { Descendant } from "slate";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import RequiredInput from "@/components/Input/RequiredInput";
import { Input } from "@/components/ui/input";
import TextEditor from "@/components/TextEditor/TextEditor";

const TextContentSchema = object({
  contentName: string().required("Required"),
  contentText: mixed<Descendant[]>().required("Required"),
});

const TextContent = () => {
  const form = useForm({
    resolver: yupResolver(TextContentSchema),
    defaultValues: {
      contentName: "",
      contentText: [
        {
          type: "p",
          children: [{ text: "" }],
        },
      ],
    },
  });
  const onSubmit = (data: InferType<typeof TextContentSchema>) => {
    console.log(data);

    // an class to submit the conten
  };
  return (
    <Form {...form}>
      <form
        id="contentSubmit"
        className="pt-2 min-h-0 h-full gap-4 flex flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
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
          name="contentText"
          control={form.control}
          render={({ field }) => (
            <RequiredInput
              label="Content Description"
              isRequired={false}
              className="min-h-0 grow"
            >
              <TextEditor
                initValue={field.value}
                onTextEditorChange={(text) => field.onChange(text)}
                className="h-44 overflow-y-scroll"
              />
            </RequiredInput>
          )}
        />
      </form>
    </Form>
  );
};

export default TextContent;
