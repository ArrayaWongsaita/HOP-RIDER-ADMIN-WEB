import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import MainContainer from "../layouts/MainContainer";
import VerifyPage from "../pages/VerifyPage";
import WaitingApprovePage from "../pages/WaitingApprovePage";
import RiderHomePage from "../pages/RiderHomePage";
import RegisterAndLoginPage from "../pages/RegisterAndLoginPage";
import ProtectedRouteCheckPending from "../features/ProtectRouteCheckPending";
import ProtectedRouteCheckSubmitted from "../features/ProtectRouteCheckSubmitted";
import ProtectedRouteCheckApproved from "../features/ProtectRouteCheckApproved";

const router = createBrowserRouter([
    {
        path: "/auth/login",
        element: (
            <div className="w-lvw h-lvh bg-black flex justify-center">
                <RegisterAndLoginPage />
            </div>
        ),
    },
    {
        path: "/",
        element: (
            <MainContainer />
        ),
        children: [
            { path: "/rider/verify", element: <ProtectedRouteCheckPending><VerifyPage /></ProtectedRouteCheckPending> },
            { path: "/rider/waiting", element: <ProtectedRouteCheckSubmitted><WaitingApprovePage /></ProtectedRouteCheckSubmitted> },
            {
                path: "/rider/", element: <ProtectedRouteCheckApproved />,
                children: [
                    { path: "/rider/", element: <RiderHomePage /> },
                ]
            },
        ],
    },
])

export default function AppRouter() {
    return <RouterProvider router={router} />;
}