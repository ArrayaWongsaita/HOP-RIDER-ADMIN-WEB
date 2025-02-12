import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import AvatarRider from "./AvatarRider";

export default function RiderBar({ children, data, status }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col  w-full h-full ">
            <div
                role="button"
                onClick={() => setOpen(!open)}
                className="w-[80%] h-[80px] flex justify-between items-center px-12 text-xl text-white rounded-xl mx-auto
        bg-gradient-to-r from-[#1D2B53] from-30% to-[#FF004D] to-100% p-3"
            >
                <div className="flex justify-start items-center w-[5%]">{data.id}</div>
                <AvatarRider size="aaa" srcImage={data.profileImage} />
                <div className="flex justify-center items-center col-span-2 w-[30%]">
                    {data.firstName} {data.lastName}
                </div>
                <div className="flex justify-center items-center">
                    {status}
                </div>
                <div className="flex justify-end items-center">
                    <div className="bg-gray-200 p-2 rounded-full w-[35px] h-[35px] flex justify-center items-center">
                        {!open ? (
                            <IoIosArrowDown size="80" color="#FF004D" />
                        ) : (
                            <IoIosArrowUp size="55px" color="#FF004D" />
                        )}
                    </div>
                </div>
            </div>
            {open ? (
                <div className="w-[80%] flex mx-auto items-center pt-1">{children}</div>
            ) : null}
        </div>
    );
}
