import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { shortName } from "@/utils/utils";
import { X } from "lucide-react";
import { useFetchers } from "react-router";
import TucourApi, { ENV } from "@/utils/http";

interface StudentInputProps {
  value: string[];
  onValueChange?: (newValue: string[]) => void;
}

interface StudentItem {
  studentName: string;
  studentId: string;
  studentAvatar: string;
}

// const studentList: StudentItem[] = [
//   {
//     studentName: "Student 1",
//     studentId: "111122",
//     studentAvatar: "#",
//   },
//   {
//     studentName: "Student 2",
//     studentId: "222222",
//     studentAvatar: "#",
//   },
//   {
//     studentName: "Student 3",
//     studentId: "333333",
//     studentAvatar: "#",
//   },
//   {
//     studentName: "Student 4",
//     studentId: "444444",
//     studentAvatar: "#",
//   },
//   {
//     studentName: "Student 5",
//     studentId: "555555",
//     studentAvatar: "#",
//   },
//   {
//     studentName: "Student 6",
//     studentId: "666666",
//     studentAvatar: "#",
//   },
//   {
//     studentName: "Student 7",
//     studentId: "777777",
//     studentAvatar: "#",
//   },
//   {
//     studentName: "Student 8",
//     studentId: "888888",
//     studentAvatar: "#",
//   },
//   {
//     studentName: "Student 9",
//     studentId: "999999",
//     studentAvatar: "#",
//   },
//   {
//     studentName: "Student 10",
//     studentId: "101010",
//     studentAvatar: "#",
//   },
//   {
//     studentName: "Student 11",
//     studentId: "111111",
//     studentAvatar: "#",
//   },
//   {
//     studentName: "Student 12",
//     studentId: "121212",
//     studentAvatar: "#",
//   },
//   {
//     studentName: "Student 13",
//     studentId: "131313",
//     studentAvatar: "#",
//   },
//   {
//     studentName: "Student 14",
//     studentId: "141414",
//     studentAvatar: "#",
//   },
//   {
//     studentName: "Student 15",
//     studentId: "151515",
//     studentAvatar: "#",
//   },
//   {
//     studentName: "Student 16",
//     studentId: "161616",
//     studentAvatar: "#",
//   },
//   {
//     studentName: "Student 17",
//     studentId: "171717",
//     studentAvatar: "#",
//   },
//   {
//     studentName: "Student 18",
//     studentId: "181818",
//     studentAvatar: "#",
//   },
//   {
//     studentName: "Student 19",
//     studentId: "191919",
//     studentAvatar: "#",
//   },
//   {
//     studentName: "Student 20",
//     studentId: "202020",
//     studentAvatar: "#",
//   },
//   {
//     studentName: "Student 21",
//     studentId: "212121",
//     studentAvatar: "#",
//   },
// ];

const StudentInput = ({ value, onValueChange }: StudentInputProps) => {
  const tucourApi = new TucourApi(ENV.DEV);
  const [isDisplay, setDisplay] = React.useState(false);
  const [searchKey, setSearchKey] = React.useState("");
  const [idList, setIdList] = React.useState<string[]>(value);
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
      const students = await tucourApi.call({
        url: "/student/all-student",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });

      setStudentList(students.map(item => ({
        studentName: item.name,
        studentId: item.studentCode,
        studentAvatar: item.avatarUrl
      })))
    }

    fetchStudents();
  }, [])

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
              student.studentId.includes(searchKey)
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
                    onValueChange && onValueChange(newArr);
                    return [...prev];
                  }
                  newArr = [...prev, student.studentId];
                  onValueChange && onValueChange(newArr);
                  return [...prev, student.studentId];
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
                <p className="text-gray-600 text-xs">{student.studentId}</p>
              </div>
            </li>
          ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {idList.map((id) => (
          <span
            key={id}
            className="flex w-fit bg-t_primary-700 text-white rounded-sm px-2 py-1 text-sm items-center"
          >
            {id}{" "}
            <X
              size={16}
              strokeWidth={3}
              className="ml-1 hover:fill-slate-400"
              onClick={() =>
                setIdList((old) => {
                  const newArr = old.filter((oldid) => oldid !== id);
                  onValueChange && onValueChange(newArr);
                  return newArr;
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
