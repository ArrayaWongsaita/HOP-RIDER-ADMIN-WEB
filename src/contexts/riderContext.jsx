import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import adminApi from "../apis/adminApi";

export const RiderContext = createContext();

export default function RiderContextProvider({ children }) {
    const [userRider, setUserRider] = useState([]);

    useEffect(() => {
        // fetchAllRider();

    }, []);

    const fetchAllRider = async () => {
        try {
            const res = await adminApi.fetchAllRider();
            setUserRider(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const value = {
        userRider,
    }

    return (
        <RiderContext.Provider value={value} >
            {children}
        </RiderContext.Provider>
    )
}