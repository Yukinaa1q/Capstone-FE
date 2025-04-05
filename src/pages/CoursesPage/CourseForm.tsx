import CourseOutlineInput, {
  CourseOutline,
} from "@/components/Input/CourseOutlineInput";
import PriceInput from "@/components/Input/PriceInput";
import RequiredInput from "@/components/Input/RequiredInput";
import SubjectSelect from "@/components/Input/SubjectSelect";
import TextEditor from "@/components/TextEditor/TextEditor";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Descendant } from "slate";
import * as yup from "yup";
import CourseDetailPlaceholder from "./NewCoursePage/CourseDetailPlaceholder";

export interface ICourseForm {
  courseTitle: string;
  courseCode: string;
  courseSubject: string;
  courseLevel: string;
  coursePrice: number;
  courseDuration: number;
  courseDescription: Descendant[];
  courseOutline: CourseOutline[];
  courseImage?: File;
  imgUrl?: string;
}

const courseFormSchema: yup.ObjectSchema<ICourseForm> = yup
  .object({
    courseTitle: yup.string().required("Course title is required"),
    courseCode: yup.string().required("Course code is required"),
    courseSubject: yup.string().required("Course subject is required"),
    courseLevel: yup.string().required("Course level is required"),
    courseDuration: yup.number().required("Learning duration is required"),
    coursePrice: yup
      .number()
      .min(0, "Course price must be greater than or equal to 0")
      .required("Course price is required"),
    courseImage: yup.mixed<File>().required(),
    courseDescription: yup
      .array<Descendant>()
      .default([{ type: "p", children: [{ text: "" }] }]),
    courseOutline: yup.array().default([]),
    imgUrl: yup.string().optional(),
  })
  .required();

const defaultForm: ICourseForm = {
  courseTitle: "",
  courseCode: "",
  courseSubject: "",
  courseLevel: "",
  coursePrice: 0,
  courseDuration: 0,
  courseDescription: [{ type: "p", children: [{ text: "" }] }],
  courseOutline: [],
  imgUrl: "",
};

const CourseForm = ({
  className,
  onSubmit,
  initialData = defaultForm,
  children,
}: {
  className?: string;
  initialData?: ICourseForm;
  onSubmit: (data: ICourseForm) => void;
  children?: React.ReactNode;
}) => {
  const form = useForm({
    defaultValues: initialData,
    resolver: yupResolver(courseFormSchema),
  });
  const [imagePreview, setImagePreview] = useState<string>(
    initialData.imgUrl || ""
  );
  return (
    <Form {...form}>
      <form
        id="course-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          className,
          "space-y-4 mx-auto md:w-3/5 ld:w-3/4 xl:w-1/2"
        )}
      >
        <FormField
          name="courseTitle"
          render={({ field }) => (
            <RequiredInput label="Course Title">
              <Input {...field} />
            </RequiredInput>
          )}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormField
            name="courseCode"
            render={({ field }) => (
              <RequiredInput label="Course Code">
                <Input {...field} className="" />
              </RequiredInput>
            )}
          />
          <FormField
            name="courseSubject"
            render={({ field }) => (
              <RequiredInput label="Subject">
                <SubjectSelect
                  value={field.value}
                  onValueChange={field.onChange}
                />
              </RequiredInput>
            )}
          />
          <FormField
            name="courseLevel"
            render={({ field }) => (
              <RequiredInput label="Course Level">
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-48 data-placeholder:text-gray-500">
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
              </RequiredInput>
            )}
          />
          <FormField
            name="courseDuration"
            render={({ field }) => (
              <RequiredInput label="Learning Duration">
                <div className="flex items-stretch border border-gray-200 rounded-md shadow-muted">
                  <Input
                    type="number"
                    {...field}
                    className="border-none focus-visible:outline-none focus-visible:ring-0"
                  />
                  <div className="flex items-center bg-gray-100 px-2">
                    <p className="text-sm font-medium text-gray-700">week(s)</p>
                  </div>
                </div>
              </RequiredInput>
            )}
          />
        </div>
        <div className="">
          <div className="flex justify-between gap-4">
            <FormField
              name="courseImage"
              render={({ field }) => (
                <RequiredInput label="Course Image">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImagePreview(URL.createObjectURL(file));
                      }
                      field.onChange(e.target.files?.[0]);
                    }}
                  />
                </RequiredInput>
              )}
            />
            <FormField
              name="coursePrice"
              render={({ field }) => (
                <RequiredInput label="Price">
                  <PriceInput
                    initValue={field.value}
                    handleFormChange={(value) => field.onChange(value)}
                  />
                </RequiredInput>
              )}
            />
          </div>
          <p className="text-sm mt-4 font-medium mb-2">Image preview</p>
          {imagePreview === "" ? (
            <p className="text-center text-sm">Choose an image to preview it</p>
          ) : (
            <div className="p-4 border rounded-md w-full">
              <CourseDetailPlaceholder url={imagePreview} />
            </div>
          )}
        </div>
        <FormField
          name="courseDescription"
          render={({ field }) => (
            <RequiredInput label="Course Description">
              <TextEditor
                initValue={field.value}
                onTextEditorChange={(tree) => field.onChange(tree)}
              />
            </RequiredInput>
          )}
        />
        <FormField
          name="courseOutline"
          render={({ field }) => (
            <RequiredInput label="Course Outline">
              <CourseOutlineInput
                key={field.value}
                initValue={field.value}
                onCourseOutlineChange={(courseOutline) =>
                  field.onChange(courseOutline)
                }
              />
            </RequiredInput>
          )}
        />
        {/* {children} */}
        <div className="flex justify-end gap-4">{children}</div>
      </form>
    </Form>
  );
};

export default CourseForm;
