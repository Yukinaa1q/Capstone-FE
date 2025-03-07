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

interface TutorTable {
  tutorName: string;
  tutorId: string;
  tutorCode: string;
  tutorEmail: string;
  tutorPhone: string;
}

const TutorColumnDefs: ColumnDef<TutorTable>[] = [
  {
    accessorKey: "tutorCode",
    header: "TUTOR ID",
    cell: (props) => <div>{props.row.getValue("tutorCode")}</div>,
  },
  {
    accessorKey: "tutorName",
    header: "TUTOR NAME",
    cell: (props) => <div>{props.row.getValue("tutorName")}</div>,
  },
  {
    accessorKey: "tutorEmail",
    header: "EMAIL",
    cell: (props) => <div>{props.row.getValue("tutorEmail")}</div>,
  },
  {
    accessorKey: "tutorPhone",
    header: "PHONE",
    cell: (props) => <div>{props.row.getValue("tutorPhone")}</div>,
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

const TutorsPage = () => {
  // Need an API to fetch tutors data
  const [tutors] = React.useState<TutorTable[]>([
    {
      tutorName: "John Doe",
      tutorId: "1",
      tutorCode: "T001",
      tutorEmail: "johndoe@gmail.com",
      tutorPhone: "123456789",
    },
    {
      tutorName: "Jane Doe",
      tutorId: "2",
      tutorCode: "T002",
      tutorEmail: "jane@gmail.com",
      tutorPhone: "987654321",
    },
    {
      tutorName: "John Smith",
      tutorId: "3",
      tutorCode: "T003",
      tutorEmail: "jhsmth123@gmail.com",
      tutorPhone: "123456789",
    },
  ]);
  const table = useReactTable({
    data: tutors,
    columns: TutorColumnDefs,
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
      <DataTable columns={TutorColumnDefs} table={table} />
    </ContentLayout>
  );
};

export default TutorsPage;
