import TucourApi from "@/utils/http";

export default class RoomApi {
  public static async getAllRooms() {
    try {
      const rooms = await TucourApi.get("/room/all-rooms", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(rooms);
      return rooms;
    } catch (error) {
      console.error(error);
    }
  }

  public static async addRoom(data: {
    // isOnline: boolean;
    roomCode?: string;
    roomAddress?: string;
  }) {
    // console.log("data given in addRoom", data);

    const res = await TucourApi.post("/room/create", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, isOnline: false }),
    });
    return res;
  }

  public static async deleteRoom(roomId: string) {
    try {
      const res = await TucourApi.delete(`/room/${roomId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res;
    } catch (error) {
      console.error(error);
    }
  }
}
