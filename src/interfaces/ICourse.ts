interface ICourseCard {
  courseTitle: string;
  courseCode: string;
  courseId: string;
  coursePrice: number;
  courseImage: string;
  courseSubject: string;
  courseLevel: string;
}

interface IClassCard extends ICourseCard {
  classId: string;
  classCode: string;
  registrationStartDate: string;
  registrationEndDate: string;
  tutor: string;
  currentStudents: number;
  maxStudents: number;
}

export type { IClassCard, ICourseCard };
