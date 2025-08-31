import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const handleUserIconClick = () => {
    setShowMenu(!showMenu);

  }
  const navigate = useNavigate();
  const handleLogout = () => {
    // Perform any logout-related tasks here (e.g., clearing session)
    navigate("/login"); // Redirect to login page
  };
  return (
    <>
     <div className="fixed top-0 left-0 w-full z-50 bg-primary-50 flex justify-between items-center p-7 max-sm:p-5 max-sm:flex-wrap shadow-md">


        <div className="max-sm:w-full max-sm:mb-5 flex gap-2 items-center">
          <img src="/D Logo.png" alt="Dhiclub Logo" />
          <p className="text-3xl font-bold font-size-30 ">Dhiclub</p>
        </div>

        {/* Search */}
        <div className="flex items-center ">
          <img
            src="/Search-icon.png"
            className="absolute pl-5 max-sm:pl-2"
          />
          <input
            type="text"
            placeholder="Search or type a command"
            className="px-12 max-sm:px-7 py-2 w-75 max-sm:p-2 max-sm:w-50 max-sm:text-xs border-[1.5px] border-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        <div className="flex relative items-center gap-5 justify-end max-sm:[justify-normal] max-sm:gap-2 ">
          <img
            src="/bell-svgrepo-com.svg"
            className="bg-primary-300 p-4 h-[57px]  rounded-full max-sm:p-2 max-sm:h-[30px] max-sm:p-[0px]"

          />
          <img
            src="/User.png"
            className="bg-primary-300 p-4 max-sm:p-2 rounded-full max-sm:h-[30px] max-sm:p-[5px]"
            onClick={handleUserIconClick}

          />
          {showMenu && (
            <ul className="absolute top-15 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
              <li
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => navigate("/userList")}
              >
                User List
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          )}

        </div>
      </div>
    </>
  );
};
export default Header;









