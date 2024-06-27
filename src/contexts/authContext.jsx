import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

import authApi from "../apis/authApi";
import { setAccessToken, getAccessToken, removeAccessToken } from "../utils/local-storage";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [authUser, setAuthUser] = useState(null);
    const [isAuthUserLoading, setIsCustomerUserLoading] = useState(true);

    useEffect(() => {
        customerLogin();
    }, []);

    const customerLogin = async () => {
        try {
            if (getAccessToken()) {
                const res = await authApi.getCustomerUser();
                setAuthUser(res.data.user);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsCustomerUserLoading(false);
        }
    };

    const login = async credentials => {
        const res = await authApi.login(credentials);
        setAccessToken(res.data.accessToken);
        const resGetCustomerUser = await authApi.getCustomerUser();
        setAuthUser(resGetCustomerUser.data.user);
    };

    const logout = () => {
        removeAccessToken();
        setAuthUser(null);
    };


    const value = {
        authUser,
        isAuthUserLoading,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}