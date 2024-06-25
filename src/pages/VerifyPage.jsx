import { useState } from "react";
import Input from "../components/Input";
import Section from "../components/Section";
import { ImageRider } from "../icons";

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

    const handleChangeInput = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value })
    };

    return (
        <div>
            <Section >
                <h2>identity verification</h2>
            </Section>
            <div className="flex flex-col items-center gap-6">
                <div className="w-[150px] h-[150px] border-2 rounded-2xl border-[#FF004D] 
                flex justify-center items-center">
                    <ImageRider width={90} height={90} />
                </div>
                <div className="flex items-center gap-5 text-xl text-[#FF004D]">
                    <p role="">Save</p>
                    <p className="text-3xl">|</p>
                    <p>Edit</p>
                    <p className="text-3xl">|</p>
                    <p>Cancel</p>
                </div>
            </div>
            <div className="flex justify-center pt-2">
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
                </div>
            </div>
            <div className="flex justify-center pt-2">
                <hr className="w-[85%] border border-[#FF004D]" />
            </div>
            <div className="">
                <div className="w-[150px] h-[150px] border-2 rounded-2xl border-[#FF004D]">

                </div>
            </div>
        </div>
    )
}