import { useLocation } from "react-router-dom";
import AdminMenuItem from "./AdminMenuItem";

const menuList = [
  { id: 1, menuName: "RIDER APPROVE", to: "/admin/riderApporval" },
  { id: 2, menuName: "PAYMENT CONFIRMATION", to: "/admin/paymentConfirmation" },
  { id: 3, menuName: "CUSTOMER CONTROLLER", to: "/admin/customerController" },
];

export default function AdminMenu() {
  const { pathname } = useLocation();
  return (
    <nav className="flex items-center justify-center gap-20 text-[20px] saralaB">
      {menuList.map((el) => (
        <AdminMenuItem
          key={el.id}
          menuName={el.menuName}
          to={el.to}
          active={pathname === el.to}
        />
      ))}
    </nav>
  );
}
