import StudentApi from "@/api/StudentApi";
import SearchWithSuggestion from "@/components/Input/SearchWithSuggestion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserBrief } from "@/interfaces/UserProfile";
import ContentLayout from "@/layouts/ContentLayout";
import { shortName } from "@/utils/utils";
import React from "react";

const ScorePage = () => {
  const [scoreList, setScoreList] = React.useState<UserBrief[] | undefined>(
    undefined
  );
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
      {scoreList && (
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
                  SUBJECT
                </TableHead>
                <TableHead className="text-white font-semibold">
                  CLASS CODE
                </TableHead>
                <TableHead className="text-white font-semibold">
                  TIME SHIFT  
                </TableHead>
                <TableHead className="text-white font-semibold">ROOM</TableHead>
                <TableHead className="text-white font-semibold rounded-se-md">
                  ADDRESS
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timetable.map((item, idx) => (
                <TableRow
                  key={idx}
                  className="hover:bg-t_primary-600/10 cursor-pointer"
                >
                  <TableCell className="text-center">{idx + 1}</TableCell>
                  <TableCell>{item.subject}</TableCell>
                  <TableCell>
                    {verboseStudyWeek(item.studyWeek, false)}
                  </TableCell>
                  <TableCell>{item.studyShift}</TableCell>
                  <TableCell>{item.room}</TableCell>
                  <TableCell>{item.address}</TableCell>
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
