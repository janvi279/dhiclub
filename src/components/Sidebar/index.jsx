import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { LuCirclePlus, LuCircleMinus } from "react-icons/lu";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [activeMenu, setActiveMenu] = useState(null); // ✅ only one open at a time
  const sidebar = useRef(null);

  const navItems = [
    {
      label: "Controller",
      path: "/controller",
      submenu: [
        { label: "Country", path: "/controller/country" },
        { label: "State", path: "/controller/state" },
        { label: "City", path: "/controller/city" },
        { label: "Pincode", path: "/controller/pincode" },
        { label: "Business Type", path: "/controller/business-type" },
        { label: "Business Domain", path: "/controller/business-domain" },
        { label: "Business Category", path: "/controller/business-category" },
        { label: "BulkUpload Country", path: "/controller/bulkUpload-country" },
        { label: "BulkUpload BusinessCategory", path: "/controller/bulkUpload-businessCategory" },
      ],
    },
    {
      label: "Dhiclub",
      path: "/dhiclub",
      submenu: [
        { label: "Teams", path: "/dhiclub/teams" },
        { label: "Registration", path: "/dhiclub/registration" },
        { label: "Members", path: "/dhiclub/members" },
        { label: "Visitor", path: "/dhiclub/visitor" },
        { label: "Responsibility", path: "/dhiclub/responsibility" },
      ],
    },
    {
      label: "CRM",
      path: "/crm",
      submenu: [
        { label: "Clients", path: "/crm/clients" },
        { label: "Leads", path: "/crm/leads" },
        { label: "Report", path: "/crm/report" },
      ],
    },
    {
      label: "Meeting",
      path: "/meeting",
      submenu: [
        { label: "Attendance", path: "/meeting/attendance" },
        { label: "TYFCB", path: "/meeting/Tyfcb" },
        { label: "One to One", path: "/meeting/OnetoOne" },
        { label: "Referral", path: "/meeting/Referral" },
        { label: "Face to Face", path: "/meeting/FaceToFace" },
        { label: "Reference", path: "/meeting/reference" },
        { label: "Guest", path: "/meeting/guest" },
        { label: "Training", path: "/meeting/training" },
        { label: "Testimonial", path: "/meeting/testimonial" },
        { label: "Credit Note", path: "/meeting/credit-note" },
      ],
    },
    {
      label: "Account",
      path: "/account",
      submenu: [{ label: "Billing", path: "/account/billing" }],
    },
    {
      label: "Inventory",
      path: "/inventory",
      submenu: [
        { label: "Products", path: "/inventory/product" },
        { label: "Stock", path: "/inventory/stock" },
        { label: "Suppliers", path: "/inventory/suppliers" },
      ],
    },
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

  // Toggle submenu (accordion behavior)
  const handleSubmenuToggle = (label) => {
    setActiveMenu((prev) => (prev === label ? null : label));
  };

  return (
    <div className="flex w-20 max-sm:w-10 pt-30">
      {/* Sidebar */}
      <aside
        ref={sidebar}
        className={`fixed z-40 top-0 left-0  bg-primary-50 rounded-2xl shadow-md
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-53"}
          relative my-10 mx-5`}
      >
        {/* Toggle button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          type="button"
          className="p-2 mt-2 ms-50 text-sm text-primary-150 flex"
        >
          {isSidebarOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path clipRule="evenodd" fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 
                10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 
                01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 
                010 1.5H2.75A.75.75 0 012 10z"/>
            </svg>
          )}
        </button>

        {/* Sidebar nav */}
      <div className="h-[calc(100%-60px)] overflow-y-auto sidebar-scroll">
          <ul className={`space-y-2 py-5 ${isSidebarOpen ? "px-5" : "px-2"} text-primary-150`}>
            {navItems.map((item, index) => (
              <li key={index}>
                {/* Top-level NavLink + toggle */}
                <div
                  className="flex items-center justify-between cursor-pointer rounded-xl p-2 font-semibold hover:bg-primary-300 hover:text-primary-200"
                  onClick={() => handleSubmenuToggle(item.label)}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex-1 block ${isActive ? "text-primary-200" : ""}`
                    }
                  >
                    {item.label}
                  </NavLink>
                  {item.submenu && (
                    activeMenu === item.label ? (
                      <LuCircleMinus className="w-4 h-4" />
                    ) : (
                      <LuCirclePlus className="w-4 h-4" />
                    )
                  )}
                </div>

                {/* Submenu with scroll */}
                {activeMenu === item.label && item.submenu && (
                  <ul className="ml-5 mt-1 pl-2 space-y-1 text-primary-150 font-semibold max-h-60 overflow-y-auto">
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <NavLink
                          to={subItem.path}
                          className={({ isActive }) =>
                            `block rounded-xl px-2 py-1 hover:bg-primary-300 hover:text-primary-200 ${isActive ? "bg-primary-300 text-primary-200" : ""
                            }`
                          }
                        >
                          {subItem.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
