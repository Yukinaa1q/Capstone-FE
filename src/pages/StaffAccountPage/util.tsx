import { JSX, useContext, useState } from "react";
import { IsEditing, IStaffAccount } from "./StaffAccountPage";
import { CellContext } from "@tanstack/react-table";
import StaffAccountCtx from "./staffAccCtx";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, LucideTrash, Save, Undo } from "lucide-react";

export const EditableCell = ({
  cell,
  columnKey,
  children,
}: {
  cell: CellContext<IStaffAccount & IsEditing, unknown>;
  columnKey: keyof IStaffAccount;
  children: JSX.Element;
}) => {
  const ctx = useContext(StaffAccountCtx);
  const [value, setValue] = useState<string>(cell.row.getValue(columnKey));
  const staff = ctx.data.find(
    (staff) => staff.staffCode === cell.row.getValue("staffCode")
  )!;
  return staff.isEditing ? (
    <Input value={value} onChange={(e) => setValue(e.target.value)} />
  ) : (
    children
  );
};

export function ActionComponent({cell}: {cell: CellContext<IStaffAccount & IsEditing, unknown>}) {
  const ctx = useContext(StaffAccountCtx);
  const targetStaff = ctx.data.find(
    (staff) => staff.staffCode === cell.row.getValue("staffCode")
  )!;

  console.log(targetStaff);

  // If user in editing mode, show edit and delete button
  if (!targetStaff.isEditing)
    return (
      <div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            ctx.setData((prev) => {
              targetStaff.isEditing = true;
              const updateList = prev.map((staff) => ({ ...staff }));
              return updateList;
            })
          }
        >
          <Edit />
        </Button>
        <Button variant="ghost" size="icon">
          <LucideTrash />
        </Button>
      </div>
    );
  // Else show save and cancel button
  else
    return (
      <div>
        <Button variant="ghost" size="icon">
          <Save />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            ctx.setData((prev) => {
              targetStaff.isEditing = false;
              const updateList = prev.map((staff) => ({ ...staff }));
              return updateList;
            })
          }
        >
          <Undo />
        </Button>
      </div>
    );
}
