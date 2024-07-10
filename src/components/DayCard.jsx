
export default function DayCard({ data }) {

    console.log(data)

    return (
        <div className="bg-white rounded-[16px] shadow-lg">
            <div className="w-full h-full flex flex-col gap-8 items-center justify-center p-5">
                {data?.subScribeDate > 0
                    ?
                    <>
                        <div className="text-luckyPoint text-[18px] text-shadow-xl ">
                            Expire :
                        </div>
                        <div className="text-torchRed text-[34px] text-shadow-xl font-extrabold">
                            <h1>{data?.payments?.expiredDate}</h1>
                        </div>
                        <div className="text-luckyPoint text-[18px] text-shadow-xl invisible ">
                            Expire :
                        </div>
                    </>
                    : <div className="text-torchRed text-[34px] text-shadow-xl font-extrabold">
                        Expired
                    </div>
                }
            </div>
        </div>
    )
}
