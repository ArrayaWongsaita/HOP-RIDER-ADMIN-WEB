import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { XClose } from "../icons/IconXClose";
import { LogoHopForNav } from "../icons/IconLogoHopForNav";
import { IconMenu } from "../icons/IconMenu";
import useAuth from "../hooks/authHook";
import { Link } from "react-router-dom";

export default function Header() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const menuRef = useRef(null);
  const { logout, authUser, userSlip } = useAuth();
  const navigate = useNavigate();

  // console.log(authUser);
  // console.log(userSlip);

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

  const handleSubscribe = () => {
    navigate("/rider/price")
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
          <Link to="/rider/" >
            <div
              role="button"
              className="logo-container"
            >
              <LogoHopForNav width="74" />
            </div>
          </Link>

          <ul className={click ? "menu active" : "menu"}>
            <li className="menu-linkA w-full " onClick={handleHomeClick}>
              <a href="#">Home</a>
            </li>
            <li className="menu-linkB w-full" onClick={handleSubscribe} >
              <a href="#">{
                userSlip?.numberOfExpirationDays > 1 ? `Remaining ${userSlip.numberOfExpirationDays} days` :
                  userSlip?.numberOfExpirationDays === 1 ? `Remaining ${userSlip.numberOfExpirationDays} day` :
                    "Subscribe now"}
              </a>
            </li>
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
