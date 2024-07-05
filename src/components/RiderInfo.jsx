import { useState } from "react";
import Avatar from "./Avatar";
import CommonButton from "./CommonButton";

export default function RiderInfo({ data }) {
    const [show, setShow] = useState(false);
    const [selectSrc, setSelectSrc] = useState(null);

    const handleClickLicense = () => {
        setShow(true);
        setSelectSrc();
        console.log('Show License')
    };

    const handleClickRegistration = () => {
        setShow(true);
        setSelectSrc();
        console.log('Show Registration')
    };

    const handleClickVehiclePicture = () => {
        setShow(true);
        setSelectSrc();
        console.log('Show VehiclePicture')
    };

    return (
        <div className="w-full flex flex-col justify-between items-center px-8 py-3
            text-xl text-white rounded-xl bg-gray-200">
            <div className="w-full h-[40%] grid grid-cols-5">
                <div className="h-[100%] w-[100%] p-3 col-span-1">
                    <Avatar size="full" />
                </div>
                <div className="text-black font-bold text-lg col-span-3">
                    <h1>ID: <span className="font-medium">{data.id}</span></h1>
                    <h1>Name: <span className="font-medium">{data.firstName} {data.lastName}</span></h1>
                    <h1>ID Card: <span className="font-medium">{data.idCard}</span></h1>
                    <h1>Phone number: <span className="font-medium">{data.phone}</span></h1>
                    <h1>Email: <span className="font-medium">{data.email}</span></h1>
                    <h1>Address: <span className="font-medium">{data.address}</span></h1>
                </div>
                <div className="flex flex-col items-end justify-center gap-4 col-span-1">
                    <CommonButton
                        bg="green"
                        text="whiteToLuckyPoint"
                        borderColor="whiteToBlack"
                        width="reply"
                        height="regist"
                    >
                        Approve
                    </CommonButton>
                    <CommonButton
                        bg="torchRed"
                        text="white"
                        borderColor="white"
                        width="reply"
                        height="regist"
                    >
                        Deny
                    </CommonButton>
                </div>
            </div>

            <div className="flex justify-center w-full py-3">
                <hr className="w-[95%] border border-[#FF004D]" />
            </div>

            <div className="w-full h-[60%] px-5 flex justify-between text-black font-bold">
                <div
                    className="p-3 flex justify-center"
                    role="button"
                    onClick={handleClickLicense}
                >
                    License
                </div>
                <div
                    className="p-3 flex justify-center"
                    role="button"
                    onClick={handleClickRegistration}
                >
                    Vehicle Registration
                </div>
                <div
                    className="p-3 flex justify-center"
                    role="button"
                    onClick={handleClickVehiclePicture} 
                >
                    Vehicle picture
                </div>
            </div>
            {show ?
                
                    <div className="">
                        <img src={selectSrc} alt="" />
                    </div>
                
                : null}
        </div>
    )
}
