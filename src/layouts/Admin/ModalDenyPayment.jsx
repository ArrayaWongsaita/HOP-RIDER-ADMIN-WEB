import { useState } from "react";
import CommonButton from "../../components/CommonButton";
import Textarea from "../../components/Textarea";
import adminApi from "../../apis/adminApi";
import useRider from "../../hooks/riderHook";

const initialInput = {
    comment: '',
};

export default function ModalDenyPayment({ data, onClose }) {
    const { fetchAllRider } = useRider();
    const [input, setInput] = useState(initialInput);
    console.log(data)

    const handleChangeInput = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value })
    };

    const handleSubmitDeny = async (event) => {
        try {
            event.preventDefault();
            const requestBody = {
                riderId: data?.id,
                paymentId: data?.payments?.id,
                status: 'DENIED',
                planId: data?.payments?.planId,
            };
            console.log(requestBody);
            await adminApi.approvePayment(requestBody, input);
            console.log('submit');
            fetchAllRider();
            onClose();
        }   catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="w-[100%] h-[100%] flex flex-col justify-center items-center gap-8">
            <div className="text-[#FF004D] flex justify-center font-bold text-xl">
                Why deny ?
            </div>
            <div className="border-2 border-[#FF004D] w-[75%] h-[50%] rounded-xl flex justify-center items-center">
                <div className="w-full h-full">
                    <Textarea
                        rows={9}
                        border='none'
                        // placeholder={"Why to deny ?"}
                        name="comment"
                        value={input.comment}
                        onChange={handleChangeInput}
                    // error={inputError.address}
                    />
                </div>
            </div>
            <div>
                <CommonButton
                    bg="torchRed"
                    text="white"
                    borderColor="white"
                    width="riderStatus"
                    height="regist"
                    onClick={handleSubmitDeny}
                >
                    Confirm Deny
                </CommonButton>
            </div>
        </div>
    )
}
