import { JSX, useContext, useState } from "react";
import { IsEditing, IStaffAccount } from "./StaffAccountPage";
import { CellContext } from "@tanstack/react-table";
import StaffAccountCtx from "./staffAccCtx";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, LucideTrash, Save, Undo } from "lucide-react";
import { cn } from "@/lib/utils";

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

export function ActionComponent({
  cell,
}: {
  cell: CellContext<IStaffAccount & IsEditing, unknown>;
}) {
  const ctx = useContext(StaffAccountCtx);
  const targetStaff = ctx.data.find(
    (staff) => staff.staffCode === cell.row.getValue("staffCode")
  )!;

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
  // Else show save and cancel button
  else
    return (
      <div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            targetStaff.isEditing = false;
            targetStaff.prevName = targetStaff.staffName;
            targetStaff.prevPassword = targetStaff.staffPassword;
            ctx.setData((prev) => {
              const updateList = prev.map((staff) => ({ ...staff }));
              return updateList;
            });
          }}
        >
          <Save />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            ctx.setData((prev) => {
              targetStaff.isEditing = false;
              targetStaff.staffName = targetStaff.prevName;
              targetStaff.staffPassword = targetStaff.prevPassword;
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
