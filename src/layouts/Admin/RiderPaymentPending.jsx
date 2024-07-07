import CommonButton from "../../components/CommonButton";
import PriceCard from "../../components/PriceCard";
import { pricePackage } from "../../constants/pricePackagePlan";

export default function RiderPaymentPending({ data }) {
    const usedPlan = pricePackage
    const planId = 1

    console.log(data);

    return (
        <div className="w-full flex flex-col justify-between items-center px-8 py-3
    text-xl text-white rounded-xl bg-gray-200">
            <div className="grid grid-cols-3 w-full h-[250px]">
                <div className="flex justify-center" >
                    <PriceCard
                        hidden="hidden"
                        plan={usedPlan[planId - 1]}
                        planId={planId}
                    />
                </div>
                <div className="flex justify-center" >
                    <img src="" alt="Slip Image" />
                </div>
                <div className="flex flex-col gap-8 items-end justify-center">
                    <CommonButton
                        bg="green"
                        text="whiteToLuckyPoint"
                        borderColor="whiteToBlack"
                        width="reply"
                        height="accept"
                    >
                        Confirm Subscribe
                    </CommonButton>
                    <CommonButton
                        bg="torchRed"
                        text="white"
                        borderColor="white"
                        width="reply"
                        height="regist"
                    >
                        Reject
                    </CommonButton>
                </div>
            </div>
        </div>
    )
}
