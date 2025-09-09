// import { useState, useRef, useEffect } from "react";
// import { BsThreeDotsVertical } from "react-icons/bs";

// const CustomActions = ({ options = [] }) => {
//   const [open, setOpen] = useState(false);
//   const [position, setPosition] = useState({ top: 0, left: 0 });
//   const dropdownRef = useRef(null);
//   const buttonRef = useRef(null);

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target) &&
//         !buttonRef.current.contains(event.target)
//       ) {
//         setOpen(false);
//       }
//     };

//     if (open) {
//       document.addEventListener("mousedown", handleClickOutside);

//       // calculate position of button
//       const rect = buttonRef.current.getBoundingClientRect();
//       setPosition({
//         top: rect.bottom + window.scrollY + 4, // 4px margin below button
//         left: rect.left + window.scrollX - 120, // adjust for dropdown width
//       });
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [open]);

//   return (
//     <div className="inline-block">
//       <button
//         ref={buttonRef}
//         onClick={() => setOpen(!open)}
//         className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
//       >
//         <BsThreeDotsVertical size={18} />
//       </button>

//       {open && (
//         <div
//           ref={dropdownRef}
//           className="fixed w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999]"
//           style={{ top: position.top, left: position.left }}
//         >
//           {options.map((option, index) => (
//             <button
//               key={index}
//               className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 
//                 first:rounded-t-lg last:rounded-b-lg ${option.className || ""}`}
//               onClick={() => {
//                 option.onClick();
//                 setOpen(false);
//               }}
//             >
//               <div className="flex items-center gap-2">
//                 {option.icon && <span className="text-base">{option.icon}</span>}
//                 {option.label}
//               </div>
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomActions;

import { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const CustomActions = ({ options = [] }) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);

      // calculate position of button
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownHeight = 150; // estimate or measure dynamically later
      const spaceBelow = window.innerHeight - rect.bottom;
      const shouldFlip = spaceBelow < dropdownHeight;

      setPosition({
        top: shouldFlip
          ? rect.top + window.scrollY - dropdownHeight - 4 // place above
          : rect.bottom + window.scrollY + 4, // place below
        left: rect.left + window.scrollX - 120, // adjust X for dropdown width
      });
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="inline-block">
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
      >
        <BsThreeDotsVertical size={18} />
      </button>

      {open && (
        <div
          ref={dropdownRef}
          className="fixed w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999]"
          style={{ top: position.top, left: position.left }}
        >
          {options.map((option, index) => (
            <button
              key={index}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 
                first:rounded-t-lg last:rounded-b-lg ${option.className || ""}`}
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
