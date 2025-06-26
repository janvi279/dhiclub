import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import CountryList from "./CountryList";
import CityList from "./City";
import StateList from "./StateList";
import Teams from "./Teams";
import Members from "./Members";

const Dashboard = () => {
    const [selectedItem, setSelectedItem] = useState("welcome to dashboard");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const handleSelect = (item) => {
        setSelectedItem(item);
    };
    const renderPage = () => {
        switch (selectedItem) {

            case "Controller - country":
                return <CountryList />;
            case "Controller - state":
                return <StateList />;
            case "Controller - city":
                return <CityList />;
            case "Dhiclub - Chapters / Team":
                return <Teams />;
            case "Dhiclub - Members":
                return <Members />;


            default:
                return <p className="text-lg text-gray-600">{selectedItem}</p>;
        }
    };
    return (
        <>
            <Topbar />
            <div className="flex  fixed w-full">
                <Sidebar
                    onSelect={handleSelect}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}

                />
                <div
                    className={`py-12 max-sm:px-5 w-full transition-all duration-300 overflow-y-auto h-screen ${isSidebarOpen ? "ml-40 px-10" : "ml-0 px-0 "
                        }`}
                >
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                    <div className="mt-4">{renderPage()}</div>


                    {/* Add dashboard content here */}
                </div>
            </div>
        </>
    );
};
export default Dashboard; 