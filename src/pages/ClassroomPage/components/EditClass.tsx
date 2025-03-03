import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentControl from "./ContentComponent/ContentControl";
import SectionControl from "./SectionComponent/SectionControl";

const EditClass = () => {
  return (
    <Dialog>
      <DialogTrigger asChild className="absolute top-4 right-4">
        <Button variant="outline" className="bg-inherit">
          Edit Class
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-full h-full md:max-w-4/5 md:max-h-4/5 md:h-4/5 lg:max-w-3/5 xl:max-w-2/5">
        <DialogTitle className="hidden"></DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
        <Tabs defaultValue="section" className="min-h-0">
          <TabsList>
            <TabsTrigger value="section">Section</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>
          <TabsContent value="section" className="h-full min-h-0">
            <SectionControl/>
          </TabsContent>
          <TabsContent value="content" className="h-full min-h-0">
            <ContentControl/>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EditClass;
