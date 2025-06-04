import { useState } from "react";

const Sidebar = ({ onSelect }) => {
  const [openItems, setOpenItems] = useState({});

  const navItems = [
    { name: "Controller", children: ["Overview", "Team", "Settings"] },
    { name: "Dhiclub", children: ["Overview", "Team", "Settings"] },
    { name: "CRM", children: ["Clients", "Leads", "Reports"] },
    { name: "Inventory", children: ["Products", "Stock", "Suppliers"] },
    { name: "Billing", children: ["Invoices", "Payments", "History"] },
  ];

  const toggleItem = (itemName) => {
    setOpenItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  return (
    <div className={`bg-[#F9F8FF]  my-10 mx-5 w-[250px] max-sm:w-auto rounded-[20px] min-h-screen`}>
      <ul className="space-y-2 py-5 px-5 text-gray-600 ">
        {navItems.map((item, index) => (
          <li key={index} className="list-none ">
            <div
              className={`flex hover:text-[#061237]  font-semibold items-center justify-between hover:bg-[#E4E7FF] cursor-pointer rounded-[10px] p-2 ${openItems[item.name] ? "text-[#061237]" : "text-[#AAA9BC]"}`}
              onClick={() => {
                toggleItem(item.name);
              }}

            >
              <span className="">{item.name}</span>
              <img
                src={openItems[item.name] ? "icon-minus.png" : "icon-plus.png"}
                alt="toggle"
                className="w-4 h-4"
              />
            </div>

            {openItems[item.name] && (
              <ul className="ml-5 mt-1 pl-2 space-y-1 text-gray-600 font-semibold  ">
                {item.children.map((subItem, subIndex) => (
                  <li key={subIndex} onClick={() => onSelect(`${item.name} - ${subItem}`)} className="text-gray-500 hover:bg-[#E4E7FF] hover:text-[#061237] rounded-[10px] px-2 py-1 cursor-pointer">{subItem}</li>

                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
