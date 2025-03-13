import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DoorOpen, GraduationCap } from "lucide-react";

import ContentLayout from "@/layouts/ContentLayout";
import EditClass from "./components/EditClass";
import GradeDisplay from "./GradeDisplay";
import SectionDisplay from "./SectionDisplay";

const ClassroomPage = () => {
  return (
    <>
      <div className="bg-t_primary-700 text-white p-6 shadow-md relative">
        <h2 className="text-2xl font-bold">Vật Lý 12</h2>
        <p className="mb-4 font-semibold">PHYS001 | CC01</p>

        <div className="flex items-center mb-2">
          <span className="material-icons text-white mr-2">
            <GraduationCap />
          </span>
          <p>Đỗ Kim Sang</p>
        </div>

        <div className="flex items-center">
          <span className="material-icons text-white mr-2">
            <DoorOpen />
          </span>
          <p>B402</p>
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
            <TabsTrigger
              value="grade"
              className="data-[state=active]:bg-t_primary-600 data-[state=active]:text-white"
            >
              Grade
            </TabsTrigger>
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
