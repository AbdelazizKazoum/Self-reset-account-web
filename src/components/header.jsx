import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  function redirect() {
    window.history.replaceState({}, document.title);

    navigate("/");
  }
  return (
    <div>
      <header className="bg-white shadow ">
        <div className="w-full flex justify-center items-center max-w-screen mx-auto p-4">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              onClick={redirect}
              className="cursor-pointer flex items-center mb-4 sm:mb-0"
            >
              {/* <img src="/images/Logo.svg" className="h-8 mr-3" alt="Logo" /> */}
              <span className="self-center text-cyan-900  text-xl font-semibold whitespace-nowrap">
                GENDARMERIE ROYALE
              </span>
            </a>
            <span className="block text-sm text-gray-500 sm:text-center "></span>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
