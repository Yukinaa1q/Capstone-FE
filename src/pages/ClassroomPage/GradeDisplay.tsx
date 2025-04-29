import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit3Icon, Save } from "lucide-react";
import React from "react";
import ShowAndInput from "./ShowAndInput";
import IGrade from "@/interfaces/IGrade";
import { useLoaderData } from "react-router";
import { calculateAverage } from "@/utils/utils";

interface StudentGrade {
  studentName: string;
  studentId: string;
  studentCode: string;
  grade: IGrade;
}

const GradeDisplay = () => {
  const [isEdit, setIsEdit] = React.useState(false);
  const studentGradeList = useLoaderData().studentListGrade as StudentGrade[];
  const [studentListGrade, setStudentListGrade] =
    React.useState<StudentGrade[]>(studentGradeList);

  function updateStudentScore(
    newScore: number,
    studentId: string,
    type: string
  ) {
    setStudentListGrade((old) => {
      const newStudentListGrade = old.map((student) => {
        if (student.studentId === studentId) {
          return {
            ...student,
            [type]: newScore,
          };
        }
        return student;
      });
      return newStudentListGrade;
    });
  }

  // async function submitGrade(studentListGrade: StudentGrade[]) {
  //   for (const studentGrade of studentListGrade) {

  //   }
  // }

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
                  // submitGrade(studentListGrade);
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
                setValue={(score) =>
                  updateStudentScore(
                    parseFloat(score),
                    student.studentId,
                    "homeworkScore"
                  )
                }
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
                    "assignmentScore"
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
                    "midtermScore"
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
                    "finalScore"
                  )
                }
              />
            </TableCell>
            <TableCell className="text-center">
              {calculateAverage(student.grade)}
            </TableCell>
            <TableCell className="text-center"></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GradeDisplay;
