// Dependencies: pnpm install lucide-react

"use client";

import { NotificationApi } from "@/api/NotificationApi";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppSelector } from "@/hooks/reduxHook";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";

const initialNotifications = [
  {
    id: 1,
    user: "Chris Tompson",
    action: "requested review on",
    target: "PR #42: Feature implementation",
    timestamp: "15 minutes ago",
    unread: true,
  },
  {
    id: 2,
    user: "Emma Davis",
    action: "shared",
    target: "New component library",
    timestamp: "45 minutes ago",
    unread: true,
  },
  {
    id: 3,
    user: "James Wilson",
    action: "assigned you to",
    target: "API integration task",
    timestamp: "4 hours ago",
    unread: false,
  },
  {
    id: 4,
    user: "Alex Morgan",
    action: "replied to your comment in",
    target: "Authentication flow",
    timestamp: "12 hours ago",
    unread: false,
  },
  {
    id: 5,
    user: "Sarah Chen",
    action: "commented on",
    target: "Dashboard redesign",
    timestamp: "2 days ago",
    unread: false,
  },
  {
    id: 6,
    user: "Miky Derya",
    action: "mentioned you in",
    target: "Origin UI open graph image",
    timestamp: "2 weeks ago",
    unread: false,
  },
];

function Dot({ className }: { className?: string }) {
  return (
    <svg
      width="6"
      height="6"
      fill="currentColor"
      viewBox="0 0 6 6"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="3" cy="3" r="3" />
    </svg>
  );
}

export default function Notification() {
  const userId = useAppSelector((state) => state.auths.userId);
  const hasNewMessage = useAppSelector(
    (state) => state.notifications.hasNewMessage
  );
  const [notifications, setNotifications] = useState<
    {
      receiverId: string;
      message: string;
      isRead: boolean;
      notificationId: string;
    }[]
  >([]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllAsRead = async () => {
    await NotificationApi.markAllAsRead(userId);
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const handleNotificationClick = async (
    userId: string,
    notificationId: string
  ) => {
    console.log("You clicked");
    await NotificationApi.markAsRead(userId, notificationId);
    setNotifications(
      notifications.map((notification) => {
        return notification.notificationId === notificationId
          ? { ...notification, isRead: true }
          : notification;
      })
    );
  };

  const getNotifications = async () => {
    const res = (await NotificationApi.getUserNotifications(userId)) as {
      receiverId: string;
      message: string;
      isRead: boolean;
      notificationId: string;
    }[];

    console.log("Notification", res);
    setNotifications(res);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="relative"
          aria-label="Open notifications"
          onClick={getNotifications}
        >
          <Bell
            size={24}
            strokeWidth={1.5}
            aria-hidden="true"
            style={{ width: "24px", height: "24px" }}
          />
          {hasNewMessage && (
            <>
              <span className="animate-ping size-2 bg-blue-500 rounded-full absolute top-1 right-1"></span>
              <span className="size-2 bg-blue-500 rounded-full absolute top-1 right-1"></span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-1">
        <div className="flex items-baseline justify-between gap-4 px-3 py-2">
          <div className="text-sm font-semibold">Notifications</div>
          {unreadCount > 0 && (
            <button
              className="text-xs font-medium hover:underline"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </button>
          )}
        </div>
        <div
          role="separator"
          aria-orientation="horizontal"
          className="-mx-1 my-1 h-px bg-border"
        ></div>
        {notifications.map((notification) => (
          <div
            key={notification.notificationId}
            className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
          >
            <div className="relative flex items-start pe-3">
              <div className="flex-1 space-y-1">
                <button
                  className="text-left text-foreground/80 after:absolute after:inset-0"
                  onClick={() =>
                    handleNotificationClick(userId, notification.notificationId)
                  }
                >
                  <span className="font-medium text-foreground hover:underline">
                    {/* {notification.user} */}
                    New Message:
                  </span>{" "}
                  {notification.message}
                  {/* <span className="font-medium text-foreground hover:underline">
                    {notification.target}
                  </span> */}
                  .
                </button>
                {/* <div className="text-xs text-muted-foreground">
                  {notification.timestamp}
                </div> */}
              </div>
              {!notification.isRead && (
                <div className="absolute end-0 self-center">
                  <span className="sr-only">Unread</span>
                  <Dot />
                </div>
              )}
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
