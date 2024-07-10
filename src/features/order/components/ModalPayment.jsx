import { motion, AnimatePresence } from "framer-motion";
import CommonButton from "../../../components/CommonButton";
import { IconLogoHop } from "../../../icons/IconLogoHop";
import { useNavigate } from "react-router-dom"; // เพิ่มการนำเข้า useNavigate
import { GiReceiveMoney } from "react-icons/gi";

const ModalPayment = ({ onClose, isOpen, fare }) => {
  const navigate = useNavigate(); // ใช้ useNavigate

  // ฟังก์ชันสำหรับปิดโมดอล
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    console.log("status=6");
    navigate("/rider"); // navigate ไปที่ /rider
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-[#516293] from-0% to-[#1D2B53] to-100%"></div>
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <motion.div
              className="p-4 rounded-2xl border-[4px] min-w-full min-h-[60%] m-16 flex flex-col items-center justify-between text-white"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8, transition: { duration: 0.2 } }}
            >
              <div className="flex flex-col min-h-[600px] w-full justify-around">
                <div className="flex w-full items-center justify-center">
                  <IconLogoHop />
                </div>

                <div className="flex w-full items-center justify-center ">
                  <div>Fare</div>
                </div>
                <div className="flex w-full items-center justify-center gap-2 ">
                  <div className=" text-[#ff004d] ">
                    <GiReceiveMoney className="w-8 h-8" />
                  </div>
                  <div>{`${fare} THB`}</div>
                </div>

                <div className="flex justify-around w-full">
                  <CommonButton onClick={handleClose}>Ok</CommonButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalPayment;
