import { ICourse, ICourseP1, ICourseP2 } from '@/interfaces/ICourse';
import {createSlice} from '@reduxjs/toolkit';

interface courseSliceState {
  coursesP1: ICourseP1[];
  coursesP2: ICourseP2[];
  registeredCourse: ICourse[]
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
    }
  ],
  registeredCourse: [
    // {
    //   courseName: "Course 6",
    //   courseId: "6",
    //   price: 300,
    //   registrationDate: "10/10/2024 - 20/10/2024",
    //   totalRegistration: 250,
    // },
    // {
    //   courseName: "Course 6",
    //   courseId: "6",
    //   price: 300,
    //   registrationDate: "10/10/2024 - 20/10/2024",
    //   totalRegistration: 250,
    // },
    // {
    //   courseName: "Course 6",
    //   courseId: "6",
    //   price: 300,
    //   registrationDate: "10/10/2024 - 20/10/2024",
    //   totalRegistration: 250,
    // },
    // {
    //   courseName: "Course 6",
    //   courseId: "6",
    //   price: 300,
    //   registrationDate: "10/10/2024 - 20/10/2024",
    //   totalRegistration: 250,
    // },
    // {
    //   courseName: "Course 6",
    //   courseId: "6",
    //   price: 300,
    //   registrationDate: "10/10/2024 - 20/10/2024",
    //   totalRegistration: 250,
    // }
  ]
}

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {}
})

export default courseSlice.reducer