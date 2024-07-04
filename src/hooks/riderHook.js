import { useContext } from "react";
import { RiderContext } from "../contexts/riderContext";

export default function useRider() {
    return useContext(RiderContext)
}