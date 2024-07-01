import CommonButton from "../../../components/CommonButton";

/**
 * ปุ่มนำทาง
 * @param {function} onClick - ฟังก์ชันจัดการคลิกของปุ่ม
 */
const NavigationButton = ({ onClick }) => (
  <div className="relative">
    <div className="absolute w-full flex items-center justify-center min-h-[80px] top-[-120px]">
      <CommonButton onClick={onClick}>นำทาง</CommonButton>
    </div>
  </div>
);

export default NavigationButton;
