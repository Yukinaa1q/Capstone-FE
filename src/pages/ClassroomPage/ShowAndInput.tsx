import { Input } from "@/components/ui/input";

const ShowAndInput = ({
  isEdit,
  value,
  setValue,
}: {
  isEdit: boolean;
  value: string;
  setValue: (val: string) => void;
}) => {
  return isEdit ? (
    <Input
      type="number"
      value={value}
      max={10}
      step={0.5}
      onChange={(e) => {
        console.log("On change triggered", e.target.value);
        setValue(e.target.value);
      }}
      className="h-full p-0 rounded-none text-center w-10 mx-auto border-x-0 border-t-0 shadow border-b-2 border-t_primary-600 focus-visible:ring-0"
    />
  ) : (
    <span>{value}</span>
  );
};

export default ShowAndInput;
