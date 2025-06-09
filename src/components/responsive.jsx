// import { useState, useEffect } from "react";

// const Sidebar = ({ onSelect }) => {
//   const [openItems, setOpenItems] = useState({});
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const navItems = [
//     { name: "Controller", children: ["Overview", "Team", "Settings"] },
//     { name: "Dhiclub", children: ["Overview", "Team", "Settings"] },
//     { name: "CRM", children: ["Clients", "Leads", "Reports"] },
//     { name: "Inventory", children: ["Products", "Stock", "Suppliers"] },
//     { name: "Billing", children: ["Invoices", "Payments", "History"] },
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

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const toggleItem = (itemName) => {
//     setOpenItems((prev) => ({
//       ...prev,
//       [itemName]: !prev[itemName],
//     }));

//   };
//   const toggleSideBar = () => {
//     setIsSidebarOpen((prev) => !prev);
//   }

//   return (
//     <>
//       <button onClick={toggleSideBar} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="p-2 mt-2 ms-3 text-sm text-gray-500 flex   dark:text-gray-400  dark:focus:ring-gray-600 max-sm:block md:block md:h-fit  ">
//         <span className="sr-only">Open sidebar</span>
//         <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//           <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
//         </svg>
//       </button>

//       {isSidebarOpen && (
//         <div id="default-sidebar" className={` fixed z-40 top-0 left-0 h-full w-[250px] bg-[#F9F8FF] rounded-r-[20px]
//       transition-transform duration-300 ease-in-out
//       ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
//     relative translate-x-0 my-10 mx-5 min-h-screen`}>
//           <ul className="space-y-2 py-5 px-5 text-gray-600 " >
//             {navItems.map((item, index) => (
//               <li key={index} className="list-none ">
//                 <div
//                   className={`flex hover:text-[#061237]  font-semibold items-center justify-between hover:bg-[#E4E7FF] cursor-pointer rounded-[10px] p-2 ${openItems[item.name] ? "text-[#061237]" : "text-[#AAA9BC]"}`}
//                   onClick={() => {
//                     toggleItem(item.name);
//                   }}
//                 >
//                   <span className="">{item.name}</span>
//                   <img
//                     src={openItems[item.name] ? "icon-minus.png" : "icon-plus.png"}
//                     alt="toggle"
//                     className="w-4 h-4"
//                   />
//                 </div>

//                 {openItems[item.name] && (
//                   <ul className="ml-5 mt-1 pl-2 space-y-1 text-gray-600 font-semibold  ">
//                     {item.children.map((subItem, subIndex) => (
//                       <li key={subIndex} onClick={() => {
//                         onSelect(`${item.name} - ${subItem}`);
//                         if (window.innerWidth <= 768) {
//                           setIsSidebarOpen(false);
//                         }
//                       }} className="text-gray-500 hover:bg-[#E4E7FF]  hover:text-[#061237] rounded-[10px] px-2 py-1 cursor-pointer">{subItem}</li>
//                     ))}
//                   </ul>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </>
//   );
// };

// export default Sidebar;




import { useState, useEffect } from "react";

const Sidebar = ({ onSelect }) => {
  const [openItems, setOpenItems] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { name: "Controller", children: ["Overview", "Team", "Settings"] },
    { name: "Dhiclub", children: ["Overview", "Team", "Settings"] },
    { name: "CRM", children: ["Clients", "Leads", "Reports"] },
    { name: "Inventory", children: ["Products", "Stock", "Suppliers"] },
    { name: "Billing", children: ["Invoices", "Payments", "History"] },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleItem = (itemName) => {
    setOpenItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  const toggleSideBar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      {/* Toggle Button (visible on small screens) */}
     

      {/* Sidebar */}
      <div
        className={`
        h-full w-[250px] bg-[#F9F8FF] rounded-[20px]
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-3 max-sm:w-[100px]" : "-translate-x-50 "}
          lg:relative  lg:my-10 lg:mx-5 lg:min-h-screen  max-sm:relative max-sm:my-10 max-sm::mx-5 max-sm:min-h-screen
        `}
        id="default-sidebar"
      >
         <button
        onClick={toggleSideBar}
        type="button"
        className={`p-2 mt-2 ms-50 ${isSidebarOpen ? "max-sm:ms-16" : "max-sm:ms-53"}  text-sm text-gray-500 flex`}
      >
        <svg className="w-6 h-6 max-sm:w-4 max-sm:h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>
        <ul className="space-y-2 py-5 max-sm:px-0 max-sm:text-sm px-5 text-gray-600">
          {navItems.map((item, index) => (
            <li key={index}>
              <div
                className={`flex hover:text-[#061237] font-semibold items-center justify-between hover:bg-[#E4E7FF] cursor-pointer rounded-[10px] p-2  ${
                  openItems[item.name]
                    ? "text-[#061237]"
                    : "text-[#AAA9BC]"
                }`}
                onClick={() => toggleItem(item.name)}
              >
                <span>{item.name}</span>
                <img
                  src={
                    openItems[item.name]
                      ? "icon-minus.png"
                      : "icon-plus.png"
                  }
                  alt="toggle"
                  className="w-4 h-4 max-sm:w-3 max-sm:h-3"
                />
              </div>

              {openItems[item.name] && (
                <ul className="ml-5 mt-1 pl-2 space-y-1 text-gray-600 font-semibold">
                  {item.children.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      onClick={() => {
                        onSelect(`${item.name} - ${subItem}`);
                        if (window.innerWidth <= 768) {
                          setIsSidebarOpen(false); // Auto-close on mobile
                        }
                      }}
                      className="text-gray-500 hover:bg-[#E4E7FF] hover:text-[#061237] rounded-[10px] px-2 py-1 cursor-pointer"
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

      {/* Overlay on mobile */}
      {isSidebarOpen  && (
        <div
          className="fixed inset-0 z-30  bg-opacity-50"
          onClick={toggleSideBar}
        />
      )}
    </>
  );
};

export default Sidebar;
