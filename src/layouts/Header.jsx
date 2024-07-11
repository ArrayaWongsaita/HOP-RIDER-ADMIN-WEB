import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { XClose } from "../icons/IconXClose";
import { LogoHopForNav } from "../icons/IconLogoHopForNav";
import { IconMenu } from "../icons/IconMenu";
import useAuth from "../hooks/authHook";

export default function Header() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const menuRef = useRef(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setClick(false);
    }
  };

  // const handleProfileSettingClick = () => {
  //   navigate("/rider/profile");
  //   setClick(false);
  // };
  const handleHomeClick = () => {
    navigate("/rider");
    setClick(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
    window.location.reload();
  };

  useEffect(() => {
    // เพิ่ม event listener เมื่อ component ถูก mount
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // ลบ event listener เมื่อ component ถูก unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="header z-50">
      <div className="container">
        <div className="header-con">
          <div className="logo-container">
            <LogoHopForNav width="74" />
          </div>

          <ul className={click ? "menu active" : "menu"}>
            <li className="menu-linkA w-full " onClick={handleHomeClick}>
              <a href="#">Home</a>
            </li>
            {/* <li
              className="menu-linkA w-full "
              onClick={handleProfileSettingClick}
            >
              <a href="#">Profile Setting</a>
            </li> */}
            <li className="menu-linkB w-full" onClick={handleLogout}>
              <a href="#">Logout</a>
            </li>
          </ul>

          <div ref={menuRef} className="mobile-menu" onClick={handleClick}>
            {click ? <XClose /> : <IconMenu />}
          </div>
        </div>
      </div>
    </div>
  );
}
