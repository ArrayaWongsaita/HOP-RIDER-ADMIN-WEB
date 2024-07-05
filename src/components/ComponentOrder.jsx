import { IconArrow } from "../icons/IconArrow";
import CommonButton from "./CommonButton";

export default function ComponentOrder() {
    const handleAccept = () => {
        console.log('handleAccept');
      };
    
  return (
    <div
        //   key={index}
          className="bg-white h-[170px] w-[95%] rounded-2xl p-3 flex mb-4"
        >
          <div className="h-full w-[90%] flex flex-col items-center">
            <div className="text-base font-bold flex items-center justify-between gap-1 h-[60%] w-full">
              <h1 className="flex-1 line-clamp-3 max-w-[40%]">
                <p>Bangkok</p>
                {/* {order.pickupPlace} */}
              </h1>
              {/* ใช้ line-clamp-3 เพื่อจำกัดข้อความที่ 3 บรรทัด */}
              <IconArrow width="15%" />
              <h1 className="flex-1 line-clamp-3 max-w-[40%]">
                <p>Phuket</p>
                {/* {order.desPlace} */}
              </h1>
              {/* ใช้ line-clamp-3 เพื่อจำกัดข้อความที่ 3 บรรทัด */}
            </div>

            <div className="text-[#FF004D] grid grid-cols-3 h-[40%] w-[100%] pb-1">
              <div className="flex items-end gap-2 justify-between w-[100%] -ml-[3px] pb-1">
                <div className="h-[35px] text-[35px] w-1/2">
                    869
                  {/* {order.distance} */}
                </div>
                <div className="mb-[-4px] text-base">KM</div>
              </div>
              <div className="flex items-end gap-2 justify-between w-[100%] border-x-[4px] border-[#FF004D] px-1 pl-1 pb-1">
                <div className="h-[35px] text-[35px] w-1/2">
                    69
                  {/* {order.estTime} */}
                </div>
                <div className="mb-[-4px] text-base">Min</div>
              </div>
              <div className="flex items-end gap-2 justify-between w-[100%] pl-1 pb-1">
                <div className="h-[35px] text-[35px] w-1/2">
                    890
                    {/* {order.rideFare} */}
                    </div>
                <div className="mb-[-4px] text-base">THB</div>
              </div>
            </div>
          </div>
          <div className="w-[12%] flex">
            <div className="rotate-[-90deg]">
              <CommonButton
                fontSize="reply"
                width="accept"
                height="mini"
                border="accept"
                align="flexCenter"
                rounded="10"
                onClick={() => handleAccept()} // เรียกใช้ฟังก์ชัน handleAccept เมื่อกดปุ่ม
              >
                ACCEPT
              </CommonButton>
            </div>
          </div>
        </div>
  )
}
