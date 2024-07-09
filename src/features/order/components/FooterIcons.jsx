import CallIcon from "../../../icons/CallIcon";
import ChatIcon from "../../../icons/ChatIcon";
import AdminIcon from "../../../icons/AdminIcon";

/**
 * แสดงไอคอนในส่วนท้าย
 */
const FooterIcons = ({onClickChat}) => (
  <div className="flex justify-around bg-gray-800 p-4 text-white max-h-[85px] min-h-[85px]">
    <FooterIcon icon={<CallIcon />} />
    <dev  onClick={onClickChat}>  <FooterIcon icon={<ChatIcon  />} /></dev>
    <FooterIcon icon={<AdminIcon />} />
  </div>
);

/**
 * แสดงไอคอนเดี่ยวในส่วนท้ายพร้อมป้ายกำกับ
 * @param {Object} icon - คอมโพเนนต์ไอคอน
 * @param {string} label - ป้ายกำกับสำหรับไอคอน
 */
const FooterIcon = ({ icon, label }) => (
  <div>
    {icon} {label}
  </div>
);

export default FooterIcons;
