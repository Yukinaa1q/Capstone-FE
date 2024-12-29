import { IClass } from '@/interfaces/IClass';
import { ICourse, ICourseP1, ICourseP2 } from '@/interfaces/ICourse';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface courseSliceState {
  coursesP1: ICourseP1[];
  coursesP2: ICourseP2[];
  registeredCourseP1: ICourseP1[];
  registeredCourseP2: ICourseP2[];
  myClass: IClass[]
}

const initialState : courseSliceState = {
  coursesP1: [
    {
      courseName: "Toán 11 Cơ bản",
      courseId: "MATH001",
      price: 1200000,
      registrationDate: "10/10/2024 - 20/10/2024",
      totalRegistration: 250,
      isRegistered: false
    },
    {
      courseName: "Vật Lý 10 Nâng Cao",
      courseId: "PHYS001",
      price: 2100000,
      registrationDate: "10/10/2024 - 20/10/2024",
      totalRegistration: 200,
      isRegistered: false
    },
    {
      courseName: "Luyện thi THPT Hoá Học",
      courseId: "CHEM002",
      price: 1500000,
      registrationDate: "10/10/2024 - 20/10/2024",
      totalRegistration: 100,
      isRegistered: false
    },
    {
      courseName: "IELTS 6.0 - 7.0",
      courseId: "IELT012",
      price: 5000000,
      registrationDate: "10/10/2024 - 20/10/2024",
      totalRegistration: 250,
      isRegistered: false
    },
    {
      courseName: "Toán 12 Nâng Cao",
      courseId: "MATH002",
      price: 2000000,
      registrationDate: "10/10/2024 - 20/10/2024",
      totalRegistration: 80,
      isRegistered: false
    },
    {
      courseName: "Nhập Môn Hội Hoạ",
      courseId: "ART001",
      price: 1750000,
      registrationDate: "10/10/2024 - 20/10/2024",
      totalRegistration: 300,
      isRegistered: false
    },
    {
      courseName: "Nhạc lý cơ bản",
      courseId: "MUS001",
      price: 3000000,
      registrationDate: "10/10/2024 - 20/10/2024",
      totalRegistration: 110,
      isRegistered: false
    }
  ],
  coursesP2: [
    {
      courseName: "Toán 11 Cơ bản",
      courseId: "MATH001",
      price: 1200000,
      classNumber: "30/40",
      studyTime: "2-4-6 | 17:45 - 19:15",
      tutor: "Nguyễn Văn A",
      isRegistered: false
    },
    {
      courseName: "Vật Lý 10 Nâng Cao",
      courseId: "PHYS001",
      price: 2100000,
      classNumber: "50/80",
      studyTime: "3-5-7 | 17:45 - 19:15",
      tutor: "Trần Thị B",
      isRegistered: false
    },
    {
      courseName: "Luyện thi THPT Hoá Học",
      courseId: "CHEM002",
      price: 1500000,
      classNumber: "33/60",
      studyTime: "2-4-6 | 19:30 - 21:00",
      tutor: "Đặng Cao C",
      isRegistered: false
    },
    {
      courseName: "IELTS 6.0 - 7.0",
      courseId: "IELT012",
      price: 5000000,
      classNumber: "20/20",
      studyTime: "7-CN | 17:45 - 20:45",
      tutor: "James Brown",
      isRegistered: false
    },
    {
      courseName: "Toán 12 Nâng Cao",
      courseId: "MATH002",
      price: 2000000,
      classNumber: "30/40",
      studyTime: "2-4-6 | 17:45 - 19:15",
      tutor: "Nguyễn Văn A",
      isRegistered: false
    },
    {
      courseName: "Nhập Môn Hội Hoạ",
      courseId: "ART001",
      price: 1750000,
      classNumber: "30/40",
      studyTime: "2-4-6 | 17:45 - 19:15",
      tutor: "Nguyễn Văn A",
      isRegistered: false
    },
    {
      courseName: "Nhạc lý cơ bản",
      courseId: "MUS001",
      price: 3000000,
      classNumber: "30/40",
      studyTime: "2-4-6 | 17:45 - 19:15",
      tutor: "Nguyễn Văn A",
      isRegistered: false
    }
  ],
  registeredCourseP1: [

  ],
  registeredCourseP2: [
  ],
  myClass: []
}

interface IPayload {
  courseId: string;
  phase: 1 | 2;
}

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    register(state, action: PayloadAction<IPayload>) {
      if (action.payload.phase === 1) {
        const foundCourse = state.coursesP1.find(course => course.courseId === action.payload.courseId)
        if (foundCourse) {
          foundCourse.isRegistered = true
          state.registeredCourseP1.push(foundCourse)
        }
        // Also set phase 2
        const foundCourseP2 = state.coursesP2.find(course => course.courseId === action.payload.courseId)
        if (foundCourseP2) {
          foundCourseP2.isRegistered = true
          state.registeredCourseP2.push(foundCourseP2)
        }
        else {
          console.error("Course not found")
        }
      } 
      else {
        const foundCourse = state.coursesP2.find(course => course.courseId === action.payload.courseId)
        if (foundCourse) {
          foundCourse.isRegistered = true
          state.registeredCourseP2.push(foundCourse)
        }
        else {
          console.error("Course not found")
        }
      }

    },

    unregister(state, action: PayloadAction<IPayload>) {
      if (action.payload.phase === 1) {
        const foundCourse = state.coursesP1.find(course => course.courseId === action.payload.courseId)
        if (foundCourse) {
          foundCourse.isRegistered = false
          state.registeredCourseP1 = state.registeredCourseP1.filter(course => course.courseId !== action.payload.courseId)
        }

        // Also unregister phase 2
        const foundCourseP2 = state.coursesP2.find(course => course.courseId === action.payload.courseId)
        if (foundCourseP2) {
          foundCourseP2.isRegistered = false
          state.registeredCourseP2 = state.registeredCourseP2.filter(course => course.courseId !== action.payload.courseId)
        }
        else {
          console.error("Course not found")
        }
      } 
      else {
        const foundCourse = state.coursesP2.find(course => course.courseId === action.payload.courseId)
        if (foundCourse) {
          foundCourse.isRegistered = false
          state.registeredCourseP2.filter(course => course.courseId !== action.payload.courseId)
        }
        else {
          console.error("Course not found")
        }
      }
    }
  }
})

export const {register, unregister} = courseSlice.actions
export default courseSlice.reducer