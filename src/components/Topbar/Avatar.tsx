// Dependencies: pnpm install lucide-react

import { Button } from "@/components/ui/button";
// import AvatarImg from "@/public/avatar.jpg";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { Link } from "react-router";
// import Image from "next/image";

export default function AvatarPopover() {
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
            <p className="text-base truncate">Kieu Tien Thanh</p>
            <p className="font-medium text-gray-700">2153798</p>
          </div>
          <div className="flex flex-col space-y-2 py-2 font-medium">
            <Link to="#" className="hover:underline">
              Account Setting
            </Link>
            <Link to="#" className="hover:underline">
              Profile Setting
            </Link>
            <Link to="#" className="hover:underline">
              Your Timetable
            </Link>
          </div>
        </div>
        <Separator />
        <Button variant="ghost" className="w-full mt-2 hover:bg-red-100">
          Log out
        </Button>
      </PopoverContent>
    </Popover>
  );
}
