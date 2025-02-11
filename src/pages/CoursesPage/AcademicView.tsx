import DataTable from "@/components/DataTable";
import toVND from "@/utils/currencyFormat";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, SquarePlus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";
import ClearableSearch from "@/components/ClearableSearch";
import { cn } from "@/lib/utils";

// 1 Define type and data

type CourseOverview = {
  courseId: string;
  courseName: string;
  coursePrice: number;
  classNumber: number;
  registrationNumber: number;
};

export const courseList: CourseOverview[] = [
  {
    courseId: "MATH001",
    courseName: "Toán 12 Cơ Bản",
    coursePrice: 1250000,
    classNumber: 3,
    registrationNumber: 100,
  },
  {
    courseId: "MATH002",
    courseName: "Toán 12 Nâng Cao",
    coursePrice: 1350000,
    classNumber: 10,
    registrationNumber: 120,
  },
  {
    courseId: "MATH003",
    courseName: "Toán 12 Chuyên",
    coursePrice: 1450000,
    classNumber: 5,
    registrationNumber: 150,
  },
  {
    courseId: "CHEM005",
    courseName: "Hoá Hữu Cơ Đại Cương",
    coursePrice: 1250000,
    classNumber: 2,
    registrationNumber: 100,
  },
];

// 2. Column Definition

const columns: ColumnDef<CourseOverview>[] = [
  {
    accessorKey: "courseId",
    header: () => <div className="font-semibold">COURSE ID</div>,
  },
  {
    accessorKey: "courseName",
    header: () => (
      <div className="font-semibold">
        <p>COURSE NAME</p>
      </div>
    ),
  },
  {
    accessorKey: "registrationNumber",
    header: () => <div className="font-semibold text-center">STUDENTS</div>,
    cell: (args) => (
      <div className="text-center">
        {args.row.getValue("registrationNumber")}
      </div>
    ),
  },
  {
    accessorKey: "classNumber",
    header: () => <div className="font-semibold text-center">CLASSES</div>,
    cell: (args) => (
      <div className="text-center">{args.row.getValue("classNumber")}</div>
    ),
  },
  {
    accessorKey: "coursePrice",
    header: () => <div className="font-semibold text-center">PRICE</div>,
    cell: ({ row }) => (
      <div className="text-center">{toVND(row.getValue("coursePrice"))}</div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem><Link to={"/courses/"+row.getValue("courseId")}>View Detail</Link></DropdownMenuItem>
            <DropdownMenuItem>Class List</DropdownMenuItem>
            <DropdownMenuItem>Student List</DropdownMenuItem>
            <DropdownMenuItem>Tutor List</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const AcademicView = () => {
  const table = useReactTable({
    data: courseList,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
  });
  return (
    <section className="px-8 pt-4">
      <AddNewCourse />
      <ClearableSearch
        className="my-4 w-full md:w-3/4 lg:w-1/2 mx-auto"
        handleChange={(e) => table.setGlobalFilter(e.target.value)}
      />
      <DataTable table={table} columns={columns} />
    </section>
  );
};

const AddNewCourse = () => {
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
        <TooltipContent side="bottom">Add new course</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AcademicView;
