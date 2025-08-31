// SuccessModal.jsx
import { useEffect } from "react";
import { LuPartyPopper } from "react-icons/lu";

const SuccessModal = ({ isOpen, onClose, newResponsibility }) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose(); // auto close after 5s
            }, 5000);
            return () => clearTimeout(timer); // cleanup on unmount
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50">
            <div className="bg-white rounded-2xl shadow-lg w-96 p-8 text-center animate-fadeIn">
                <div className="flex justify-center mb-4">
                    <span className="text-5xl text-primary-200"><LuPartyPopper/></span>
                </div>
                <h2 className="text-3xl font-bold text-primary-200 mb-2">
                    Congratulations
                </h2>
                <p className="text-primary-150">
                    You have assigned the role....
                  
                </p>
            </div>
        </div>
    );
};

export default SuccessModal;
