import { useState } from "react";
import Teams from "./Teams";
import Members from "./Members";
import State from "../components/controllers/state";
import City from "./controllers/city";
import Country from "./controllers/country";
import Leads from "./Leads";
import Registration from "./Registration";
import Account from "./Account";

const Dashboard = () => {
    const [selectedItem, setSelectedItem] = useState("welcome to dashboard");

    const handleSelect = (item) => {
        setSelectedItem(item);
    };

    const renderPage = () => {
        switch (selectedItem) {
            case "Controller - country":
                return <Country />;
            case "Controller - state":
                return <State />;
            case "Controller - city":
                return <City />;
            case "Dhiclub - Chapters / Team":
                return <Teams />;
            case "Dhiclub - Members":
                return <Members />;
            case "Dhiclub - Registration":
                return <Registration />;
            case "Dhiclub - Leads":
                return <Leads />;
                  case "Dhiclub - Account":
                return <Account/>;
            default:
                return <p className="text-lg text-gray-600">{selectedItem}</p>;
        }
    };

    return (
        <>
            <div
                className={`py-12 max-sm:px-5 w-full transition-all duration-300  min-h-screen`}
            >
                <h1
                    className="text-2xl font-bold text-gray-800 cursor-pointer"
                    onClick={() => setSelectedItem("welcome to dashboard")}
                >
                    Dashboard
                </h1>
                <div className="mt-4">{renderPage()}</div>

                {selectedItem === "welcome to dashboard" && (
                    <div className="grid mx-auto w-10/12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <h2 className="text-lg font-semibold text-gray-700">Country</h2>
                            <p className="text-2xl font-bold text-blue-600">23</p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <h2 onClick={() => handleSelect("Dhiclub - Members")} className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-indigo-800 transition">Members</h2>
                            <p className="text-2xl font-bold text-rose-600">1</p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <h2 onClick={() => handleSelect("Dhiclub - Chapters / Team")} className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-indigo-800 transition">
                                Team
                            </h2>

                            <p className="text-2xl font-bold text-indigo-600">23</p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <h2 className="text-lg font-semibold text-gray-700">Visitor</h2>
                            <p className="text-2xl font-bold text-sky-600">23</p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <h2 className="text-lg font-semibold text-gray-700">Mobile App</h2>
                            <p className="text-2xl font-bold text-orange-600">23</p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <h2 className="text-lg font-semibold text-gray-700">Trainers</h2>
                            <p className="text-2xl font-bold text-lime-600">23</p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <h2 className="text-lg font-semibold text-gray-700">Club Inventory</h2>
                            <p className="text-2xl font-bold text-indigo-600">23</p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <h2 className="text-lg font-semibold text-gray-700">Accounting / Billing</h2>
                            <p className="text-2xl font-bold text-yellow-600">23</p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <h2 onClick={() => handleSelect("Dhiclub - Registration")} className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-indigo-800 transition">New Registration</h2>
                            <p className="text-2xl font-bold text-emerald-600">23</p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <h2 className="text-lg font-semibold text-gray-700">Induction Status</h2>
                            <p className="text-2xl font-bold text-violet-600">23</p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <h2 className="text-lg font-semibold text-gray-700">Club Activity</h2>
                            <p className="text-2xl font-bold text-amber-600">23</p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <h2 onClick={() => handleSelect("Dhiclub - Leads")} className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-indigo-800 transition">Leads</h2>
                            <p className="text-2xl font-bold text-blue-600">23</p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <h2 className="text-lg font-semibold text-gray-700">Commission Model</h2>
                            <p className="text-2xl font-bold text-purple-600">23</p>
                        </div>


                    </div>
                )}
            </div>
        </>
    );
};

export default Dashboard;
