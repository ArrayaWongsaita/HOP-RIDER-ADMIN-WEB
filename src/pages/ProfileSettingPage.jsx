import Section from "../components/Section";
import useAuth from "../hooks/authHook";
import { ImageRider } from "../icons/IconImageRider";

export default function ProfileSettingPage() {
    const { authUser } = useAuth();
    
    console.log(authUser);
    return (
        <div className="flex items-center justify-center flex-col">
            <Section position="left" color="rightToLeft" >
                <h2>identity verification</h2>
            </Section>
            <div
                role="button"
                className="flex items-center justify-center w-[145px] h-[145px] border-[1px] border-[#FF004D] rounded-[16px] mt-[9px]"
            >
                { authUser?.profileImage ? authUser.profileImage : <ImageRider /> }
            </div>

            <div className="flex items-center justify-between mt-[23px] text w-[165px] text-[20px] font-bold">
                <button className="text-[#FF004D]">Edit</button>
                <p className="text-[#FF004D]">|</p>
                <button className="text-[#FF004D]">Cancel</button>
            </div>
            <hr className=" border border-[#FF004D] mt-[31px] w-[85%]" />

            <div className="flex items-center justify-center gap-[10px] mt-[36px] text-[20px] font-bold">
                <h2 className="text-[#FF004D]">First Name: </h2>
                <h2 className="text-white">{ authUser?.firstName ? authUser.firstName : 'First Name' }</h2>
            </div>

            <div className="flex items-center justify-center gap-[10px] text-[20px] font-bold">
                <h2 className="text-[#FF004D]">Last Name: </h2>
                <h2 className="text-white">{ authUser?.lastName ? authUser.lastName : 'Last Name' }</h2>
            </div>
            <div className="flex items-center justify-between mt-[23px] text w-[165px] text-[20px] font-bold">
                <button className="text-[#FF004D]">Edit</button>
                <p className="text-[#FF004D]">|</p>
                <button className="text-[#FF004D]">Cancel</button>
            </div>

            <hr className=" border border-[#FF004D] mt-[31px] w-[85%]" />

            <div className="flex items-center justify-center gap-[10px] mt-[36px] text-[20px] font-bold">
                <h2 className="text-[#FF004D]">Phone:</h2>
                <h2 className="text-white">{ authUser?.phone ? authUser.phone : 'Phone number' }</h2>
            </div>
            <div className="flex items-center justify-center gap-[10px] text-[20px] font-bold">
                <h2 className="text-[#FF004D]">Email:</h2>
                <h2 className="text-white">{ authUser?.email ? authUser.email : 'Email' }</h2>
            </div>
            <div className="flex items-center justify-between mt-[23px]  w-[165px] text-[20px] font-bold">
                <button className="text-[#FF004D]">Edit</button>
                <p className="text-[#FF004D]">|</p>
                <button className="text-[#FF004D]">Cancel</button>
            </div>
            <hr className=" border border-[#FF004D] mt-[31px] w-[85%]" />

            <div className="flex items-center justify-center gap-[10px] mt-[36px] text-[20px] font-bold">
                <h2 className="text-[#FF004D]"> Current password :</h2>
                <h2 className="text-white">password</h2>
            </div>

            <div className="flex items-center justify-center gap-[10px] text-[20px] font-bold">
                <h2 className="text-[#FF004D]"> New password :</h2>
                <h2 className="text-white"> password</h2>
            </div>
            <div className="flex items-center justify-center gap-[10px] text-[20px] font-bold">
                <h2 className="text-[#FF004D]"> Confirm password :</h2>
                <h2 className="text-white"> password</h2>
            </div>
            <div className="flex items-center justify-between mt-[23px]  w-[165px] text-[20px] font-bold">
                <button className="text-[#FF004D]">Edit</button>
                <p className="text-[#FF004D]">|</p>
                <button className="text-[#FF004D]">Cancel</button>
            </div>
            <hr className=" border border-[#FF004D] mt-[31px] w-[85%] my-4" />
        </div>
    );
}