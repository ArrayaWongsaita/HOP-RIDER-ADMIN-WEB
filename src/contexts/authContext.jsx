import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

import authApi from "../apis/authApi";
import { setAccessToken, getAccessToken, removeAccessToken } from "../utils/local-storage";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [authUser, setAuthUser] = useState(null);
    const [userSlip, setUserSlip] = useState(null);
    const [isAuthUserLoading, setIsAuthUserLoading] = useState(true);

    useEffect(() => {
        authLogin();
    }, []);

    const authLogin = async () => {
        try {
            if (getAccessToken()) {
                const res = await authApi.getAuthUser();
                const subscribe = await authApi.getSlip();
                console.log(res);
                console.log(subscribe);
                setAuthUser(res.data.user);
                setUserSlip(subscribe.data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsAuthUserLoading(false);
        }
    };

    const login = async credentials => {
        const res = await authApi.login(credentials);
        setAccessToken(res.data.accessToken);
        const resGetAuthUser = await authApi.getAuthUser();
        setAuthUser(resGetAuthUser.data.user);
    };

    const logout = () => {
        removeAccessToken();
        setAuthUser(null);
    };


    const value = {
        authUser,
        userSlip,
        setAuthUser,
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