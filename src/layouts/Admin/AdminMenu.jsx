import { NavLink } from "react-router-dom";

const menuList = [
  { id: 1, menuName: "RIDER APPROVE", to: "/admin/riderApproval" },
  { id: 2, menuName: "PAYMENT CONFIRMATION", to: "/admin/paymentConfirmation" },
  { id: 3, menuName: "CUSTOMER CONTROLLER", to: "/admin/customerController" },
];

export default function AdminMenu() {

  return (

    <div className="flex items-center justify-center gap-20 text-[18px] 
     text-white">
      {menuList.map((item) => (
        <NavLink
          key={item.id}
          to={item.to}
          className={({ isActive }) =>
            isActive ? "underline hover:font-bold drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]"
              : "text-white hover:underline hover:font-bold"
          }
        >
          {item.menuName}
        </NavLink>
      ))}
    </div>

  );
}
