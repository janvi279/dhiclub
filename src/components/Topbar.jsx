const Topbar = () => {
  return (
    <>
      <div className="flex bg-[#F9F8FF] items-center p-7 max-sm:p-5 max-sm:block  ">
        <div className=" flex gap-2 items-center ">
          <img src="/D Logo.png" alt="Dhiclub Logo" />
          <p className="text-3xl font-bold font-size-30 ">Dhiclub</p>
        </div>
        <div className="flex">
          <div className=" xl:mx-100  lg:mx-50 md:mx-20 max-sm:mx-0 relative flex items-center  max-sm:mt-3 max-sm:mb-2  ">
            <img
              src="/Search-icon.png"
              className="absolute pl-5 max-sm:pl-2"
            />    
            <input
              type="text"
              placeholder="Search or type a command"
              className="px-12 max-sm:px-7 py-2 w-75 max-sm:p-2 max-sm:w-50 max-sm:text-xs border-[1.5px] border-[#AAA9BC] rounded-lg focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-5 justify-end max-sm:[justify-normal] max-sm:gap-2 w-full ">
            <img
              src="/bell-svgrepo-com.svg"
              className="bg-[#E4E7FF] p-4 h-[57px]  rounded-full max-sm:p-2 max-sm:h-[30px] max-sm:p-[0px]"
            />
            <img
              src="/User.png"
              className="bg-[#E4E7FF] p-4 max-sm:p-2 rounded-full max-sm:h-[30px] max-sm:p-[5px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Topbar;









