import FetchRegisteredApi from "@/api/FetchRegisteredApi";

export default async function getInCartClassesLoader() {
  try {
    const cartList = await FetchRegisteredApi.fetchPaymentClasses();
    return cartList;
  } catch {
    console.log("Error when getting in cart classes");
  }
}
