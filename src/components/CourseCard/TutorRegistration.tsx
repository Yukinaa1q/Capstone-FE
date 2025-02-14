import { Button } from "../ui/button";
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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ICourseP1 } from "@/interfaces/ICourse";
import { UserRoundPen } from "lucide-react";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { array, InferType, object, string } from "yup";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

const registrationSchema = object({
  teachingWeekdays: array(
    string().oneOf(["2-4-6", "3-5-7"]).required()
  ).required(),
}).required();

const TutorRegistrationButton = ({
  courseContent,
}: {
  courseContent: ICourseP1;
}) => {
  const [activity, setActivity] = useState<"registration" | "confirmation">(
    "registration"
  );
  const form = useForm({
    defaultValues: {},
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = (data: InferType<typeof registrationSchema>) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group flex items-center gap-0 px-2 py-2 bg-green-300 rounded-full overflow-hidden"
        >
          <UserRoundPen size={20} />
          <p className="text-sm font-medium invisible w-0 group-hover:visible group-hover:w-16 group-hover:transition-all transition-all">
            Register
          </p>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Teaching Registration Form</DialogTitle>
          <DialogDescription>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem
                  className={activity === "registration" ? "text-black" : ""}
                >
                  Registration
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem
                  className={activity === "confirmation" ? "text-black" : ""}
                >
                  Confirmation
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </DialogDescription>
        </DialogHeader>
        <div>
          <div>
            <h1 className="font-semibold text-2xl uppercase">
              {courseContent.courseName}
            </h1>
            <p className="text-sm font-semibold text-gray-600">
              {courseContent.courseId}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Teaching Schedule</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="teachingWeekdays"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox id="246" value="2-4-6" onCheckedChange={(checked) => {
                          // if (checked) {
                          //   field.onChange()
                          // }
                          // else {}
                        }}/>
                        <Label htmlFor="246">2-4-6</Label>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TutorRegistrationButton;
