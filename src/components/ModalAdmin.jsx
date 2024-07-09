import { useEffect } from "react";
import { XClose } from "../icons/IconXClose";
import { createPortal } from "react-dom";

export default function ModalAdmin({ children, open, onClose }) {
  useEffect(() => {
    const handlePressEsc = (e) => {
      if (e.keyCode === 27) {
        onClose?.();
      }
    };
    document.addEventListener("keydown", handlePressEsc);
    return () => document.removeEventListener("keydown", handlePressEsc);
  }, [onClose]);

  return (
    <>
      {open ? createPortal (
        <div>
          <div className="fixed inset-0 z-30 bg-gainsboro opacity-80"></div>
          <div
            className="fixed inset-0 z-40 flex justify-evenly items-center min-w-screen flex-col "
            onMouseDown={onClose}
          >
            <div className="flex w-full justify-end px-20">
              <button className="text-right" onClick={onClose}>
                <XClose width="40px" height="40px" />
              </button>
            </div>

            <div
              className="bg-white rounded-lg h-[70%] w-[70%] shadow-2xl"
              // lg:w-[600px]
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div className="w-full h-full">{children}</div>
            </div>
            <button className=" invisible">&#10005;</button>
          </div>
        </div>,
        document.getElementById('modal')
      ) : null}
    </>
  );
}
