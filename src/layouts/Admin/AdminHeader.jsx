import { IconLogoHop } from "../../icons/IconLogoHop";
import { Link } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import { IconMenu } from "../../icons/IconMenu";
import { useEffect, useRef, useState } from "react";

export function CircleNoti({ width, height }) {
  return <div className={`rounded-full bg-torchRed ${width} ${height}`}></div>;
}

export default function AdminHeader() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpenDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex justify-between items-center shadow-md  bg-none px-20">
      <div>
        <Link to="/admin">
          <IconLogoHop />
        </Link>
      </div>
      <div className="flex gap-20">
        <div>
          <AdminMenu />
        </div>
        <div
          ref={dropdownRef}
          onClick={toggleDropdown}
          className="flex flex-col items-end"
        >
          <div className=" relative flex">
            <IconMenu />
            <div className="absolute left-7 bottom-1">
              {hasNotification && (
                <div className="relative flex justify-center items-center text-[15px]">
                  <CircleNoti width="w-[30px]" height="h-[30px]" />
                  <span className="text-white absolute">20</span>
                </div>
              )}
            </div>
          </div>
          {openDropdown && (
            <ul className=" absolute right-15 top-[6.5rem] text-white  bg-gradient-to-r from-torchRed from from-0% to-luckyPoint to-50%   p-4 rounded-md space-y-3 text-right  text-[18px]">
              <li>
                <a href="">Profile Setting</a>
              </li>
              <li className="flex justify-end gap-2">
                <div className="flex items-center">
                  <CircleNoti width="w-[15px]" height="h-[15px]" />
                </div>
                <a href="/admin/chat">Chat</a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
