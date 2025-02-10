import CourseOutlineInput, {
  CourseOutline,
} from "@/components/CourseOutlineInput";
import RequiredInput from "@/components/RequiredInput";
import SearchSelect from "@/components/SearchSelect";
import TextEditor from "@/components/TextEditor/TextEditor";
import { Button } from "@/components/ui/button";
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
import * as yup from "yup";
import CourseDetailPlaceholder from "./CourseDetailPlaceholder";
import PriceInput from "@/components/PriceInput";
import { Descendant } from "slate";

interface ICourse {
  courseTitle: string;
  courseCode: string;
  courseSubject: string;
  courseLevel: string;
  coursePrice: number;
  courseDescription: Descendant[];
  courseOutline: CourseOutline[];
  courseImage?: File;
}

const courseFormSchema: yup.ObjectSchema<ICourse> = yup
  .object({
    courseTitle: yup.string().required("Course title is required"),
    courseCode: yup.string().required("Course code is required"),
    courseSubject: yup.string().required("Course subject is required"),
    courseLevel: yup.string().required("Course level is required"),
    coursePrice: yup
      .number()
      .min(0, "Course price must be greater than or equal to 0")
      .required("Course price is required"),
    courseImage: yup.mixed<File>().optional(),
    courseDescription: yup
      .array<Descendant>()
      .default([{ type: "p", children: [{ text: "" }] }]),
    courseOutline: yup.array().default([]),
  })
  .required();

const NewCourseForm = ({ className }: { className?: string }) => {
  console.log("Render NewCourseForm");

  const form = useForm({ resolver: yupResolver(courseFormSchema) });
  const [imagePreview, setImagePreview] = useState<string>("");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log("Submit data");
          console.log(data);
        })}
        className={cn(className, "space-y-4")}
      >
        <FormField
          name="courseTitle"
          render={({ field }) => (
            <RequiredInput label="Course Title">
              <Input value={field.value} onChange={field.onChange} />
            </RequiredInput>
          )}
        />
        <div className="flex justify-between gap-4 flex-wrap">
          <FormField
            name="courseCode"
            render={({ field }) => (
              <RequiredInput label="Course Code">
                <Input {...field} className="w-32" />
              </RequiredInput>
            )}
          />
          <FormField
            name="courseSubject"
            render={({ field }) => (
              <RequiredInput label="Subject">
                <SearchSelect {...field} />
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
                      console.log(e.target.files)
                      const file = e.target.files?.[0];
                      console.log("Image file", file);
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
              <TextEditor onTextEditorChange={(tree) => field.onChange(tree)} />
            </RequiredInput>
          )}
        />
        <FormField
          name="courseOutline"
          render={({ field }) => (
            <RequiredInput label="Course Outline">
              <CourseOutlineInput
                onCourseOutlineChange={(courseOutline) =>
                  field.onChange(courseOutline)
                }
              />
            </RequiredInput>
          )}
        />
        <Button
          type="submit"
          className="bg-t_primary-400 hover:bg-t_primary-500"
        >
          Create Course
        </Button>
        <Button variant="destructive" type="submit" className="ml-4">
          Cancel
        </Button>
      </form>
    </Form>
  );
};

export default NewCourseForm;
