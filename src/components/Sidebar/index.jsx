// import { useState, useEffect, useRef } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { LuCirclePlus, LuCircleMinus } from "react-icons/lu";
// import { FaGlobe, FaCity, FaUsers, FaClipboardList, FaCalendarAlt, FaHandshake, FaCreditCard } from "react-icons/fa";
// import { MdDashboard, MdBusiness, MdInventory, MdEventAvailable, MdAppRegistration } from "react-icons/md";
// import { AiOutlineTeam } from "react-icons/ai";
// import { BiUserCheck, BiUserPlus, BiBuilding } from "react-icons/bi";
// import { RiTeamLine, RiUserSettingsLine, } from "react-icons/ri";
// import { HiOutlineUsers, HiOutlineDocumentReport, HiOutlineUserGroup } from "react-icons/hi";
// import { IoMdPeople } from "react-icons/io";
// import ControllerIcon from "@/assets/sidebar-icons/controller.svg?react";
// import DhiclubIcon from "@/assets/sidebar-icons/D Logo.svg?react";
// import CrmIcon from "@/assets/sidebar-icons/crm.svg?react";
// import InventoryIcon from "@/assets/sidebar-icons/inventory.svg?react";
// import BillingIcon from "@/assets/sidebar-icons/biling.svg?react";
// import React from "react";

// const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
//   const [activeMenu, setActiveMenu] = useState(null);
//   const sidebar = useRef(null);
//   const navigate = useNavigate();

