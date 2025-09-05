import { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const CustomActions = ({ options = [] }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    return (
        <div className="absol" ref={dropdownRef}>
            <button
                ref={buttonRef}
                onClick={() => setOpen(!open)}
                className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
            >
                <BsThreeDotsVertical size={18} />
            </button>

            {open && (
                <div className="relative right-0 top-full mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-xl z-[999] transform">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${option.className || ''
                                }`}
                            onClick={() => {
                                option.onClick();
                                setOpen(false);
                            }}
                        >
                            <div className="flex items-center gap-2">
                                {option.icon && <span className="text-base">{option.icon}</span>}
                                {option.label}
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomActions;