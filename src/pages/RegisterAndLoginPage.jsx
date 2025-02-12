import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { IconLogoHop } from "../icons/IconLogoHop";
import RegisterForm from "../features/RegisterForm";
import LoginForm from "../features/LoginForm";
import { getAccessToken } from "../utils/local-storage";


export default function RegisterAndLoginPage() {
    const [toggle, setToggle] = useState(false);

    const navigate = useNavigate(); // ใช้ useNavigate

    // useEffect เพื่อตรวจสอบ ACCESS_TOKEN และเปลี่ยนเส้นทางผู้ใช้
    useEffect(() => {
        if (getAccessToken()) {
            navigate("/rider/"); // เปลี่ยนเส้นทางไปหน้า Homepage
        }
    }, [navigate]);

    const handleShowLogin = () => {
        setToggle(false); // แสดง LoginForm
    };

    return (
        <div className="h-[100vh] w-[430px] bg-black" >
            <div className="w-[100%] h-[30%] font-extrabold flex justify-center items-center pl-8 pb-9">
                <IconLogoHop />
            </div>
            <div className="w-[90%] mx-auto relative z-40 ">
                <div className="w-[100%] flex justify-between absolute top-[-45px] z-20">
                    <div
                        role="button" onClick={() => setToggle(true)}
                        className="text-white h-[60px] pb-[10px] w-[100px] bg-[#1D2B53] flex justify-center items-center rounded-tr-2xl text-[18px] ">
                        Register
                    </div>
                    <div
                        role="button" onClick={() => setToggle(false)}
                        className="text-white h-[60px] pb-[10px] w-[100px] bg-[#FF004D] flex justify-center items-center rounded-tl-2xl text-[18px] ">
                        Login
                    </div>
                </div>
                {toggle
                    ? (
                        <div className="rounded-b-2xl rounded-tr-2xl mx-auto h-[500px] flex items-center relative z-40
                    bg-gradient-to-br from-[#1D2B53] from-50% to-[#FF004D] to-85% " >
                            <div className="p-5 my-auto w-full" >
                                < RegisterForm onCloseModal={handleShowLogin} />
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-b-2xl rounded-tl-2xl mx-auto h-[500px] flex items-center relative z-40
                    bg-gradient-to-tr from-[#1D2B53] from-40% to-[#FF004D] to-85% " >
                            <div className="p-5 my-auto w-full" >
                                < LoginForm />
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )
}