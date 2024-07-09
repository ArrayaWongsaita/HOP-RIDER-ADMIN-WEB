import { useState, useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

import { XClose } from "../icons/IconXClose";
import { LogoHopForNav } from "../icons/IconLogoHopForNav";
import { IconMenu } from "../icons/IconMenu";
import useAuth from "../hooks/authHook";

export default function Header() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const menuRef = useRef(null);
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setClick(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
    window.location.reload();
  };

  return (
    <div className="header">
      <div className="container">
        <div className="header-con">
          <div className="logo-container">
            <LogoHopForNav width="74" />
          </div>

          <ul className={click ? "menu active" : "menu"}>
            <li className="menu-linkA" onClick={closeMobileMenu}>
              <a href="#">Profile Setting</a>
            </li>
            <li className="menu-linkB" onClick={handleLogout}>
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
