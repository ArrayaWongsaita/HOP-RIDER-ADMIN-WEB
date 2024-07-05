import { useState } from "react";
import Avatar from "./Avatar";
import IconArrowDown from "../icons/IconArrowDown";
import IconArrowUp from "../icons/IconArrowUp";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function RiderBar({ children, data }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col gap-1 w-full">
            <div
                role="button"
                onClick={() => setOpen(!open)}
                className="w-[100%] h-[100px] grid grid-cols-6 px-12 text-xl text-white rounded-xl
        bg-gradient-to-r from-[#1D2B53] from-30% to-[#FF004D] to-100%">
                <div className="flex justify-start items-center">
                    {data.id}
                </div>
                <div className="flex justify-center items-center">
                    <div className="h-[90%] w-[50%] ">
                        <Avatar size='full' />
                    </div>
                </div>
                <div className="flex justify-center items-center col-span-2">
                    {data.firstName} {data.lastName}
                </div>
                <div className="flex justify-center items-center">
                    {data.status}
                </div>
                <div className="flex justify-end items-center">
                    <div className="bg-gray-200 p-2 rounded-full w-[35px] h-[35px] flex justify-center items-center">
                        {!open ? <IoIosArrowDown size="80" color="#FF004D" /> : <IoIosArrowUp size="55px" color="#FF004D" />}
                        {/* {!open ? <IconArrowDown fill="#FF004D" /> : <IconArrowUp fill="#FF004D" />} */}
                    </div>
                </div>
            </div>
            {open ?
                children
                : null}
        </div>
    )
}
