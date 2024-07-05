/* .move-to-top class definition */
// .move-to-top {
//   transform: translateY(-30px);
//   transition: transform 0.4s ease, opacity 0.4s ease;
//   opacity: 1;
// }

import IconSearch from "../icons/IconSearch";

const roundedInputLeft = {
  xxlLeft: 'rounded-l-2xl',
};

const roundedButtonRight = {
  xxlRight: 'rounded-r-2xl',
}

const textColor = {
  black: 'text-black',
  white: 'text-white',
};

export default function InputSearch({ placeholder, onChange, value, name, onClick,
  type = 'text', roundedInput = 'xxlLeft', roundedButton = 'xxlRight', text = 'black' }) {


  return (
    <div className={`relative flex flex-nowrap`}>
      {/* <small className={` text-gray-500 transition-transform top-8 left-2.5 z-20 rounded-lg bg-white px-1 absolute  ${value ? 'move-to-top' : ''}`}>{!value || placeholder}</small> */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-[12px] mb-[18px] w-full px-3 py-1.5 border ${roundedInputLeft[roundedInput]} focus:outline-none focus:ring-2 ${textColor[text]}
        `}
      />
      <div
        role="button"
        onClick={onClick}
        className={`bg-gray-200 flex items-center mt-[12px] mb-[18px] py-1.5 px-3 ${roundedButtonRight[roundedButton]}`}>
        <IconSearch />
      </div>
    </div>
  );
}
