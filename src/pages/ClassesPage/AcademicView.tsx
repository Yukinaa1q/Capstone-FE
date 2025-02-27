import ClearableSearch from "@/components/ClearableSearch";
import DataTable from "@/components/DataTable";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import TucourApi from "@/utils/http";
import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, SquarePlus } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router";

interface IClassTable {
  classId: string;
  classCode: string;
  classStudents: number;
  tutorId: string;
  tutor: string;
}

const columnHelper = createColumnHelper<IClassTable>();

const defaultColumns = [
  // columnHelper.accessor("classId", {
  //   header: () => <div className="text-center">CLASS ID</div>,
  //   cell: (props) => {
  //     return <div className="text-center">{props.row.original.classId}</div>;
  //   },
  // }),
  columnHelper.accessor("classCode", {
    header: () => <div className="text-center">CLASSCODE</div>,
    cell: (props) => {
      return <div className="text-center">{props.row.original.classCode}</div>;
    },
  }),
  columnHelper.accessor("classStudents", {
    header: () => <div className="text-center">STUDENTS</div>,
    cell: (props) => {
      return (
        <div className="text-center">{props.row.original.classStudents}</div>
      );
    },
  }),
  columnHelper.accessor("tutorId", {
    header: () => <div className="text-center">TUTOR ID</div>,
    cell: (props) => {
      return <div className="text-center">{props.row.original.tutorId}</div>;
    },
  }),
  columnHelper.accessor("tutor", {
    header: () => <div className="text-center">TUTOR</div>,
    cell: (props) => {
      return <div className="">{props.row.original.tutor}</div>;
    },
  }),
  columnHelper.display({
    id: "class_actions",
    cell: (props) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link to={"/classes/" + props.row.getValue("classCode")}>
                View Detail
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Class List</DropdownMenuItem>
            <DropdownMenuItem>Student List</DropdownMenuItem>
            <DropdownMenuItem>Tutor List</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
] as Array<ColumnDef<IClassTable, unknown>>;

const AcademicView = () => {
  const [data, setData] = React.useState<IClassTable[]>([]);

  useEffect(() => {
    const getClassesList = async () => {
      const res = await TucourApi.call("/class/view-class", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(res);
    };
    getClassesList();
  }, []);
  const table = useReactTable({
    columns: defaultColumns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
  });
  return (
    <section className="px-8 py-4">
      <AddNewClass />
      <ClearableSearch
        handleChange={(e) => {
          table.setGlobalFilter(e);
        }}
        className="mt-4 w-full md:w-3/4 lg:w-1/2 mx-auto mb-2"
      />
      <DataTable columns={defaultColumns} table={table} />
    </section>
  );
};

const AddNewClass = () => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to="new"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "relative left-full -translate-x-full"
            )}
          >
            <SquarePlus
              strokeWidth={1.5}
              style={{ width: "1.25rem", height: "1.25rem" }}
            />
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom">Add new class</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AcademicView;
