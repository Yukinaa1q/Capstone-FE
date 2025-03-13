import DataTable from "@/components/DataTable";
import ClearableSearch from "@/components/Input/ClearableSearch";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ContentLayout from "@/layouts/ContentLayout";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { Link } from "react-router";

interface StudentTable {
  studentName: string;
  studentId: string;
  studentCode: string;
  studentEmail: string;
}

const StudentColumnDefs: ColumnDef<StudentTable>[] = [
  {
    accessorKey: "studentCode",
    header: "STUDENT ID",
    cell: (props) => <div className="font-semibold text-t_secondary-600">{props.row.getValue("studentCode")}</div>,
  },
  {
    accessorKey: "studentName",
    header: "STUDENT NAME",
    cell: (props) => <div>{props.row.getValue("studentName")}</div>,
  },
  {
    accessorKey: "studentEmail",
    header: "EMAIL",
    cell: (props) => <div>{props.row.getValue("studentEmail")}</div>,
  },
  {
    accessorKey: "studentId",
    header: "",
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
              <Link to={"/students/" + props.cell.getValue()}>
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
  },
];

const StudentsPage = () => {
  // Need an API to fetch tutors data
  const [tutors] = React.useState<StudentTable[]>([
    {
      studentName: "John Doe",
      studentId: "1",
      studentCode: "STU001",
      studentEmail: "student01@gmail.com"
    },
    {
      studentName: "Jane Doe",
      studentId: "2",
      studentCode: "STU002",
      studentEmail: "student02@gmail.com"
    }
  ]);
  const table = useReactTable({
    data: tutors,
    columns: StudentColumnDefs,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
  });
  return (
    <ContentLayout>
      <ClearableSearch
        className="my-4 w-full md:w-3/4 lg:w-1/2 mx-auto"
        handleChange={(e) => table.setGlobalFilter(e)}
      />
      <DataTable columns={StudentColumnDefs} table={table} />
    </ContentLayout>
  );
};

export default StudentsPage;
