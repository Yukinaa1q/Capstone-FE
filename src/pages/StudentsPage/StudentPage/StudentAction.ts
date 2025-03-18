import StudentApi from "@/api/StudentApi";

export default async function getStudentInit({params}) {
    const res = {studentDetail: {}};
    try {
        const studentDetail = await StudentApi.getStudentDetail(params.id);
        res.studentDetail = studentDetail;
    } catch (err) {
        console.log(err);
    }
    return res;
}