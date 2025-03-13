import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Edit3Icon, Save } from "lucide-react";
import React from "react";
import ShowAndInput from "./ShowAndInput";

interface StudentGrade {
  studentName: string;
  studentId: string;
  homeworkScore: number;
  assignmentScore: number;
  midtermScore: number;
  finalScore: number;
}

const gradings = [
  {
    studentName: "Mot Cai Ten Cuc Ky Dai",
    studentId: "123456",
    homeworkScore: NaN,
    assignmentScore: 8,
    midtermScore: 7,
    finalScore: 8,
  },
];

const GradeDisplay = () => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [studentListGrade, setStudentListGrade] =
    React.useState<StudentGrade[]>(gradings);

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

  function calculateAverage(grade: StudentGrade) {
    const { homeworkScore, assignmentScore, midtermScore, finalScore } = grade;
    return (
      homeworkScore * 0.1 +
      assignmentScore * 0.2 +
      midtermScore * 0.2 +
      finalScore * 0.5
    );
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
                onCheckedChange={(checked) => setIsEdit(checked)}
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
            <TableCell className="font-medium">{student.studentId}</TableCell>
            <TableCell className="text-center">
              <ShowAndInput
                isEdit={isEdit}
                value={student.homeworkScore.toString()}
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
                value={student.assignmentScore.toString()}
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
                value={student.midtermScore.toString()}
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
                value={student.finalScore.toString()}
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
              {calculateAverage(student)}
            </TableCell>
            <TableCell className="text-center"></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GradeDisplay;
