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
import { calculateAverage, shortName } from "@/utils/utils";
import React from "react";
import { IScoreSheet } from "./scoreInterface";
import { ChartColumnBig } from "lucide-react";

const ScorePage = () => {
  const [scoreList, setScoreList] = React.useState<IScoreSheet[]>([]);
  const [chosenUser, setChosenUser] = React.useState<UserBrief | null>(null);

  const getStudentGradeList = async (studentId: string) => {
    const res = await StudentApi.getStudentGradeList(studentId);
    setScoreList(res);
  };

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
          getStudentGradeList(user.userId);
        }}
      />
      {chosenUser ? (
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
                    {score.grade.homework}
                  </TableCell>
                  <TableCell className="text-center">
                    {score.grade.midterm}
                  </TableCell>
                  <TableCell className="text-center">
                    {score.grade.assignment}
                  </TableCell>
                  <TableCell className="text-center">
                    {score.grade.final}
                  </TableCell>
                  <TableCell className="text-center">
                    {calculateAverage(score.grade)}
                  </TableCell>
                </TableRow>   
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="absolute bottom-0 top-16 left-0 right-0 flex flex-col justify-center">
          <div className="size-fit bg-gray-100 mx-auto rounded-full p-6">
            <ChartColumnBig size={80} strokeWidth={1} className="stroke-gray-400" />
          </div>
          <p className="text-center font-medium text-gray-400 mt-4">
            Please search for a student to view their scores
          </p>
        </div>
      )}
    </ContentLayout>
  );
};

export default ScorePage;
