import FetchRegisteredApi from "@/api/FetchRegisteredApi";

export default async function getInCartClassesLoader() {
    try {
        const cartList = await FetchRegisteredApi.fetchRegisteredClasses()
        return cartList;
    }
    catch {
        console.log("Error when getting in cart classes");
    }

}