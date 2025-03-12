import subjects from "@/interfaces/Subject";
import { Check } from "lucide-react";
import SearchSelect, { ListItem, SearchSelectProps } from "./SearchSelect";

const subjectList: ListItem[] = subjects.map((subject) => ({
  value: subject,
  label: subject
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" "),
}));

const SubjectSelect = ({
  value,
  onValueChange,
  className,
}: {
  value?: string;
  className?: string;
  onValueChange?: (s: string) => void;
}) => {
  return (
    <SearchSelect
      value={value}
      onValueChange={onValueChange}
      className={className}
      list={subjectList}
      placeholder="Choose a subject"
      filterFn={(value, search) => {
        return value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
      }}
      renderChild={(item, value) => (
        <>
          {item.label}
          {value === item.value && (
            <Check size={16} strokeWidth={2} className="ml-auto" />
          )}
        </>
      )}
    />
  );
};

export default SubjectSelect;
