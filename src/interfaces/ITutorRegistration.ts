import { StudyShift } from "./common";

export default interface ITutorRegistration {
  courseId: string;
  tutorId: string;
  evenTimeShift?: StudyShift[];
  oddTimeShift?: StudyShift[];
}
