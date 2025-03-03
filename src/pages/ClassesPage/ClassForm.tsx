import RequiredInput from "@/components/Input/RequiredInput";
import SearchSelect, { ListItem } from "@/components/Input/SearchSelect";
import StudentInput from "@/components/Input/StudentInput";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { StudyShift, StudyWeek } from "@/interfaces/common";
import { cn } from "@/lib/utils";
import TucourApi from "@/utils/http";
import { shortName } from "@/utils/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { array, boolean, InferType, number, object, string } from "yup";

const classFormSchema = object({
  courseTitle: string(),
  courseCode: string().required("Course code is required"),
  maxStudents: number()
    .min(1, "Class size cannot be smaller than 1")
    .required("Class size is required"),
  classCode: string().required("Class code is required"),
  studyWeek: string<StudyWeek | "">().required("Study week is required"),
  studyShift: string<StudyShift | "">().required("Study shift is required"),
  isOnline: boolean().default(false),
  classRoom: string().when("isOnline", {
    is: true,
    then: (schema) => schema.optional(),
    otherwise: (schema) =>
      schema.required("Class room is required when class is not online"),
  }),
  tutorCode: string().required("Tutor is required"),
  studentIdList: array().of(string().defined()).required().defined(),
}).required();

export type IClassForm = InferType<typeof classFormSchema>;

const initValue: IClassForm = {
  courseTitle: "",
  courseCode: "",
  maxStudents: 0,
  classCode: "",
  studyWeek: "",
  studyShift: "",
  isOnline: false,
  classRoom: "",
  tutorCode: "",
  studentIdList: [],
};

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
  const [codeList, setCodeList] = useState<ListItem[]>([]);
  const [tutorList, setTutorList] = useState<ListItem[]>([]);
  const form = useForm({
    values: defaultValues,
    resolver: yupResolver(classFormSchema),
  });

  useEffect(() => {
    const fetchCourseCode = async () => {
      try {
        const res: { courseCode: string; courseTitle: string }[] =
          await TucourApi.call("/course/course-code-title", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
        const tutorListApi = await TucourApi.call("/tutor/all-tutor", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTutorList(
          tutorListApi.map((item: any) => {
            return {
              value: item.tutorCode,
              label: item.name,
              display: {
                tutorName: item.name,
                tutorImage: item.avatarUrl,
              },
            };
          })
        );
        setCodeList(
          res.map((item) => {
            return {
              value: item.courseCode,
              label: item.courseCode,
              display: {
                courseTitle: item.courseTitle,
                courseCode: item.courseCode,
              },
            };
          })
        );
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourseCode();
  }, []);

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
                    list={codeList}
                    placeholder="Search"
                    onValueChange={(value) =>
                      form.setValue("courseTitle", value.display.courseTitle)
                    }
                    filterFn={(value, search) => {
                      const result = codeList.find(
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
                          <p className="text-sm font-medium">
                            {item.display.courseTitle}
                          </p>
                          <p className="text-xs text-gray-700">
                            {item.display.courseCode}
                          </p>
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
            name="tutorCode"
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
