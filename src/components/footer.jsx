const Footer = () => {
  const date = new Date();
  return (
    <div>
      <footer className="bg-white shadow ">
        <hr className=" border-gray-200 sm:mx-auto" />

        <div className="w-full max-w-screen mx-auto p-4 md:py-8">
          <div className="flex items-center justify-center">
            <span className="block text-sm text-gray-500 sm:text-center ">
              © {date.getFullYear()}{" "}
              <a href="#" className="hover:underline">
                Service Informatique
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
