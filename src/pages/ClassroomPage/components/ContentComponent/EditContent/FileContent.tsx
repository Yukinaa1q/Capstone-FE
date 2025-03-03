import RequiredInput from "@/components/Input/RequiredInput";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { InferType, mixed, object, string } from "yup";

const FileContentSchema = object({
  contentName: string().required("Required"),
  contentDescription: string().default(""),
  file: mixed<File>().required("Required"),
});

const MAX_FILE_SIZE = 104857600; // 100MB

const FileContent = () => {
  const form = useForm({ resolver: yupResolver(FileContentSchema) });
  const onSubmit = (data: InferType<typeof FileContentSchema>) => {
    console.log(data);
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("contentName", data.contentName);
    formData.append("contentDescription", data.contentDescription);
    formData.append("contentType", "file");
    
    
    // an class to submit the conten
  };
  return (
    <Form {...form}>
      <form
        id="contentSubmit"
        className="mt-4 space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex gap-4">
          <FormField
            name="contentName"
            control={form.control}
            render={({ field }) => (
              <RequiredInput label="Content Name" className="grow shrink-0">
                <Input {...field} />
              </RequiredInput>
            )}
          />
          <FormField
            name="file"
            control={form.control}
            render={({ field }) => (
              <RequiredInput label="File" className="grow shrink">
                <Input
                  type="file"
                  maxLength={1048576}
                  onChange={(e) => {
                    if (e.target.files) {
                      field.onChange(e.target.files[0]);
                      if (e.target.files[0].size > MAX_FILE_SIZE) {
                        form.setError("file", {
                          message: "File size should not exceed 100MB",
                        });
                      }
                      form.setValue(
                        "contentName",
                        e.target.files?.[0].name ?? "DefaultFileName"
                      );
                    }
                  }}
                />
              </RequiredInput>
            )}
          />
        </div>
        <FormField
          name="contentDescription"
          control={form.control}
          render={({ field }) => (
            <RequiredInput label="Content Description" isRequired={false}>
              <Textarea
                {...field}
                className="focus-visible:ring-t_primary-400 resize-none"
                rows={10}
              />
            </RequiredInput>
          )}
        />
      </form>
    </Form>
  );
};

export default FileContent;
