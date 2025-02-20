import { Button } from "@/components/ui/button";
import toVND from "@/utils/currencyFormat";
import React from "react";
import CoursePayment from "./CoursePayment";

const PaymentPage = () => {
  return (
    <div className="p-8 flex flex-col md:flex-row justify-between gap-8 relative">
      <div className="grow-1">
        <h3 className="text-xl font-semibold">Your Carts</h3>
        <div className="space-y-4 mt-4">
          {
            Array(5).fill(0).map((_, index) => (
              <CoursePayment/>
            ))
          }
        </div>
      </div>
      <div className="w-full lg:w-60 space-y-4">
        <h3 className="text-xl font-semibold ">Total Order</h3>
        <p className="text-2xl font-bold ">{toVND(10250000)}</p>
        <Button className="bg-t_primary-700 hover:bg-t_primary-600 w-full rounded-none">Checkout</Button>
      </div>
    </div>
  );
};

export default PaymentPage;
