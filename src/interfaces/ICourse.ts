type ICourse = ICourseP1 | ICourseP2;

interface ICourseP1 {
  courseName: string;
  courseId: string;
  price: number;
  registrationDate: string;
  totalRegistration: number;
}

interface ICourseP2 {
  courseName: string;
  courseId: string;
  price: number;
  tutor: string;
  classNumber: string;
  studyTime: string;
}

function isCourseP1(course: ICourse): course is ICourseP1 {
  return (course as ICourseP1).registrationDate !== undefined;
}


export { type ICourse, type ICourseP1, type ICourseP2, isCourseP1 };