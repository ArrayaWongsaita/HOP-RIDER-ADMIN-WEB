import { Outlet } from "react-router-dom";
import AdminHeader from "../../layouts/Admin/AdminHeader";

export default function MainContainer() {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
