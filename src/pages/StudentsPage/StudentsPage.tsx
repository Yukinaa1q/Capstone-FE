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
  parentCode: string;
  parentId: string;
  parentName: string;
}

const StudentColumnDefs: ColumnDef<StudentTable>[] = [
  {
    accessorKey: "studentCode",
    header: "STUDENT ID",
    cell: (props) => <div>{props.row.getValue("studentCode")}</div>,
  },
  {
    accessorKey: "studentName",
    header: "STUDENT NAME",
    cell: (props) => <div>{props.row.getValue("studentName")}</div>,
  },
  {
    accessorKey: "parentCode",
    header: "PARENT ID",
    cell: (props) => <div>{props.row.getValue("parentCode")}</div>,
  },
  {
    accessorKey: "parentName",
    header: "PARENT NAME",
    cell: (props) => <div>{props.row.getValue("parentName")}</div>,
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
      studentCode: "STU-001",
      parentCode: "PAR-001",
      parentId: "1",
      parentName: "Jane Doe",
    },
    {
      studentName: "Jane Doe",
      studentId: "2",
      studentCode: "STU-002",
      parentCode: "PAR-002",
      parentId: "2",
      parentName: "John Doe",
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
