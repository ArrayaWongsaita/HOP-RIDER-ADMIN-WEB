import { useState } from "react";
import Avatar from "./Avatar";
import CommonButton from "./CommonButton";
import ModalAdmin from "./ModalAdmin";
import ModalApproveRider from "../layouts/Admin/ModalApproveRider";
import ModalDenyRider from "../layouts/Admin/ModalDenyRider";

export default function RiderInfo({ data }) {
  const [open, setOpen] = useState(false);
  const [selectSrc, setSelectSrc] = useState(null);
  const [approve, setApprove] = useState(false);
  const [deny, setDeny] = useState(false);

  console.log(data);
  const handleClickLicense = () => {
    setSelectSrc(data.licenseImage);
    setOpen(true);
    console.log("Show License");
  };

  const handleClickRegistration = () => {
    setSelectSrc(data.vehicleRegistrationImage);
    setOpen(true);
    console.log("Show Registration");
  };

  const handleClickVehiclePicture = () => {
    setSelectSrc(data.vehicleImage);
    setOpen(true);
    console.log("Show VehiclePicture");
  };

  const handleClickApprove = () => {
    setApprove(true);
    setOpen(true);
    console.log("Show Approve");
  };

  const handleClickDeny = () => {
    setDeny(true);
    setOpen(true);
    console.log("Show Deny");
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectSrc(null);
    setApprove(false);
    setDeny(false);
  };

  return (
    <div
      className="w-full h-[447px] flex flex-col  px-8 py-3
            text-xl text-white rounded-xl bg-gray-200"
    >
      <div className="w-100% h-[80%] flex justify-around">
        <div className="h-[80%] w-[33%] flex justify-center items-center">
          <Avatar className="w-[80%] h-[80%]" />
        </div>
        <div className="text-black font-bold text-lg  h-[80%] w-[33%] flex justify-center items-start flex-col">
          <h1>
            ID: <span className="font-medium">{data.id}</span>
          </h1>
          <h1>
            Name:{" "}
            <span className="font-medium">
              {data.firstName} {data.lastName}
            </span>
          </h1>
          <h1>
            ID Card: <span className="font-medium">{data.idCard}</span>
          </h1>
          <h1>
            Phone number: <span className="font-medium">{data.phone}</span>
          </h1>
          <h1>
            Email: <span className="font-medium">{data.email}</span>
          </h1>
          <h1>
            Address: <span className="font-medium">{data.address}</span>
          </h1>
        </div>
        <div className=" justify-center gap-4 col-span-1 h-[80%] w-[33%] flex  items-center flex-col">
          <CommonButton
            bg="green"
            text="whiteToLuckyPoint"
            borderColor="whiteToBlack"
            width="reply"
            height="regist"
            onClick={handleClickApprove}
          >
            Approve
          </CommonButton>
          <CommonButton
            bg="torchRed"
            text="white"
            borderColor="white"
            width="reply"
            height="regist"
            onClick={handleClickDeny}
          >
            Deny
          </CommonButton>
        </div>
      </div>

      <div className="w-full h-[10%] px-5 flex justify-between text-black font-bold flex-col">
        <div className="flex just1fy-center w-full py-3">
          <hr className="w-[95%] border border-[#FF004D]" />
        </div>

        <div className="flex justify-between px-8">
          <div
            className="p-3 flex justify-center"
            role="button"
            onClick={handleClickLicense}
          >
            License
          </div>
          <div
            className="p-3 flex justify-center"
            role="button"
            onClick={handleClickRegistration}
          >
            Vehicle Registration
          </div>
          <div
            className="p-3 flex justify-center"
            role="button"
            onClick={handleClickVehiclePicture}
          >
            Vehicle picture
          </div>
        </div>
      </div>

      <ModalAdmin open={open} onClose={handleCloseModal}>
        {/* onClose={() => setOpen(false)} */}
        {selectSrc ? (
          <div className="h-[100%] w-[100%] p-8 flex justify-center mx-auto">
            <img src={selectSrc} alt="selected Image" />
          </div>
        ) : approve ? (
          <ModalApproveRider data={data} />
        ) : deny ? (
          <ModalDenyRider data={data} />
        ) : (
          "Something wrong"
        )}
      </ModalAdmin>
    </div>
  );
}
