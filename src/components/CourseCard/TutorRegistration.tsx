import TutorApi from "@/api/TutorApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StudyShift, StudyWeek } from "@/interfaces/common";
import { ICourseCard } from "@/interfaces/ICourse";
import { TutorRegistrationSchedule } from "@/interfaces/TutorRegistrationSchedule";
import { PlusIcon, SendHorizonal, Trash2 } from "lucide-react";
import React, { useState } from "react";
import Selection from "../Input/Selection";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

const TutorRegistration = ({
  courseContent,
  children,
}: {
  courseContent: ICourseCard;
  children: React.ReactNode;
}) => {
  const [scheduleList, setScheduleList] = useState<TutorRegistrationSchedule[]>(
    []
  );
  const [studyWeek, setStudyWeek] = React.useState<StudyWeek | undefined>(
    undefined
  );
  const [studyShift, setStudyShift] = React.useState<StudyShift | undefined>(
    undefined
  );
  const navigate = useNavigate();

  const verboseTeachingWeek = (value: StudyWeek) => {
    if (value === "2-4") return "Monday - Wednesday";
    else if (value === "3-5") return "Tuesday - Thursday";
    else if (value === "4-6") return "Wednesday - Friday";
    else if (value === "7") return "Saturday";
    else if (value === "8") return "Sunday";
    return "Choose Weekdays";
  };

  const onTutorSubmitRequest = async () => {
    if (scheduleList.length === 0) {
      alert("Please select at least one schedule");
      return;
    }
    await TutorApi.sendTeachingRequest(scheduleList);
    setScheduleList([]);
    setStudyWeek(undefined);
    setStudyShift(undefined);
    alert("Request sent successfully");
    navigate(0);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Teaching Registration Form</DialogTitle>
          <DialogDescription>
            Select Your Desire Teaching Time
          </DialogDescription>
        </DialogHeader>
        <div>
          <h1 className="font-semibold text-xl uppercase">
            {courseContent.courseTitle}
          </h1>
          <p className="text-sm font-semibold">{courseContent.courseCode}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm">Teaching Schedule</h3>
          <Table>
            <TableHeader className="sticky top-0">
              <TableRow>
                <TableHead className="text-center">Weekdays</TableHead>
                <TableHead className="text-center">Time Shift</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
              <TableRow>
                <TableCell className="text-center">
                  <Selection
                    className="w-52 mx-auto"
                    placeholder="Choose Weekdays"
                    selectList={["2-4", "3-5", "4-6", "7", "8"]}
                    display={(value) => {
                      if (value === "2-4") return "Monday - Wednesday";
                      else if (value === "3-5") return "Tuesday - Thursday";
                      else if (value === "4-6") return "Wednesday - Friday";
                      else if (value === "7") return "Saturday";
                      else if (value === "8") return "Sunday";
                      return "Choose Weekdays";
                    }}
                    onSelect={(value) => setStudyWeek(value as StudyWeek)}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Selection
                    className="w-36 mx-auto"
                    disabled={!studyWeek}
                    placeholder="Time Shift"
                    selectList={
                      ["7", "8"].includes(studyWeek!)
                        ? [
                            "08h00 - 11h00",
                            "13h00 - 16h00",
                            "16h15 - 19h15",
                            "19h30 - 21h30",
                          ]
                        : ["17h45 - 19h15", "19h30 - 21h00"]
                    }
                    onSelect={(value) => setStudyShift(value as StudyShift)}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <div className="w-20 mx-auto">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="gap-0 group"
                      onClick={() => {
                        if (studyWeek && studyShift) {
                          setScheduleList((prev) => [
                            ...prev.filter(
                              (schedule) =>
                                schedule.studyWeek !== studyWeek &&
                                schedule.studyShift !== studyShift
                            ),
                            { studyShift, studyWeek },
                          ]);
                        }
                      }}
                    >
                      <PlusIcon className="text-t_primary-500 transition-transform -rotate-180 group-hover:rotate-180 group-hover:transition-transform" />
                      <span className="text-t_primary-500 w-0 overflow-x-hidden group-hover:w-10 group-hover:transition-all transition-all">
                        Add
                      </span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheduleList.map((schedule, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center">
                    {verboseTeachingWeek(schedule.studyWeek)}
                  </TableCell>
                  <TableCell className="text-center">
                    {schedule.studyShift}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-t_primary-500"
                      onClick={() =>
                        setScheduleList((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                    >
                      <Trash2 />
                      <span>Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter></TableFooter>
          </Table>
        </div>
        <DialogFooter>
          <Button variant="destructive" type="button">
            Cancel
          </Button>
          <Button
            onClick={onTutorSubmitRequest}
            variant="outline"
            className="border-t_primary-500 hover:bg-t_primary-100 group"
          >
            Submit
            <div className="size-4 overflow-hidden relative">
              <SendHorizonal className="absolute group-hover:hidden stroke-t_primary-500" />
              <SendHorizonal className="absolute -ml-4 group-hover:ml-0 group-hover:transition-all group-hover:duration-300 stroke-t_primary-500" />
            </div>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TutorRegistration;
