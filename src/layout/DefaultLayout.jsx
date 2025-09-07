import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const DefaultLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);  // Sidebar open/close state

    return (
        <>
            <Header />
            <div className="flex h-screen overflow-hidden">
                <Sidebar
                    isSidebarOpen={isSidebarOpen}  // Pass isSidebarOpen to Sidebar
                    setIsSidebarOpen={setIsSidebarOpen}  // Pass the function to toggle the sidebar
                />
                <div className={`relative flex flex-col flex-1 overflow-x-hidden ${isSidebarOpen ? 'ml-50' : 'ml-0 p-0'}`}>
                    {/* Adjust the margin-left based on sidebar state */}
                    <main>
                        <div className="mx-auto max-w-screen-2xl px-4 pt-30 my-5 ">
                            <Outlet /> {/* This renders the Dashboard component */}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default DefaultLayout;
