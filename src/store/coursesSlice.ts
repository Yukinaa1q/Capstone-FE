import { ICourse, ICourseP1, ICourseP2 } from '@/interfaces/ICourse';
import {createSlice} from '@reduxjs/toolkit';

interface courseSliceState {
  coursesP1: ICourseP1[];
  coursesP2: ICourseP2[];
  registeredCourse: ICourse[]
}

const initialState : courseSliceState = {
  coursesP1: [{
    courseName: "Course 1",
    courseId: "1",
    price: 100,
    registrationDate: "10/10/2024 - 20/10/2024",
    totalRegistration: 100,
  },
  {
    courseName: "Course 2",
    courseId: "2",
    price: 200,
    registrationDate: "10/10/2024 - 20/10/2024",
    totalRegistration: 200,
  },
  {
    courseName: "Course 3",
    courseId: "3",
    price: 300,
    registrationDate: "10/10/2024 - 20/10/2024",
    totalRegistration: 50,
  },
  {
    courseName: "Course 4",
    courseId: "4",
    price: 300,
    registrationDate: "10/10/2024 - 20/10/2024",
    totalRegistration: 250,
  },
  {
    courseName: "Course 5",
    courseId: "5",
    price: 300,
    registrationDate: "10/10/2024 - 20/10/2024",
    totalRegistration: 250,
  },
  {
    courseName: "Course 6",
    courseId: "6",
    price: 300,
    registrationDate: "10/10/2024 - 20/10/2024",
    totalRegistration: 250,
  }],
  coursesP2: [
    {
      courseName: "A Vevry very very long long long course name",
      courseId: "1",
      price: 100,
      tutor: "Tutor 1",
      classNumber: "30/50",
      studyTime: "2-4-6 | 18:00 - 20:00",
    },
    {
      courseName: "Course 1",
      courseId: "1",
      price: 100,
      tutor: "Tutor 1",
      classNumber: "30/50",
      studyTime: "2-4-6 | 18:00 - 20:00",
    },
    {
      courseName: "Course 1",
      courseId: "1",
      price: 100,
      tutor: "Tutor 1",
      classNumber: "30/50",
      studyTime: "2-4-6 | 18:00 - 20:00",
    },
    {
      courseName: "Course 1",
      courseId: "1",
      price: 100,
      tutor: "Tutor 1",
      classNumber: "30/50",
      studyTime: "2-4-6 | 18:00 - 20:00",
    },
    {
      courseName: "Course 1",
      courseId: "1",
      price: 100,
      tutor: "Tutor 1",
      classNumber: "30/50",
      studyTime: "2-4-6 | 18:00 - 20:00",
    },
    {
      courseName: "Course 1",
      courseId: "1",
      price: 100,
      tutor: "Tutor 1",
      classNumber: "30/50",
      studyTime: "2-4-6 | 18:00 - 20:00",
    },
  ],
  registeredCourse: [
    {
      courseName: "Course 6",
      courseId: "6",
      price: 300,
      registrationDate: "10/10/2024 - 20/10/2024",
      totalRegistration: 250,
    },
    {
      courseName: "Course 6",
      courseId: "6",
      price: 300,
      registrationDate: "10/10/2024 - 20/10/2024",
      totalRegistration: 250,
    },
    {
      courseName: "Course 6",
      courseId: "6",
      price: 300,
      registrationDate: "10/10/2024 - 20/10/2024",
      totalRegistration: 250,
    },
    {
      courseName: "Course 6",
      courseId: "6",
      price: 300,
      registrationDate: "10/10/2024 - 20/10/2024",
      totalRegistration: 250,
    },
    {
      courseName: "Course 6",
      courseId: "6",
      price: 300,
      registrationDate: "10/10/2024 - 20/10/2024",
      totalRegistration: 250,
    }
  ]
}

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {}
})

export default courseSlice.reducer