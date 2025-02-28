import ClearableSearch from "@/components/ClearableSearch";
import DataTable from "@/components/DataTable";
import PwdInput from "@/components/PwdInput";
import RequiredInput from "@/components/RequiredInput";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Role } from "@/interfaces/common";
import { IStaffAccount } from "@/interfaces/IStaffCRUD";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { InferType, object, ref, string } from "yup";
import StaffAccountCtx from "./staffAccCtx";
import { ActionComponent, EditableCell } from "./util";
import { AnimatePresence, motion } from "motion/react";

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
    header: () => {
      const FormTrigger = () => {
        const ctx = useContext(StaffAccountCtx);
        return (
          <div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                ctx.setShowForm(true);
              }}
              className="relative left-1/2 -translate-x-1/2 border-t_primary-200 hover:bg-t_primary-100/50"
            >
              Add Staff
            </Button>
          </div>
        );
      };
      return <FormTrigger />;
    },
    cell: (props) => <ActionComponent cell={props} />,
  },
];

const newStaffSchema = object({
  staffName: string().required("Required"),
  staffRole: string<Role>().required("Required"),
  staffEmail: string().email().required("Required"),
  staffPassword: string().required("Required"),
  staffRePassword: string()
    .oneOf([ref("staffPassword")], "Password must match")
    .required("Required"),
});

const StaffAccountPage = () => {
  const [data, setData] = useState<(IStaffAccount & IsEditing)[]>([
    {
      staffCode: "STF001",
      staffId: "1",
      staffName: "John Doe Do di do di",
      staffRole: "academic",
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
      staffRole: "support",
      staffEmail: "janethebooba111@gmail.com",
      staffPassword: "password",
      isEditing: false,
      prevName: "Jane Doe",
      prevPassword: "password",
    },
  ]);
  const [showForm, setShowForm] = useState(false);

  const form = useForm({
    resolver: yupResolver(newStaffSchema),
  });
  const tanTable = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
  });

  const onSubmit = (data: InferType<typeof newStaffSchema>) => {
    console.log(data);
    // const sendData: INewStaffAccount = {};
  };

  return (
    <section className="px-8 pt-4">
      <ClearableSearch
        handleChange={(searchKey) => tanTable.setGlobalFilter(searchKey)}
        className="w-full md:w-3/4 lg:w-1/2 mx-auto"
      />

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ height: "0", margin: "0", opacity: 0 }}
            animate={{ height: "auto", margin: "2rem 0", opacity: 1 }}
            exit={{ height: "0", margin: "0", opacity: 0}}
            transition={{ type: "tween", duration: 0.5 }}
            className="border rounded-md overflow-hidden bg-white"
          >
            <div className="p-4">
              <h3 className="text-2xl font-semibold text-center mb-4">
                Create Staff Account
              </h3>
              <Form {...form}>
                <form
                  className="w-full md:w-4/5 lg:w-3/5 xl:w-1/2 mx-auto -z-10"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    name="staffName"
                    control={form.control}
                    render={({ field }) => (
                      <RequiredInput label="Staff Name" className="flex-1">
                        <Input {...field} />
                      </RequiredInput>
                    )}
                  />
                  <div className="flex flex-col lg:flex-row gap-4 mt-4">
                    <FormField
                      name="staffEmail"
                      control={form.control}
                      render={({ field }) => (
                        <RequiredInput label="Staff Email" className="flex-1">
                          <Input {...field} type="email" />
                        </RequiredInput>
                      )}
                    />
                    <FormField
                      name="staffRole"
                      control={form.control}
                      render={({ field }) => (
                        <RequiredInput label="Staff Role" className="flex-1">
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger value={field.value}>
                              <SelectValue placeholder="Please select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="support">
                                Support Staff
                              </SelectItem>
                              <SelectItem value="academic">
                                Academic Affair Staff
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </RequiredInput>
                      )}
                    />
                  </div>
                  <div className="flex flex-col lg:flex-row gap-4 mt-4">
                    <FormField
                      name="staffPassword"
                      control={form.control}
                      render={({ field }) => (
                        <RequiredInput label="Password" className="flex-1">
                          <PwdInput {...field} />
                        </RequiredInput>
                      )}
                    />
                    <FormField
                      name="staffRePassword"
                      control={form.control}
                      render={({ field }) => (
                        <RequiredInput
                          label="Re-enter Password"
                          className="flex-1"
                        >
                          <PwdInput {...field} />
                        </RequiredInput>
                      )}
                    />
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="outline">
                      Create
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <StaffAccountCtx.Provider
        value={{ data, setData, showForm, setShowForm }}
      >
        <div className="mt-8">
          <DataTable table={tanTable} columns={columns} />
        </div>
      </StaffAccountCtx.Provider>
    </section>
  );
};

export default StaffAccountPage;
