const Topbar = () => {
  return (
    <>
      <div className="flex bg-[#F9F8FF] items-center p-10">
        <div className=" flex gap-2 items-center ">
          <img
            src="/D Logo.png" 
            alt="Dhiclub Logo"
          />
          <p className="text-3xl font-bold font-size-30  ">Dhiclub</p>
        </div>
        <div className="mx-80 relative flex items-center  ">
          <img src="/Search-icon.png" className="absolute pl-5  " />
          <input
            type="text"
            placeholder="Search or type a command"
            className="px-12 py-2 w-75 border-[1.5px] border-[#AAA9BC] rounded-lg focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-5 justify-end  w-full ">
          <img src="/Bell.png" className="bg-[#E4E7FF] p-4 rounded-full" />

          <img src="/User.png" className="bg-[#E4E7FF] p-4 rounded-full" />
        </div>
      </div>
    </>
  );
};
export default Topbar;
