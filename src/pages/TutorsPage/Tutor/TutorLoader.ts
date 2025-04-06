import TutorApi from "@/api/TutorApi";
import { IClassDetail } from "@/interfaces/ICourseDetail";
import { TutorDetail } from "@/interfaces/UserProfile";

export interface TutorInitContent {
  qualifications: {
    subject: string;
    level: string;
  }[];
  tutorDetail: TutorDetail;
  classHistory: Pick<IClassDetail, "courseTitle" | "courseCode" | "classCode" | "classSession" | "classShift" | "studyRoom">[]
}

export default async function getTutorInitContent({ params }) {
  // console.log(params);
  const res = {} as TutorInitContent;
  try {
    // get tutors qualifications
    const qualifications = (await TutorApi.getQualifications(params.id)) as {
      subject: string;
      level: string;
    }[];
    // get tutors profile information
    const tutorDetail = await TutorApi.getTutorDetail(params.id);
    // get tutor class history 
    const tutorClassHistory = await TutorApi.getClassHistory(params.id);
    res.tutorDetail = tutorDetail;
    res.qualifications = qualifications;
    res.classHistory = tutorClassHistory;
  } catch (err) {
    console.log(err);
  }

  return res;
}
