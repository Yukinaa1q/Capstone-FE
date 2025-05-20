import React from "react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "../ui/select";

const Selection = ({
  disabled = false,
  value,
  onSelect,
  selectList,
  placeholder,
  display = (value) => value,
  className,
}: {
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  onSelect?: (selectValue: string) => void;
  selectList: string[];
  display?: (value: string) => React.ReactNode;
  className?: string;
}) => {
  return (
    <Select value={value} onValueChange={onSelect} disabled={disabled}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} defaultValue={value} />
      </SelectTrigger>
      <SelectContent>
        {selectList.map((item, index) => (
          <SelectItem value={item} key={index}>
            {display(item)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Selection;
