import RequiredInput from "@/components/RequiredInput";
import SearchSelect, { ListItem } from "@/components/SearchSelect";
import StudentInput from "@/components/StudentInput";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { shortName } from "@/utils/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { array, boolean, InferType, number, object, string } from "yup";

const classFormSchema = object({
  courseTitle: string(),
  courseCode: string().required("Course code is required"),
  maxStudents: number()
    .min(1, "Class size cannot be smaller than 1")
    .required("Class size is required"),
  classCode: string().required("Class code is required"),
  studyWeek: string().required("Study week is required"),
  studyShift: string().required("Study shift is required"),
  isOnline: boolean().default(false),
  classRoom: string().when("isOnline", {
    is: true,
    then: (schema) => schema.optional(),
    otherwise: (schema) =>
      schema.required("Class room is required when class is not online"),
  }),
  tutorId: string().required("Tutor is required"),
  studentIdList: array().of(string().defined()).required().defined(),
}).required();

export type IClassForm = InferType<typeof classFormSchema>;

const initValue = {
  courseTitle: "",
  courseCode: "",
  maxStudents: 0,
  classCode: "",
  studyWeek: "",
  studyShift: "",
  isOnline: false,
  classRoom: "",
  tutorId: "",
  studentIdList: [],
};

const courseList: ListItem[] = [
  {
    value: "MT1002",
    label: "MT1002",
    display: {
      courseTitle: "Toan 12 nang cao",
      courseCode: "MT1002",
    },
  },
  {
    value: "CH2003",
    label: "CH2003",
    display: {
      courseTitle: "Hoa 12 nang cao",
      courseCode: "CH2003",
    },
  },
  {
    value: "PHYS1001",
    label: "PHYS1001",
    display: {
      courseTitle: "Ly 10 co ban",
      courseCode: "PHYS1001",
    },
  },
];

const tutorList: ListItem[] = [
  {
    value: "tutoridA",
    label: "Kieu Tien Thanh",
    display: {
      tutorName: "Kieu Tien Thanh",
      tutorImage: "#",
    },
  },
  {
    value: "tutoridB",
    label: "Ly Tran Phuoc Tri",
    display: {
      tutorName: "Ly Tran Phuoc Tri",
      tutorImage: "#",
    },
  },
  {
    value: "tutoridC",
    label: "Nguyen Ngoc Quang Phuc",
    display: {
      tutorName: "Nguyen Ngoc Quang Phuc",
      tutorImage: "#",
    },
  },
];

const ClassForm = ({
  className,
  defaultValues = initValue,
  onSubmit,
  children,
}: {
  className?: string;
  defaultValues?: InferType<typeof classFormSchema>;
  onSubmit: (data: IClassForm) => void;
  children?: React.ReactNode;
}) => {
  const form = useForm({
    defaultValues,
    resolver: yupResolver(classFormSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(className, "space-y-4 mt-8")}
      >
        <FormField
          control={form.control}
          name="courseTitle"
          render={({ field }) => (
            <RequiredInput label="Course Title">
              <Input {...field} placeholder="Enter course title" disabled />
            </RequiredInput>
          )}
        />
        <div className="grid lg:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="courseCode"
            render={({ field }) => {
              return (
                <RequiredInput label="Course Code">
                  <SearchSelect
                    className=""
                    {...field}
                    list={courseList}
                    placeholder="Search"
                    onValueChange={(value) =>
                      form.setValue("courseTitle", value.display.courseTitle)
                    }
                    filterFn={(value, search) => {
                      const result = courseList.find(
                        (item) => item.value === value
                      );
                      if (!result) return 0;
                      if (
                        result.display.courseTitle
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      )
                        return 1;
                      else if (
                        result.display.courseCode
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      )
                        return 1;
                      return 0;
                    }}
                    renderChild={(item, value) => (
                      <div className="flex items-center gap-4">
                        <div className="text-sm">
                          <p>{item.display.courseTitle}</p>
                          <p className="">{item.display.courseCode}</p>
                        </div>
                        {value === item.value && (
                          <Check
                            size={16}
                            strokeWidth={2}
                            className="ml-auto"
                          />
                        )}
                      </div>
                    )}
                  />
                </RequiredInput>
              );
            }}
          />

          <FormField
            control={form.control}
            name="maxStudents"
            render={({ field }) => (
              <RequiredInput label="Class Size">
                <Input
                  className=""
                  {...field}
                  type="number"
                  placeholder="Enter class size"
                />
              </RequiredInput>
            )}
          />
          <FormField
            control={form.control}
            name="classCode"
            render={({ field }) => (
              <RequiredInput label="Class Code">
                <Input className="" {...field} placeholder="Enter class code" />
              </RequiredInput>
            )}
          />
        </div>
        <div className="grid lg:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="studyWeek"
            render={({ field }) => (
              <RequiredInput label="Study Weekdays">
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Study Weekdays" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2-4-6">Mon-Wed-Fri</SelectItem>
                    <SelectItem value="3-5-7">Tue-Thur-Sat</SelectItem>
                  </SelectContent>
                </Select>
              </RequiredInput>
            )}
          />

          <FormField
            control={form.control}
            name="studyShift"
            render={({ field }) => (
              <RequiredInput label="Study Shift">
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Study Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="17h45 - 19h15">17h45 - 19h15</SelectItem>
                    <SelectItem value="19h30 - 21h00">19h30 - 21h00</SelectItem>
                  </SelectContent>
                </Select>
              </RequiredInput>
            )}
          />
          <div>
            <FormField
              control={form.control}
              name="classRoom"
              render={({ field }) => (
                <RequiredInput label="Class Room">
                  <Input
                    className=""
                    disabled={form.getValues("isOnline")}
                    {...field}
                    placeholder="Enter class room"
                  />
                </RequiredInput>
              )}
            />

            <FormField
              control={form.control}
              name="isOnline"
              render={({ field }) => (
                <div className="flex items-center mt-1">
                  <Checkbox
                    id="isonline"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />{" "}
                  <Label htmlFor="isonline" className="ml-1">
                    Online
                  </Label>
                </div>
              )}
            />
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="tutorId"
            render={({ field }) => (
              <RequiredInput label="Tutor">
                <SearchSelect
                  className=""
                  {...field}
                  list={tutorList}
                  placeholder="Search"
                  filterFn={(value, search) => {
                    const result = tutorList.find(
                      (item) => item.value === value
                    );
                    if (!result) return 0;
                    if (
                      result.display.tutorName
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    )
                      return 1;
                    return 0;
                  }}
                  renderChild={(item, value) => (
                    <div className="flex items-center">
                      <Avatar>
                        <AvatarImage src={item.display.tutorImage} />
                        <AvatarFallback>
                          {shortName(item.display.tutorName)}
                        </AvatarFallback>
                      </Avatar>
                      <p className="ml-2">{item.display.tutorName}</p>
                      {value === item.value && (
                        <Check size={16} strokeWidth={2} className="ml-auto" />
                      )}
                    </div>
                  )}
                />
              </RequiredInput>
            )}
          />

          <FormField
            control={form.control}
            name="studentIdList"
            render={({ field }) => (
              <RequiredInput label="Students" isRequired={false}>
                <StudentInput
                  value={field.value}
                  onValueChange={(newVal) => field.onChange(newVal)}
                />
              </RequiredInput>
            )}
          />
        </div>
        <div className="flex justify-end gap-4">{children}</div>
      </form>
    </Form>
  );
};

export default ClassForm;
