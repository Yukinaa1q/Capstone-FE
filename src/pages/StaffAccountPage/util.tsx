import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CellContext } from "@tanstack/react-table";
import { Edit, LucideTrash, Save, Undo } from "lucide-react";
import { JSX, useContext } from "react";
import StaffAccountCtx from "./staffAccCtx";
import { IsEditing } from "./StaffAccountPage";
import { IStaffAccount } from "@/interfaces/IStaffCRUD";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { InferType, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import RequiredInput from "@/components/Input/RequiredInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PwdInput from "@/components/Input/PwdInput";

export const EditableCell = ({
  cell,
  className,
  columnKey,
  children,
}: {
  cell: CellContext<IStaffAccount & IsEditing, unknown>;
  className?: string;
  columnKey: keyof IStaffAccount;
  children: JSX.Element;
}) => {
  const ctx = useContext(StaffAccountCtx);
  const staff = ctx.data.find(
    (staff) => staff.staffCode === cell.row.getValue("staffCode")
  )!;
  return staff.isEditing ? (
    <Input
      value={staff[columnKey]}
      onChange={(e) => {
        staff[columnKey] = e.target.value;
        ctx.setData((prev) => {
          const updateList = prev.map((staff) => ({ ...staff }));
          return updateList;
        });
      }}
      className={cn(
        "px-0 border-0 shadow-none focus-visible:ring-0 rounded-none border-b focus-visible:border-b-t_primary-400",
        className
      )}
    />
  ) : (
    children
  );
};

const EditStaffSchema = object({
  staffName: string().required("Staff name is required"),
  staffPassword: string().required("Password is required"),
  staffRole: string().required("Role is required"),
  staffEmail: string().email("Invalid email").required("Email is required"),
});

export function ActionComponent({
  cell,
}: {
  cell: CellContext<IStaffAccount & IsEditing, unknown>;
}) {
  const ctx = useContext(StaffAccountCtx);
  const targetStaff = ctx.data.find(
    (staff) => staff.staffCode === cell.row.getValue("staffCode")
  )!;

  const form = useForm({
    resolver: yupResolver(EditStaffSchema),
  });

  const onSubmit = (data: InferType<typeof EditStaffSchema>) => {
    console.log(data);
  };

  // If user in editing mode, show edit and delete button
  return (
    <div className="flex justify-center">
      <Popover onOpenChange={() => form.reset()}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </PopoverTrigger>
        <PopoverContent collisionPadding={32} className="text-sm">
          <h3 className="text-lg font-semibold">Edit Staff</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="staffName"
                control={form.control}
                render={({ field }) => (
                  <RequiredInput label="Staff Name" {...field}>
                    <Input {...field} />
                  </RequiredInput>
                )}
              />
              <FormField
                name="staffEmail"
                control={form.control}
                render={({ field }) => (
                  <RequiredInput label="Staff Email" {...field}>
                    <Input {...field} type="email" />
                  </RequiredInput>
                )}
              />
              <FormField
                name="staffRole"
                control={form.control}
                render={({ field }) => (
                  <RequiredInput label="Staff Role" {...field}>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger value={field.value}>
                        <SelectValue placeholder="Please select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="support">Support Staff</SelectItem>
                        <SelectItem value="academic">
                          Academic Affair Staff
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </RequiredInput>
                )}
              />
              <FormField
                name="staffPassword"
                control={form.control}
                render={({ field }) => (
                  <RequiredInput label="Password" {...field}>
                    <PwdInput {...field} />
                  </RequiredInput>
                )}
              />
              <Button
                type="submit"
                className="bg-t_secondary-600 hover:bg-t_secondary-600/80"
              >
                Save
              </Button>
            </form>
          </Form>
        </PopoverContent>
      </Popover>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          ctx.setData((prev) =>
            prev.filter((staff) => staff.staffCode !== targetStaff.staffCode)
          );
        }}
      >
        <LucideTrash />
      </Button>
    </div>
  );
}
