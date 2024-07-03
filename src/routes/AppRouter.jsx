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
import AdminMainContainer from "../pages/admin/AdminMainContainer";
import RiderApproval from "../pages/admin/RiderApproval";
import PaymentConfirmation from "../pages/admin/PaymentConfirmation";
import CustomerController from "../pages/admin/CustomerController";

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
      { path: "/rider/price", element: <PricePlanPage /> },
      { path: "/rider/order", element: <RiderOrder /> },
      {
        path: "/rider/verify",
        element: (
          <ProtectedRouteCheckPending>
            <VerifyPage />
          </ProtectedRouteCheckPending>
        ),
      },
      {
        path: "/rider/waiting",
        element: (
          <ProtectedRouteCheckSubmitted>
            <WaitingApprovePage />
          </ProtectedRouteCheckSubmitted>
        ),
      },
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
      { path: "/admin/riderApporval", element: <RiderApproval /> },
      { path: "/admin/paymentConfirmation", element: <PaymentConfirmation /> },
      { path: "/admin/customerController", element: <CustomerController /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
