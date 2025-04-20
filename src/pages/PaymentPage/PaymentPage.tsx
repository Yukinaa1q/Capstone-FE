import StudentApi from "@/api/StudentApi";
import { Button } from "@/components/ui/button";
import { IClassCard } from "@/interfaces/ICourse";
import toVND from "@/utils/currencyFormat";
import { useLoaderData, useNavigate } from "react-router";
import CoursePayment from "./CoursePayment";

const PaymentPage = () => {
  const navigate = useNavigate();
  const cartList: IClassCard[] = useLoaderData() as IClassCard[];
  const total: number = cartList.reduce((acc, item) => acc + item.coursePrice, 0);
  const handlePayment = async () => {
    try {
      await StudentApi.payment()
      navigate("/my-classes")
    }
    catch {
      console.log("Payment failed");
    }
  }
  return (
    <div className="p-8 flex flex-col md:flex-row justify-between gap-8 relative">
      <div className="grow-1">
        <h3 className="text-xl font-semibold">Your Carts</h3>
        <div className="space-y-4 mt-4">
          {cartList.map((cartItem, index) => (
            <CoursePayment key={index} item={cartItem} />
          ))}
        </div>
      </div>
      <div className="w-full lg:w-60 space-y-4">
        <h3 className="text-xl font-semibold ">Total Order</h3>
        <p className="text-2xl font-bold ">{toVND(total)}</p>
        <Button className="bg-t_primary-700 hover:bg-t_primary-600 w-full rounded-none" onClick={handlePayment}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;
