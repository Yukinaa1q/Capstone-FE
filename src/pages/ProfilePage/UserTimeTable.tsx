import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ITimeTable } from "@/interfaces/ITimetable";
import ContentLayout from "@/layouts/ContentLayout";
import { verboseStudyWeek } from "@/utils/utils";
import React from "react";
import { useLoaderData } from "react-router";

const UserTimeTable = () => {
  // const [timetable, setTimetable] = React.useState<ITimeTable[]>(useLoaderData() as ITimeTable[]);
  const timetable = useLoaderData() as ITimeTable[];
  return (
    <ContentLayout>
      <Table className="mt-6">
        <TableHeader className="bg-t_primary-600">
          <TableRow className="hover:bg-t_primary-600/80">
            <TableHead className="text-center text-white font-semibold rounded-ss-md">
              NO
            </TableHead>
            <TableHead className="text-white font-semibold">
              COURSE TITLE
            </TableHead>
            <TableHead className="text-white font-semibold">
              STUDY WEEK
            </TableHead>
            <TableHead className="text-white font-semibold">
              TIME SHIFT
            </TableHead>
            <TableHead className="text-white font-semibold">ROOM</TableHead>
            <TableHead className="text-white font-semibold rounded-se-md">
              ADDRESS
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {timetable.map((item, idx) => (
            <TableRow
              key={idx}
              className="hover:bg-t_primary-600/10 cursor-pointer"
            >
              <TableCell className="text-center">{idx + 1}</TableCell>
              <TableCell>{item.subject}</TableCell>
              <TableCell>{verboseStudyWeek(item.studyWeek, false)}</TableCell>
              <TableCell>{item.studyShift}</TableCell>
              <TableCell>{item.room}</TableCell>
              <TableCell>
                {item.address.startsWith("http") ? (
                  <a href={item.address} className="underline text-blue-600">
                    Online Classroom Link
                  </a>
                ) : (
                  item.address
                )}
              </TableCell>
            </TableRow>
          ))}
          {timetable.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center font-medium text-gray-400">
                No timetable available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ContentLayout>
  );
};

export default UserTimeTable;
