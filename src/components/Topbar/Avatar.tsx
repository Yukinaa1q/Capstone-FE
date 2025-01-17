// Dependencies: pnpm install lucide-react

import { Button } from "@/components/ui/button";
// import AvatarImg from "@/public/avatar.jpg";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
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
      <PopoverContent>
        Content goes here
      </PopoverContent>
    </Popover>
  );
}
