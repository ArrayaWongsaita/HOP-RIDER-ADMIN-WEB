import AdminHeader from "../../layouts/Admin/AdminHeader";
import { Outlet } from "react-router-dom";

export default function MainContainer() {
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  )
}
