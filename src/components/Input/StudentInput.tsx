import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { shortName } from "@/utils/utils";
import { X } from "lucide-react";
import TucourApi from "@/utils/http";

interface StudentInputProps {
  value: string[];
  onValueChange: (newValue: string[]) => string[];
  onRemoveStudent: (studentIdList: string[]) => string[];
}

interface StudentItem {
  studentName: string;
  studentId: string;
  studentCode: string;
  studentAvatar: string;
}

const StudentInput = ({
  value,
  onValueChange,
  onRemoveStudent,
}: StudentInputProps) => {
  const [isDisplay, setDisplay] = React.useState(false);
  const [searchKey, setSearchKey] = React.useState("");
  const [idList, setIdList] = React.useState<string[]>(value); // Must not change because it is an interface for outer component
  const [studentList, setStudentList] = React.useState<StudentItem[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        listRef.current &&
        !listRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setDisplay(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDisplay]);

  useEffect(() => {
    const fetchStudents = async () => {
      const students = (await TucourApi.call("/student/all-student", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })) as {
        name: string;
        studentCode: string;
        studentId: string;
        avatarUrl: string;
        userId: string;
      }[];

      setStudentList(
        students.map(
          (item: {
            name: string;
            studentCode: string;
            studentId: string;
            avatarUrl: string;
            userId: string;
          }) => ({
            studentName: item.name,
            studentCode: item.studentCode,
            studentId: item.userId,
            studentAvatar: item.avatarUrl,
          })
        )
      );
    };

    fetchStudents();
  }, []);

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        placeholder="Search Student ..."
        onFocus={() => {
          setDisplay(true);
        }}
        onChange={(e) => {
          setSearchKey(e.target.value.toLowerCase());
        }}
      />
      <div
        ref={listRef}
        className={cn(
          "absolute top-10 border min-w-40 p-1 text-sm rounded-md max-h-56 overflow-y-auto bg-white",
          !isDisplay && "hidden"
        )}
      >
        {studentList
          .filter(
            (student) =>
              student.studentName.toLowerCase().includes(searchKey) ||
              student.studentCode.includes(searchKey)
          )
          .map((student) => (
            <li
              key={student.studentId}
              className="flex gap-2 p-2 hover:bg-t_secondary-100 hover:rounded-md"
              onClick={() => {
                setDisplay(false);
                setIdList((prev) => {
                  let newArr: string[] = [];
                  if (prev.includes(student.studentId)) {
                    newArr = [...prev];
                    const satisfiedArray = onValueChange(newArr);
                    console.log("Satisfied array: ", satisfiedArray);
                    return satisfiedArray;
                  }
                  newArr = [...prev, student.studentId];
                  const satisfiedArr = onValueChange(newArr);
                  return satisfiedArr;
                });
              }}
            >
              <Avatar>
                <AvatarImage
                  src={student.studentAvatar}
                  alt={student.studentName}
                />
                <AvatarFallback>
                  {shortName(student.studentName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{student.studentName}</p>
                <p className="text-gray-600 text-xs">{student.studentCode}</p>
              </div>
            </li>
          ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {idList.map((studentIden) => (
          <span
            key={studentIden}
            className="flex w-fit bg-t_secondary-300 text-white rounded-sm px-2 py-1 text-sm items-center"
          >
            <div>
              <p className="font-medium">
                {
                  studentList.find(
                    (student) => student.studentId === studentIden
                  )?.studentName
                }
              </p>
              <p className="text-xs">
                {
                  studentList.find(
                    (student) => student.studentId === studentIden
                  )?.studentCode
                }
              </p>
            </div>
            <X
              size={16}
              strokeWidth={3}
              className="ml-1 hover:fill-slate-400"
              onClick={() =>
                setIdList((old) => {
                  const newArr = old.filter((oldid) => oldid !== studentIden);
                  return onRemoveStudent(newArr);
                })
              }
            />
          </span>
        ))}
      </div>
    </div>
  );
};

export default StudentInput;