//   const navItems = [
//     {
//       label: "Controller",
//       path: "/controller",
//       icon: <ControllerIcon className="w-4 h-4" />,
//       submenu: [
//         { label: "Country", path: "/controller/country", icon: <FaGlobe /> },
//         { label: "State", path: "/controller/state", icon: <FaCity /> },
//         { label: "City", path: "/controller/city", icon: <FaCity /> },
//         { label: "Pincode", path: "/controller/pincode", icon: <MdDashboard /> },
//         { label: "Business Type", path: "/controller/business-type", icon: <MdBusiness /> },
//         { label: "Business Domain", path: "/controller/business-domain", icon: <BiBuilding /> },
//         { label: "Business Category", path: "/controller/business-category", icon: <MdBusiness /> },
//         { label: "BulkUpload Country", path: "/controller/bulkUpload-country", icon: <FaClipboardList /> },
//         { label: "BulkUpload BusinessCategory", path: "/controller/bulkUpload-businessCategory", icon: <FaClipboardList /> },
//       ],
//     },
//     {
//       label: "Dhiclub",
//       path: "/dhiclub",
//       icon: <DhiclubIcon className="w-4 h-4" />,
//       submenu: [
//         { label: "Teams", path: "/dhiclub/teams", icon: <AiOutlineTeam /> },
//         { label: "Registration", path: "/dhiclub/registration", icon: <MdAppRegistration /> },
//         { label: "Members", path: "/dhiclub/members", icon: <FaUsers /> },
//         { label: "Visitor", path: "/dhiclub/visitor", icon: <FaUsers /> },
//         { label: "Responsibility", path: "/dhiclub/responsibility", icon: <FaClipboardList /> },
//       ],
//     },
//     {
//       label: "CRM",
//       path: "/crm",
//       icon: <CrmIcon className="w-4 h-4" />,
//       submenu: [
//         { label: "Clients", path: "/crm/clients", icon: <HiOutlineUserGroup /> },
//         { label: "Leads", path: "/crm/leads", icon: <FaHandshake /> },
//         { label: "Report", path: "/crm/report", icon: <HiOutlineDocumentReport /> },
//       ],
//     },
//     {
//       label: "Meeting",
//       path: "/meeting",
//       icon: <MdEventAvailable className="w-4 h-4" />,
//       submenu: [
//         { label: "Attendance", path: "/meeting/attendance", icon: <BiUserCheck /> },
//         { label: "TYFCB", path: "/meeting/Tyfcb", icon: <FaClipboardList /> },
//         { label: "One to One", path: "/meeting/OnetoOne", icon: <HiOutlineUsers /> },
//         { label: "Referral", path: "/meeting/Referral", icon: <FaHandshake /> },
//         { label: "Face to Face", path: "/meeting/FaceToFace", icon: <IoMdPeople /> },
//         { label: "Reference", path: "/meeting/reference", icon: <HiOutlineDocumentReport /> },
//         { label: "Guest", path: "/meeting/guest", icon: <FaUsers /> },
//         { label: "Training", path: "/meeting/training", icon: <FaClipboardList /> },
//         { label: "Testimonial", path: "/meeting/testimonial", icon: <HiOutlineDocumentReport /> },
//         { label: "Credit Note", path: "/meeting/credit-note", icon: <FaCreditCard /> },
//       ],
//     },
//     {
//       label: "Account",
//       path: "/account",
//       icon: <BillingIcon className="w-4 h-4" />,
//       submenu: [{ label: "Billing", path: "/account/billing", icon: <FaCreditCard /> }],
//     },
//     {
//       label: "Inventory",
//       path: "/inventory",
//       icon: <InventoryIcon className="w-4 h-4" />,
//       submenu: [
//         { label: "Products", path: "/inventory/product", icon: <MdInventory /> },
//         { label: "Stock", path: "/inventory/stock", icon: <FaClipboardList /> },
//         { label: "Suppliers", path: "/inventory/suppliers", icon: <HiOutlineUserGroup /> },
//       ],
//     },
//   ];

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth <= 768) {
//         setIsSidebarOpen(false);
//       } else {
//         setIsSidebarOpen(true);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [setIsSidebarOpen]);

//   const handleNavClick = (item, e) => {
//     if (item.submenu) {
//       e.preventDefault(); // stop default nav
//       setActiveMenu((prev) => (prev === item.label ? null : item.label));
//       if (item.path) {
//         navigate(item.path); // ✅ smooth navigate without reload
//       }
//     }
//   };

//   return (
//     <div className="flex w-20 max-sm:w-10 pt-30">
//       <aside
//         ref={sidebar}
//         className={`fixed *:z-40 top-0 left-0 bg-primary-50 rounded-2xl shadow-md
//             transition-transform duration-300 ease-in-out
//             ${isSidebarOpen ? "translate-x-0" : "-translate-x-53"}
//             relative my-10 mx-5`}
//       >
//         <div className="h-[calc(100%-60px)] overflow-y-auto sidebar-scroll">
//           <ul className={`space-y-2 py-5 ${isSidebarOpen ? "px-5" : "px-2"} text-primary-150`}>
//             {navItems.map((item, index) => (
//               <li key={index}>
//                 <NavLink
//                   to={item.path}
//                   onClick={(e) => handleNavClick(item, e)}
//                   className={({ isActive }) =>
//                     `flex items-center justify-between gap-15 rounded-xl p-2 font-semibold hover:bg-primary-300 hover:text-primary-200 ${isActive ? "text-primary-200" : ""
//                     }`
//                   }
//                 >
//                   <span className="flex items-center gap-2">
//                     {item.icon &&
//                       React.cloneElement(item.icon, {
//                         className: `w-5 h-5 ${activeMenu === item.label ? "text-primary-200" : ""}`,
//                       })}
//                     {item.label}
//                   </span>
//                   {item.submenu &&
//                     (activeMenu === item.label ? (
//                       <LuCircleMinus
//                         className={`w-4 h-4 ${activeMenu === item.label || window.location.pathname.startsWith(item.path)
//                           ? "text-primary-200"
//                           : "text-primary-150"
//                           }`}
//                       />
//                     ) : (
//                       <LuCirclePlus
//                         className={`w-4 h-4 ${activeMenu === item.label || window.location.pathname.startsWith(item.path)
//                           ? "text-primary-200"
//                           : "text-primary-150"
//                           }`}
//                       />
//                     ))}

//                 </NavLink>

//                 {activeMenu === item.label && item.submenu && (
//                   <ul className="ml-5 mt-1 pl-2 space-y-1 text-primary-150 font-semibold max-h-60 overflow-y-auto">
//                     {item.submenu.map((subItem, subIndex) => (
//                       <li key={subIndex}>
//                         <NavLink
//                           to={subItem.path}
//                           className={({ isActive }) =>
//                             `flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-primary-300 hover:text-primary-200 ${isActive ? "bg-primary-300 text-primary-200" : ""
//                             }`
//                           }
//                         >
//                           <span className="text-sm">{subItem.icon}</span>
//                           {subItem.label}
//                         </NavLink>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </aside>
//     </div>
//   );
// };

// export default Sidebar;




import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LuCirclePlus, LuCircleMinus } from "react-icons/lu";
import { FaGlobe, FaCity, FaUsers, FaClipboardList, FaCalendarAlt, FaHandshake, FaCreditCard } from "react-icons/fa";
import { MdDashboard, MdBusiness, MdInventory, MdEventAvailable, MdAppRegistration } from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";
import { BiUserCheck, BiUserPlus, BiBuilding } from "react-icons/bi";
import { RiTeamLine, RiUserSettingsLine } from "react-icons/ri";
import { HiOutlineUsers, HiOutlineDocumentReport, HiOutlineUserGroup } from "react-icons/hi";
import { IoMdPeople } from "react-icons/io";
import ControllerIcon from "@/assets/sidebar-icons/controller.svg?react";
import DhiclubIcon from "@/assets/sidebar-icons/D Logo.svg?react";
import CrmIcon from "@/assets/sidebar-icons/crm.svg?react";
import InventoryIcon from "@/assets/sidebar-icons/inventory.svg?react";
import BillingIcon from "@/assets/sidebar-icons/biling.svg?react";
import React from "react";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const sidebar = useRef(null);
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Controller",
      path: "/controller",
      icon: <ControllerIcon className="w-5 h-5" />,
      submenu: [
        { label: "Country", path: "/controller/country", icon: <FaGlobe className="w-4 h-4" /> },
        { label: "State", path: "/controller/state", icon: <FaCity className="w-4 h-4" /> },
        { label: "City", path: "/controller/city", icon: <FaCity className="w-4 h-4" /> },
        { label: "Pincode", path: "/controller/pincode", icon: <MdDashboard className="w-4 h-4" /> },
        { label: "Business Type", path: "/controller/business-type", icon: <MdBusiness className="w-4 h-4" /> },
        { label: "Business Domain", path: "/controller/business-domain", icon: <BiBuilding className="w-4 h-4" /> },
        { label: "Business Category", path: "/controller/business-category", icon: <MdBusiness className="w-4 h-4" /> },
        { label: "BulkUpload Country", path: "/controller/bulkUpload-country", icon: <FaClipboardList className="w-4 h-4" /> },
        { label: "BulkUpload BusinessCategory", path: "/controller/bulkUpload-businessCategory", icon: <FaClipboardList className="w-4 h-4" /> },
      ],
    },
    {
      label: "Dhiclub",
      path: "/dhiclub",
      icon: <DhiclubIcon className="w-5 h-5" />,
      submenu: [
        { label: "Teams", path: "/dhiclub/teams", icon: <AiOutlineTeam className="w-4 h-4" /> },
        { label: "Registration", path: "/dhiclub/registration", icon: <MdAppRegistration className="w-4 h-4" /> },
        { label: "Members", path: "/dhiclub/members", icon: <FaUsers className="w-4 h-4" /> },
        { label: "Visitor", path: "/dhiclub/visitor", icon: <FaUsers className="w-4 h-4" /> },
        { label: "Responsibility", path: "/dhiclub/responsibility", icon: <FaClipboardList className="w-4 h-4" /> },
      ],
    },
    {
      label: "CRM",
      path: "/crm",
      icon: <CrmIcon className="w-5 h-5" />,
      submenu: [
        { label: "Clients", path: "/crm/clients", icon: <HiOutlineUserGroup className="w-4 h-4" /> },
        { label: "Leads", path: "/crm/leads", icon: <FaHandshake className="w-4 h-4" /> },
        { label: "Report", path: "/crm/report", icon: <HiOutlineDocumentReport className="w-4 h-4" /> },
      ],
    },
    {
      label: "Meeting",
      path: "/meeting",
      icon: <MdEventAvailable className="w-5 h-5" />,
      submenu: [
        { label: "Attendance", path: "/meeting/attendance", icon: <BiUserCheck className="w-4 h-4" /> },
        { label: "TYFCB", path: "/meeting/Tyfcb", icon: <FaClipboardList className="w-4 h-4" /> },
        { label: "One to One", path: "/meeting/OnetoOne", icon: <HiOutlineUsers className="w-4 h-4" /> },
        { label: "Referral", path: "/meeting/Referral", icon: <FaHandshake className="w-4 h-4" /> },
        { label: "Face to Face", path: "/meeting/FaceToFace", icon: <IoMdPeople className="w-4 h-4" /> },
        { label: "Reference", path: "/meeting/reference", icon: <HiOutlineDocumentReport className="w-4 h-4" /> },
        { label: "Guest", path: "/meeting/guest", icon: <FaUsers className="w-4 h-4" /> },
        { label: "Training", path: "/meeting/training", icon: <FaClipboardList className="w-4 h-4" /> },
        { label: "Testimonial", path: "/meeting/testimonial", icon: <HiOutlineDocumentReport className="w-4 h-4" /> },
        { label: "Credit Note", path: "/meeting/credit-note", icon: <FaCreditCard className="w-4 h-4" /> },
      ],
    },
    {
      label: "Account",
      path: "/account",
      icon: <BillingIcon className="w-5 h-5" />,
      submenu: [
        { label: "Billing", path: "/account/billing", icon: <FaCreditCard className="w-4 h-4" /> }
      ],
    },
    {
      label: "Inventory",
      path: "/inventory",
      icon: <InventoryIcon className="w-5 h-5" />,
      submenu: [
        { label: "Products", path: "/inventory/product", icon: <MdInventory className="w-4 h-4" /> },
        { label: "Stock", path: "/inventory/stock", icon: <FaClipboardList className="w-4 h-4" /> },
        { label: "Suppliers", path: "/inventory/suppliers", icon: <HiOutlineUserGroup className="w-4 h-4" /> },
      ],
    },
  ];

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

  const handleNavClick = (item, e) => {
    if (!isSidebarOpen) {
      // If sidebar is collapsed, expand it first
      setIsSidebarOpen(true);
      return;
    }

    if (item.submenu) {
      e.preventDefault();
      setActiveMenu((prev) => (prev === item.label ? null : item.label));
    }

    if (item.path) {
      navigate(item.path);
    }
  };

  // Close submenu when sidebar is collapsed
  useEffect(() => {
    if (!isSidebarOpen) {
      setActiveMenu(null);
    }
  }, [isSidebarOpen]);

  return (
    <div className="flex w-20 max-sm:w-10 pt-30 ">
      <aside
        ref={sidebar}
        className={`fixed z-40 top-30 left-0 h-screen bg-primary-50 rounded-2xl shadow-md
            transition-all duration-300 ease-in-out m-2
            ${isSidebarOpen ? "w-64" : "w-16"}`}
      >
        {/* Toggle button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          type="button"
          className="absolute top-4 right-4 p-2 text-sm text-primary-150 hover:bg-primary-300 rounded-lg transition-colors z-50"
        >
          {isSidebarOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path clipRule="evenodd" fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 
                10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 
                01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 
                010 1.5H2.75A.75.75 0 012 10z"/>
            </svg>
          )}
        </button>

        {/* Sidebar content */}
        <div className="h-100 pt-16 pb-4 overflow-y-auto">
          <ul className={`space-y-2 text-primary-150 ${isSidebarOpen ? "px-4" : "px-2"}`}>
            {navItems.map((item, index) => (
              <li key={index} className="relative group">
                {/* Main navigation item */}
                <div
                  className={`flex items-center rounded-xl hover:bg-primary-300 hover:text-primary-200 transition-colors cursor-pointer
                    ${isSidebarOpen ? "justify-between p-3" : "justify-center p-2"}`}
                  onClick={(e) => handleNavClick(item, e)}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center font-medium ${isSidebarOpen ? "gap-3 flex-1" : "justify-center"
                      } ${isActive ? "text-primary-200" : ""}`
                    }
                    onClick={(e) => e.preventDefault()}
                  >
                    {/* Icon */}
                    <span className="flex-shrink-0 relative">
                      {item.icon &&
                        React.cloneElement(item.icon, {
                          className: "w-5 h-5"
                        })}


                    </span>

                    {/* Label (only when expanded) */}
                    {isSidebarOpen && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </NavLink>

                  {/* Submenu toggle (only when expanded) */}
                  {isSidebarOpen && item.submenu && (
                    <button className="p-1 hover:bg-primary-400 rounded transition-colors">
                      {activeMenu === item.label ? (
                        <LuCircleMinus className="w-4 h-4" />
                      ) : (
                        <LuCirclePlus className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>

                {/* Submenu (only when expanded and active) */}
                {isSidebarOpen && activeMenu === item.label && item.submenu && (
                  <div className="overflow-hidden transition-all duration-300 ease-in-out">
                    <ul className="ml-8 mt-2 space-y-1 ">
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <NavLink
                            to={subItem.path}
                            className={({ isActive }) =>
                              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium 
                              transition-colors hover:bg-primary-300 hover:text-primary-200 ${isActive ? "bg-primary-300 text-primary-200" : ""
                              }`
                            }
                          >
                            {subItem.icon && (
                              <span className="flex-shrink-0">{subItem.icon}</span>
                            )}
                            <span className="truncate">{subItem.label}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
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
