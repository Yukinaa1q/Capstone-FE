import ClearableSearch from "@/components/ClearableSearch";
import DataTable from "@/components/DataTable";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Link } from "react-router";
import StaffAccountCtx from "./staffAccCtx";
import { ActionComponent, EditableCell } from "./util";

export interface IStaffAccount {
  staffCode: string;
  staffId: string;
  staffName: string;
  staffRole: string;
  staffEmail: string;
  staffPassword: string;
}

export interface IsEditing {
  isEditing: boolean;
  prevName: string;
  prevPassword: string;
}

const columns: ColumnDef<IStaffAccount & IsEditing>[] = [
  {
    accessorKey: "staffCode",
    header: "STAFF CODE",
    cell: (props) => <div>{props.row.getValue("staffCode")}</div>,
  },
  {
    accessorKey: "staffName",
    header: "STAFF NAME",
    cell: (props) => (
      <div className="w-48">
        <EditableCell cell={props} columnKey="staffName">
          {props.row.getValue("staffName")}
        </EditableCell>
      </div>
    ),
  },
  {
    accessorKey: "staffRole",
    header: "ROLE",
    cell: (props) => <div>{props.row.getValue("staffRole")}</div>,
  },
  {
    accessorKey: "staffEmail",
    header: "EMAIL",
    cell: (props) => <div>{props.row.getValue("staffEmail")}</div>,
  },
  {
    accessorKey: "staffPassword",
    header: "PASSWORD",
    cell: (props) => (
      <div className="w-32">
        <EditableCell cell={props} columnKey="staffPassword">
          {props.row.getValue("staffPassword")}
        </EditableCell>
      </div>
    ),
  },
  {
    id: "editAction",
    header: () => (
      <div>
        <Link
          to="/courses/new"
          className={cn(
            buttonVariants({ variant: "link", size: "icon" }),
            "relative left-1/2 -translate-x-1/2 size-6 rounded-full"
          )}
        >
          Add Staff
        </Link>
      </div>
    ),
    cell: (props) => <ActionComponent cell={props} />,
  },
];

const StaffAccountPage = () => {
  const [data, setData] = useState<(IStaffAccount & IsEditing)[]>([
    {
      staffCode: "STF001",
      staffId: "1",
      staffName: "John Doe Do di do di",
      staffRole: "Admin",
      staffEmail: "johndoe01@gmail.com",
      staffPassword: "password",
      isEditing: false,
      prevName: "John Doe",
      prevPassword: "password",
    },
    {
      staffCode: "STF002",
      staffId: "2",
      staffName: "Jane Doe",
      staffRole: "Staff",
      staffEmail: "janethebooba111@gmail.com",
      staffPassword: "password",
      isEditing: false,
      prevName: "Jane Doe",
      prevPassword: "password",
    },
  ]);
  const tanTable = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
  });
  return (
    <section className="px-8 pt-4">
      <ClearableSearch
        handleChange={(searchKey) => tanTable.setGlobalFilter(searchKey)}
        className="my-4 w-full md:w-3/4 lg:w-1/2 mx-auto"
      />
      <StaffAccountCtx.Provider value={{ data, setData }}>
        <DataTable table={tanTable} columns={columns} />
      </StaffAccountCtx.Provider>
    </section>
  );
};

export default StaffAccountPage;
