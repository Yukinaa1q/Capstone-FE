import TimetableApi from "@/api/TimeTableApi";
import { jwtDecoder } from "@/utils/utils";

export default async function getUserTimetableLoader() {
  const jwt = jwtDecoder(localStorage.getItem("token") ?? "");
  console.log("jwt: ", jwt.payload.payload.userId);
  return await TimetableApi.getUserTimetable(jwt.payload.payload.userId)
}
