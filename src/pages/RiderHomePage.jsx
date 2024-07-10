import { useState, useEffect } from "react";
import OrderFromCustomer from "../components/OrderFromCustomer";
import LoadScreen from "../components/LoadScreen";

export default function RiderHomePage() {
  const [loading, setLoading] = useState(true);
  const [initialTextVisible, setInitialTextVisible] = useState(true);

  useEffect(() => {
    // ตรวจสอบจาก sessionStorage ว่าข้อความได้ถูกแสดงไปแล้วหรือยัง
    const hasShownInitialText = sessionStorage.getItem("hasShownInitialText");

    if (!hasShownInitialText) {
      // แสดง "For Rider" เป็นเวลา 1 วินาที
      const initialTimer = setTimeout(() => {
        setInitialTextVisible(false);
        // เก็บสถานะใน sessionStorage
        sessionStorage.setItem("hasShownInitialText", "true");
      }, 1000);

      // ล้างการทำงานของ initialTimer เมื่อ component ถูก unmount
      return () => clearTimeout(initialTimer);
    } else {
      setInitialTextVisible(false);
    }
  }, []);

  useEffect(() => {
    // ตั้งเวลาเพิ่มเติมเพื่อแสดง "Passenger requesting" จนกว่าจะโหลดข้อมูลเสร็จ
    let dataLoadingTimer;
    if (!initialTextVisible) {
      dataLoadingTimer = setTimeout(() => {
        setLoading(false);
      }, 2000); // สมมติว่าโหลดข้อมูลเสร็จใน 3 วินาที
    }

    // ล้างการทำงานของ dataLoadingTimer เมื่อ component ถูก unmount
    return () => clearTimeout(dataLoadingTimer);
  }, [initialTextVisible]);

  return (
    <div className="flex flex-col items-center gap-4">
      {loading ? (
        initialTextVisible ? (
          <LoadScreen text="For Rider" />
        ) : (
          <LoadScreen status="Passenger requesting" />
        )
      ) : (
        <OrderFromCustomer />
      )}
    </div>
  );
}
