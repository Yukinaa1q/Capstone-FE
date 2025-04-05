import { StudyShift, StudyWeek } from "./common";

export interface TutorRegistrationSchedule {
    studyWeek: StudyWeek;
    studyShift: StudyShift;
    isOnline: boolean;
}