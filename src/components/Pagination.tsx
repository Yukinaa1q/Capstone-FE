import React, {
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  children?: React.ReactNode;
  size: number;
  total: number;
  onPageChange?: (pageInfo: {currentPage: number, perPage: number, totalItem: number}) => void;
}

interface PaginationCtxProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  MAX_PAGE: number;
}

const PaginationCtx = createContext<PaginationCtxProps>({
  currentPage: 1,
  setCurrentPage: () => {},
  MAX_PAGE: 1,
});

const MyPagination = ({
  children,
  total,
  onPageChange,
  size = 10,
}: PaginationProps) => {
  const MAX_PAGE = Math.ceil(total / size);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    onPageChange && onPageChange({currentPage, perPage: size, totalItem: total});
  }, [currentPage]);
  return (
    <PaginationCtx.Provider value={{ currentPage, setCurrentPage, MAX_PAGE }}>
      {children}
    </PaginationCtx.Provider>
  );
};

export const PaginationNav = ({ className }: { className?: string }) => {
  const ctx = useContext(PaginationCtx);
  const startPage =
    ctx.currentPage - 2 > 0
      ? ctx.currentPage + 1 >= ctx.MAX_PAGE
        ? ctx.MAX_PAGE - 4
        : ctx.currentPage - 2
      : 1;
  const endPage = startPage + 4 < ctx.MAX_PAGE ? startPage + 4 : ctx.MAX_PAGE;
  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant={"ghost"}
            disabled={ctx.currentPage === 1 ? true : false}
            onClick={() => ctx.setCurrentPage(1)}
            className="size-9 rounded-md flex items-center justify-center"
          >
            <ChevronFirst size={16} />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            variant={"ghost"}
            disabled={ctx.currentPage === 1 ? true : false}
            onClick={() => ctx.setCurrentPage((prev) => prev - 1)}
            className="size-9 hover:bg-slate-100 rounded-md flex items-center justify-center"
          >
            <ChevronLeft size={16} />
          </Button>
        </PaginationItem>
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => i + startPage // A list of page numbers appear in the pagination
        ).map((page, idx) => (
          <PaginationItem key={idx}>
            <PaginationLink
              onClick={() => ctx.setCurrentPage(page)}
              className={cn(
                ctx.currentPage === page && "bg-slate-100",
                "hover:cursor-default"
              )}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <Button
            variant={"ghost"}
            disabled={ctx.currentPage === ctx.MAX_PAGE ? true : false}
            onClick={() => ctx.setCurrentPage((prev) => prev + 1)}
            className="size-9 hover:bg-slate-100 rounded-md flex items-center justify-center"
          >
            <ChevronRight size={16} />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            variant={"ghost"}
            disabled={ctx.currentPage === ctx.MAX_PAGE ? true : false}
            onClick={() => ctx.setCurrentPage(ctx.MAX_PAGE)}
            className="size-9 hover:bg-slate-100 rounded-md flex items-center justify-center"
          >
            <ChevronLast size={16} />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export const PaginationGoto = () => {
  const ctx = useContext(PaginationCtx);
  return (
    <div className="flex items-center">
      <label htmlFor="goto">Goto</label>{" "}
      <input
        id="goto"
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const page = parseInt(e.currentTarget.value);
            if (page > 0 && page <= ctx.MAX_PAGE) {
              ctx.setCurrentPage(page);
            }
          }
        }}
        className="text-center focus:outline-none  border-b-2 w-6 mx-1 leading-[0]"
      />
      <p className="w-8">/ {ctx.MAX_PAGE}</p>
    </div>
  );
};

export default MyPagination;
