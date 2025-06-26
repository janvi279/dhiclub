const MobileVerify = () => {
    return(
        <>
            <div className=" mb-4 items-center relative">
<input
                            type="text"
                            name="teamName"
                            value={newTeam.teamName}
                            onChange={handleChange}
                             className="w-full max-sm:text-sm py-3  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter Team Name"
                        />
            </div>
            </>
                        

    )
}
export default MobileVerify;