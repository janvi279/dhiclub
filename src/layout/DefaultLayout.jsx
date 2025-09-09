// import { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from '../components/Sidebar';
// import Header from '../components/Header';

// const DefaultLayout = () => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);  // Sidebar open/close state

//     return (
//         <>
//             <Header />
//             <div className="flex h-screen max-sm:block  max-sm:overflow-auto">
//                 <Sidebar
//                     isSidebarOpen={isSidebarOpen}  // Pass isSidebarOpen to Sidebar
//                     setIsSidebarOpen={setIsSidebarOpen}  // Pass the function to toggle the sidebar
//                 />
//                 <div className={`relative flex flex-col flex-1  max-sm:mb-5 ${isSidebarOpen ? 'ml-50 max-sm:hidden ' : 'ml-0 p-0   '} `}>
//                     {/* Adjust the margin-left based on sidebar state */}
//                     <main>
//                         <div className="mx-auto  px-4 pt-30 my-5 max-sm:pt-5">
//                             <Outlet /> {/* This renders the Dashboard component */}
//                         </div>
//                     </main>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default DefaultLayout;

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const DefaultLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);  // Sidebar open/close state

    return (
        <>
            <Header />
            <div className="flex h-screen overflow-hidden max-sm:block max-sm:overflow-auto">
                <Sidebar
                    isSidebarOpen={isSidebarOpen}  // Pass isSidebarOpen to Sidebar
                    setIsSidebarOpen={setIsSidebarOpen}  // Pass the function to toggle the sidebar
                />
                <div className={`relative flex flex-col flex-1  max-sm:mb-5 overflow-x-hidden ${isSidebarOpen ? 'ml-50 max-sm:hidden ' : 'ml-0 p-0   '} `}>
                    {/* Adjust the margin-left based on sidebar state */}
                    <main>
                        <div className="mx-auto  px-4 pt-30 my-5 max-sm:pt-5">
                            <Outlet /> {/* This renders the Dashboard component */}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default DefaultLayout;