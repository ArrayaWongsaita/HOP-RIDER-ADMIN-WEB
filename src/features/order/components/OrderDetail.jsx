import { IconRoutePickup } from "../../../icons/IconRoutePickup";
import { IconRouteStart } from "../../../icons/IconRouteStart";

/**
 * แสดงรายละเอียด order
 * @param {Object} order - ข้อมูล order
 * @param {number} step - ขั้นตอนของ order
 */
const OrderDetails = ({ order, step }) => (
  <div className="p-4 m-4 rounded-lg shadow-lg min-h-[150px] flex border-white text-white border-[2px]">
    <div className="flex items-center justify-center h-full">
      {step >= 2 ? <IconRoutePickup /> : <IconRouteStart />}{" "}
      {/* ตรวจสอบเงื่อนไขและแสดงไอคอน */}
    </div>
    <div className="flex flex-col justify-between w-full ml-2">
      <OrderDetailLine description="Your Location" />
      <OrderDetailLine description={order.locationA.description} />
      <OrderDetailLine description={order.locationB.description} />
    </div>
  </div>
);

/**
 * แสดงบรรทัดรายละเอียด order
 * @param {string} description - คำอธิบายของรายละเอียด order
 */
const OrderDetailLine = ({ description }) => (
  <div className="border-b-2 max-w-[320px] min-w-[320px]">
    <p className="w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
      {description}
    </p>
  </div>
);

export default OrderDetails;
