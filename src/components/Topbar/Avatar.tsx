// Dependencies: pnpm install lucide-react

import { Button } from "@/components/ui/button";
// import AvatarImg from "@/public/avatar.jpg";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import Image from "next/image";

export default function AvatarPopover() {
  return (
    <Button variant="ghost" className="h-auto space-x-0 p-0 hover:bg-transparent">
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
  );
}
