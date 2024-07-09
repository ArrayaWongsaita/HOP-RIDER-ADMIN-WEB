import CommonButton from "./CommonButton";

export default function RiderSubscribe() {
  return (
    <div
      className="w-[80%] mx-auto mt-[6px] flex flex-col justify-between items-center px-8 py-3
    text-xl text-white rounded-xl bg-gray-200"
    >
      <div className="grid grid-cols-3">
        <div></div>
        <div></div>
        <div>
          <CommonButton
            bg="torchRed"
            text="white"
            borderColor="white"
            width="reply"
            height="regist"
          >
            Chat
          </CommonButton>
          <CommonButton
            bg="torchRed"
            text="white"
            borderColor="white"
            width="reply"
            height="regist"
          >
            Deny
          </CommonButton>
        </div>
      </div>
    </div>
  );
}
