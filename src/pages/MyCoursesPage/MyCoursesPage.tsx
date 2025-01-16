import ClassCard from "@/components/ClassCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IClass } from "@/interfaces/IClass";

const myCoursesList: IClass[] = [
  {
    courseName: "Mathematics",
    courseCode: "MATH 101",
    tutor: "Dr. John Doe",
    class: "A113",
  },
  {
    courseName: "Physics",
    courseCode: "PHYS 101",
    tutor: "Dr. Jane Doe",
    class: "B502",
  },
  {
    courseName: "Computer Science",
    courseCode: "CS 101",
    tutor: "Dr. John Doe",
    class: "C504",
  },
  {
    courseName: "History",
    courseCode: "HIST 101",
    tutor: "Dr. Jane Doe",
    class: "D101",
  },
  {
    courseName: "Biology",
    courseCode: "BIO 101",
    tutor: "Dr. John Doe",
    class: "E201",
  },
  {
    courseName: "Chemistry",
    courseCode: "CHEM 101",
    tutor: "Dr. Jane Doe",
    class: "F301",
  },
  {
    courseName: "Geography",
    courseCode: "GEOG 101",
    tutor: "Dr. John Doe",
    class: "G401",
  },
  {
    courseName: "Economics",
    courseCode: "ECON 101",
    tutor: "Dr. Jane Doe",
    class: "H501",
  },
  {
    courseName: "English",
    courseCode: "ENGL 101",
    tutor: "Dr. John Doe",
    class: "I601",
  },
  {
    courseName: "Art",
    courseCode: "ART 101",
    tutor: "Dr. Jane Doe",
    class: "J701",
  },
];

const MyCoursesPage = () => {
  return (
    <main className="px-8 pt-4">
      <div className="flex items-center gap-4">
        <h3 className="font-semibold text-xl">Your Courses</h3>
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Semester" defaultValue={"241"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="241">2024-2025 | I</SelectItem>
            <SelectItem value="223">2022-2023 | III</SelectItem>
            <SelectItem value="222">2022-2023 | II</SelectItem>
            <SelectItem value="221">2022-2023 | I</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-4">
        {myCoursesList.map((course, index) => (
          <div className="max-w-full" key={index}>
            <ClassCard key={index} classInfo={course} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default MyCoursesPage;
