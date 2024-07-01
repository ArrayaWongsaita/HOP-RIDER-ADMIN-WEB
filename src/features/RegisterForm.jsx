import { useState } from "react";
import { AxiosError } from "axios";

import registerValidate from "../validators/register-validate";
import Input from "../components/Input";
import CommonButton from "../components/CommonButton";
import authApi from "../apis/authApi";
import RegisterModal from "../components/RegisterModal";


const initialInput = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
};

const initialInputError = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
};

export default function RegisterForm({ onCloseModal }) {
    const [input, setInput] = useState(initialInput);
    const [inputError, setInputError] = useState(initialInputError);
    const [showModal, setShowModal] = useState(false); // เพิ่ม state สำหรับ modal

    const handleChangeInput = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value })
    };

    const handleSubmitForm = async (event) => {
        try {
            event.preventDefault();
            const error = registerValidate(input);
            console.log(error)
            if (error) return setInputError(error);
            setInputError(initialInputError);
            console.log('Register Success!!');

            await authApi.register(input);

            setShowModal(true); // แสดง modal เมื่อสมัครสมาชิกสำเร็จ

        } catch (err) {
            console.log(err)
            if (err instanceof AxiosError) {
                if (err.response.data.field === 'email')
                    setInputError(prev => ({
                        ...prev,
                        email: 'Email already in use.'
                    }));
            }
            if (err instanceof AxiosError) {
                if (err.response.data.field === 'phone')
                    setInputError(prev => ({
                        ...prev,
                        phone: 'Phone number already in use.'
                    }));
            }
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmitForm} >
                <div className="grid grid-cols-2 gap-2">
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
                    <div className="col-span-2" >
                        <Input
                            type="password"
                            placeholder={"Password"}
                            name="password"
                            value={input.password}
                            onChange={handleChangeInput}
                            error={inputError.password}
                        />
                    </div>
                    <div className="col-span-2" >
                        <Input
                            type="password"
                            placeholder={"Confirm Password"}
                            name="confirmPassword"
                            value={input.confirmPassword}
                            onChange={handleChangeInput}
                            error={inputError.confirmPassword}
                        />
                    </div>
                </div>
                <div className="flex justify-center py-4">
                    <CommonButton >
                        Register
                    </CommonButton>
                </div>
            </form>
            <RegisterModal
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                    onCloseModal(); // ปิด modal และเรียกฟังก์ชัน onCloseModal เพื่อแสดง LoginForm
                }}
                message="Register Success! Please login."
            />
        </div>
    )
}