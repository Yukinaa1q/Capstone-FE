// Dependencies: pnpm install lucide-react

import { Button } from "@/components/ui/button";
// import AvatarImg from "@/public/avatar.jpg";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { Link, useNavigate } from "react-router";
import { useAppSelector } from "@/hooks/reduxHook";
// import Image from "next/image";

export default function AvatarPopover() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auths);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto space-x-0 p-0 hover:bg-transparent gap-0"
        >
          <Avatar className="size-9">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <ChevronDown
            size={16}
            strokeWidth={2}
            className="opacity-60"
            aria-hidden="true"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="text-sm p-2 w-60">
        <div className="text-right ">
          <div className="font-medium p-4 bg-t_primary-100 rounded-md">
            <p className="text-base truncate">{user.name}</p>
            <p className="font-medium text-gray-700">{user.userCode}</p>
          </div>
          <div className="flex flex-col space-y-2 py-2 font-medium">
            <Link to="/user/account" className="hover:underline">
              Account Setting
            </Link>
            <Link to="/user/profile" className="hover:underline">
              Profile Setting
            </Link>
            <Link to="/user/time-table" className="hover:underline">
              Your Timetable
            </Link>
          </div>
        </div>
        <Separator />
        <Button
          variant="ghost"
          className="w-full mt-2 hover:bg-red-100"
          onClick={() => {
            localStorage.removeItem("token");
            if (user.role === "student" || user.role === "tutor")
              navigate("/login");
            else navigate("/staff/login");
          }}
        >
          Log out
        </Button>
      </PopoverContent>
    </Popover>
  );
}
