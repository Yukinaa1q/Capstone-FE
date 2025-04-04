import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ContentLayout from "@/layouts/ContentLayout";
import { cn } from "@/lib/utils";
import { shortName } from "@/utils/utils";
import { CakeIcon, ChevronRight, Mail, MapPin, Phone } from "lucide-react";

import React from "react";
import { useLoaderData, useNavigate } from "react-router";
const infoStyle = "font-semibold flex w-fit items-center gap-2 cursor-default";
const badgeStyle = "rounded-md px-1.5 py-2";

const StudentPage = () => {
  const navigate = useNavigate();
  const queryData = useLoaderData();
  // An API to get tutor detail profile
  const [profile] = React.useState(queryData.studentDetail);
  // An API to get tutor's classes base on semester
  const [classes] = React.useState([
    {
      classId: "1",
      courseCode: "GEO1002",
      classroom: "B4-502",
      studyWeek: "2-4-6",
      studyShift: "17h45 - 19h15",
    },
    {
      classId: "2",
      courseCode: "GEO1003",
      classroom: "B4-502",
      studyWeek: "2-4-6",
      studyShift: "17h45 - 19h15",
    },
  ]);

  return (
    <ContentLayout>
      <section className="flex flex-col lg:flex-row gap-8 p-10 rounded-lg bg-t_primary-100 justify-between">
        <div className="basis:1/2 shrink-0">
          <div className="flex flex-col items-center gap-4 w-fit mb-4">
            <Avatar className="size-24 border">
              <AvatarImage src="#" />
              <AvatarFallback> {shortName(profile.fullName)} </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <div className="space-y-2">
              <p className="font-bold text-2xl flex items-center">
                {profile.fullName}
              </p>
              <div className="flex gap-4 items-center">
                <p className="font-semibold">{profile.userCode}</p>
              </div>
              <div className="text-sm">
                {/* <p className={infoStyle}>
                  <IdCard className="size-6" />
                  <span className={cn(badgeStyle)}>{profile.ssid}</span>
                </p> */}
                <p className={infoStyle}>
                  <Mail className="size-6" />
                  <span className={cn(badgeStyle)}>{profile.email}</span>
                </p>
                <p className={infoStyle}>
                  <CakeIcon />
                  <span className={cn(badgeStyle)}>{profile.dob}</span>
                </p>
                <p className={infoStyle}>
                  <Phone />
                  <span className={cn(badgeStyle)}>{profile.phoneNumber}</span>
                </p>
                <p className={infoStyle}>
                  <MapPin />
                  <span className={cn(badgeStyle)}>{profile.address}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          {/* A table to show tutor's classes during a selected semester */}
          <Select>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="242">HK2 | 2024 - 2025</SelectItem>
              <SelectItem value="241">HK1 | 2024 - 2025</SelectItem>
              <SelectItem value="233">HK3 | 2023 - 2024</SelectItem>
            </SelectContent>
          </Select>
          <Table className="bg-white rounded-md mt-4">
            <TableHeader className="rounded-md">
              <TableRow className="text-white bg-t_primary-600 hover:bg-t_primary-600 rounded-s-md">
                <TableHead className="text-white rounded-s-md">
                  Course Code
                </TableHead>
                <TableHead className="text-white">Classroom</TableHead>
                <TableHead className="text-white">Study Week</TableHead>
                <TableHead className="text-white">Study Shift</TableHead>
                <TableHead className="text-white rounded-e-md"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((cls) => (
                <TableRow
                  key={cls.classId}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/classes/${cls.classId}`)}
                >
                  <TableCell className="font-medium">
                    {cls.courseCode}
                  </TableCell>
                  <TableCell>{cls.classroom}</TableCell>
                  <TableCell>{cls.studyWeek}</TableCell>
                  <TableCell className="">{cls.studyShift}</TableCell>
                  <TableCell className="">
                    <ChevronRight
                      size={20}
                      className="relative left-0 transition-all group-hover:left-2 hover:transition-all"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </ContentLayout>
  );
};

export default StudentPage;
