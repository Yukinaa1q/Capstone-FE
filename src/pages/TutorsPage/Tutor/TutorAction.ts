import TutorApi from "@/api/TutorApi";
import { TutorDetail } from "@/interfaces/UserProfile";

export interface TutorInitContent {
  qualifications: {
    subject: string;
    level: string;
  }[];
  tutorDetail: TutorDetail;
}

export default async function getTutorInitContent({ params }) {
  // console.log(params);
  const res = {} as TutorInitContent;
  try {
    const qualifications = (await TutorApi.getQualifications(params.id)) as {
      subject: string;
      level: string;
    }[];
    const tutorDetail = await TutorApi.getTutorDetail(params.id);
    res.tutorDetail = tutorDetail;
    res.qualifications = qualifications;
  } catch (err) {
    console.log(err);
  }

  return res;
}
