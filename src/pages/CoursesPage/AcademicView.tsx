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
import { Link, useNavigate } from "react-router";
import ClearableSearch from "@/components/Input/ClearableSearch";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import TucourApi, { StatusError } from "@/utils/http";
import ICourseBE from "@/interfaces/ICourseBE";

// 1 Define type and data

type CourseOverview = {
  courseId: string;
  courseName: string;
  coursePrice: number;
  classNumber: number;
  registrationNumber: number;
};

// 2. Column Definition
const columns: ColumnDef<CourseOverview>[] = [
  {
    accessorKey: "courseId",
    header: () => <div className="font-semibold">COURSE ID</div>,
    cell: (props) => <div className="font-semibold text-t_secondary-600">{props.row.getValue("courseId")}</div>,
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
            <DropdownMenuItem>
              <Link to={"/courses/" + row.getValue("courseId")}>
                View Detail
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const AcademicView = () => {
  const navigate = useNavigate();
  const [courselist, setCourseList] = useState<CourseOverview[]>([]);
  useEffect(() => {
    const getCourse = async () => {
      try {
        const res = await TucourApi.call("/course/all-course", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        }) as ICourseBE[];
        setCourseList(
          res.map((course) => ({
            courseId: course.courseCode,
            courseName: course.courseTitle,
            coursePrice: course.coursePrice,
            classNumber: course.totalClassNumber,
            registrationNumber: course.totalStudentNumber,
          }))
        );
      } catch (error) {
        if (error instanceof StatusError) {
          console.error(error);
          if (error.statusCode === 401) {
            navigate("/staff/login");
          }
        }
        else 
          console.log("Not relate to fetching error");
      }
    };
    getCourse();
  }, []);

  const table = useReactTable({
    data: courselist,
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
        handleChange={(e) => table.setGlobalFilter(e)}
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
            to="/courses/new"
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
