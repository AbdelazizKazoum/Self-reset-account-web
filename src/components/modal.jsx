/* eslint-disable react/prop-types */
import { BiErrorCircle } from "react-icons/bi";

const Modal = ({ message, value, isOpen, onClose }) => {
  return (
    <>
      <div
        id="popup-modal"
        tabIndex="-1"
        className={`fixed ${
          isOpen ? "" : "hidden"
        } top-0 left-0 right-0 z-50 flex justify-center items-center  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="z-0 absolute w-full h-full bg-gray-500/25 backdrop-blur-sm"></div>

        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow ">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
              data-modal-hide="popup-modal"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only"></span>
            </button>
            <div className="p-6 text-center">
              <BiErrorCircle className="mx-auto mb-4 text-red-500 w-12 h-12 " />

              <h3 className="mb-5 text-lg font-normal text-gray-600">
                {message}
              </h3>

              <button
                onClick={onClose}
                data-modal-hide="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
              >
                {value}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
