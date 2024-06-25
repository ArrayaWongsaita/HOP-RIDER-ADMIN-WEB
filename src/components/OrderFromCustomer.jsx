import CommonButton from "../components/CommonButton";
import { IconArrow } from "../icons";

export default function OrderFromCustomer() {
    return (
        <div className="bg-white h-[170px] w-[95%] rounded-2xl p-3 flex ">
            <div className=" h-full w-[90%] flex flex-col items-center ">
                <div className="text-sm font-bold flex items-center justify-between gap-3 h-[50%] ">
                    <h1 className="flex-1">First Location thai japan korean russia usa morocco</h1>
                    <IconArrow width="64" height="24" />
                    <h1 className="flex-1">Second Location escape from tarkov</h1>
                </div>
                <div className="text-[#FF004D] grid grid-cols-3 h-[50%] w-[100%] pb-1">
                    <div className=" flex items-end gap-2 justify-between w-[100%] -ml-[3px] pb-1 ">
                        <div className="h-[35px] text-[35px] w-1/2">
                            16.2
                        </div>
                        <div className="mb-[-4px] text-base ">KM</div>
                    </div>
                    <div className=" flex items-end gap-2 justify-between w-[100%] border-x-[4px] border-[#FF004D] px-1 pl-1 pb-1 ">
                        <div className="h-[35px] text-[35px] w-1/2">
                            151
                        </div>
                        <div className="mb-[-4px] text-base ">Min</div>
                    </div>
                    <div className=" flex items-end gap-2 justify-between w-[100%] pl-1 pb-1 ">
                        <div className="h-[35px] text-[35px] w-1/2">
                            150
                        </div>
                        <div className="mb-[-4px] text-base ">THB</div>
                    </div>
                    {/* <div className="flex items-end gap-2 justify-between w-[33%] -mb-3 px-1">
                            <h2 className="text-[30px]">52<span className="text-base pl-2">THB</span></h2>
                        </div> */}
                </div>
            </div>
            <div className="w-[12%] flex">
                <div className="rotate-[-90deg] ">
                    <CommonButton
                        fontSize="reply"
                        width="accept"
                        height="mini"
                        border="accept"
                        align="flexCenter"
                        rounded="10"
                    >
                        ACCEPT
                    </CommonButton>
                </div>
            </div>
        </div>
    )
}