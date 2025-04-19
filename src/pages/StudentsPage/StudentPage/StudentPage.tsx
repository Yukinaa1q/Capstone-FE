import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
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
import { IClassDetail } from "@/interfaces/ICourseDetail";
import { StudentDetail } from "@/interfaces/UserProfile";
import ContentLayout from "@/layouts/ContentLayout";
import { cn } from "@/lib/utils";
import { shortName } from "@/utils/utils";
import {
  CakeIcon,
  ChevronRight,
  Mail,
  Phone,
  UserCog
} from "lucide-react";

import { Link, useLoaderData, useNavigate } from "react-router";
const infoStyle = "font-semibold flex w-fit items-center gap-2 cursor-default";
const badgeStyle = "rounded-md px-1.5 py-2";

const StudentPage = () => {
  const navigate = useNavigate();
  const queryData = useLoaderData();
  // An API to get tutor detail profile
  const profile = queryData.studentDetail as StudentDetail;
  // An API to get tutor's classes base on semester
  const classes = queryData.classHistory as Pick<
    IClassDetail,
    | "courseTitle"
    | "courseCode"
    | "classCode"
    | "classSession"
    | "classShift"
    | "studyRoom"
  >[];

  return (
    <ContentLayout>
      <section className="flex flex-col lg:flex-row gap-8 p-10 rounded-lg bg-t_primary-100 justify-between">
        <div className="basis-1/3 shrink-0">
          <div className="flex flex-col items-center gap-4 w-fit mb-4">
            <Link
              to={"/students/" + profile.userId + "/edit"}
              className={cn(
                buttonVariants(),
                "group bg-t_primary-500 hover:bg-t_primary-500/80"
              )}
            >
              <UserCog className="relative group-hover:animate-[zoom-in-out_0.5s_ease-in]" />{" "}
              Update
            </Link>
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
                <p className={infoStyle}>
                  <Mail className="size-6" />
                  <span className={cn(badgeStyle)}>{profile.email}</span>
                </p>
                <p className={infoStyle}>
                  <CakeIcon />
                  <span className={cn(badgeStyle)}>
                    {new Date(profile.dob).toLocaleDateString("en-GB")}
                  </span>
                </p>
                <p className={infoStyle}>
                  <Phone />
                  <span className={cn(badgeStyle)}>{profile.phoneNumber}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grow">
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
                  Course Title
                </TableHead>
                <TableHead className="text-white">Course Code</TableHead>
                <TableHead className="text-white">Classroom</TableHead>
                <TableHead className="text-white">Study Week</TableHead>
                <TableHead className="text-white">Study Shift</TableHead>
                <TableHead className="text-white rounded-e-md"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((cls) => (
                <TableRow
                  key={cls.classCode}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/classes/${cls.classCode}`)}
                >
                  <TableCell className="font-medium">
                    {cls.courseTitle}
                  </TableCell>
                  <TableCell>{cls.courseCode}</TableCell>
                  <TableCell>{cls.studyRoom}</TableCell>
                  <TableCell className="">{cls.classSession}</TableCell>
                  <TableCell className="">{cls.classShift}</TableCell>
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
