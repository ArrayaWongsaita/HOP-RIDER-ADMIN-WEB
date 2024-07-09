import adminApi from "../../apis/adminApi";
import CommonButton from "../../components/CommonButton";
import PriceCard from "../../components/PriceCard";

export default function ModalApprovePayment({ data, usedPlan }) {
    console.log(data)

    const handleSubmitApproveRider = async (event) => {
        event.preventDefault();
        console.log(data.id);
        await adminApi.approvePayment(data.id);
    }

    return (
        <div className="w-[100%] h-[100%] flex flex-col justify-center items-center gap-8">
            <div className="text-[#00A850] flex justify-center font-bold text-xl">
                Approve ?
            </div>
            <div className="border-2 border-[#00A850] w-[75%] h-[50%] rounded-xl flex justify-center items-center">
                <div className="flex justify-around px-10 h-[100%] w-[100%] ">
                    <div className="flex items-center justify-center h-[85%] w-[100%] ">
                        <PriceCard
                            hidden="hidden"
                            plan={usedPlan[data.planId - 1]}
                            planId={data.planId}
                        />
                    </div>
                    <div className="flex justify-center h-[100%] w-[100%] ">
                        <img src={data.slip} alt="Slip Image" className="shadow-lg h-[85%] flex items-center justify-center" />
                    </div>
                </div>
            </div>
            <div>
                <CommonButton
                    bg="green"
                    text="whiteToLuckyPoint"
                    borderColor="whiteToBlack"
                    width="riderStatus"
                    height="regist"
                    onClick={handleSubmitApproveRider}
                >
                    Confirm Approve
                </CommonButton>
            </div>
        </div>
    )
}
