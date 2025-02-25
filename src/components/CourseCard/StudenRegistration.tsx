import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField } from "../ui/form";
import { useForm } from "react-hook-form";
import { boolean, InferType, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "../ui/select";
import RequiredInput from "../RequiredInput";
import { Button } from "../ui/button";
import { ICourseCard } from "@/interfaces/ICourse";

const studentCourseRegistrationSchema = object({
  isOnline: boolean().required("Please choose the learning type"),
}).required();

interface StudentRegistrationProps {
  children: React.ReactNode;
  courseInfo: ICourseCard;
}

const StudenRegistration = ({
  children,
  courseInfo, // used to send a request to the server
}: StudentRegistrationProps) => {
  const form = useForm({
    resolver: yupResolver(studentCourseRegistrationSchema),
  });

  const onSubmit = async (
    data: InferType<typeof studentCourseRegistrationSchema>
  ) => {
    console.log(data);
    window.location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Course Registration</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="isOnline"
                control={form.control}
                render={({ field }) => (
                  <RequiredInput label="Learning Type">
                    <Select
                      onValueChange={(val) =>
                        field.onChange(val === "online" ? true : false)
                      }
                    >
                      <SelectTrigger value={field.value ? "online" : "offline"}>
                        <SelectValue placeholder="Your Learning Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="offline">Offline</SelectItem>
                      </SelectContent>
                    </Select>
                  </RequiredInput>
                )}
              />
              <Button className="mt-2 relative left-full -translate-x-full bg-t_primary-300 hover:bg-t_primary-400">
                Submit
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default StudenRegistration;
