import TucourApi from "@/utils/http";

export class NotificationApi {
  static async getUserNotifications(userId: string) {
    const res = await TucourApi.get("noti/" + userId);
    return res;
  }

  static async markAsRead(userId: string, notificationId: string) {
    await TucourApi.post(`noti/markAsRead/${userId}/${notificationId}`, {
      headers: { "Content-Type": "application/json" },
    });
  }

  static async markAllAsRead(userId: string) {
    await TucourApi.post(`noti/markAllAsRead/${userId}`, {
      headers: { "Content-Type": "application/json" },
    });
  }
}
