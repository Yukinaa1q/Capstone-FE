import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { StudyShift, StudyWeek } from "@/interfaces/common";
import { levelToString, verboseStudyWeek } from "@/utils/utils";
import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CalendarRange, Check, Clock, Globe, X } from "lucide-react";
import React, { ReactNode, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import StaffApi from "@/api/StaffApi";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router";

export interface IClassRequest {
  tutor: string;
  tutorId: string;
  tutorCode: string;
  courseTitle: string;
  courseCode: string;
  courseLevel: string;
  courseId: string;
  courseSubject: string;
  studyWeek: StudyWeek;
  studyShift: StudyShift;
  isOnline: boolean;
  requestId: string;
}

const columnHelper = createColumnHelper<IClassRequest>();

const defaultColumns = [
  columnHelper.accessor("tutor", {
    header: () => <div className="text-center">TUTOR</div>,
    cell: (props) => {
      return (
        <div className="font-semibold text-t_secondary-600">
          {props.row.original.tutor}
        </div>
      );
    },
  }),
  columnHelper.accessor("tutorCode", {
    header: () => <div className="text-center">TUTOR CODE</div>,
    cell: (props) => {
      return <div className="text-center">{props.row.original.tutorCode}</div>;
    },
  }),
  columnHelper.accessor("courseTitle", {
    header: () => <div className="text-center">COURSE TITLE</div>,
    cell: (props) => {
      return <div className="">{props.row.original.courseTitle}</div>;
    },
  }),
  columnHelper.accessor("studyWeek", {
    header: () => <div className="text-center">STUDY WEEK</div>,
    cell: (props) => {
      return (
        <div className="text-center">
          {verboseStudyWeek(props.row.original.studyWeek, true)}
        </div>
      );
    },
  }),
  columnHelper.accessor("studyShift", {
    header: () => <div className="text-center">STUDY SHIFT</div>,
    cell: (props) => {
      return <div className="text-center">{props.row.original.studyShift}</div>;
    },
  }),
  columnHelper.accessor("isOnline", {
    header: () => <div className="text-center">LEARNING METHOD</div>,
    cell: (props) => {
      return (
        <div className="text-center">
          {props.row.original.isOnline ? "Online" : "Offline"}
        </div>
      );
    },
  }),
  columnHelper.accessor("tutorId", {
    header: () => <div className="text-center">ACTION</div>,
    cell: (props) => {
      return (
        <div className="flex justify-center">
          <RequestConfirmationPopover request={props.row.original}>
            <Button
              size="icon"
              variant={"ghost"}
              className="hover:bg-green-200"
            >
              <Check className="stroke-green-500" />
            </Button>
          </RequestConfirmationPopover>
          <RequestRejectionPopover request={props.row.original}>
            <Button size="icon" variant={"ghost"} className="hover:bg-red-200">
              <X className="stroke-red-500" />
            </Button>
          </RequestRejectionPopover>
        </div>
      );
    },
  }),
] as ColumnDef<IClassRequest, unknown>[];

const RequestClasses = () => {
  const [data, setData] = React.useState<IClassRequest[]>([]);

  useEffect(() => {
    const fetchRequestClasses = async () => {
      const requestClasses = await StaffApi.getClassRequest();
      console.log("Request Classes: ", requestClasses);
      setData(requestClasses);
    };
    fetchRequestClasses();
  }, []);

  const table = useReactTable({
    columns: defaultColumns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
  });
  return <DataTable columns={defaultColumns} table={table} />;
};

export default RequestClasses;

const RequestConfirmationPopover = ({
  children,
  request,
}: {
  children: React.ReactNode;
  request: IClassRequest;
}) => {
  const navigate = useNavigate();
  const [maxStudents, setMaxStudents] = React.useState<number>(0);

  const handleOpenClass = async () => {
    await StaffApi.openClass(maxStudents, request);
    navigate(0);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-full md:max-w-1/2 lg:max-w-1/3">
        <DialogHeader>
          <DialogTitle>Request Open Class Confirmation</DialogTitle>
          <DialogDescription>
            This tutor is requesting to open a class. Do you want to approve
            this?
          </DialogDescription>
        </DialogHeader>
        <div>
          <p className="font-semibold text-lg">
            {request.tutor} - {request.tutorCode}
          </p>
          {/* <p>{request.tutorCode}</p> */}
          <p className="mt-4 text-gray-500">Class Information</p>
          <p className="font-semibold text-xl">{request.courseTitle}</p>
          <p className="text-sm medium text-gray-400">
            {request.courseCode} | {request.courseSubject} -{" "}
            {levelToString(request.courseLevel)}
          </p>
          <div className="flex justify-between mt-4">
            <p className="flex items-center gap-2 text-t_secondary-500">
              <span>
                <CalendarRange size={20} />
              </span>
              <span className="text-medium">
                {verboseStudyWeek(request.studyWeek, false)}
              </span>
            </p>
            <p className="flex items-center gap-2 text-t_primary-500">
              <span>
                <Clock size={20} />
              </span>
              <span className="text-medium">{request.studyShift}</span>
            </p>
            <p className="flex items-center gap-2 text-cyan-700">
              <span>
                <Globe size={20} />
              </span>
              <span className="text-medium">
                {request.isOnline ? "Online" : "Offline"}
              </span>
            </p>
          </div>
          <div className="flex gap-2 items-center mt-2">
            <span>Class Max Students: </span>
            <Input
              value={maxStudents}
              onChange={(e) => setMaxStudents(parseInt(e.target.value))}
              type="number"
              className="w-14 text-center"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleOpenClass}
            type="submit"
            className="bg-t_primary-500 hover:bg-t_primary-600/70"
          >
            Open Class
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const RequestRejectionPopover = ({
  children,
  request,
}: {
  children: ReactNode;
  request: IClassRequest;
}) => {
  const navigate = useNavigate();
  const [reason, setReason] = React.useState<string>("");
  const handleRejectRequest = async () => {
    await StaffApi.rejectClass(request, reason);
    navigate(0);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-full md:max-w-1/2 lg:max-w-1/3">
        <DialogHeader>
          <DialogTitle>Request Open Class Rejection</DialogTitle>
          <DialogDescription>
            You are about to reject this request.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="Please provide a reason for rejection"
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
          }}
        />
        <DialogFooter>
          <Button
            onClick={handleRejectRequest}
            type="submit"
            variant={"destructive"}
          >
            Reject
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
