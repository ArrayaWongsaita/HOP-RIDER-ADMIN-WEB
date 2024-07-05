import Avatar from "../components/Avatar";
import Section from "../components/Section";
import useAuth from "../hooks/authHook";

export default function WaitingApprovePage() {
    const { authUser } = useAuth();

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

                <div>
                    <h1 className="text-[#FF004D] text-xl">status : <span className="text-white">waiting for Admin approval</span></h1>
                </div>

            </div>

        </div>
    )
}