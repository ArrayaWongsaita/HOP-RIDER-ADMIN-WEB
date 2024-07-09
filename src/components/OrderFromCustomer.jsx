import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // import useNavigate
import CommonButton from "../components/CommonButton";
import { IconArrow } from "../icons/IconArrow";
import useSocket from "../hooks/socketIoHook";

let isAccept = false
export default function OrderFromCustomer() {
  const { socket, setNewOrder } = useSocket();
  const [orders, setOrders] = useState([]);
  const [riderPosition, setRiderPosition] = useState({});
  const navigate = useNavigate(); // ใช้ useNavigate

  useEffect(() => {
    const handlePosition = (position) => {
      const { latitude, longitude } = position.coords;
      riderPosition.lat = latitude;
      riderPosition.lng = longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    };

    const handleError = (error) => {
      console.error(error);
    };

    const handleRouteList = (data) => {
      console.log(data);
      setOrders(data);
    };

    const handleNewRouteRequest = (data) => {
      console.log("new-----", data);
      setOrders((prevOrders) => [data, ...prevOrders]);
    };

    const handleRouteHistory = (newRoute) => {
      console.log("handleRouteHistory data = ",newRoute)
      // setNewOrder(newRoute);
      navigate(`/rider/order/${newRoute.id}`);
      socket.off("routeHistory", handleRouteHistory); // ยกเลิกการรับฟังหลังจาก navigate
    };
    const handleRouteStatusChanged = (data) => {
      console.log("routeStatusChanged", orders, data);
      setOrders((prevOrders) =>
        prevOrders.filter((item) => item.id !== data.id)
      );
    };

    navigator.geolocation.getCurrentPosition(handlePosition, handleError);

    socket.emit("allRoutes");
    socket.on("routeList", handleRouteList);
    socket.on("newRouteRequest", handleNewRouteRequest);
    socket.on("routeHistory", handleRouteHistory);
    socket.on("routeStatusChanged", handleRouteStatusChanged);

    return () => {
      console.log("off");
      socket.off("routeList", handleRouteList);
      socket.off("newRouteRequest", handleNewRouteRequest);
      socket.off("routeHistory", handleRouteHistory); // ยกเลิกการรับฟังเมื่อ component ถูกทำลาย
      socket.off("routeStatusChanged", handleRouteStatusChanged);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  // ฟังก์ชันเมื่อกดปุ่ม ACCEPT
  const handleAccept = (routeId,customerId) => {
    if(!isAccept ){

      if(!riderPosition.lat && !riderPosition.lng && routeId)return
      const riderLat = riderPosition.lat;
      const riderLng = riderPosition.lng;
      socket.emit("acceptRoute", { routeId, riderLat, riderLng ,customerId});
      isAccept = true
      console.log(`รับงาน ${routeId} RiderId กำลังรอ`);
      // navigate(`/rider/order/${routeId}`); // navigate ไปที่ /rider/order
    }
    };

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
                {order.pickupPlace}
              </h1>
              {/* ใช้ line-clamp-3 เพื่อจำกัดข้อความที่ 3 บรรทัด */}
              <IconArrow width="64" height="24" />
              <h1 className="flex-1 line-clamp-3 max-w-[115px]">
                {order.desPlace}
              </h1>
              {/* ใช้ line-clamp-3 เพื่อจำกัดข้อความที่ 3 บรรทัด */}
            </div>
            <div className="text-[#FF004D] grid grid-cols-3 h-[50%] w-[100%] pb-1">
              <div className="flex items-end gap-2 justify-between w-[100%] -ml-[3px] pb-1">
                <div className="h-[35px] text-[35px] w-1/2">
                  {order.distance}
                </div>
                <div className="mb-[-4px] text-base">KM</div>
              </div>
              <div className="flex items-end gap-2 justify-between w-[100%] border-x-[4px] border-[#FF004D] px-1 pl-1 pb-1">
                <div className="h-[35px] text-[35px] w-1/2">
                  {order.estTime}
                </div>
                <div className="mb-[-4px] text-base">Min</div>
              </div>
              <div className="flex items-end gap-2 justify-between w-[100%] pl-1 pb-1">
                <div className="h-[35px] text-[35px] w-1/2">
                  {order.rideFare}
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
                onClick={() => handleAccept(order.id,order.customerId)} // เรียกใช้ฟังก์ชัน handleAccept เมื่อกดปุ่ม
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
