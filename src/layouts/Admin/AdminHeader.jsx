import { IconLogoHop } from "../../icons/IconLogoHop";
import { Link } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import { IconMenu } from "../../icons/IconMenu";
import { LogoHopForNav } from "../../icons/IconLogoHopForNav";
import { useState } from "react";

export default function AdminHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className=" relative flex justify-between items-center shadow-md px-4 bg-none max-h-[50px]">
      <div>
        <Link to="/admin">
          <LogoHopForNav width="50" />
        </Link>
      </div>
      <div>
        <AdminMenu />
      </div>
      <div onClick={() => setOpen((prev) => !prev)} role="button">
        <IconMenu />
      </div>
      {open && (
        <div className=" absolute bg-gradient-to-r from-[#1D2B53] from-30% to-[#FF004D] to-100%  w-[20%] h-[190px] right-0 top-12 z-40 flex justify-center items-center flex-col ">
          <div
            role="button"
            className="h-[50px] w-[100%] bg-transparent text-white font-bold text-[20px] text-right px-8 hover:underline flex justify-end items-end "
          >
            Profile Setting
          </div>
          <div
            role="button"
            className="h-[50px] w-[100%] bg-transparent text-white font-bold text-[20px] text-right px-8 hover:underline flex justify-end items-end"
          >
            Chat
          </div>
          <div
            role="button"
            className="h-[50px] w-[100%] bg-transparent text-white font-bold text-[20px] text-right px-8 hover:underline flex justify-end items-end"
          >
            Logout
          </div>
        </div>
      )}
    </header>
  );
}
