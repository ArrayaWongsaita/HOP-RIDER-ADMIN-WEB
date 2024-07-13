import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // import useNavigate

import { IconArrow } from "../../../icons/IconArrow";
import useSocket from "../../../hooks/socketIoHook";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/authHook";
import ModalCommon from "../../../components/ModalCommon";
import { motion, AnimatePresence } from "framer-motion";
import { IconLogoHop } from "../../../icons/IconLogoHop";
import CommonButton from "../../../components/CommonButton";

let isAccept = false;
export default function OrderFromCustomer() {
  const { socket, setNewOrder } = useSocket();
  const [orders, setOrders] = useState([]);
  const [riderPosition, setRiderPosition] = useState({});
  const navigate = useNavigate(); // ใช้ useNavigate
  const { authUser } = useAuth();
  const [modalConfirmOrder, setModalConfirmOrder] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const handlePosition = (position) => {
      const { latitude, longitude } = position.coords;
      setRiderPosition({ lat: latitude, lng: longitude });
      // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    };

    const handleError = (error) => {
      // console.error(error);
    };

    const handleRouteList = (data) => {
      // console.log(data);
      setOrders(data);
    };

    const handleNewRouteRequest = (data) => {
      // console.log("new-----", data);
      setOrders((prevOrders) => [data, ...prevOrders]);
    };

    const handleRouteHistory = (newRoute) => {
      // console.log("handleRouteHistory data = ", newRoute);
      navigate(`/rider/order/${newRoute.id}`);
      socket.off("routeHistory", handleRouteHistory); // ยกเลิกการรับฟังหลังจาก navigate
    };

    const handleRouteStatusChanged = (data) => {
      // console.log("routeStatusChanged", orders, data);
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
      // console.log("off");
      socket.off("routeList", handleRouteList);
      socket.off("newRouteRequest", handleNewRouteRequest);
      socket.off("routeHistory", handleRouteHistory); // ยกเลิกการรับฟังเมื่อ component ถูกทำลาย
      socket.off("routeStatusChanged", handleRouteStatusChanged);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  // ฟังก์ชันเมื่อกดปุ่ม ACCEPT
  const handleAccept = (routeId, customerId) => {
    if (!isAccept) {
      if (!riderPosition.lat && !riderPosition.lng && routeId) return;
      const riderLat = riderPosition.lat;
      const riderLng = riderPosition.lng;
      socket.emit("acceptRoute", { routeId, riderLat, riderLng, customerId });
      isAccept = true;
      setTimeout(() => {
        isAccept = false;
      }, 1200);
      toast.success(
        `This route accepted successfully by ${authUser ? authUser?.firstName : "you"
        }!`
      );

      setModalConfirmOrder(false);
      navigate(`/rider/order/${routeId}`); // navigate ไปที่ /rider/order
    }
  };

  const handleModalConfirmOrderClose = useCallback(() => {
    setModalConfirmOrder(false);
  }, []);

  if (!orders.length) {
    return <div className="w-[100%] h-[80vh] flex justify-center items-center pl-10">
      <IconLogoHop width="300" height="200" />
      </div>;
  }

  return (
    <div className="w-[100%] flex flex-col items-center relative ">
      {orders.map((order, index) => (
        <div
          key={index}
          className="bg-white h-[170px] w-[95%] rounded-2xl p-3 flex mb-4 "
        >
          <div className="h-full w-[90%] flex flex-col items-center ">
            <div className="text-sm font-bold flex items-center justify-between gap-3 h-[50%] w-full ">
              <h1 className="flex-1 line-clamp-3 max-w-[115px]">
                {order.pickupPlace}
              </h1>
              <IconArrow width="64" height="24" />
              <h1 className="flex-1 line-clamp-3 max-w-[115px]">
                {order.desPlace}
              </h1>
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

          <div className="w-[12%] flex position mt-[110px] ml-10 ">
            <div className="rotate-[-90deg] absolute w-10">
              <CommonButton
                fontSize="reply"
                width="accept"
                height="mini"
                border="accept"
                align="flexCenter"
                rounded="10"
                onClick={() => {
                  setSelectedOrder(order);
                  setModalConfirmOrder(true);
                }}
              >
                ACCEPT
              </CommonButton>
            </div>
          </div>
        </div>
      ))}

      <ModalCommon
        isOpen={modalConfirmOrder}
        onClose={handleModalConfirmOrderClose}
      >
        <p className="text-white">Confirm Order?</p>
        <div className="flex w-full items-center justify-between">
          <CommonButton
            onClick={() =>
              handleAccept(selectedOrder?.id, selectedOrder?.customerId)
            }
          >
            Yes
          </CommonButton>
          <CommonButton onClick={handleModalConfirmOrderClose}>No</CommonButton>
        </div>
      </ModalCommon>
    </div>
  );
}
