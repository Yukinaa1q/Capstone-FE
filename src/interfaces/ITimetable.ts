import { StudyShift, StudyWeek } from "./common";

export interface ITimeTable {
    subject: string;
    studyWeek: StudyWeek;
    studyShift: StudyShift;
    room: string;
    address: string;
} 