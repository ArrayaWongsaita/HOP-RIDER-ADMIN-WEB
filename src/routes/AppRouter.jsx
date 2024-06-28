import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import MainContainer from "../layouts/MainContainer";
import VerifyPage from "../pages/VerifyPage";
import WaitingApprovePage from "../pages/WaitingApprovePage";
import RiderHomePage from "../pages/RiderHomePage";
import RegisterAndLoginPage from "../pages/RegisterAndLoginPage";
import RiderOrder from "../pages/RiderOrder";

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
    element: <MainContainer />,
    children: [
      { path: "/rider/verify", element: <VerifyPage /> },
      { path: "/rider/order", element: <RiderOrder /> },
      { path: "/rider/waiting", element: <WaitingApprovePage /> },
      { path: "/rider/", element: <RiderHomePage /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
