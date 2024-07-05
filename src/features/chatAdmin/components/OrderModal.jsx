import { useEffect, useRef } from "react";
import { statusOptions } from "../constants/index"; // เพิ่มการ import statusOptions

const OrderModal = ({
  currentOrder,
  profileData,
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeOrderModal();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeOrderModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeOrderModal]);

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
          onClick={closeOrderModal}
        >
          X
        </button>
        <h2 className="text-lg font-semibold mb-4">Order Details</h2>
        <div className="mb-4">
          <h3 className="font-semibold">Rider:</h3>
          <div className="flex items-center">
            <img
              src={profileData.rider[currentOrder.riderId].profileImg}
              alt="Profile"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>{`${profileData.rider[currentOrder.riderId].firstName} ${
              profileData.rider[currentOrder.riderId].lastName
            }`}</div>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Customer:</h3>
          <div className="flex items-center">
            <img
              src={profileData.customer[currentOrder.customerId].profileImg}
              alt="Profile"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>{`${profileData.customer[currentOrder.customerId].firstName} ${
              profileData.customer[currentOrder.customerId].lastName
            }`}</div>
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
                <button
                  className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
                  onClick={handleStatusChangeCancel}
                >
                  No
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  onClick={handleStatusChangeConfirm}
                >
                  Yes
                </button>
              </>
            ) : (
              <>
                <button
                  className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
                  onClick={handleStatusChangeCancel}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  onClick={() => setConfirmStatusChange(true)}
                >
                  Confirm
                </button>
              </>
            )
          ) : (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => setEditingStatus(true)}
            >
              Edit Status
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
