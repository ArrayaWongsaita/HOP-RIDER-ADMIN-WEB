import { IconArrow } from "../icons/IconArrow";
import CommonButton from "./CommonButton";

export default function ComponentOrder() {
  const handleAccept = () => {
    console.log("handleAccept");
  };

  return (
    <div className="mx-auto mt-[6px] w-[80%] h-[447px] bg-white rounded-[14px] flex justify-center items-center">
      {/* ------------------------------ the card is here----------------------------- */}

      <div className="w-[90%] h-[90%] bg-white rounded-[14px] shadow-xl flex">
        <div className="w-[80%] h-[100%] flex flex-col">
          <div className="h-[50%] w-[100%] flex justify-center items-center">
            <div className=" h-[100%] w-[49%] flex justify-center items-center text-[#1D2B53] font-bold text-[24px]">
              Wannasorn Building, Phaya-Thai
            </div>
            <div className="h-[80%] border-l-4 border-[#FF004D]"></div>
            <div className="h-[100%] w-[49%] flex justify-center items-center text-[#1D2B53] font-bold text-[24px]">
              Suwannaphum Airport
            </div>
          </div>
          <div className="h-[50%] w-[100%]  flex justify-center items-center">
            <div className="h-[100%] w-[32%] flex justify-center items-center flex-col p-8">
              <div className="h-[80%] w-[100%]  flex justify-center items-center text-[#FF004D] text-[96px] font-bold">
                6.2
              </div>
              <div className="h-[20%] w-[100%]  flex justify-center items-center text-[#FF004D] text-[24px] font-bold">
                KM
              </div>
            </div>
            <div className="h-[80%] border-l-4 border-[#FF004D] "></div>
            <div className="h-[100%] w-[32%] flex justify-center items-center flex-col p-8">
              <div className="h-[80%] w-[100%]  flex justify-center items-center text-[#FF004D] text-[96px] font-bold">
                9
              </div>
              <div className="h-[20%] w-[100%]  flex justify-center items-center text-[#FF004D] text-[24px] font-bold">
                MIN
              </div>
            </div>
            <div className="h-[80%] border-l-4 border-[#FF004D] "></div>
            <div className="h-[100%] w-[32%] flex justify-center items-center flex-col p-8">
              <div className="h-[80%] w-[100%]  flex justify-center items-center text-[#FF004D] text-[96px] font-bold">
                152
              </div>
              <div className="h-[20%] w-[100%] flex justify-center items-center text-[#FF004D] text-[24px] font-bold">
                THB
              </div>
            </div>
          </div>
        </div>
        <button className="h-[100%] w-[20%] bg-[#FF004D] rounded-[14px] border-[10px] border-white text-white text-[64px] font-bold flex justify-center items-center hover:text-[70px] ">
          <p className="rotate-270">ABORT</p>
        </button>
      </div>

      {/* ------------------------------ the card is here----------------------------- */}
    </div>
  );
}
