const Sidebar = () => {
  const navItems = ["Dhiclub", "CRM", "Inventory", "Billing"];
  return (
    <div className="bg-[#F9F8FF] h-screen my-10 mx-5 w-sm rounded-[20px]">
      <ul className="space-y-2 py-5 px-5 text-gray-600">
        {navItems.map((item, index) => (
          <div className="flex items-center justify-between hover:bg-[#E4E7FF] cursor-pointer rounded-[10px] p-2 ">
            <li
              key={index}
              className=" "
            >
              {item}
            </li>
            <img src="icon-plus.png" />
            {/* <img src="icon-minus.png" /> */}
          </div>
        ))}
      </ul>
    </div>
  );
};
export default Sidebar;
