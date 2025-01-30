//-------------------- Imports --------------------------------
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { BiShowAlt } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import ImageButton from "../components/imageButton";
import ToustButton from "../components/toustButton";
//-------------------------------------------------------------
const SuccessPage = () => {
  //------------------------ STATES ----------------------------
  const location = useLocation();
  const navigate = useNavigate();
  const [open, isOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  //------------------------ Methods ---------------------------
  const toggleMotPass = () => {
    setShow(!show);
  };
  function toggleCopy() {
    setIsCopied(!isCopied);
  }
  const redirect = () => {
    window.history.replaceState({}, document.title);
    navigate("/");
  };
  function copyPassword() {
    navigator.clipboard.writeText(location.state.password);
    toggleCopy();
  }
  //---------------------- Life sycle hooks --------------------
  //Onloading
  useEffect(() => {
    if (location.state) {
      isOpen(true);
    } else {
      navigate("/");
    }
  }, []);
  // When user clicks on the copy button toust message will be shown for 3 sec
  useEffect(() => {
    clearTimeout();
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  }, [isCopied]);
  //-------------------------------------------------------- JSX ----------------------------------------------------------------
  return (
    <div className="  overflow-y-auto overflow-x-hidden h-screen flex justify-center items-center ">
      {open && (
        <div className="relative p-4 w-full max-w-xl  h-auto">
          <img
            src="/images/Logo.svg"
            className="w-20 m-auto  my-5"
            alt="Logo"
          />

          <div className=" relative p-4 text-center bg-white rounded-lg shadow sm:p-5">
            <div className="w-12 h-12 rounded-full bg-green-200 p-2 flex items-center justify-center mx-auto mb-3.5">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-green-600 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
              </svg>
              <span className="sr-only">Success</span>
            </div>
            <p className="mb-4 text-gray-700 text-lg font-semibold ">
              Votre Mot de Passe a été réinitialisé avec succès.
            </p>
            <div className=" p-3 mb-3 flex flex-row justify-between items-center text-gray-600 bg-gray-200 rounded">
              {show ? (
                <>
                  <p className="ml-3">{location.state.password}</p>
                  <BiShowAlt
                    onClick={toggleMotPass}
                    className=" cursor-pointer text-cyan-900 text-[25px]"
                  />
                </>
              ) : (
                <>
                  <p className="ml-3">*******************</p>
                  <BiHide
                    onClick={toggleMotPass}
                    className=" cursor-pointer text-cyan-900 text-[25px]"
                  />
                </>
              )}
              {}
            </div>
            <ToustButton
              onclick={copyPassword}
              isCopied={isCopied}
              value="Copier"
              message="copié"
            />
          </div>
          <ImageButton onclick={redirect} value="Accueil" />
        </div>
      )}
    </div>
  );
};
export default SuccessPage;
