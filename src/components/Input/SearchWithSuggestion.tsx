import { debounce } from "@/utils/debounce";
import React from "react";
import SearchInput from "./SearchInput";

interface SearchWithSuggestionProps<T> {
  className?: string;
  onKeySubmit?: (searchValue: string) => void;
  loadData: (searchKey: string) => Promise<T[]>;
  itemComponents: (item: T) => React.ReactNode;
  onSelect: (item: T) => void;
  placeholder?: string;
}

// Need an api to show students

const SearchWithSuggestion = <T,>({
  placeholder = "Search",
  onKeySubmit,
  loadData,
  itemComponents,
  onSelect,
}: SearchWithSuggestionProps<T>) => {
  const searchDebounce = debounce<string>(async (val) => {
    const recomList = await loadData(val);
    setRecomList(recomList);
  });
  const [showRecommendation, setShowRecommendation] = React.useState(false);
  const [recomList, setRecomList] = React.useState<T[]>([]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const showArea = document.getElementById("search-input");
      if (!showArea?.contains(target)) {
        setShowRecommendation(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative z-10 w-full md:w-3/4 lg:w-1/2 left-1/2 -translate-x-1/2"
      id="search-input"
    >
      <SearchInput
        placeholder={placeholder}
        className="block w-full sm:w-full md:w-full lg:w-full xl:w-full"
        onValueChange={(val) => {
          searchDebounce(val);
          if (onKeySubmit) {
            onKeySubmit(val);
          }
        }}
        onFocus={() => {
          setShowRecommendation(true);
        }}
      />
      {showRecommendation && recomList.length > 0 && (
        <ul
          id="search-recommend"
          className="mt-2 bg-white shadow-lg rounded-lg border border-gray-200 absolute w-full"
        >
          {recomList.map((item, idx) => (
            <li
              key={idx}
              onClick={() => {
                setShowRecommendation(false);
                if (onSelect) {
                  onSelect(item);
                }
              }}
            >
              {itemComponents(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchWithSuggestion;
