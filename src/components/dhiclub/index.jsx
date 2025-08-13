import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dhiclub = () => {
    const [selectedItem, setSelectedItem] = useState();
    const navigate = useNavigate();

    const handleSelect = (item) => {
        setSelectedItem(item);
    };

    const renderPage = () => {
        switch (selectedItem) {
            case "Dhiclub - Chapters / Team":
                return navigate("/Dhiclub/teams");
            case "Dhiclub - Members":
                return navigate("/Dhiclub/members");
            case "Dhiclub - Leaders":
                return navigate("/Dhiclub/leaders")
            case "Dhiclub - Registration":
                return navigate("/Dhiclub/registration")
            
            default:
                return <p className="text-lg text-gray-600">{selectedItem}</p>;
        }
    };

    return (
        <>
            <div
                className={`py-12 max-sm:px-5 w-full transition-all duration-300 overflow-y-auto min-h-screen`}
            >
                <h1
                    className="text-2xl font-bold text-gray-800 cursor-pointer"

                >
                    DhiClub
                </h1>
                <div className="mt-4">{renderPage()}</div>

                <div className="grid mx-auto w-10/12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    <div className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer" onClick={() => handleSelect("Controller - country")}>
                        <h2 className="text-lg font-semibold text-gray-700">Teams</h2>
                        <p className="text-2xl font-bold text-blue-600">23</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer " onClick={() => handleSelect("Controller - state")} >
                        <h2 className="text-lg font-semibold text-gray-700 hover:text-indigo-800 transition">Members</h2>
                        <p className="text-2xl font-bold text-rose-600">1</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer " onClick={() => handleSelect("Controller - city")} >
                        <h2 className="text-lg font-semibold text-gray-700 hover:text-indigo-800 transition">
                            Leaders
                        </h2>

                        <p className="text-2xl font-bold text-indigo-600">23</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer" onClick={() => handleSelect("Controller - pincode")}>
                        <h2 className="text-lg font-semibold text-gray-700">Registration</h2>
                        <p className="text-2xl font-bold text-sky-600">23</p>
                    </div>


                </div>

            </div>
        </>
    );
};

export default Dhiclub;
