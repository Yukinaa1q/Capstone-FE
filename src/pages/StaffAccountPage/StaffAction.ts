import StaffApi from "@/api/StaffApi";

export default async function initStaffData() {
    try {
        const res = await StaffApi.getAllStaff();
        return res;
    }
    catch (err) {
        console.log(err)
    }
} 