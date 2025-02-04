import CourseOutlineInput from "@/components/CourseOutlineInput";
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

const courseFormSchema = yup
  .object({
    courseTitle: yup.string().required("Course title is required"),
    courseCode: yup.string().required("Course code is required"),
    courseImage: yup.mixed(),
    courseDescription: yup.mixed(),
    courseOutline: yup.mixed(),
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
          console.log(data);
        })}
        className={cn(className, "space-y-4")}
      >
        <FormField
          name="courseTitle"
          render={({ field }) => (
            <RequiredInput label="Course Title">
              <Input {...field} />
            </RequiredInput>
          )}
        />
        <div className="flex justify-between gap-4">
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
                <SearchSelect />
              </RequiredInput>
            )}
          />
          <FormField
            name="courseLevel"
            render={({ field }) => (
              <RequiredInput label="Course Level">
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue
                      placeholder="Course Level"
                      className="placeholder:text-slate-100"
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
          <FormField
            name="courseImage"
            render={({ field }) => (
              <RequiredInput label="Course Image">
                <Input
                  type="file"
                  accept="image/*"
                  {...field}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImagePreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </RequiredInput>
            )}
          />
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
              <TextEditor />
            </RequiredInput>
          )}
        />
        <FormField
          name="courseOutline"
          render={({ field }) => (
            <RequiredInput label="Course Outline">
              <CourseOutlineInput />
            </RequiredInput>
          )}
        />
        <Button type="submit">Create Course</Button>
      </form>
    </Form>
  );
};

export default NewCourseForm;
