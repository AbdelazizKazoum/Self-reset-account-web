/* eslint-disable react/prop-types */
import { BsCheckLg } from "react-icons/bs";
import { PiClipboardTextLight } from "react-icons/pi";

const ToustButton = ({ value, message, isCopied, onclick }) => {
  return (
    <div className="flex relative justify-center">
      <button
        data-tooltip-target="tooltip-click"
        data-tooltip-trigger="click"
        type="button"
        onClick={onclick}
        className="mt-3 flex select-none justify-center items-center  gap-3  py-2 px-6 bg-cyan-900  text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900"
      >
        <PiClipboardTextLight className="text-[20px]" />

        {value}
      </button>
      {isCopied && (
        <div
          id="tooltip-click"
          role="tooltip"
          className="absolute flex justify-center items-center gap-1 z-10 bottom-11  opacity-60  inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm  tooltip"
        >
          {message}
          <BsCheckLg />

          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      )}
    </div>
  );
};

export default ToustButton;
