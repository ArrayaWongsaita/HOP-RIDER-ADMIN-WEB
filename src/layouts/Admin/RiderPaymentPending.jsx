import { useState } from "react";
import CommonButton from "../../components/CommonButton";
import ModalAdmin from "../../components/ModalAdmin";
import { pricePackage } from "../../constants/pricePackagePlan";
import ModalDenyPayment from "./ModalDenyPayment";
import ModalApprovePayment from "./ModalApprovePayment";
import PriceCardForAdmin from "../../components/PriceCardForAdmin";

export default function RiderPaymentPending({ data }) {
    const [open, setOpen] = useState(false);
    const [selectSrc, setSelectSrc] = useState(null);
    const [approve, setApprove] = useState(false);
    const [deny, setDeny] = useState(false);

    const usedPlan = pricePackage

    const handleClickSlip = () => {
        setSelectSrc(data?.payments?.paymentSlip);
        setOpen(true);
        console.log('Show Slip');
    };

    const handleClickApprove = () => {
        setApprove(true);
        setOpen(true);
        console.log('Show Approve');
    };

    const handleClickDeny = () => {
        setDeny(true);
        setOpen(true);
        console.log('Show Deny');
    };

    const handleCloseModal = () => {
        setOpen(false);
        setSelectSrc(null);
        setApprove(false);
        setDeny(false);
    };

    return (
        <div className="w-full flex flex-col justify-between items-center px-8 py-3
    text-xl text-white rounded-xl bg-gray-200">
            <div className="grid grid-cols-3 w-full h-[350px]">
                <div className="flex justify-center items-center w-[100%] h-[100%]" >
                    <PriceCardForAdmin
                        plan={usedPlan[data?.payments?.planId - 1]}
                    />
                </div>
                <div
                    role="button"
                    onClick={handleClickSlip}
                    className="flex justify-center h-full items-center " >
                    <img src={data?.payments?.paymentSlip} alt="Slip Image" className="h-[300px] flex items-center justify-center rounded-2xl  shadow-lg" />
                </div>
                <div className="flex flex-col gap-8 items-end justify-center">
                    <CommonButton
                        bg="green"
                        text="whiteToLuckyPoint"
                        borderColor="whiteToBlack"
                        width="reply"
                        height="regist"
                        onClick={handleClickApprove}
                    >
                        Confirm
                    </CommonButton>
                    <CommonButton
                        bg="torchRed"
                        text="white"
                        borderColor="white"
                        width="reply"
                        height="regist"
                        onClick={handleClickDeny}
                    >
                        Reject
                    </CommonButton>
                </div>
            </div>
            <ModalAdmin open={open} onClose={handleCloseModal} >
                {/* onClose={() => setOpen(false)} */}
                {selectSrc ? <div className="h-[100%] w-[100%] p-8 flex justify-center mx-auto">
                    <img src={selectSrc} alt="selected Image" className="h-[100%] flex items-center justify-center rounded-2xl  shadow-lg" />
                </div>
                    : approve ?
                        <ModalApprovePayment data={data} usedPlan={usedPlan} onClose={handleCloseModal} />
                        : deny ?
                            <ModalDenyPayment data={data} onClose={handleCloseModal} />
                            : "Something wrong"
                }
            </ModalAdmin>
        </div>
    )
}
