const Topbar = () => {
  return (
    <>
      <div className="flex bg-[#F9F8FF] items-center p-7 max-sm:block ">
        <div className=" flex gap-2 items-center ">
          <img
            src="/D Logo.png"
            alt="Dhiclub Logo"
          />
          <p className="text-3xl font-bold font-size-30 ">Dhiclub</p>
        </div>
        <div className="mx-80 max-sm:mx-0 relative flex items-center  max-sm:mt-4 max-sm:mb-4  ">
          <img src="/Search-icon.png" className="absolute pl-5  " />
          <input
            type="text"
            placeholder="Search or type a command"
            className="px-12 py-2 w-75 border-[1.5px] border-[#AAA9BC] rounded-lg focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-5 justify-end  w-full ">
          <img src="/bell-svgrepo-com.svg" className="bg-[#E4E7FF] p-4 h-[57px] rounded-full max-sm:p-2 max-sm:h-[44px]" />

          <img src="/User.png" className="bg-[#E4E7FF] p-4 max-sm:p-2 rounded-full" />
        </div>
      </div>
    </>
  );
};
export default Topbar;
