import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import MainContainer from "../layouts/MainContainer";
import VerifyPage from "../pages/VerifyPage";
import WaitingApprovePage from "../pages/WaitingApprovePage";
import RiderHomePage from "../pages/RiderHomePage";

const router = createBrowserRouter([

    {
        path: "/",
        element: (
            <MainContainer />
        ),
        children: [
            { path: "/raider/verify", element: <VerifyPage /> },
            { path: "/raider/waiting", element: <WaitingApprovePage /> },
            { path: "/raider/", element: <RiderHomePage /> },
        ],
    },
])

export default function AppRouter() {
    return <RouterProvider router={router} />;
}