import CommonButton from "../../../components/CommonButton";

/**
 * แสดงรายละเอียดค่าโดยสาร
 * @param {Object} order - ข้อมูล order
 * @param {string} buttonText - ข้อความของปุ่มหลัก
 * @param {function} onClick - ฟังก์ชันจัดการคลิกของปุ่มหลัก
 */
const FareDetails = ({ order, buttonText, onClick }) => (
  <div className="w-full flex items-center justify-center min-h-[80px] p-4 border-white text-white border-[2px]">
    <div className="w-full flex flex-col">
      <FareDetailLine label="Fare" value={`${order.fare} THB.`} />
      <FareDetailLine label="Distance" value={`${order.distanceInKm} Km.`} />
    </div>
    <div className="flex items-center w-full">
      <CommonButton onClick={onClick} width="riderStatus">
        {buttonText}
      </CommonButton>
    </div>
  </div>
);

/**
 * แสดงบรรทัดรายละเอียดค่าโดยสาร
 * @param {string} label - ป้ายของรายละเอียดค่าโดยสาร
 * @param {string} value - ค่าของรายละเอียดค่าโดยสาร
 */
const FareDetailLine = ({ label, value }) => (
  <div className="flex w-full">
    <div className="min-w-[80px]">{label}: </div>
    <div>{value}</div>
  </div>
);

export default FareDetails;
