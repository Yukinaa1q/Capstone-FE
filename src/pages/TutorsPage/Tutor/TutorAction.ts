import TutorApi from "@/api/TutorApi";

export interface TutorInitContent {
  qualifications: {
    subject: string;
    level: string;
  }[];
  tutorDetail: {
    userCode: string;
    userId: string;
    fullName: string;
    email: string;
    isVerified: boolean;
    dob: string;
    ssid: string;
    address: string;
    phoneNumber: string;
  };
}

export default async function getTutorInitContent({ params }) {
  // console.log(params);
  const res: TutorInitContent = {
    qualifications: [],
    tutorDetail: {
      userCode: "",
      userId: "",
      fullName: "",
      email: "",
      isVerified: false,
      dob: "",
      ssid: "",
      address: "",
      phoneNumber: "",
    },
  };
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
