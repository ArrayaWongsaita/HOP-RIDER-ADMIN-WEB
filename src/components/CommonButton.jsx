const bgBtn = {
  torchRed: "bg-torchRed hover:bg-white",
  white: "bg-white hover:bg-torchRed",
};

const textBtn = {
  torchRed: "text-torchRed hover:text-white",
  white: "text-white hover:text-torchRed",
};

const widthBtn = {
  reply: "w-[124px]",
  regist: "w-[138px]",
  send: "w-[82px]",
  accept: "w-[157px]",
  full: "w-full",
};

const heightBtn = {
  reply: "h-[60px]",
  regist: "h-[50px]",
  accept: "h-[63px]",
  full: "h-full",
  mini: "h-[45px]",
};

const borderColorBtn = {
  torchRed: "border-torchRed hover:border-white",
  white: "border-white hover:border-torchRed",
  none: "border-none",
};

const borderWidthBtn = {
  common: "border-2",
  accept: "border-4",
};

const fontSizeBtn = {
  reply: "text-[24px]",
  regist: "text-[16px]",
  accept: "text-[30px]",
};

const needCenter = {
  none: "",
  flexCenter: "flex justify-center items-center",
}

const borderRound = {
  default: "rounded-[14px]",
  10: "rounded-[10px]",
}

export default function CommonButton({
  children,
  bg = "torchRed",
  text = "white",
  width = "reply",
  height = "reply",
  borderColor = "white",
  borderWidth = "common",
  fontSize = "reply",
  align = "none",
  rounded = "default",
}) {
  return (
    <button
      className={`${bgBtn[bg]} ${textBtn[text]} ${widthBtn[width]} ${heightBtn[height]} border ${borderWidthBtn[borderWidth]} ${borderColorBtn[borderColor]} ${borderRound[rounded]} px-1 py-1.5 ${fontSizeBtn[fontSize]} font-semibold ${needCenter[align]}`}
    >
      {children}
    </button>
  );
}
