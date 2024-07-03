import { Outlet } from "react-router-dom";
import AdminHeader from "../../layouts/Admin/AdminHeader";

export default function MainContainer() {
  return (
    <>
      <AdminHeader />

      <Outlet />
    </>
  );
}
