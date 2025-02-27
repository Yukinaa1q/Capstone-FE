import DataTable from "@/components/DataTable";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useState } from "react";
import { ActionComponent, EditableCell } from "./util";
import StaffAccountCtx from "./staffAccCtx";

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
      <EditableCell cell={props} columnKey="staffName">
        <div>{props.row.getValue("staffName")}</div>
      </EditableCell>
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
    cell: (props) => <div>{props.row.getValue("staffPassword")}</div>,
  },
  {
    id: "editAction",
    cell: (props) => <ActionComponent cell={props}/>
  },
];

const StaffAccountPage = () => {
  const [data, setData] = useState<(IStaffAccount & IsEditing)[]>([
    {
      staffCode: "STF001",
      staffId: "1",
      staffName: "John Doe",
      staffRole: "Admin",
      staffEmail: "johndoe01@gmail.com",
      staffPassword: "password",
      isEditing: false,
    },
    {
      staffCode: "STF002",
      staffId: "2",
      staffName: "Jane Doe",
      staffRole: "Staff",
      staffEmail: "janethebooba111@gmail.com",
      staffPassword: "password",
      isEditing: false,
    },
  ]);
  const tanTable = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <section className="px-8 pt-4">
      <StaffAccountCtx.Provider value={{ data, setData }}>
        <DataTable table={tanTable} columns={columns} />
      </StaffAccountCtx.Provider>
    </section>
  );
};

export default StaffAccountPage;
