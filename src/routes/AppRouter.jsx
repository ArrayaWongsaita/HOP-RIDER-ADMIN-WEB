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
import WaitingCheckPaymentPage from "../pages/WaitingCheckPaymentPage";

import PricePlanPage from "../pages/PricePlanPage";
import RiderOrder from "../pages/RiderOrder";
import SocketIoContextProvider from "../contexts/SocketIoContext";
import AdminMainContainer from "../pages/admin/AdminMainContainer";
import RiderApproval from "../pages/admin/RiderApproval";
import PaymentConfirmation from "../pages/admin/PaymentConfirmation";
import CustomerController from "../pages/admin/CustomerController";
import ProfileSettingPage from "../pages/ProfileSettingPage";
import PricePlanPaymentPage from "../pages/PricePlanPaymentPage";

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
      <SocketIoContextProvider>
        <MainContainer />
      </SocketIoContextProvider>
    ),
    children: [
      { path: "/rider/price", element: <PricePlanPage /> },
      {
        path: "/rider/price/payment/:planId",
        element: <PricePlanPaymentPage />,
      },
      { path: "/rider/order", element: <RiderOrder /> },
      { path: "/rider/order/:routeId", element: <RiderOrder /> },
      {
        path: "/rider/verify",
        element: (
          //   <ProtectedRouteCheckPending>
          <VerifyPage />
          //   </ProtectedRouteCheckPending>
        ),
      },
      {
        path: "/rider/waiting",
        element: (
          //   <ProtectedRouteCheckSubmitted>
          <WaitingApprovePage />
          //   </ProtectedRouteCheckSubmitted>
        ),
      },
      { path: "/rider/profile", element: <ProfileSettingPage /> },
      { path: "/rider/", element: <RiderHomePage /> },
      {
        path: "/rider/waitingCheckPayment",
        element: <WaitingCheckPaymentPage />,
      },
      {
        path: "/rider/",
        element: <ProtectedRouteCheckApproved />,
        children: [{ path: "/rider/", element: <RiderHomePage /> }],
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminMainContainer />,
    children: [
      { path: "/admin/riderApproval", element: <RiderApproval /> },
      { path: "/admin/paymentConfirmation", element: <PaymentConfirmation /> },
      { path: "/admin/customerController", element: <CustomerController /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
