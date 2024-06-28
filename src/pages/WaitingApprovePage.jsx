import Section from "../components/Section";
import useAuth from "../hooks/authHook";
import { ImageRider } from "../icons/IconImageRider";

export default function WaitingApprovePage() {
    const { authUser } = useAuth();

    return (
        <div className="w-full">
            <Section >
                <h2>identity verification</h2>
            </Section>
            <div className="flex flex-col gap-4 items-center ">
                <div className="w-[150px] h-[150px] border-2 rounded-2xl border-[#FF004D] 
                flex justify-center items-center">
                    {authUser?.profileImage
                        ? <div className="w-[90px] h-[90px]">authUser.profileImage</div>
                        : <ImageRider width={90} height={90} />}
                </div>
                <div className="mt-2 text-xl text-white">
                    <h1>{authUser?.firstName ? authUser?.firstName : 'Donnie'} {authUser?.lastName ? authUser?.lastName : 'Yen'}</h1>
                </div>

                <div className="flex justify-center m-2 w-full">
                    <hr className="w-[85%] border border-[#FF004D]" />
                </div>

                <div>
                    <h1 className="text-[#FF004D] text-xl">status : <span className="text-white">waiting for Admin approval</span></h1>
                </div>

            </div>

        </div>
    )
}