import DataTable from "@/components/DataTable";
import toVND from "@/utils/currencyFormat";
import { ColumnDef } from "@tanstack/react-table";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";

// 1 Define type and data

type CourseOverview = {
  courseId: string;
  courseName: string;
  coursePrice: number;
  registrationNumber: number;
};

export const courseList: CourseOverview[] = [
  {
    courseId: "MATH001",
    courseName: "Toán 12 Cơ Bản",
    coursePrice: 1250000,
    registrationNumber: 100,
  },
  {
    courseId: "MATH002",
    courseName: "Toán 12 Nâng Cao",
    coursePrice: 1350000,
    registrationNumber: 120,
  },
  {
    courseId: "MATH003",
    courseName: "Toán 12 Chuyên",
    coursePrice: 1450000,
    registrationNumber: 150,
  },
  {
    courseId: "CHEM005",
    courseName: "Hoá Hữu Cơ Đại Cương",
    coursePrice: 1250000,
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
    header: () => <div className="font-semibold">COURSE NAME</div>,
  },
  // {
  //   accessorKey: "registrationNumber",
  //   header: () => <div className="font-semibold">REGISTRATION NUMBER</div>,
  // },
  {
    accessorKey: "coursePrice",
    header: () => <div className="font-semibold">COURSE PRICE</div>,
    cell: ({ row }) => <div>{toVND(row.getValue("coursePrice"))}</div>,
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Copy payment ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const CoursesPage = () => {
  return (
    <section className="px-8 pt-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className="">
            <Link to="new" className={buttonVariants({variant: "outline", size: "icon"})} >
              <SquarePlus
                strokeWidth={1.5}
                style={{ width: "1.25rem", height: "1.25rem" }}
              />
            </Link>
          </TooltipTrigger>
          <TooltipContent>Add new course</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DataTable columns={columns} data={courseList} />
    </section>
  );
};

export default CoursesPage;
