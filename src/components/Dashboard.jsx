import Sidebar from "./Sidebar";
import Topbar from "./Topbar";


const Dashboard=()=>{
    return(
        <>
            <Topbar/>
           <div className="flex">
             <Sidebar/>
             <div className="py-12 px-10 ">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      {/* Add dashboard content here */}
    </div>
           </div>
        </>
    )

}
export default Dashboard;