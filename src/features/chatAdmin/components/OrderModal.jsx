import { useEffect, useRef, useCallback } from "react";
import { statusOptions } from "../constants/index"; // เพิ่มการ import statusOptions
import CommonButton from "../../../components/CommonButton";
import { IconPersonImg } from "../../../icons/IconPersonImg"; // เพิ่มการ import ไอคอน
import { ImageRider } from "../../../icons/IconImageRider"; // เพิ่มการ import ไอคอน

const OrderModal = ({
  currentOrder,
  editingStatus,
  selectedStatus,
  setEditingStatus,
  setSelectedStatus,
  setConfirmStatusChange,
  handleStatusChangeConfirm,
  handleStatusChangeCancel,
  confirmStatusChange,
  closeOrderModal,
}) => {
  const modalRef = useRef(null);

  const closeModal = useCallback(() => {
    setEditingStatus(false);
    closeOrderModal();
  }, [setEditingStatus, closeOrderModal]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  useEffect(() => {
    if (currentOrder) {
      setSelectedStatus(currentOrder.status);
    }
  }, [currentOrder, setSelectedStatus]);

  useEffect(() => {
    // เพิ่ม useEffect นี้เพื่ออัพเดต currentOrder.status เมื่อ selectedStatus เปลี่ยนแปลง
    if (currentOrder && selectedStatus !== currentOrder.status) {
      currentOrder.status = selectedStatus;
    }
  }, [selectedStatus, currentOrder]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-[800px] relative"
        ref={modalRef}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={closeModal}
        >
          X
        </button>
        <h2 className="text-lg font-semibold mb-4">Order Details</h2>
        <div className="mb-4">
          <h3 className="font-semibold">Rider:</h3>
          <div className="flex items-center">
            {currentOrder?.rider?.profileImage ? (
              <img
                src={currentOrder?.rider?.profileImage}
                alt="Profile"
                className="w-16 h-16 rounded-xl mr-4"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center border-[#ff004d] border-2 rounded-xl mr-4">
                <ImageRider />
              </div>
            )}
            <div>
              <div>{`${currentOrder?.rider?.firstName} ${currentOrder?.rider?.lastName}`}</div>
              <div>Phone : {currentOrder?.rider?.phone}</div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Customer:</h3>
          <div className="flex items-center">
            <div className="flex h-16 w-16 items-center justify-center border-[#ff004d] border-2 rounded-xl mr-4">
              <IconPersonImg />
            </div>
            <div>
              <div>{`${currentOrder?.customer.firstName} ${currentOrder?.customer.lastName}`}</div>
              <div>Phone : {currentOrder?.customer?.phone}</div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Status:</h3>
          {editingStatus ? (
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border p-2 rounded-lg w-full"
            >
              {statusOptions.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          ) : (
            <div>
              {selectedStatus}
            </div> /* เปลี่ยน currentOrder.status เป็น selectedStatus */
          )}
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Pickup Location:</h3>
          <div>{currentOrder.pickupPlace}</div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Delivery Location:</h3>
          <div>{currentOrder.desPlace}</div>
        </div>
        <div className="flex justify-end">
          {editingStatus ? (
            confirmStatusChange ? (
              <>
                <CommonButton onClick={handleStatusChangeCancel}>
                  No
                </CommonButton>
                <CommonButton onClick={handleStatusChangeConfirm}>
                  Yes
                </CommonButton>
              </>
            ) : (
              <>
                <CommonButton onClick={handleStatusChangeCancel}>
                  Cancel
                </CommonButton>
                <CommonButton onClick={() => setConfirmStatusChange(true)}>
                  Confirm
                </CommonButton>
              </>
            )
          ) : (
            <CommonButton onClick={() => setEditingStatus(true)} width="100px">
              Edit Status
            </CommonButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
