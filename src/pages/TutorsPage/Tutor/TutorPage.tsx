import TutorApi from "@/api/TutorApi";
import SubjectSelect from "@/components/Input/SubjectSelect";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { TutorDetail } from "@/interfaces/UserProfile";
import ContentLayout from "@/layouts/ContentLayout";
import SectionLayout from "@/layouts/SectionLayout";
import { cn } from "@/lib/utils";
import { levelToString, shortName, toHeadCase } from "@/utils/utils";
import {
  CakeIcon,
  CheckCircle,
  ChevronRight,
  IdCard,
  Mail,
  MapPin,
  Phone,
  UserCog,
  Verified,
  X,
  XCircle,
} from "lucide-react";

import React from "react";
import { Link, useNavigate, useParams, useRouteLoaderData } from "react-router";
const infoStyle = "font-semibold flex w-fit items-center gap-2 cursor-default";
const badgeStyle = "rounded-md px-1.5 py-2";

function levelColor(level: string): string {
  switch (level) {
    case "1":
      return "bg-teal-600 hover:bg-teal-600/80";
    case "2":
      return "bg-cyan-600 hover:bg-cyan-600/80";
    case "3":
      return "bg-green-600 hover:bg-green-600/80";
    case "4":
      return "bg-sky-600 hover:bg-sky-600/80";
    case "5":
      return "bg-amber-600 hover:bg-amber-600/80";
    default:
      return "bg-gray-500 hover:bg-gray-500/80";
  }
}

const TutorPage = () => {
  const tutorId = useParams().id;
  const queryData = useRouteLoaderData("tutor");
  console.log("QueryData", queryData);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  // An API to get tutor detail profile
  const tutorProfile = queryData.tutorDetail as TutorDetail;
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
  // An API to get available semesters
  // TODO: An API to set tutor's newQualification
  const [newQualification, setNewQualification] = React.useState<{
    subject: string;
    level: string;
  }>({ subject: "", level: "" });
  // TODO: API to get all qualification of tutor
  const [qualifications, setQualifications] = React.useState<
    { subject: string; level: string }[]
  >(queryData.qualifications);

  const handleAddNewQualification = async () => {
    try {
      const updatedQualifications = (await TutorApi.addQualification(
        newQualification,
        tutorId
      )) as {
        subject: string;
        level: string;
      }[];
      setQualifications(updatedQualifications);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveQualification = async (
    qualification: {
      subject: string;
      level: string;
    }[]
  ) => {
    try {
      const qualificationList = (await TutorApi.removeQualification(
        qualification,
        tutorId
      )) as {
        subject: string;
        level: string;
      }[];
      setQualifications(qualificationList);
    } catch (err) {
      console.log(err);
    }
  };

  const handleVerify = async () => {
    try {
      await TutorApi.verifyTutor(tutorId);
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ContentLayout>
      <section className="flex flex-col lg:flex-row gap-10 p-10 rounded-lg bg-t_primary-100 justify-between">
        <div className="basis-1/3">
          <div className="w-full mb-4 space-y-4">
            <Link
              to={"/tutors/" + tutorId + "/edit"}
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
              <AvatarFallback>
                {" "}
                {shortName(tutorProfile.fullName)}{" "}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="gap-24">
            <div className="space-y-2">
              <p className="font-bold text-2xl flex items-center">
                {tutorProfile.fullName}
                {!tutorProfile.isVerified && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={handleVerify}
                    className="group ml-4 font-semibold text-green-500 underline hover:text-white hover:bg-green-400 hover:no-underline"
                  >
                    Verify Role
                    <Verified className="invisible group-hover:visible" />
                  </Button>
                )}
              </p>
              <div className="flex gap-4 items-center">
                <p className="font-semibold">{tutorProfile.userCode}</p>
                {tutorProfile.isVerified ? (
                  <div className="text-green-600 flex gap-1 font-semibold items-center text-sm">
                    <span>
                      <CheckCircle size={16} />
                    </span>
                    <span>Verified</span>
                  </div>
                ) : (
                  <div className="text-red-600 flex gap-1 font-semibold items-center text-sm">
                    <span>
                      <XCircle size={16} />
                    </span>
                    <span>Unverified</span>
                  </div>
                )}
              </div>
              <div className="text-sm">
                <p className={infoStyle}>
                  <IdCard className="size-6" />
                  <span className={cn(badgeStyle)}>{tutorProfile.ssid}</span>
                </p>
                <p className={infoStyle}>
                  <Mail className="size-6" />
                  <span className={cn(badgeStyle)}>{tutorProfile.email}</span>
                </p>
                <p className={infoStyle}>
                  <CakeIcon />
                  <span className={cn(badgeStyle)}>{tutorProfile.dob}</span>
                </p>
                <p className={infoStyle}>
                  <Phone />
                  <span className={cn(badgeStyle)}>
                    {tutorProfile.phoneNumber}
                  </span>
                </p>
                <p className={infoStyle}>
                  <MapPin />
                  <span className={cn(badgeStyle)}>{tutorProfile.address}</span>
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
                  Course Name
                </TableHead>
                <TableHead className="text-white">
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

          {/* Show a list of subject that tutor is allowed to teach and its level */}
          <SectionLayout
            sectionTitle="Allow Teaching Subjects"
            className="w-full"
          >
            <div className="flex flex-col gap-4 lg:flex-row">
              <SubjectSelect
                value={newQualification.subject}
                onValueChange={(val) =>
                  setNewQualification((old) => ({ ...old, subject: val }))
                }
                className="w-48"
              />
              <Select
                onValueChange={(val) =>
                  setNewQualification((old) => ({ ...old, level: val }))
                }
              >
                <SelectTrigger className="w-48 data-placeholder:text-gray-500 bg-white">
                  <SelectValue
                    placeholder="Course Level"
                    className="text-black"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Beginner</SelectItem>
                  <SelectItem value="2">Pre-intermediate</SelectItem>
                  <SelectItem value="3">Intermediate</SelectItem>
                  <SelectItem value="4">Upper-intermediate</SelectItem>
                  <SelectItem value="5">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <Button
                className="w-fit bg-t_secondary-400 hover:bg-t_secondary-400/80"
                onClick={() => {
                  if (!newQualification.subject || !newQualification.level) {
                    setErrorMsg("Please select subject and level");
                    return;
                  }
                  handleAddNewQualification();
                  setNewQualification({ subject: "", level: "" });
                  setErrorMsg(null);
                }}
              >
                Add
              </Button>
            </div>
            {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
            {(newQualification.subject || newQualification.level) && (
              <Badge className={cn(levelColor(newQualification.level), "mt-2")}>
                {newQualification.subject
                  ? toHeadCase(newQualification.subject)
                  : "Unknown"}{" "}
                | {levelToString(newQualification.level)}
              </Badge>
            )}

            <div className="flex flex-wrap gap-2 mt-4">
              {qualifications.map((qual) => (
                <Badge
                  className={cn(levelColor(qual.level), "space-x-1")}
                  key={qual.subject}
                >
                  <span>
                    {toHeadCase(qual.subject)} | {levelToString(qual.level)}
                  </span>
                  <button
                    onClick={() => {
                      handleRemoveQualification([qual]);
                    }}
                    className={cn(
                      "size-4 p-0.5 rounded-full flex items-center justify-center cursor-pointer bg-white/30"
                    )}
                  >
                    <X />
                  </button>
                </Badge>
              ))}
            </div>
          </SectionLayout>
        </div>
      </section>
    </ContentLayout>
  );
};

export default TutorPage;
