import { UseFormReturn } from "react-hook-form";
import { FormField } from "../ui/form";
import { Input } from "../ui/input";
import RequiredInput from "./RequiredInput";

const BasicInput = ({
  form,
  field,
  label,
}: {
  form: UseFormReturn<any>;
  field: string;
  label: string;
}) => {
  return (
    <FormField
      name={field}
      control={form.control}
      render={({ field }) => (
        <RequiredInput label={label}>
          <Input {...field} />
        </RequiredInput>
      )}
    />
  );
};

export default BasicInput;
