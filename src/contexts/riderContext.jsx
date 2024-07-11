import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import adminApi from "../apis/adminApi";

export const RiderContext = createContext();

export default function RiderContextProvider({ children }) {
    const [userRider, setUserRider] = useState([]);
    const [userRiderSubscribe, setUserRiderSubscribe] = useState([]);
    const [userRiderExpired, setUserRiderExpired] = useState([]);
    const [userRiderPaymentPending, setUserRiderPaymentPending] = useState([]);

    useEffect(() => {
        fetchAllRider();
    }, []);

    // console.log('userRider -->>', userRider);
    // console.log('userRiderExpired -->>', userRiderExpired);
    // console.log('userRiderSubscribe -->>', userRiderSubscribe);
    // console.log('userRiderPaymentPending -->>', userRiderPaymentPending);

    // Function get all rider แล้วจำแนกเป็น rider ทั้งหมดที่ได้มา คำนวณวัน subscribe ที่เหลืออยู่่
    // แล้วนำมา setState แยกเป็น rider ทั้ง, rider ที่มีสถานะ payment เป็น Subscribe, Expired
    const fetchAllRider = async () => {
        try {
            const res = await adminApi.fetchRiderApprove();
            console.log('res --->>', res);
            const riderData = res.data.map(item => {
                // กรองหา object ใน array payments ที่มี key status === "SUBSCRIBED"
                const subscribedPayments = item.payments.filter(payment => payment.status === "SUBSCRIBED");
                // ถ้าไม่มีข้อมูลที่มี status = "SUBSCRIBED"
                if (subscribedPayments.length === 0) {
                    return { ...item, payments: null }; // หรือกำหนดค่า default ที่ต้องการ
                }
                // เลือก object ที่มี id มากที่สุด
                const latestSubscribedPayment = subscribedPayments.reduce((latest, current) => {
                    return latest.id > current.id ? latest : current;

                });
                return { ...item, payments: latestSubscribedPayment };
            })
            
            setUserRider(riderData);

            // ตัด rider ที่ไม่เคย subscribe เข้ามาเลยสักครั้งออกไป
            const filterRiderData = riderData.filter(item => item.payments !== null);
            // console.log(filterRiderData);

            const data = filterRiderData.map((item) => {
                item.subScribeDate = checkSubScribeDateRider(item.payments.expiredDate);
                // ตัด time ออกให้เหลือแค่ date
                item.payments.expiredDate = item.payments.expiredDate.slice(0, 10)
                return item
            })
            setUserRiderExpired(data.filter(item => item.subScribeDate <= 0));
            setUserRiderSubscribe(data.filter(item => item.subScribeDate > 0));

            // หา rider ที่มีสถานะ payment เป็น Pending แล้วมา setState
            const paymentPending = res.data.map(item => {
                // กรองหา object ใน array payments ที่มี key status === "PENDING"
                const pendingPayment = item.payments.find(item => item.status === "PENDING");

                if (pendingPayment) {
                    return { ...item, payments: pendingPayment };
                }
                return null;
            })
                .filter(item => item !== null); // กรอง null ออกไป
            // ตั้งค่า state ด้วยข้อมูลที่กรองแล้ว
            setUserRiderPaymentPending(paymentPending);
        } catch (err) {
            console.log(err)
        }
    }

    // Function คำนวณวัน Subscribe ที่เหลืออยู่
    const checkSubScribeDateRider = (date) => {
        const currentDate = new Date();
        const expirationDate = new Date(date);

        // คำนวณความแตกต่างในมิลลิวินาที
        const differenceInTime = expirationDate - currentDate;

        // แปลงมิลลิวินาทีเป็นวัน
        const differenceInDays = Math.ceil(
            differenceInTime / (1000 * 60 * 60 * 24)
        );
        return differenceInDays;
    }

    const value = {
        userRider,
        userRiderSubscribe,
        userRiderPaymentPending,
        userRiderExpired,
        setUserRider,
        setUserRiderPaymentPending,
        fetchAllRider,
    };

    return (
        <RiderContext.Provider value={value} >
            {children}
        </RiderContext.Provider>
    )
}