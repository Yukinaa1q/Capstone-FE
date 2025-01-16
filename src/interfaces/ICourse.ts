type ICourse = ICourseP1 | ICourseP2;

// type ICourse = ICourseP1 | ICourseP2;

interface ICourseP1{
  courseName: string;
  courseId: string;
  price: number;
  registrationDate: string;
  totalRegistration: number;
  isRegistered: boolean;
}

interface ICourseP2{
  courseName: string;
  courseId: string;
  price: number;
  tutor: string;
  classNumber: string;
  studyTime: string;
  isRegistered: boolean;
}


export type { ICourseP1, ICourseP2, ICourse };