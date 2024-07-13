// import { Link, useNavigate } from "react-router-dom";
// import AdminMenu from "./AdminMenu";
// import { IconMenu } from "../../icons/IconMenu";
// import { useEffect, useRef, useState } from "react";
// import { LogoHopForNav } from "../../icons/IconLogoHopForNav";

// // Component สำหรับแสดง notification ในรูปวงกลมสีแดง
// export function CircleNoti({ width, height }) {
//   return <div className={`rounded-full bg-torchRed ${width} ${height}`}></div>;
// }

// export default function AdminHeader() {
//   const [openDropdown, setOpenDropdown] = useState(false); // แก้ชื่อ state เป็น openDropdown
//   const [hasNotification, setHasNotification] = useState(true);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   const toggleDropdown = () => {
//     setOpenDropdown(!openDropdown); // ใช้ setOpenDropdown สำหรับการเปลี่ยนสถานะของ openDropdown
//   };

//   const handleClickOutside = (e) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//       setOpenDropdown(false); // ใช้ setOpenDropdown สำหรับการปิด dropdown
//     }
//   };

//   const handleChatClick = () => {
//     navigate("/admin/chat"); // Navigate ไปที่ /admin/chat
//     setOpenDropdown(false);
//   };

//   const handleLogout = () => {
//     navigate("/auth/login");
//     window.location.reload();
//   };

//   return (
//     <header className="flex justify-between items-center shadow-md bg-none px-20">
//       <div>
//         <Link to="/admin" className="flex justify-center items-center">
//           <LogoHopForNav width="120" />
//         </Link>
//       </div>
//       <div className="flex gap-20">
//         <div>
//           <AdminMenu />
//         </div>
//       </div>
//       <div ref={dropdownRef} className="flex flex-col items-end">
//         <div role="button" className="relative flex" onClick={toggleDropdown}>
//           {" "}
//           {/* แก้ให้ใช้ฟังก์ชัน toggleDropdown */}
//           <IconMenu />
//           <div className="absolute left-7 bottom-1">
//             {hasNotification && (
//               <div className="relative flex justify-center items-center text-[15px]">
//                 <CircleNoti width="w-[30px]" height="h-[30px]" />
//                 <span className="text-white absolute">20</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {openDropdown && ( // ใช้ openDropdown สำหรับการแสดง dropdown
//         <div
//           className="absolute bg-white right-0 top-28 z-40  w-[200px] flex justify-center items-center flex-col
//         bg-gradient-to-r from-[#1D2B53] from-15% to-[#FF004D] to-100%
//         "
//         >
//           <div
//             role="button"
//             onClick={handleChatClick} // เพิ่ม onClick สำหรับการ navigate ไปที่ /admin/chat
//             className="relative h-[50px] w-[100%] bg-transparent text-white font-bold text-[20px] text-right px-8 hover:underline flex justify-center items-center "
//           >
//             Chat
//             {hasNotification && (
//               <div className="relative flex justify-center items-center text-[15px] right-20">
//                 <CircleNoti width="w-[30px]" height="h-[30px]" />
//                 <span className="text-white absolute">20</span>
//               </div>
//             )}
//           </div>
//           <div
//             role="button"
//             className="h-[50px] w-[100%] bg-transparent text-white font-bold text-[20px] text-right px-8 hover:underline flex justify-center items-center"
//             onClick={handleLogout}
//           >
//             Logout
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

import { Link, useNavigate } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import { IconMenu } from "../../icons/IconMenu";
import { useEffect, useRef, useState } from "react";
import { LogoHopForNav } from "../../icons/IconLogoHopForNav";

// Component สำหรับแสดง notification ในรูปวงกลมสีแดง
export function CircleNoti({ width, height }) {
  return <div className={`rounded-full bg-torchRed ${width} ${height}`}></div>;
}

export default function AdminHeader() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpenDropdown(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => handleClickOutside(e);
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleChatClick = () => {
    navigate("/admin/chat");
    setOpenDropdown(false);
  };

  const handleLogout = () => {
    navigate("/auth/login");
    window.location.reload();
  };

  return (
    <header className="flex justify-between items-center shadow-md bg-none px-20">
      <div>
        <Link to="/admin" className="flex justify-center items-center">
          <LogoHopForNav width="120" />
        </Link>
      </div>
      <div className="flex gap-20">
        <div>
          <AdminMenu />
        </div>
      </div>
      <div ref={dropdownRef} className="flex flex-col items-end">
        <div role="button" className="relative flex" onClick={toggleDropdown}>
          <IconMenu />
          <div className="absolute left-7 bottom-1">
          </div>
        </div>
        {openDropdown && (
          <div
            className="absolute bg-white right-0 top-12  w-[200px] flex justify-center items-center flex-col 
            bg-gradient-to-r from-[#1D2B53] from-15% to-[#FF004D] to-100% z-50"
          >
            <div
              role="button"
              onClick={handleChatClick}
              className="relative h-[50px] w-[100%] bg-transparent text-white font-bold text-[20px] text-right px-8 hover:underline flex justify-center items-center"
            >
              Chat
            </div>
            <div
              role="button"
              className="h-[50px] w-[100%] bg-transparent text-white font-bold text-[20px] text-right px-8 hover:underline flex justify-center items-center"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
