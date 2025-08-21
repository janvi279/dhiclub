import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Controllers = () => {
    const [selectedItem, setSelectedItem] = useState();
    const navigate = useNavigate();

    const handleSelect = (item) => {
        setSelectedItem(item);
    };

    const renderPage = () => {
        switch (selectedItem) {
            case "Controller - country":
                return navigate("/Controller/country");
            case "Controller - state":
                return navigate("/Controller/state");
            case "Controller - city":
                return navigate("/Controller/city")
            case "Controller - pincode":
                return navigate("/Controller/pincode")
            case "Controller - currency":
                return navigate("/Controller/currency")
            case "Controller - BusinessDomain":
                return navigate("/Controller/BusinessDomain")
            case "Controller - BusinessCategory":
                return navigate("/Controller/BusinessCategory")
            case "Controller - BusinessProductService":
                return navigate("/Controller/BusinessProductService")
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
                    Controllers
                </h1>
                <div className="mt-4">{renderPage()}</div>

                <div className="grid mx-auto w-10/12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    <div className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer" onClick={() => handleSelect("Controller - country")}>
                        <h2 className="text-lg font-semibold text-gray-700">Country</h2>
                        <p className="text-2xl font-bold text-blue-600">23</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer " onClick={() => handleSelect("Controller - state")} >
                        <h2 className="text-lg font-semibold text-gray-700 hover:text-indigo-800 transition">State</h2>
                        <p className="text-2xl font-bold text-rose-600">1</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer " onClick={() => handleSelect("Controller - city")} >
                        <h2 className="text-lg font-semibold text-gray-700 hover:text-indigo-800 transition">
                            City
                        </h2>

                        <p className="text-2xl font-bold text-indigo-600">23</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer" onClick={() => handleSelect("Controller - pincode")}>
                        <h2 className="text-lg font-semibold text-gray-700">Pincode</h2>
                        <p className="text-2xl font-bold text-sky-600">23</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer" onClick={() => handleSelect("Controller - currency")}>
                        <h2 className="text-lg font-semibold text-gray-700">Currency</h2>
                        <p className="text-2xl font-bold text-orange-600">23</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer" onClick={() => handleSelect("Controller - BusinessDomain")}>
                        <h2 className="text-lg font-semibold text-gray-700">Business Domain</h2>
                        <p className="text-2xl font-bold text-lime-600">23</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer" onClick={() => handleSelect("Controller - BusinessCategory")}>
                        <h2 className="text-lg font-semibold text-gray-700">Business Category</h2>
                        <p className="text-2xl font-bold text-violet-600">23</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer">
                        <h2 className="text-lg font-semibold text-gray-700" onClick={() => handleSelect("Controller - BusinessProductService")}>Business Product <br /> Service</h2>
                        <p className="text-2xl font-bold text-purple-600">23</p>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Controllers;
