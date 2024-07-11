import { useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar";
import CommonButton from "../components/CommonButton";
import Section from "../components/Section";
import useAuth from "../hooks/authHook";

export default function WaitingApprovePage() {
    const { authUser } = useAuth();
    const message = false

    const navigate = useNavigate();

    const handleMoveToVerify = () => {
        navigate('/rider/verify');
    }

    return (
        <div className="w-full">
            <Section >
                <h2>identity verification</h2>
            </Section>
            <div className="flex flex-col gap-4 items-center ">
                <Avatar />
                <div className="mt-2 text-xl text-white">
                    <h1>{authUser?.firstName ? authUser?.firstName : 'First name'} {authUser?.lastName ? authUser?.lastName : 'Last Name'}</h1>
                </div>

                <div className="flex justify-center m-2 w-full">
                    <hr className="w-[85%] border border-[#FF004D]" />
                </div>

                {message ?
                    <div className="flex flex-col w-full justify-center items-center gap-12">
                        <div className="flex justify-center items-center px-6">
                            <h1 className="text-[#FF004D] text-xl">message : <span className="text-white">Your rider license is wrong please resend.</span></h1>
                        </div>
                        <CommonButton
                            bg="torchRed"
                            text="white"
                            borderColor="white"
                            width="riderStatus"
                            height="regist"
                            onClick={handleMoveToVerify}
                        >
                            Back To Verify
                        </CommonButton>
                    </div>
                    :
                    <div className="flex justify-center items-center px-6">
                        <h1 className="text-[#FF004D] text-xl">status : <span className="text-white">waiting for Admin approval</span></h1>
                    </div>
                }

            </div>

        </div>
    )
}