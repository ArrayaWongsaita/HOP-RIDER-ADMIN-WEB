import { useNavigate } from "react-router-dom";
import CommonButton from "../components/CommonButton";
import { IconLogoHop } from "../icons/IconLogoHop";


export default function WaitingCheckPaymentPage() {
    const navigate = useNavigate()

    const handleMoveToHomePage = () => {
        navigate('/rider/');
    }
    
    return (
        <div className="w-full h-[100vh] mt-16 flex flex-col items-center">
            <div className="w-[95%] h-[70vh] border-4 border-white rounded-xl">
                <div className="h-full flex flex-col items-center justify-between gap-5 py-10 px-10">
                    <div>
                        <IconLogoHop />
                    </div>
                    <div className="text-[26px] text-white flex flex-col items-center ">
                        <h1>Admin is checking</h1>
                        <h1>your payment ...</h1>
                    </div>
                    <div className="pb-10">
                        <CommonButton
                            bg="white"
                            text="torchRed"
                            borderColor="torchRed"
                            width="riderStatus"
                            height="accept"
                            onClick={handleMoveToHomePage}
                        >
                            Back To Home
                        </CommonButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
