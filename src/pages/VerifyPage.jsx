import { useState } from "react";
import { useRef } from "react";

import useAuth from "../hooks/authHook";
import Input from "../components/Input";
import InputImage from "../components/InputImage";
import Textarea from "../components/Textarea";
import CommonButton from "../components/CommonButton";
import Section from "../components/Section";
import verifyValidate from "../validators/verify-validate";
import { ImageRider } from "../icons/IconImageRider";
import { ImportImage } from "../icons/IconImportImage";
// import riderApi from "../apis/riderApi";

const initialInput = {
    // firstName: '',
    // lastName: '',
    birthDate: '',
    idCard: '',
    // email: '',
    // phone: '',
    address: '',
};

const initialInputError = {
    // firstName: '',
    // lastName: '',
    birthDate: '',
    idCard: '',
    // email: '',
    // phone: '',
    address: '',
};

const color1 = 'bg-[#FF004D] text-[#FFFFFF]'
const color2 = 'bg-[#FFFFFF] text-[#FF004D]'

export default function VerifyPage() {
    const { authUser } = useAuth()
    const [input, setInput] = useState(initialInput);
    const [inputError, setInputError] = useState(initialInputError);
    const [profileImage, setProfileImage] = useState({});
    const [option1, setOption1] = useState(false);
    // console.log(option1);
    const [option2, setOption2] = useState(false);
    // console.log(option2);
    const [afterSubmit, setAfterSubmit] = useState(false);
    // console.log(input)

    const missingProfileImage = useRef(null)
    const missingInput = useRef(null)
    const missingLicenseImage = useRef(null)
    const missingVehicleRegistrationImage = useRef(null)
    const missingVehicleImage = useRef(null)

    const handleChangeInput = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value })
    };

    const handelImageProfile = (file) => {
        console.log(file);
        setProfileImage({ ...profileImage, 'profileImage': file });
    };

    const handelImageLicense = (file) => {
        console.log(file);
        setProfileImage({ ...profileImage, 'licenseImage': file });
    };

    const handelImageVehicleRegistration = (file) => {
        console.log(file);
        setProfileImage({ ...profileImage, 'vehicleRegistrationImage': file });
    };

    const handelImageVehicle = (file) => {
        console.log(file);
        setProfileImage({ ...profileImage, 'vehicleImage': file });
    };

    // console.log(input.birthDate)
    // console.log(typeof input.birthDate)
    // console.log(profileImage);
    // console.log(typeof profileImage)

    const handleSubmitForm = async (event) => {
        try {
            event.preventDefault();
            if (!option1 || !option2) {
                return setAfterSubmit(true);
            }
            if (!profileImage.profileImage) return missingProfileImage.current?.scrollIntoView({ behavior: "smooth" });
            const error = verifyValidate(input);
            if (error) {
                console.log(error);
                missingInput.current?.scrollIntoView({ behavior: "smooth" });
                return setInputError(error);
            }
            setInputError({ ...initialInputError });
            if (!profileImage.licenseImage) return missingLicenseImage.current?.scrollIntoView({ behavior: "smooth" });
            if (!profileImage.vehicleRegistrationImage) return missingVehicleRegistrationImage.current?.scrollIntoView({ behavior: "smooth" });
            if (!profileImage.vehicleImage) return missingVehicleImage.current?.scrollIntoView({ behavior: "smooth" });
            const fromData = new FormData()
            fromData.append("profileImage", profileImage.profileImage)
            fromData.append("licenseImage", profileImage.licenseImage)
            fromData.append("vehicleImage", profileImage.vehicleImage)
            fromData.append("vehicleRegistrationImage", profileImage.vehicleRegistrationImage)
            fromData.append("birthDate", input.birthDate)
            fromData.append("idCard", input.idCard)
            fromData.append("address", input.address)

            console.log('fromData ----->>>');
            console.log(Object.fromEntries(fromData));
            // console.log('fromData --->>', fromData.get(''));
            // await riderApi.verify(fromData);
            console.log('verify success!!');

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Section >
                <h2>identity verification</h2>
            </Section>
            <form onSubmit={handleSubmitForm} >
                <div className="flex flex-col items-center gap-6">
                    <div
                        ref={missingProfileImage}
                        className="rounded-2xl overflow-hidden">
                        <InputImage
                            width="150px"
                            aspectRatio="1/1"
                            onClick={handelImageProfile}>
                            <div className="w-[150px] h-[150px] border-2 rounded-2xl border-[#FF004D] 
                flex justify-center items-center">
                                <ImageRider width={90} height={90} />
                            </div>
                        </InputImage>
                    </div>
                </div>

                <div className="flex justify-center mt-4">
                    <hr className="w-[85%] border border-[#FF004D]" />
                </div>

                <div className="flex flex-col justify-center items-center ">
                    <div className="w-[80%] flex flex-col gap-2 pt-4 pb-2 text-[#FF004D] text-lg font-bold">
                        <div className="">
                            <p>First name: <span className="text-white">{authUser?.firstName}</span></p>
                        </div>
                        <div className="">
                            <p>last name: <span className="text-white">{authUser?.lastName}</span></p>
                        </div>
                        <div className="" >
                            <p>Email: <span className="text-white">{authUser?.email}</span></p>
                        </div>
                        <div className="" >
                            <p>Phone number: <span className="text-white">{authUser?.phone}</span></p>
                        </div>
                    </div>
                    <div
                        ref={missingInput}
                        className="grid grid-cols-2 gap-2 w-[80%]">
                        <div className="col-span-2">
                            <Input
                                type="date"
                                placeholder="Birth Date"
                                name='birthDate'
                                value={input.birthDate}
                                onChange={handleChangeInput}
                                error={inputError.birthDate}
                            />
                        </div>
                        <div className="col-span-2" >
                            <Input
                                placeholder={"ID card number"}
                                name="idCard"
                                value={input.idCard}
                                onChange={handleChangeInput}
                                error={inputError.idCard}
                            />
                        </div>
                        <div className="col-span-2">
                            <Textarea
                                placeholder={"Address"}
                                name="address"
                                value={input.address}
                                onChange={handleChangeInput}
                                error={inputError.address}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center pt-2">
                    <hr className="w-[85%] border border-[#FF004D]" />
                </div>

                <div className="flex flex-col justify-center items-center py-6">
                    <div
                        ref={missingLicenseImage}
                        className="rounded-2xl overflow-hidden">
                        <InputImage
                            width="250px"
                            aspectRatio="1/1"
                            onClick={handelImageLicense}>
                            <div className="w-[250px] h-[250px] border-2 rounded-2xl border-[#FF004D] flex justify-center items-center">
                                <ImportImage />
                            </div>
                        </InputImage>
                    </div>
                    <div className={`mt-5 p-2 rounded-2xl ${profileImage?.licenseImage ? color2 : color1}`} >
                        <p>+ upload your driver&apos;s license here</p>
                    </div>
                </div>

                <div className="flex justify-center">
                    <hr className="w-[85%] border border-[#FF004D]" />
                </div>

                <div className="flex flex-col justify-center items-center py-6">
                    <div
                        ref={missingVehicleRegistrationImage}
                        className="rounded-2xl overflow-hidden">
                        <InputImage
                            width="250px"
                            aspectRatio="1/1"
                            onClick={handelImageVehicleRegistration}>
                            <div className="w-[250px] h-[250px] border-2 rounded-2xl border-[#FF004D] flex justify-center items-center">
                                <ImportImage />
                            </div>
                        </InputImage>
                    </div>
                    <div className={`mt-5 p-2 rounded-2xl ${profileImage?.vehicleRegistrationImage ? color2 : color1}`} >
                        <p>+ upload your vehicle registration copy here</p>
                    </div>
                </div>

                <div className="flex justify-center">
                    <hr className="w-[85%] border border-[#FF004D]" />
                </div>

                <div className="flex flex-col justify-center items-center py-6">
                    <div
                        ref={missingVehicleImage}
                        className="rounded-2xl overflow-hidden">
                        <InputImage
                            width="250px"
                            aspectRatio="1/1"
                            onClick={handelImageVehicle}>
                            <div className="w-[250px] h-[250px] border-2 rounded-2xl border-[#FF004D] flex justify-center items-center">
                                <ImportImage />
                            </div>
                        </InputImage>
                    </div>
                    <div className={`mt-5 p-2 rounded-2xl ${profileImage?.vehicleImage ? color2 : color1}`} >
                        <p>+ upload your picture of your vehicle here</p>
                    </div>
                </div>

                <div className="flex justify-center">
                    <hr className="w-[85%] border border-[#FF004D]" />
                </div>

                <div className="text-white w-full text-sm flex flex-col items-center gap-4 py-4">
                    <div className={`flex items-center gap-2 ${afterSubmit ? !option1 && 'text-[#FF004D]' : ''}`}>
                        <input type="checkbox" name="option01" onClick={() => setOption1(!option1)} />
                        <label htmlFor="option01" >Clean criminal record.</label>
                    </div>
                    <div className={`flex items-center gap-2 ${afterSubmit ? !option2 && 'text-[#FF004D]' : ''}`}>
                        <input type="checkbox" name="option02" onClick={() => setOption2(!option2)} />
                        <label htmlFor="option02" >Certify that the above information is true.</label>
                    </div>
                </div>
                <div className="flex justify-center pb-10">
                    <CommonButton
                        bg="torchRed"
                        text="white"
                        borderColor="white"
                        width="reply"
                        height="regist"
                    >
                        Verify
                    </CommonButton>
                </div>
            </form>
        </div>
    )
}