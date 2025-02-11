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
import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, SquarePlus } from "lucide-react";
import React from "react";
import { Link } from "react-router";

interface IClassTable {
  classId: string;
  classRoom: string;
  classStudents: number;
  tutorId: string;
  tutor: string;
}

const columnHelper = createColumnHelper<IClassTable>();

const defaultColumns = [
  columnHelper.accessor("classId", {
    header: () => <div className="text-center">CLASS ID</div>,
    cell: (props) => {
      return <div className="text-center">{props.row.original.classId}</div>;
    },
  }),
  columnHelper.accessor("classRoom", {
    header: () => <div className="text-center">CLASSROOM</div>,
    cell: (props) => {
      return <div className="text-center">{props.row.original.classRoom}</div>;
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
              <Link to={"/classes/" + props.row.getValue("classId")}>
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
  const [data, setData] = React.useState<IClassTable[]>([
    {
      classId: "CC01",
      classRoom: "A1",
      classStudents: 30,
      tutorId: "1",
      tutor: "John Doe",
    },
    {
      classId: "CC02",
      classRoom: "A2",
      classStudents: 30,
      tutorId: "2",
      tutor: "Jane Doe",
    },
    {
      classId: "CC03",
      classRoom: "A3",
      classStudents: 30,
      tutorId: "3",
      tutor: "John Smith",
    },
    {
      classId: "CC04",
      classRoom: "A4",
      classStudents: 30,
      tutorId: "4",
      tutor: "Jane Smith",
    },
    {
      classId: "CC05",
      classRoom: "A5",
      classStudents: 30,
      tutorId: "5",
      tutor: "John Doe",
    },
    {
      classId: "CC06",
      classRoom: "A6",
      classStudents: 30,
      tutorId: "6",
      tutor: "Jane Doe",
    },
    {
      classId: "CC07",
      classRoom: "A7",
      classStudents: 30,
      tutorId: "7",
      tutor: "John Smith",
    },
    {
      classId: "CC08",
      classRoom: "A8",
      classStudents: 30,
      tutorId: "8",
      tutor: "Jane Smith",
    },
    {
      classId: "CC09",
      classRoom: "A9",
      classStudents: 30,
      tutorId: "9",
      tutor: "John Doe",
    },
    {
      classId: "CC10",
      classRoom: "A10",
      classStudents: 30,
      tutorId: "10",
      tutor: "Jane Doe",
    },
    {
      classId: "CC11",
      classRoom: "A11",
      classStudents: 30,
      tutorId: "11",
      tutor: "John Smith",
    },
    {
      classId: "CC12",
      classRoom: "A12",
      classStudents: 30,
      tutorId: "12",
      tutor: "Jane Smith",
    },
    {
      classId: "CC13",
      classRoom: "A13",
      classStudents: 30,
      tutorId: "13",
      tutor: "John Doe",
    },
    {
      classId: "CC14",
      classRoom: "A14",
      classStudents: 50,
      tutorId: "14",
      tutor: "Jane Doe",
    },
  ]);

  const table = useReactTable({
    columns: defaultColumns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <section className="px-8 py-4">
      <AddNewClass />
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
