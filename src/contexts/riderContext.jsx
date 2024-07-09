import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import adminApi from "../apis/adminApi";
import { dataRider } from "../constants/dataRider";     // mock up

export const RiderContext = createContext();

export default function RiderContextProvider({ children }) {
    const mockUpUserRider = dataRider     // mock up
    const [userRider, setUserRider] = useState(mockUpUserRider);    // mock up userRider


    useEffect(() => {
        // fetchAllRider();
        checkDate();

    }, []);
    
    console.log('userRider -->>', userRider);

    const fetchAllRider = async () => {
        try {
            const res = await adminApi.fetchAllRider();
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

    const value = {
        userRider,
    };

    return (
        <RiderContext.Provider value={value} >
            {children}
        </RiderContext.Provider>
    )
}