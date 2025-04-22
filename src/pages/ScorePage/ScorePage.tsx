import StudentApi from "@/api/StudentApi";
import SearchWithSuggestion from "@/components/Input/SearchWithSuggestion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserBrief } from "@/interfaces/UserProfile";
import ContentLayout from "@/layouts/ContentLayout";
import { shortName } from "@/utils/utils";
import React from "react";

interface IScoreSheet {
  courseTitle: string;
  courseCode: string;
  courseId: string;
  homework: number;
  midterm: number;
  assignment: number;
  final: number;
}

const ScorePage = () => {
  const [scoreList, setScoreList] = React.useState<IScoreSheet[]>([
    {
      courseTitle: "Math",
      courseCode: "MATH101",
      courseId: "C001",
      homework: 8,
      midterm: 7,
      assignment: 9,
      final: 10,
    },
    {
      courseTitle: "Physics",
      courseCode: "PHYS101",
      courseId: "C002",
      homework: 8,
      midterm: 7,
      assignment: 9,
      final: 10,
    },
    {
      courseTitle: "Chemistry",
      courseCode: "CHEM101",
      courseId: "C003",
      homework: 8,
      midterm: 7,
      assignment: 9,
      final: 10,
    },
  ]);
  const [chosenUser, setChosenUser] = React.useState<UserBrief | null>(null);
  return (
    <ContentLayout>
      <SearchWithSuggestion<UserBrief>
        itemComponents={(item) => (
          <div className="flex gap-2 hover:bg-t_primary-100/50 p-2 rounded-lg cursor-pointer">
            <Avatar>
              <AvatarImage src={item.avatarUrl} />
              <AvatarFallback>{shortName(item.name)}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-semibold text-gray-700">{item.name}</p>
              <p className="text-t_primary-500">{item.userCode}</p>
            </div>
          </div>
        )}
        loadData={StudentApi.getStudentBriefList}
        onSelect={(user) => {
          setChosenUser(user);
        }}
      />
      {chosenUser && (
        <div className="mt-10 relative">
          <h1 className="text-xl font-semibold text-center">
            {chosenUser?.name} - {chosenUser?.userCode}
          </h1>
          <Table className="mt-6">
            <TableHeader className="bg-t_primary-600">
              <TableRow className="hover:bg-t_primary-600/80">
                <TableHead className="text-center text-white font-semibold rounded-ss-md">
                  NO
                </TableHead>
                <TableHead className="text-white font-semibold">
                  COURSE TITLE
                </TableHead>
                <TableHead className="text-white font-semibold">
                  COURSE CODE
                </TableHead>
                <TableHead className="text-white font-semibold text-center">
                  HOMEWORK SCORE
                </TableHead>
                <TableHead className="text-white font-semibold text-center">
                  MIDTERM SCORE
                </TableHead>
                <TableHead className="text-white font-semibold text-center">
                  ASSIGNMENT SCORE
                </TableHead>
                <TableHead className="text-white font-semibold text-center">
                  FINAL SCORE
                </TableHead>
                <TableHead className="text-white font-semibold rounded-se-md text-center">
                  AVERAGE SCORE
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scoreList.map((score, idx) => (
                <TableRow
                  key={idx}
                  className="hover:bg-t_primary-600/10 cursor-pointer"
                >
                  <TableCell className="text-center">{idx + 1}</TableCell>
                  <TableCell>{score.courseTitle}</TableCell>
                  <TableCell>{score.courseCode}</TableCell>
                  <TableCell className="text-center">
                    {score.homework}
                  </TableCell>
                  <TableCell className="text-center">{score.midterm}</TableCell>
                  <TableCell className="text-center">
                    {score.assignment}
                  </TableCell>
                  <TableCell className="text-center">{score.final}</TableCell>
                  <TableCell className="text-center">
                    {score.homework * 0.1 +
                      score.assignment * 0.2 +
                      score.midterm * 0.2 +
                      score.final * 0.5}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </ContentLayout>
  );
};

export default ScorePage;
