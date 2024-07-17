import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/authHook";

export default function ProtectedRouteCheckPending({ children }) {
    const { authUser, isAuthUserLoading } = useAuth();
    console.log(authUser)

    const navigate = useNavigate();

    if (!authUser && !isAuthUserLoading) return navigate("/auth/login");

    if (authUser?.status === "SUBMITTED") {
        navigate('/rider/waiting')
    }

    if (authUser?.status === "APPROVED") {
        navigate('/rider/')
    }
    return (
        <>
            {isAuthUserLoading ? <h1>Loading AuthUserLoading</h1> : children}
        </>
    );
}