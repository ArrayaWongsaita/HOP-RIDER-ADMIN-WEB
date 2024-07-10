import adminApi from "../../apis/adminApi";
import AvatarRider from "../../components/AvatarRider";
import CommonButton from "../../components/CommonButton";
import useRider from "../../hooks/riderHook";

export default function ModalApproveRider({ data, onClose }) {
    const { setUserRider } = useRider();
    console.log(data);

    const handleSubmitApproveRider = async (event) => {
        try {
            event.preventDefault();
            const requestBody = {
                riderId: data?.id,
                status: 'APPROVED',
            };
            console.log(requestBody);
            await adminApi.approveRider(requestBody);
            console.log('submit');
            // update state ใน context
            setUserRider(prevState =>
                prevState.map(item =>
                    item.id === data.id ? { ...item, status: 'APPROVED' } : item
                )
            );
            onClose();
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="w-[100%] h-[100%] flex flex-col justify-center items-center gap-8">
            <div className="text-[#00A850] flex justify-center font-bold text-xl">
                Approve ?
            </div>
            <div className="border-2 border-[#00A850] w-[75%] h-[50%] rounded-xl flex justify-center items-center">
                <div className="grid grid-cols-3">
                    <div className="col-span-1 h-[75%] w-[75%]">
                        <AvatarRider srcImage={data.profileImage} size="full" />
                    </div>
                    <div className="col-span-2">
                        <h1>ID: <span className="font-medium">{data.id}</span></h1>
                        <h1>Name: <span className="font-medium">{data.firstName} {data.lastName}</span></h1>
                        <h1>ID Card: <span className="font-medium">{data.citizenId}</span></h1>
                        <h1>Phone number: <span className="font-medium">{data.phone}</span></h1>
                        <h1>Email: <span className="font-medium">{data.email}</span></h1>
                        <h1>Address: <span className="font-medium">{data.address}</span></h1>
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
