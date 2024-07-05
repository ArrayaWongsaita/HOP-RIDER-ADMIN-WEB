import { useEffect, useRef } from "react";

const EndChatModal = ({ closeModal, confirmEndChat }) => {
  const modalRef = useRef(null);

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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg relative"
        ref={modalRef}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={closeModal}
        >
          X
        </button>
        <h2 className="text-lg font-semibold mb-4">ยืนยันการจบการสนทนา</h2>
        <p className="mb-4">คุณต้องการจบการสนทนานี้หรือไม่?</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
            onClick={closeModal}
          >
            ยกเลิก
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
            onClick={confirmEndChat}
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndChatModal;
