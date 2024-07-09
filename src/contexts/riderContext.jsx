import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import adminApi from "../apis/adminApi";
import { dataRider } from "../constants/dataRider";     // mock up

export const RiderContext = createContext();

export default function RiderContextProvider({ children }) {
    const mockUpUserRider = dataRider     // mock up
    const [userRider, setUserRider] = useState([]);    // mock up userRider
    // const [testRider, setTestRider] = useState([]);
    const [testPayment, setTestPayment] = useState([]);

    useEffect(() => {
        fetchAllRider();
        // fetchRiderApproval();
        fetchRiderPayment();
        // checkDate();

    }, []);
    
    // console.log('testRider -->>', testRider);
    console.log('testPayment -->>', testPayment);
    console.log('userRider -->>', userRider);

    const fetchAllRider = async () => {
        try {
            const res = await adminApi.fetchRiderApprove();
            setUserRider(res.data)
        } catch (err) {
            console.log(err)
        }
    }

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

    // const fetchRiderApproval = async () => {
    //     try {
    //         const res = await adminApi.fetchRiderApprove();
    //         setTestRider(res.data);
    //     }   catch (err) {
    //         console.log(err)
    //     }
    // }
    const fetchRiderPayment = async () => {
        try {
            const res = await adminApi.fetchRiderPayment();
            setTestPayment(res.data);
        }   catch (err) {
            console.log(err)
        }
    }
    
    const value = {
        userRider,
    };

    return (
        <RiderContext.Provider value={value} >
            {children}
        </RiderContext.Provider>
    )
}