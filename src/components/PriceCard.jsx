import CommonButton from "./CommonButton";

export const pricePagkage = [
  { id: 1, month: 1, price: "3,000", avg: 100 },
  { id: 2, month: 3, price: "8,900", avg: 99 },
  { id: 3, month: 6, price: "17,600", avg: 97 },
  { id: 4, month: 9, price: "26,000", avg: 96 },
  { id: 5, month: 12, price: "35,000", avg: 95 },
];

export default function PriceCard(props) {
  return (
    <div className="w-[71.5%] aspect-square bg-white rounded-[16px] flex  border-2 border-torchRed flex-col justify-evenly">
      <div className="flex flex-col text-center">
        <div className=" text-torchRed text-[45px] font-bold text-shadow-xl -mb-5">
          {props.month}
        </div>
        <div className=" text-[22px] text-shadow-xl text-luckyPoint">
          {props.month === 1 ? "month" : "months"}
        </div>
      </div>
      <div className="flex flex-col items-center gap -mt-3">
        <div className=" text-torchRed text-[60px] -mb-4 text-shadow-xl font-extrabold">
          {props.price}
        </div>
        <div className=" text-[12px] -mb-2">avg: {props.avg}-. /day</div>
      </div>
      <div className="flex justify-center pt-3">
        <CommonButton
          rounded="16"
          width="select"
          height="select"
          fontSize="select"
          text="whiteToLuckyPoint"
          borderColor="torchRedToLuckyPoint"
          align="flexCenter"
        >
          Select
        </CommonButton>
      </div>
    </div>
  );
}
