interface ICourseCard {
  courseTitle: string;
  courseCode: string;
  courseId: string;
  coursePrice: number;
  courseImage: string;
}

interface IClassCard extends ICourseCard {
  classId: string;
  registrationStartDate: string;
  registrationEndDate: string;
  tutor: string;
  currentStudents: number;
  maxStudents: number;
}

export type { IClassCard, ICourseCard };
