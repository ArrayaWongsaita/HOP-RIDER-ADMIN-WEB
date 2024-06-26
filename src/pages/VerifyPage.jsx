import { useState } from "react";
import Input from "../components/Input";
import Section from "../components/Section";
import { ImageRider, ImportImage } from "../icons";
import Textarea from "../components/Textarea";
import CommonButton from "../components/CommonButton";
import InputImage from "../components/InputImage";

const initialInput = {
    firstName: '',
    lastName: '',
    idCard: '',
    email: '',
    phone: '',
};

const initialInputError = {
    firstName: '',
    lastName: '',
    idCard: '',
    email: '',
    phone: '',
};

export default function VerifyPage() {
    const [input, setInput] = useState(initialInput);
    const [inputError, setInputError] = useState(initialInputError);
    const [profileImage, setProfileImage] = useState({});

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
        setProfileImage({ ...profileImage, 'licenseImage': file });
    };

    const handelImageVehicle = (file) => {
        console.log(file);
        setProfileImage({ ...profileImage, 'licenseImage': file });
    };


    console.log(profileImage)

    return (
        <div>
            <Section >
                <h2>identity verification</h2>
            </Section>
            <div className="flex flex-col items-center gap-6">
                <div className="rounded-2xl overflow-hidden">
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

            <div className="flex justify-center ">
                <div className="grid grid-cols-2 gap-2 w-[80%]">
                    <div>
                        <Input
                            placeholder={"First name"}
                            name="firstName"
                            value={input.firstName}
                            onChange={handleChangeInput}
                            error={inputError.firstName}
                        />
                    </div>
                    <div>
                        <Input
                            placeholder={"Last name"}
                            name="lastName"
                            value={input.lastName}
                            onChange={handleChangeInput}
                            error={inputError.lastName}
                        />
                    </div>
                    <div className="col-span-2">
                        <Input
                            placeholder="Birth Date"
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
                    <div className="col-span-2" >
                        <Input
                            placeholder={"Email Address"}
                            name="email"
                            value={input.email}
                            onChange={handleChangeInput}
                            error={inputError.email}
                        />
                    </div>
                    <div className="col-span-2" >
                        <Input
                            placeholder={"Phone number"}
                            name="phone"
                            value={input.phone}
                            onChange={handleChangeInput}
                            error={inputError.phone}
                        />
                    </div>
                    <div className="col-span-2">
                        <Textarea
                            placeholder={"Address"}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-center pt-2">
                <hr className="w-[85%] border border-[#FF004D]" />
            </div>

            <div className="flex flex-col justify-center items-center py-6">
                <div className="rounded-2xl overflow-hidden">
                    <InputImage
                        width="250px"
                        aspectRatio="1/1"
                        onClick={handelImageLicense}>
                        <div className="w-[250px] h-[250px] border-2 rounded-2xl border-[#FF004D] flex justify-center items-center">
                            <ImportImage />
                        </div>
                    </InputImage>
                </div>
                <div className="text-[#FFFFFF] mt-5 p-2 rounded-2xl bg-[#FF004D]" >
                    <p>+ upload your driver&apos;s license here</p>
                </div>
            </div>

            <div className="flex justify-center">
                <hr className="w-[85%] border border-[#FF004D]" />
            </div>

            <div className="flex flex-col justify-center items-center py-6">
                <div className="rounded-2xl overflow-hidden">
                    <InputImage
                        width="250px"
                        aspectRatio="1/1"
                        onClick={handelImageVehicleRegistration}>
                        <div className="w-[250px] h-[250px] border-2 rounded-2xl border-[#FF004D] flex justify-center items-center">
                            <ImportImage />
                        </div>
                    </InputImage>
                </div>
                <div className="text-[#FFFFFF] mt-5 p-2 rounded-2xl bg-[#FF004D]" >
                    <p>+ upload your vehicle registration copy here</p>
                </div>
            </div>

            <div className="flex justify-center">
                <hr className="w-[85%] border border-[#FF004D]" />
            </div>

            <div className="flex flex-col justify-center items-center py-6">
                <div className="rounded-2xl overflow-hidden">
                    <InputImage
                        width="250px"
                        aspectRatio="1/1"
                        onClick={handelImageVehicle}>
                        <div className="w-[250px] h-[250px] border-2 rounded-2xl border-[#FF004D] flex justify-center items-center">
                            <ImportImage />
                        </div>
                    </InputImage>
                </div>
                <div className="text-[#FFFFFF] mt-5 p-2 rounded-2xl bg-[#FF004D]" >
                    <p>+ upload your picture of your vehicle here</p>
                </div>
            </div>

            <div className="flex justify-center">
                <hr className="w-[85%] border border-[#FF004D]" />
            </div>

            <div className="text-white w-full text-sm flex flex-col items-center gap-4 py-4">
                <p>Clean criminal record.</p>
                <p>Certify that the above information is true.</p>
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
        </div>
    )
}