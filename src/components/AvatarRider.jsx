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
  aaa: "w-[80px] h-[80px]",
};

export default function AvatarRider({ border = "redTouch", size = "default", srcImage }) {
  const { authUser } = useAuth();

  return (
    <div
      className={`${sizeAll[size]} border-2 rounded-2xl ${borderColor[border]} 
                flex justify-center items-center overflow-hidden`}
    >
      {srcImage ? (
        <div className="w-full h-full ">
          <img src={srcImage} alt="profile picture" className="w-full h-full object-cover" />
        </div>
      ) : (
        <ImageRider width={"60%"} height={"60%"} />
      )
      }
    </div >
  );
}
