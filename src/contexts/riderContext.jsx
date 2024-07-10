import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import adminApi from "../apis/adminApi";
// import { dataRider } from "../constants/dataRider";     // mock up

export const RiderContext = createContext();

export default function RiderContextProvider({ children }) {
    // const mockUpUserRider = dataRider     // mock up
    const [userRider, setUserRider] = useState([]);
    const [userRiderSubscribe, setUserRiderSubscribe] = useState([]);
    const [userRiderExpired, setUserRiderExpired] = useState([]);
    const [userRiderPaymentPending, setUserRiderPaymentPending] = useState([]);

    useEffect(() => {
        fetchAllRider();
    }, []);

    console.log('userRider -->>', userRider);
    console.log('userRiderExpired -->>', userRiderExpired);
    console.log('userRiderPaymentPending -->>', userRiderPaymentPending);

    const fetchAllRider = async () => {
        try {
            const res = await adminApi.fetchRiderApprove();
            console.log('res --->>', res);
            const riderDataMap = res.data.map(item => {
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
            // console.log('riderDataMap --->', riderDataMap);

            const data = riderDataMap.map((item) => {
                item.subScribeDate = checkSubScribeDateRider(item.payments.expiredDate);

                item.payments.expiredDate = item.payments.expiredDate.slice(0, 10)
                // console.log('item -->', item)
                return item
            })
            setUserRider(data);
            setUserRiderExpired(data.filter(item => item.subScribeDate <= 0));
            setUserRiderSubscribe(data.filter(item => item.subScribeDate > 0));


            const paymentPending = res.data.map(item => {
                // กรองหา object ใน array payments ที่มี key status === "PENDING"
                const pendingPayment = item.payments.find(payment => payment.status === "PENDING");
                // console.log('pendingPayment -->>', pendingPayment);
                if (pendingPayment) {
                    return { ...item, payments: pendingPayment };
                }
                return null;
            })
                .filter(item => item !== null); // กรอง null ออกไป

            // console.log('paymentPending --->', paymentPending);

            // ตั้งค่า state ด้วยข้อมูลที่กรองแล้ว
            setUserRiderPaymentPending(paymentPending);

        } catch (err) {
            console.log(err)
        }
    }

    // const fetchAllRider = async () => {
    //     try {
    //         const res = await adminApi.fetchRiderApprove();
    //         console.log('res --->>', res)
    //         const riderDataMap = res.data.map(item => ({ ...item, payments: item.payments[0] }))
    //         console.log('riderDataMap --->', riderDataMap);

    //         const data = riderDataMap.map((item) => {
    //             item.subScribeDate = checkSubScribeDateRider(item.payments.expiredDate)
    //             return item
    //         })
    //         setUserRider(data);
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

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

    const checkDate = () => {
        const data = userRider.map((item) => {
            item.subScribeDate = checkSubScribeDateRider(item.expireDate)
            return item
        })
        // console.log(data)
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