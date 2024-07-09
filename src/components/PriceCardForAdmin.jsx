
export default function PriceCardForAdmin({ plan, width = 'w-[70%]', height = 'h-[70%]' }) {

    return (
        <div className={`bg-white rounded-[16px] shadow-lg ${width} ${height}`}>
            <div className="w-full h-full flex flex-col gap-8 items-center justify-center p-5">
                <div className="text-luckyPoint text-[18px] text-shadow-xl flex flex-col items-center ">
                    <div className=" text-torchRed text-[27px] font-bold text-shadow-xl">
                        {plan?.month}
                    </div>
                    <div className=" text-[16px] text-shadow-xl text-luckyPoint">
                        {plan?.month === 1 ? "month" : "months"}
                    </div>
                </div>
                <div className="text-torchRed text-[38px] text-shadow-xl font-extrabold">
                    {plan?.price}
                </div>
                <div className="text-luckyPoint text-[18px] text-shadow-xl ">
                    <div className="text-[12px]">
                        avg: {plan?.avg}.- / day
                    </div>
                </div>
            </div>
        </div>
    )
}
