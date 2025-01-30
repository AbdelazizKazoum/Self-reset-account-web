/* eslint-disable react/prop-types */
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const ImageButton = ({ value, onclick }) => {
  return (
    <div className="flex justify-center m-10">
      <button
        className="flex select-none items-center gap-3 rounded-lg border border-cyan-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-cyan-900 transition-all hover:opacity-75 focus:ring  active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        data-ripple-dark="true"
        onClick={onclick}
      >
        <MdOutlineKeyboardBackspace className="text-[20px]" />

        {value}
      </button>
      {/* <button
        className="flex border-pink-500 select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-cyan-900 transition-all hover:bg-cyan-900/10 active:bg-cyan-900/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        data-ripple-dark="true"
      >
        <MdOutlineKeyboardBackspace className="text-[20px]" />
        {value}
      </button> */}
    </div>
  );
};

export default ImageButton;
