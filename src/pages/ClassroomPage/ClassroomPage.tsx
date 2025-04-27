import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DoorOpen, GraduationCap } from "lucide-react";

import ContentLayout from "@/layouts/ContentLayout";
import EditClass from "./components/EditClass";
import GradeDisplay from "./GradeDisplay";
import SectionDisplay from "./SectionDisplay";
import { useLoaderData } from "react-router";
import { useAppSelector } from "@/hooks/reduxHook";

const ClassroomPage = () => {
  const user = useAppSelector((state) => state.auths);
  const classLoader= useLoaderData().classroomDetail as {
    courseTitle: string;
    courseCode: string;
    classCode: string;
    tutor: string;
    studyRoom: string;
  };
  return (
    <>
      <div className="bg-t_primary-700 text-white p-6 shadow-md relative">
        <h2 className="text-2xl font-bold">{classLoader.courseTitle}</h2>
        <p className="mb-4 font-semibold">
          {classLoader.courseCode} | {classLoader.classCode}
        </p>

        <div className="flex items-center mb-2">
          <span className="material-icons text-white mr-2">
            <GraduationCap />
          </span>
          <p>{classLoader.tutor}</p>
        </div>

        <div className="flex items-center">
          <span className="material-icons text-white mr-2">
            <DoorOpen />
          </span>
          <p>{classLoader.studyRoom}</p>
        </div>

        <EditClass />
      </div>
      <ContentLayout>
        <Tabs defaultValue="content" className="">
          <TabsList>
            <TabsTrigger
              value="content"
              className="data-[state=active]:bg-t_primary-600 data-[state=active]:text-white"
            >
              Class Sections
            </TabsTrigger>
            {user.role === "tutor" && (
              <TabsTrigger
                value="grade"
                className="data-[state=active]:bg-t_primary-600 data-[state=active]:text-white"
              >
                Grade
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="content">
            <SectionDisplay />
          </TabsContent>
          <TabsContent value="grade">
            <GradeDisplay />
          </TabsContent>
        </Tabs>
      </ContentLayout>
    </>
  );
};

export default ClassroomPage;
