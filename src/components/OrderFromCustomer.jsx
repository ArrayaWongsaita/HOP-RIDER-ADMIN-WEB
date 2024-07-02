import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // import useNavigate
import CommonButton from "../components/CommonButton";
import { IconArrow } from "../icons/IconArrow";

/**
 * ดึงข้อมูล order จาก backend
 * @returns {Object} ข้อมูล order
 */
const fetchOrders = async () => {
  // จำลองการดึงข้อมูลจาก backend
  return [
    {
      orderId: 1,
      distanceInKm: 4.9,
      durationInMinutes: 15,
      fare: 49,
      locationA: {
        lat: 13.744677,
        lng: 100.5295593,
        description:
          "444 ถ. พญาไท แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330 ประเทศไทย",
      },
      locationB: {
        lat: 13.7465337,
        lng: 100.5391488,
        description:
          "centralwOrld, ถนน พระรามที่ 1 แขวงปทุมวัน เขตปทุมวัน กรุงเทพมหานคร ประเทศไทย",
      },
      userId: 3,
    },
    {
      orderId: 2,
      distanceInKm: 2.5,
      durationInMinutes: 145,
      fare: 30,
      locationA: {
        lat: 13.735677,
        lng: 100.5235593,
        description:
          "123 ถ.สุขุมวิท แขวงคลองตัน เขตคลองเตย กรุงเทพมหานคร 10110 ประเทศไทย",
      },
      locationB: {
        lat: 13.7375337,
        lng: 100.5331488,
        description:
          "Emporium, ถนนสุขุมวิท แขวงคลองตัน เขตคลองเตย กรุงเทพมหานคร ประเทศไทย",
      },
      userId: 4,
    },
    {
      orderId: 3,
      distanceInKm: 7.2,
      durationInMinutes: 20,
      fare: 70,
      locationA: {
        lat: 13.765677,
        lng: 100.5995593,
        description:
          "567 ถ.ราชดำเนิน แขวงพระบรมมหาราชวัง เขตพระนคร กรุงเทพมหานคร 10200 ประเทศไทย",
      },
      locationB: {
        lat: 13.7665337,
        lng: 100.6091488,
        description:
          "วัดพระแก้ว, ถ.หน้าพระลาน แขวงพระบรมมหาราชวัง เขตพระนคร กรุงเทพมหานคร ประเทศไทย",
      },
      userId: 5,
    },
  ];
};

export default function OrderFromCustomer() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ใช้ useNavigate

  // ดึงข้อมูล order เมื่อ component ถูก mount
  useEffect(() => {
    const initializeOrders = async () => {
      try {
        const fetchedOrders = await fetchOrders();
        setOrders(fetchedOrders);
      } catch (err) {
        setError("ไม่สามารถดึงข้อมูล order ได้");
      }
    };

    initializeOrders();
  }, []);

  // ฟังก์ชันเมื่อกดปุ่ม ACCEPT
  const handleAccept = (orderId) => {
    console.log(`รับงาน ${orderId} RiderId กำลังรอ`);
    navigate(`/rider/order`); // navigate ไปที่ /rider/order
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!orders.length) {
    return <div>กำลังโหลด...</div>;
  }

  return (
    <div className=" w-[100%] flex flex-col  items-center ">
      {/* <div className="w-full"> */}
      {orders.map((order, index) => (
        <div
          key={index}
          className="bg-white h-[170px] w-[95%] rounded-2xl p-3 flex mb-4"
        >
          <div className="h-full w-[90%] flex flex-col items-center">
            <div className="text-sm font-bold flex items-center justify-between gap-3 h-[50%] w-full">
              <h1 className="flex-1 line-clamp-3 max-w-[115px]">
                {order.locationA.description}
              </h1>
              {/* ใช้ line-clamp-3 เพื่อจำกัดข้อความที่ 3 บรรทัด */}
              <IconArrow width="64" height="24" />
              <h1 className="flex-1 line-clamp-3 max-w-[115px]">
                {order.locationB.description}
              </h1>
              {/* ใช้ line-clamp-3 เพื่อจำกัดข้อความที่ 3 บรรทัด */}
            </div>
            <div className="text-[#FF004D] grid grid-cols-3 h-[50%] w-[100%] pb-1">
              <div className="flex items-end gap-2 justify-between w-[100%] -ml-[3px] pb-1">
                <div className="h-[35px] text-[35px] w-1/2">
                  {order.distanceInKm}
                </div>
                <div className="mb-[-4px] text-base">KM</div>
              </div>
              <div className="flex items-end gap-2 justify-between w-[100%] border-x-[4px] border-[#FF004D] px-1 pl-1 pb-1">
                <div className="h-[35px] text-[35px] w-1/2">
                  {order.durationInMinutes}
                </div>
                <div className="mb-[-4px] text-base">Min</div>
              </div>
              <div className="flex items-end gap-2 justify-between w-[100%] pl-1 pb-1">
                <div className="h-[35px] text-[35px] w-1/2">{order.fare}</div>
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
                onClick={() => handleAccept(order.orderId)} // เรียกใช้ฟังก์ชัน handleAccept เมื่อกดปุ่ม
              >
                ACCEPT
              </CommonButton>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
