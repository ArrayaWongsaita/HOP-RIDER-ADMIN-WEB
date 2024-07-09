import CommonButton from "../../components/CommonButton";
import DayCard from "../../components/DayCard";

export default function RiderPaymentSubscribe({ data }) {

    console.log(data);

    return (
        <div className="w-full flex flex-col justify-between items-center px-8 py-3
    text-xl text-white rounded-xl bg-gray-200">
            <div className="grid grid-cols-3 w-full h-[250px]">
                <div className="invisible">
                    <img src="" alt="" />
                </div>
                <div className="flex justify-center">
                    <DayCard data={data} />
                </div>
                <div className="flex flex-col gap-8 items-end justify-center invisible">
                    <CommonButton
                        bg="green"
                        text="whiteToLuckyPoint"
                        borderColor="whiteToBlack"
                        width="reply"
                        height="regist"
                    >
                        Confirm
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
