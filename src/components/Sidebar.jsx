import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuCirclePlus, LuCircleMinus } from "react-icons/lu"; // ⬅ plus & minus icons

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [openItems, setOpenItems] = useState({});
  const [selectedItem, setSelectedItem] = useState("welcome to dashboard");

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Controller",
      children: [
        "country",
        "state",
        "city",
        "Pincode",
        "Business Type",
        "Business Domain",
        "Business Category",
        "BulkUpload Country",
        "BulkUpload BusinessCategory",
      ],
    },
    {
      name: "Dhiclub",
      children: [
        "Teams",
        "Registration",
        "Members",
        "Visitor",
        "Responsibility",
      ],
    },
    { name: "CRM", children: ["Clients", "Leads", "Report"] },
    {
      name: "Meeting",
      children: [
        "Attendance",
        "Face to Face",
        "Reference",
        "Guest",
        "Training",
        "Testimonial",
        "Credit Note",
      ],
    },
    { name: "Account", children: ["Billing"] },
    { name: "Inventory", children: ["Products", "Stock", "Suppliers"] },
  ];

  // Adjust sidebar on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsSidebarOpen]);

  // Toggle sidebar item
  const toggleItem = (itemName) => {
    setOpenItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
    navigate(`/${itemName}`);
  };

  // Handle sidebar navigation
  const handleNavigation = (itemName, subItem) => {
    const fullItemName = `${itemName} - ${subItem}`;
    setSelectedItem(fullItemName);

    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
      setOpenItems({});
    }

    const route = subItem.toLowerCase().replace(/\s+/g, "-");
    navigate(`/${itemName}/${route}`);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
    setOpenItems({});
  };

  return (
    <div className="flex h-screen w-20 max-sm:w-10 pt-30">
      {/* Sidebar */}
      <div
        className={`fixed z-40 top-0 left-0 h-full  bg-primary-50 rounded-2xl shadow-md
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-53"}
          relative my-10 mx-5`}
        id="default-sidebar"
      >
        <button
          onClick={toggleSidebar}
          type="button"
          className="p-2 mt-2 ms-50 text-sm text-primary-150 flex"
        >
          {isSidebarOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              />
            </svg>
          )}
        </button>

        <div className="h-full overflow-y-auto">
          <ul
            className={`space-y-2 py-5 ${
              isSidebarOpen ? "px-5" : "px-2"
            } text-primary-150`}
          >
            {navItems.map((item, index) => (
              <li key={index}>
                <div
                  className={`flex hover:text-primary-200 font-semibold items-center justify-between hover:bg-primary-300 cursor-pointer rounded-xl p-2`}
                  onClick={() => toggleItem(item.name)}
                >
                  <span>{item.name}</span>
                  {openItems[item.name] ? (
                    <LuCircleMinus className="w-4 h-4  " />
                  ) : (
                    <LuCirclePlus className="w-4 h-4 " />
                  )}
                </div>
                {openItems[item.name] && item.children && (
                  <ul className="ml-5 mt-1 pl-2 space-y-1 text-primary-150 font-semibold">
                    {item.children.map((subItem, subIndex) => (
                      <li
                        key={subIndex}
                        onClick={() => handleNavigation(item.name, subItem)}
                        className="text-primary-150 hover:bg-primary-300 hover:text-primary-200 rounded-xl px-2 py-1 cursor-pointer"
                      >
                        {subItem}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-opacity-50"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Sidebar;
