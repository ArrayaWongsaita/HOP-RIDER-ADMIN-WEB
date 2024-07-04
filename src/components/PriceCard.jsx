import { useState } from "react";
import CommonButton from "./CommonButton";
import { useNavigate } from "react-router-dom";

export const pricePagkage = [
  { id: 1, month: 1, price: "3,000", avg: 100 },
  { id: 2, month: 3, price: "8,900", avg: 99 },
  { id: 3, month: 6, price: "17,600", avg: 97 },
  { id: 4, month: 9, price: "26,000", avg: 96 },
  { id: 5, month: 12, price: "35,000", avg: 95 },
];

const selectButton = {
  showButton: "",
  hidden: "hidden",
};

export default function PriceCard({ plan, planId }) {
  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/rider/price/payment/${id}`);
  }

  return (
    <div className="w-[71.5%] aspect-square bg-white rounded-[16px] flex  border-2 border-torchRed flex-col justify-evenly">
      <div className="flex flex-col text-center">
        <div className=" text-torchRed text-[45px] font-bold text-shadow-xl -mb-5">
          {plan.month}
        </div>
        <div className=" text-[22px] text-shadow-xl text-luckyPoint">
          {plan.month === 1 ? "month" : "months"}
        </div>
      </div>
      <div className="flex flex-col items-center gap -mt-3">
        <div className=" text-torchRed text-[60px] -mb-4 text-shadow-xl font-extrabold">
          {plan.price}
        </div>
        <div className=" text-[12px] -mb-2">avg: {plan.avg}-. /day</div>
      </div>
      <div className={`flex justify-center pt-3 `}>
        {!planId && (
          <CommonButton
            rounded="16"
            width="select"
            height="select"
            fontSize="select"
            text="whiteToLuckyPoint"
            borderColor="torchRedToLuckyPoint"
            align="flexCenter"
            onClick={() => handleClick(plan.id)}
          >
            Select
          </CommonButton>
        )}
      </div>
    </div>
  );
}
