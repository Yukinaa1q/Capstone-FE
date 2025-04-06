import FetchRegisteredApi from "@/api/FetchRegisteredApi";

export default async function getAllRegisteredClasses() {
    try {
        const registeredClasses = await FetchRegisteredApi.fetchRegisteredClasses();
        return registeredClasses;
    }
    catch {
        console.error("Error fetching registered classes");
    }
}