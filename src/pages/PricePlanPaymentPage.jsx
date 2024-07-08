import { useState } from "react";
import promptpayLogo from "../assets/promptpay_logo.jpg";
import promptpayQR from "../assets/promptpay_qr.jpg";
import kbank from "../assets/kbank.jpg";
import PaymentDetail from "../components/PaymentDetail";
import scb from "../assets/scb.jpg";
import ktb from "../assets/krungthai.jpg";
import "../components/radioBox.css";
import Section from "../components/Section";
import InputImage from "../components/InputImage";
import { ImportImage } from "../icons/IconImportImage";
import CommonButton from "../components/CommonButton";
import PriceCard from "../components/PriceCard";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const pricePagkage = [
  { id: 1, month: 1, price: "3,000", avg: 100 },
  { id: 2, month: 3, price: "8,900", avg: 99 },
  { id: 3, month: 6, price: "17,600", avg: 97 },
  { id: 4, month: 9, price: "26,000", avg: 96 },
  { id: 5, month: 12, price: "35,000", avg: 95 },
];

export default function PricePlanPaymentPage() {
  const [selected, setSelected] = useState("");
  const [slipImage, setSlipImage] = useState({});
  const { planId } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setSelected(e.target.value);
  };
  const handleUploadSlip = (file) => {
    console.log(file);
    setSlipImage(file);
  };
  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      if (!slipImage || null) {
        return {};
      }
      navigate("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Section>Choose your plan</Section>
      <div className="flex items-center flex-col pb-10 gap-5">
        <PriceCard
          hidden="hidden"
          plan={pricePagkage[planId - 1]}
          planId={planId}
        />
        <div className="form-box flex flex-col items-center gap-1 w-full">
          <label className="flex justify-between w-[80%] bg-white h-[70px] rounded-[14px]  border-torchRed border-[1px] items-center  px-4">
            <input
              type="radio"
              name="payment"
              value="promptPay"
              id="promptPay"
              checked={selected === "promptPay"}
              onChange={changeHandler}
              className="radio-input"
            />
            <span className="custom-radio" />
            <div className="flex basis-5/6 justify-center">
              <img src={promptpayLogo} className="h-[56px] w-auto"></img>
            </div>
            <div className="text-white">___</div>
          </label>

          <div
            aria-hidden={selected !== "promptPay" ? true : false}
            className="aria-hidden:hidden w-[80%] h-[260px] bg-gainsboro rounded-[14px] flex items-center flex-col justify-around"
          >
            <img src={promptpayQR} className="h-[196px]"></img>
            <a>download QR Code</a>
          </div>

          <label className="flex justify-between w-[80%] bg-white h-[70px] rounded-[14px]  border-torchRed border-[1px] items-center  px-4">
            <input
              type="radio"
              name="payment"
              value="kBank"
              id="kBank"
              checked={selected === "kBank"}
              onChange={changeHandler}
              className="radio-input"
            />
            <span className="custom-radio" />
            <div className="flex basis-5/6 justify-center">
              <img src={kbank}></img>
            </div>
            <div className="text-white">___</div>
          </label>

          <div
            aria-hidden={selected !== "kBank" ? true : false}
            className="aria-hidden:hidden w-[80%] h-[260px] bg-gainsboro rounded-[14px] flex justify-center items-center"
          >
            <PaymentDetail />
          </div>

          <label className="flex justify-between w-[80%] bg-white h-[70px] rounded-[14px]  border-torchRed border-[1px] items-center  px-4">
            <input
              type="radio"
              name="payment"
              value="scb"
              id="scb"
              checked={selected === "scb"}
              onChange={changeHandler}
              className="radio-input"
            />
            <span className="custom-radio" />
            <div className="flex basis-5/6 justify-center">
              <img src={scb}></img>
            </div>
            <div className="text-white">___</div>
          </label>

          <div
            aria-hidden={selected !== "scb" ? true : false}
            className="aria-hidden:hidden w-[80%] h-[260px] bg-gainsboro rounded-[14px] flex justify-center items-center"
          >
            <PaymentDetail bank="scb" text="scb" />
          </div>

          <label className="flex justify-between w-[80%] bg-white h-[70px] rounded-[14px]  border-torchRed border-[1px] items-center  px-4">
            <input
              type="radio"
              name="payment"
              value="ktb"
              id="ktb"
              checked={selected === "ktb"}
              onChange={changeHandler}
              className="radio-input"
            />
            <span className="custom-radio" />
            <div className="flex basis-5/6 justify-center">
              <img src={ktb} className=" rounded-[14px]"></img>
            </div>
            <div className="text-white">___</div>
          </label>

          <div
            aria-hidden={selected !== "ktb" ? true : false}
            className="aria-hidden:hidden w-[80%] h-[260px] bg-gainsboro rounded-[14px] flex justify-center items-center"
          >
            <PaymentDetail bank="ktb" text="ktb" />
          </div>
        </div>

        <form
          className="flex flex-col  items-center pt-5 pb-10 w-full gap-4"
          onSubmit={handleSubmitForm}
        >
          <div className="w-[80%] h-[250px] border-2 rounded-2xl border-torchRed flex justify-center items-center  bg-white">
            <InputImage onClick={handleUploadSlip} width="245px">
              <div className="flex flex-col w-full h-full items-center justify-start">
                <div className=" basis-9/12 flex items-center ">
                  <ImportImage />
                </div>

                <div className="rounded-2xl bg-torchRed h-[28px] w-full flex justify-center items-center">
                  <p className="text-white text-[15px]">
                    + upload your payment here
                  </p>
                </div>
              </div>
            </InputImage>
          </div>
          <div className="flex justify-evenly w-full">
            <Link to="/rider/price">
              <CommonButton
                bg="gray"
                text="luckyPoint"
                borderColor="whiteToLuckyPoint"
                width="confirm"
                height="regist"
              >
                Back
              </CommonButton>
            </Link>
            <CommonButton width="confirm" height="regist" type="submit">
              Confirm
            </CommonButton>
          </div>
        </form>
      </div>
    </div>
  );
}
