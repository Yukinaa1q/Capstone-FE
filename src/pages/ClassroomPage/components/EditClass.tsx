import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionControl from "./SectionControl";
import ContentControl from "./ContentControl";

const EditClass = ({ classId }: { classId: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="absolute top-4 right-4">
        <Button variant="outline" className="bg-inherit">
          Edit Class
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="hidden"></DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
        <Tabs defaultValue="section" className="">
          <TabsList>
            <TabsTrigger value="section">Section</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>
          <TabsContent value="section">
            <SectionControl classId={classId} />
          </TabsContent>
          <TabsContent value="content">
            <ContentControl />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EditClass;
