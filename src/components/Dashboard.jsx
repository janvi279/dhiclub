import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";


const Dashboard=()=>{
    const [selectedItem,setSelectedItem]=useState("welcome to dashboard")
    const handleSelect=(item)=>{
        setSelectedItem(item);
    }
    return(
        <>
            <Topbar/>
           <div className="flex max-sm:block">
             <Sidebar onSelect={handleSelect}/>
             <div className="py-12  max-sm:px-3 px-10 ">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
       <p className="mt-4 text-lg text-gray-600">{selectedItem}</p>
      {/* Add dashboard content here */}
    </div>
           </div>
        </>
    )

}
export default Dashboard;