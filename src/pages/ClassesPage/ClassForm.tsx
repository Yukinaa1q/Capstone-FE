import RequiredInput from "@/components/Input/RequiredInput";
import SearchSelect, { ListItem } from "@/components/Input/SearchSelect";
import Selection from "@/components/Input/Selection";
import StudentInput from "@/components/Input/StudentInput";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { StudyShift, StudyWeek } from "@/interfaces/common";
import { cn } from "@/lib/utils";
import TucourApi from "@/utils/http";
import { shortName } from "@/utils/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { Check, CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { array, boolean, InferType, number, object, string } from "yup";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const classFormSchema = object({
  courseTitle: string(),
  courseCode: string().required("Course code is required"),
  maxStudents: number()
    .min(1, "Class size cannot be smaller than 1")

    .required("Class size is required"),
  studyWeek: string<StudyWeek | "">().required("Study week is required"),
  studyShift: string<StudyShift | "">().required("Study shift is required"),
  isOnline: boolean().default(false),
  tutorCode: string().required("Tutor is required"),
  studentIdList: array()
    .of(string().defined())
    .required()
    .defined("At least one student is required")
    .when(["maxStudents"], (maxStudents, schema) => {
      return schema.max(maxStudents[0], "Students exceed class size");
    }),
}).required();

export type IClassForm = InferType<typeof classFormSchema>;

