import { debounce } from "@/utils/debounce";
import SearchInput from "./SearchInput";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface SearchWithSuggestionProps {
  className?: string;
  onKeySubmit?: (searchValue: string) => void;
  value?: string;
}

const SearchWithSuggestion = ({
  onKeySubmit,
  value = "",
}: SearchWithSuggestionProps) => {
  const searchDebounce = debounce<string>((val) => {
    console.log("searchDebounce", val);
  });

  return (
    <div className="relative">
      <SearchInput
        onValueChange={(val) => {
          searchDebounce(val);
          if (onKeySubmit) {
            onKeySubmit(val);
          }
        }}
      />
      <ul className="relative w-full md:w-3/4 lg:w-1/2 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg mt-2 p-2 border">
        <li className="flex gap-2 hover:bg-t_primary-100/50 p-2 rounded-lg cursor-pointer">
          <Avatar>
            <AvatarImage/>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-semibold text-gray-700">Client Full Name</p>
            <p className="text-t_primary-500">Client ID</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SearchWithSuggestion;
