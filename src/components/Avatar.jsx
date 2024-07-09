import useAuth from "../hooks/authHook";
import { ImageRider } from "../icons/IconImageRider";

const borderColor = {
  redTouch: "border-[#FF004D]",
  white: "border-white",
};

const sizeAll = {
  default: "w-[150px] h-[150px]",
  full: "w-[100%] h-[100%]",
  90: "w-[90%] h-[90%]",
  aaa: "w-[70px] h-[70px]",
};

export default function Avatar({ border = "redTouch", size = "default" }) {
  const { authUser } = useAuth();

  return (
    <div
      className={`${sizeAll[size]} border-2 rounded-2xl ${borderColor[border]} 
                flex justify-center items-center`}
    >
      {authUser?.profileImage ? (
        <div className="w-[90px] h-[90px]">
          <img src={authUser?.profileImage} alt="profile picture" />
        </div>
      ) : (
        <ImageRider width={"60%"} height={"60%"} />
      )}
    </div>
  );
}
