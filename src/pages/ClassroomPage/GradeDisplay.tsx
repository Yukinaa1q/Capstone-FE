import ClassApi from "@/api/ClassApi";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import IGrade from "@/interfaces/IGrade";
import { calculateAverage } from "@/utils/utils";
import { Edit3Icon, Save } from "lucide-react";
import React, { useEffect } from "react";
import { useLoaderData, useParams } from "react-router";
import StudentGrade from "./IStudentGrade";
import ShowAndInput from "./ShowAndInput";

const GradeDisplay = () => {
  const classCode = useParams().classId as string;
  const currentClassInfo = useLoaderData().classroomDetail as {
    courseTitle: string;
    courseCode: string;
    classId: string;
    classCode: string;
    tutor: string;
    studyRoom: string;
  };
  console.log("Current class info", currentClassInfo);
  const [isEdit, setIsEdit] = React.useState(false);
  const studentGradeList = useLoaderData().studentListGrade as StudentGrade[];
  const [studentListGrade, setStudentListGrade] =
    React.useState<StudentGrade[]>(studentGradeList);

  useEffect(() => {
    async function fetchStudentGradeList() {
      setStudentListGrade(await ClassApi.getStudentGradeList(classCode!));
    }
    fetchStudentGradeList();
  }, [classCode]);

  function updateStudentScore(
    newScore: number,
    studentId: string,
    type: keyof IGrade
  ) {
    setStudentListGrade((old) => {
      const newStudentListGrade = old.map((student) => {
        if (student.studentId === studentId) {
          return {
            ...student,
            grade: {
              ...student.grade,
              [type]: newScore,
            },
          };
        }
        return student;
      });
      return newStudentListGrade;
    });
  }

  async function submitGrade(studentListGrade: StudentGrade[]) {
    try {
      await ClassApi.updateStudentGradesInClass(
        studentListGrade.map((studentGrade) => ({
          ...studentGrade,
          classId: currentClassInfo.classId,
        }))
      );
      // window.location.reload();
      setStudentListGrade(await ClassApi.getStudentGradeList(classCode!));
    } catch {
      alert("Something went wrong when submitting the grade list");
    }
    // console.log("Submitting list of grade for student in class: " + classCode, studentListGrade)
  }

  return (
    <Table className="hover:t_primary-600">
      <TableHeader className="bg-t_primary-600">
        <TableRow className="hover:bg-t_primary-600">
          <TableHead className="text-white">Student</TableHead>
          <TableHead className="text-white">Student Id</TableHead>
          <TableHead className="text-center text-white">
            Homework Score (10%)
          </TableHead>
          <TableHead className="text-center text-white">
            Assignment Score (20%)
          </TableHead>
          <TableHead className="text-center text-white">
            Midterm Score (20%)
          </TableHead>
          <TableHead className="text-center text-white">
            Final Score (50%)
          </TableHead>
          <TableHead className="text-center text-white">Average</TableHead>
          <TableHead className="text-center text-white">
            <div className="flex items-center gap-1">
              <Save size={16} />
              <Switch
                id="airplane-mode"
                className="data-[state=checked]:bg-t_primary-300"
                onCheckedChange={(checked) => {
                  setIsEdit(checked);
                  if (!checked) submitGrade(studentListGrade);
                }}
              />
              <Edit3Icon size={16} />
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {studentListGrade.map((student) => (
          <TableRow key={student.studentName}>
            <TableCell className="font-medium">{student.studentName}</TableCell>
            <TableCell className="font-medium">{student.studentCode}</TableCell>
            <TableCell className="text-center">
              <ShowAndInput
                isEdit={isEdit}
                value={student.grade.homework.toString()}
                setValue={(score) => {
                  console.log("The score to be updated is", score);
                  updateStudentScore(
                    parseFloat(score),
                    student.studentId,
                    "homework"
                  );
                }}
              />
              {/* {student.homeworkScore} */}
            </TableCell>
            <TableCell className="text-center">
              <ShowAndInput
                isEdit={isEdit}
                value={student.grade.assignment.toString()}
                setValue={(score) =>
                  updateStudentScore(
                    parseFloat(score),
                    student.studentId,
                    "assignment"
                  )
                }
              />
            </TableCell>
            <TableCell className="text-center">
              <ShowAndInput
                isEdit={isEdit}
                value={student.grade.midterm.toString()}
                setValue={(score) =>
                  updateStudentScore(
                    parseFloat(score),
                    student.studentId,
                    "midterm"
                  )
                }
              />
            </TableCell>
            <TableCell className="text-center">
              <ShowAndInput
                isEdit={isEdit}
                value={student.grade.final.toString()}
                setValue={(score) =>
                  updateStudentScore(
                    parseFloat(score),
                    student.studentId,
                    "final"
                  )
                }
              />
            </TableCell>
            <TableCell className="text-center">
              {calculateAverage(student.grade).toPrecision(3)}
            </TableCell>
            <TableCell className="text-center"></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GradeDisplay;
