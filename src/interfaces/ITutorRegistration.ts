import { StudyShift } from "./common";

export default interface ITutorRegistration {
  courseId: string;
  userId: string;
  evenTimeShift?: StudyShift[];
  oddTimeShift?: StudyShift[];
}