const ClassForm = ({
  className,
  defaultValues,
  onSubmit,
  children,
}: {
  className?: string;
  defaultValues?: InferType<typeof classFormSchema>;
  onSubmit: (data: IClassForm) => void;
  children?: React.ReactNode;
}) => {
  const [codeList, setCodeList] = useState<ListItem[]>([]);
  const [courseList, setCourseList] = useState<
    {
      courseCode: string;
      courseTitle: string;
      courseLevel: string;
      courseSubject: string;
    }[]
  >([]);
  const [chosenCourse, setChosenCourse] = useState<
    | {
        courseCode: string;
        courseTitle: string;
        courseLevel: string;
        courseSubject: string;
      }
    | undefined
  >(undefined);
  const [tutorList, setTutorList] = useState<ListItem[]>([]);

  const [studyWeek, setStudyWeek] = useState<StudyWeek | undefined>(undefined); // A workaround to reset the list of study shifts
  // Because the list can only be set when their is a rerender in ClassForm, however, useForm won't trigger a rerender
  const [studyShift, setStudyShift] = useState<StudyShift | undefined>(
    undefined
  );

  const form = useForm({
    values: defaultValues,
    resolver: yupResolver(classFormSchema),
  });

  const fetchTutorList = async (
    studyWeek: StudyWeek,
    studyShift: StudyShift
  ) => {
    // API to get all available tutor.
    const tutorListApi = (await TucourApi.call(
      "/class/check-tutor-availability",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          studyWeek,
          studyShift,
        }),
      }
    )) as {
      tutorCode: string;
      name: string;
      avatarUrl: string;
      qualifiedSubject: [{ subject: string; level: string }];
    }[];
    setTutorList(
      tutorListApi.map((item) => {
        return {
          value: item.tutorCode,
          label: item.name,
          display: {
            tutorName: item.name,
            tutorImage: item.avatarUrl,
            qualifiedSubject: item.qualifiedSubject,
          },
        };
      })
    );
  };

  useEffect(() => {
    const fetchCourseCode = async () => {
      try {
        // API to get all available course.
        const res = (await TucourApi.call("/course/course-code-title", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })) as {
          courseCode: string;
          courseTitle: string;
          courseLevel: string;
          courseSubject: string;
        }[];

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
        if (defaultValues)
          setChosenCourse(
            res.find((course) => course.courseCode == defaultValues.courseCode)
          );
        setCourseList(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourseCode();
  }, [defaultValues]);

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
                    disabled={defaultValues ? true : false}
                    className=""
                    {...field}
                    list={codeList}
                    placeholder="Search"
                    onValueChange={(value) => {
                      form.setValue(
                        "courseTitle",
                        codeList.find((item) => item.value === value)?.display
                          ?.courseTitle ?? ""
                      );
                      setChosenCourse(
                        courseList.find((course) => course.courseCode === value)
                      );
                      field.onChange(value);
                      form.setValue("tutorCode", "");
                    }}
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
            name="isOnline"
            render={({ field }) => (
              <RequiredInput label="Learning Type">
                <RadioGroup
                  disabled={defaultValues ? true : false}
                  value={field.value ? "online" : "offline"}
                  onValueChange={(val) =>
                    field.onChange(val === "online" ? true : false)
                  }
                  className="flex mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="online" id="r1" />
                    <Label htmlFor="r1">online</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="offline" id="r2" />
                    <Label htmlFor="r2">offline</Label>
                  </div>
                </RadioGroup>
              </RequiredInput>
            )}
          />
        </div>
        <div className="grid lg:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="studyWeek"
            render={({ field }) => {
              return (
                <RequiredInput label="Study Weekdays">
                  <Selection
                    disabled={defaultValues ? true : false}
                    placeholder="Study Weekdays"
                    selectList={["2-4", "4-6", "3-5", "7", "8"]}
                    value={field.value}
                    onSelect={(val) => {
                      field.onChange(val);
                      setStudyWeek(val as StudyWeek); // A workaround to reset the list of study shifts
                    }}
                    display={(weekdays) => {
                      switch (weekdays) {
                        case "2-4":
                          return "Mon - Wed";
                        case "4-6":
                          return "Wed - Fri";
                        case "3-5":
                          return "Tue - Thur";
                        case "7":
                          return "Sat";
                        case "8":
                          return "Sun";
                        default:
                          return "";
                      }
                    }}
                  />
                </RequiredInput>
              );
            }}
          />

          <FormField
            control={form.control}
            name="studyShift"
            render={({ field }) => (
              <RequiredInput label="Study Shift">
                <Selection
                  value={field.value}
                  disabled={defaultValues ? true : false}
                  placeholder="Time Shift"
                  selectList={
                    studyWeek
                      ? ["7", "8"].includes(
                          form.getValues("studyWeek").toString()
                        )
                        ? [
                            "08h00 - 11h00",
                            "13h00 - 16h00",
                            "16h15 - 19h15",
                            "19h30 - 21h30",
                          ]
                        : ["17h45 - 19h15", "19h30 - 21h00"]
                      : []
                  }
                  onSelect={(value) => {
                    setStudyShift(value as StudyShift);
                    field.onChange(value);
                    // The logic will be, whenever academic affair choose study shift, trigger api to
                    // fetch tutor list, because the all the requirements are met.
                    fetchTutorList(studyWeek as StudyWeek, value as StudyShift);
                  }}
                />
              </RequiredInput>
            )}
          />

          <FormField
            control={form.control}
            name="tutorCode"
            render={({ field }) => (
              <RequiredInput label="Tutor" className="relative">
                <div>
                  <SearchSelect
                    disabled={
                      defaultValues !== undefined || !studyShift || !studyWeek
                    }
                    notFoundText="No tutor found or qualified for this course"
                    className="px-2"
                    {...field}
                    list={tutorList.filter((tutor) => {
                      return tutor.display.qualifiedSubject.some(
                        (subject: { subject: string; level: string }) => {
                          return (
                            subject.subject === chosenCourse?.courseSubject &&
                            parseInt(subject.level) >=
                              parseInt(chosenCourse?.courseLevel ?? "0")
                          );
                        }
                      );
                    })}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
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
                          <Check
                            size={16}
                            strokeWidth={2}
                            className="ml-auto"
                          />
                        )}
                      </div>
                    )}
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        asChild
                        className="absolute top-1 right-0"
                      >
                        <CircleAlert size={14} className="stroke-gray-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Select study week and study shift before choosing
                          tutor
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </RequiredInput>
            )}
          />
        </div>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="studentIdList"
            render={({ field }) => (
              <RequiredInput label="Students" isRequired={false}>
                <StudentInput
                  value={field.value ?? []}
                  onValueChange={(newVal) => {
                    form.clearErrors("studentIdList");
                    const maxStudents = form.getValues("maxStudents");
                    if (!maxStudents || maxStudents === 0) {
                      form.setError("studentIdList", {
                        type: "validate",
                        message: "Please enter max students first",
                      });
                      return [];
                    }
                    if (newVal.length > maxStudents) {
                      form.setError("studentIdList", {
                        type: "validate",
                        message: `Exceed the class size (${maxStudents})`,
                      });
                      newVal.pop();
                      return [...newVal];
                    } else {
                      field.onChange(newVal);
                      return newVal;
                    }
                  }}
                  onRemoveStudent={(studenList) => {
                    form.clearErrors("studentIdList");
                    field.onChange(studenList);
                    return studenList;
                  }}
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
