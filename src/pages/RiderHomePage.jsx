import { useState, useEffect } from "react";
import OrderFromCustomer from "../components/OrderFromCustomer";
import LoadScreen from "../components/LoadScreen";

export default function RiderHomePage() {
  const [loading, setLoading] = useState(true);
  const [initialTextVisible, setInitialTextVisible] = useState(true);

  useEffect(() => {
    // แสดง "For Rider" เป็นเวลา 3 วินาที
    const initialTimer = setTimeout(() => {
      setInitialTextVisible(false);
    }, 100);

    // ล้างการทำงานของ initialTimer เมื่อ component ถูก unmount
    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    // ตั้งเวลาเพิ่มเติมเพื่อแสดง "Passenger requesting" จนกว่าจะโหลดข้อมูลเสร็จ
    let dataLoadingTimer;
    if (!initialTextVisible) {
      dataLoadingTimer = setTimeout(() => {
        setLoading(false);
      }, 100); // สมมติว่าโหลดข้อมูลเสร็จใน 3 วินาที
    }

    // ล้างการทำงานของ dataLoadingTimer เมื่อ component ถูก unmount
    return () => clearTimeout(dataLoadingTimer);
  }, [initialTextVisible]);

  return (
    <div className="flex flex-col items-center gap-4 ">
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
