import DataTable from "@/components/DataTable";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
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
      <EditableCell cell={props} columnKey="staffName" className="w-36">
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
    cell: (props) => (
      <EditableCell cell={props} columnKey="staffPassword" className="w-32">
        <div>{props.row.getValue("staffPassword")}</div>
      </EditableCell>
    ),
  },
  {
    id: "editAction",
    cell: (props) => <ActionComponent cell={props} />,
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
