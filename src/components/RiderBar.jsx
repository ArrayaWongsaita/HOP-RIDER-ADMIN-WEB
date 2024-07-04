import { useState } from "react";
import Avatar from "./Avatar";

export default function RiderBar({ children, data }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col gap-1">
            <div
                role="button"
                onClick={() => setOpen(!open)}
                className="w-full h-[100px] flex justify-between items-center px-12 text-xl text-white rounded-xl
        bg-gradient-to-r from-[#1D2B53] from-30% to-[#FF004D] to-100%">
                <div>
                    {data.id}
                </div>
                <div className="h-[80%] w-[10%] ">
                    <Avatar size='full' />
                </div>
                <div>
                    {data.firstName} {data.lastName}
                </div>
                <div>
                    {data.status}
                </div>
                <div>
                    {!open ? '\u25B3' : '\u25BD'}
                </div>
            </div>
            {open ?
                children
                : null}
        </div>
    )
}
