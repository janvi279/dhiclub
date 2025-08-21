// import { useState, useEffect } from "react";
// import {
//     FaSearch,
//     FaSortAmountDownAlt,
//     FaRegEdit,
// } from "react-icons/fa";
// import { RiContactsLine } from "react-icons/ri";
// import { FiFilter } from "react-icons/fi";
// import { MdDeleteOutline } from "react-icons/md";
// import DataTable from "react-data-table-component";

// const Responsibility = () => {
//     const [responsibilityList, setResponsibilityList] = useState([]);
//     const [newResponsibility, setNewResponsibility] = useState({
//         MemberId: "",
//         MemberName: "",
//         MemberRole: "",
//         BusinessCategory: "",
//         AssignDate: "",
//         MobileNumber: "dssdsd",
//         Photo: null,
//         Chapter: "",
//         Pincode: "",
//         City: "",
//         State: "",
//         Country: "",
//         status: "Active",
//         createdAt: new Date().toISOString(),
//     });
//     const [editingResponsibility, setEditingResponsibility] = useState(null);
//     const [step, setStep] = useState(0);
//     const [showEditModal, setShowEditModal] = useState(false);

//     const [searchQuery, setSearchQuery] = useState("");
//     const [statusFilter, setStatusFilter] = useState("all");
//     const [sortOrder, setSortOrder] = useState("newest");

//     // handle input change
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         if (editingResponsibility) {
//             setEditingResponsibility({ ...editingResponsibility, [name]: value });
//         } else {
//             setNewResponsibility({ ...newResponsibility, [name]: value });
//         }
//     };

//     // add responsibility
//     const addResponsibility = () => {
//         console.log("Adding responsibility:", newResponsibility); // Debug log
//         setResponsibilityList([
//             ...responsibilityList,
//             { ...newResponsibility, createdAt: new Date().toISOString() },
//         ]);

//         // Reset form
//         setNewResponsibility({
//             MemberId: "",
//             MemberName: "",
//             MemberRole: "",
//             BusinessCategory: "",
//             AssignDate: "",
//             MobileNumber: "",
//             Photo: null,
//             Chapter: "",
//             Pincode: "",
//             City: "",
//             State: "",
//             Country: "",
//             status: "Active",
//             createdAt: new Date().toISOString(),
//         });

//         setStep(3); // Go to success step
//     };

//     // save responsibility
//     const saveResponsibility = () => {
//         const updated = [...responsibilityList];
//         updated[editingResponsibility.index] = { ...editingResponsibility };
//         setResponsibilityList(updated);
//         setShowEditModal(false);
//         setEditingResponsibility(null);
//     };

//     // delete responsibility
//     const deleteResponsibility = (index) => {
//         setResponsibilityList(responsibilityList.filter((_, i) => i !== index));
//     };

//     const handleEdit = (row, index) => {
//         setEditingResponsibility({ ...row, index });
//         setShowEditModal(true);
//     };

//     // Auto close success modal
//     useEffect(() => {
//         if (step === 3) {
//             const timer = setTimeout(() => {
//                 setStep(0);
//             }, 2000);

//             return () => clearTimeout(timer);
//         }
//     }, [step]);

//     // filtering
//     const filteredList = responsibilityList
//         .filter(
//             (item) =>
//                 item.MemberName.toLowerCase().includes(searchQuery.toLowerCase()) &&
//                 (statusFilter === "all" || item.status === statusFilter)
//         )
//         .sort((a, b) =>
//             sortOrder === "newest"
//                 ? new Date(b.createdAt) - new Date(a.createdAt)
//                 : new Date(a.createdAt) - new Date(b.createdAt)
//         );

//     // columns for DataTable
//     const columns = [
//         { name: "No.", selector: (_, index) => index + 1 },
//         { name: "Member Id", selector: (row) => row.MemberId },
//         { name: "Member Name", selector: (row) => row.MemberName },
//         { name: "Member Role", selector: (row) => row.MemberRole },
//         { name: "Business Category", selector: (row) => row.BusinessCategory },
//         { name: "Assign Date", selector: (row) => row.AssignDate },
//         { name: "Mobile Number", selector: (row) => row.MobileNumber },

//         {
//             name: "Status",
//             selector: (row) => row.status,
//             cell: (row) => (
//                 <span
//                     className={`px-2 py-1 text-xs rounded-full font-medium ${row.status === "Active"
//                         ? "bg-primary-350 text-primary-400"
//                         : "bg-primary-450 text-primary-500"
//                         }`}
//                 >
//                     {row.status}
//                 </span>
//             ),
//         },
//         {
//             name: "Actions",
//             cell: (row, index) => (
//                 <div className="flex gap-5">
//                     <button
//                         className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300"
//                         onClick={() => handleEdit(row, index)}
//                     >
//                         <FaRegEdit />
//                     </button>
//                     <button
//                         className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300"
//                         onClick={() => deleteResponsibility(index)}
//                     >
//                         <MdDeleteOutline />
//                     </button>
//                     <button className="text-primary-400 px-2 py-1 border-primary-400 border font-semibold rounded-full whitespace-nowrap">
//                         Active
//                     </button>
//                     <button className="text-primary-500 px-2 py-1 border border-primary-500 font-semibold rounded-full whitespace-nowrap">
//                         Deactive
//                     </button>
//                 </div>
//             ),
//         },
//     ];

//     const customStyles = {
//         headRow: {
//             style: {
//                 border: "none",
//                 backgroundColor: "#F5F8FD",
//                 borderRadius: "10px",
//             },
//         },
//         headCells: {
//             style: {
//                 fontSize: "14px",
//                 fontWeight: 600,
//                 color: "#061237",
//                 border: "none",
//             },
//         },
//         cells: {
//             style: {
//                 fontSize: "13px",
//                 color: "#061237",
//                 fontWeight: 500,
//             },
//         },
//     };

//     return (
//         <div className="mx-auto mt-10 bg-white shadow-lg rounded-lg p-5 text-primary-150">
//             {/* Header */}
//             <div className="flex gap-5 items-center justify-between pb-4 border-b border-gray-200 mb-4">
//                 <h1 className="text-xl font-semibold">Responsibility</h1>

//                 {/* Search */}
//                 <div className="relative w-64">
//                     <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     <input
//                         type="text"
//                         placeholder="Search Member..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="w-full pl-10 pr-4 py-2 border border-primary-100 rounded-md focus:outline-none"
//                     />
//                 </div>

//                 {/* Filters */}
//                 <div className="flex items-center gap-3">
//                     <div className="flex items-center gap-2">
//                         <FaSortAmountDownAlt className="text-primary-200" />
//                         <select
//                             value={sortOrder}
//                             onChange={(e) => setSortOrder(e.target.value)}
//                             className="font-semibold text-primary-150 py-2 text-base focus:outline-none"
//                         >
//                             <option value="newest">Newest</option>
//                             <option value="oldest">Oldest</option>
//                         </select>
//                     </div>

//                     <div className="flex items-center gap-2">
//                         <FiFilter className="text-primary-200 text-xl" />
//                         <select
//                             value={statusFilter}
//                             onChange={(e) => setStatusFilter(e.target.value)}
//                             className="font-semibold text-primary-150 py-2 text-base focus:outline-none"
//                         >
//                             <option value="all">All Status</option>
//                             <option value="Active">Active</option>
//                             <option value="Deactive">Deactive</option>
//                         </select>
//                     </div>

//                     {/* Add Button */}
//                     <button
//                         onClick={() => setStep(1)}
//                         className="bg-primary-200 text-white px-4 py-2 rounded-full flex items-center cursor-pointer gap-2"
//                     >
//                         <RiContactsLine /> Assign Role
//                     </button>
//                 </div>
//             </div>



//             {/* Data Table */}
//             <DataTable
//                 columns={columns}
//                 data={filteredList}
//                 pagination
//                 highlightOnHover
//                 striped
//                 customStyles={customStyles}
//                 noDataComponent="No responsibilities found"
//             />

//             {/* Assign Role Modal - Step 1 */}
//             {step === 1 && (
//                 <div className="fixed inset-0 text-primary-150  bg-opacity-40 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-8 relative">
//                         {/* Close button */}
//                         <button
//                             className="absolute top-4 right-4 text-gray-500 cursor-pointer text-xl"
//                             onClick={() => setStep(0)}
//                         >
//                             ×
//                         </button>

//                         {/* Title */}
//                         <h2 className="text-lg font-semibold mb-6">Assign The Role</h2>

//                         <div className="grid grid-cols-12 ">
//                             {/* Upload Photo Section */}
//                             <div className="col-span-3 flex flex-col">
//                                 <div className="relative inline-block">
//                                     {/* Image Box */}
//                                     <div className="w-32 h-32 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 mb-3 overflow-hidden">
//                                         {newResponsibility.Photo ? (
//                                             <>
//                                                 <img
//                                                     src={URL.createObjectURL(newResponsibility.Photo)}
//                                                     alt="Preview"
//                                                     className="w-full h-full object-cover rounded-xl"
//                                                 />
//                                                 {/* Remove Button */}
//                                                 <button
//                                                     type="button"
//                                                     onClick={() =>
//                                                         setNewResponsibility({ ...newResponsibility, Photo: null })
//                                                     }
//                                                     className="absolute top-1 right-1 text-gray-800 font-semibold cursor-pointer rounded-full px-2 py-1 text-sm"
//                                                 >
//                                                     ✕
//                                                 </button>
//                                             </>
//                                         ) : (
//                                             <span className="text-sm">No Photo</span>
//                                         )}
//                                     </div>
//                                 </div>

//                                 {/* Upload Button */}
//                                 <div className="border border-primary-100 px-2 py-2 rounded-md w-37">
//                                     <label className="cursor-pointer bg-primary-300 text-primary-200 px-4 py-1 rounded-md ">
//                                         Upload Photo
//                                         <input
//                                             type="file"
//                                             name="Photo"
//                                             onChange={(e) =>
//                                                 setNewResponsibility({
//                                                     ...newResponsibility,
//                                                     Photo: e.target.files[0],
//                                                 })
//                                             }
//                                             className="hidden"
//                                         />
//                                     </label>
//                                 </div>
//                             </div>

//                             {/* Form Fields Section */}
//                             <div className="col-span-9 grid grid-cols-2 gap-3">
//                                 <input
//                                     type="text"
//                                     name="MemberName"
//                                     placeholder="Enter Member Name"
//                                     value={newResponsibility.MemberName}
//                                     onChange={handleChange}
//                                     className="border border-primary-100 rounded-lg px-3 py-2 h-10 w-full focus:outline-none"
//                                 />
//                                 <input
//                                     type="text"
//                                     name="MemberId"
//                                     placeholder="Enter Member Id"
//                                     value={newResponsibility.MemberId}
//                                     onChange={handleChange}
//                                     className="border border-primary-100 rounded-lg px-3 py-2 h-10 w-full focus:outline-none"
//                                 />
//                                 <select
//                                     name="BusinessCategory"
//                                     value={newResponsibility.BusinessCategory}
//                                     onChange={handleChange}
//                                     className="border border-primary-100 rounded-lg px-3 py-2 h-10 w-full focus:outline-none"
//                                 >
//                                     <option value="">Select Business Category</option>
//                                     <option value="Software Development">Software Development</option>
//                                     <option value="Marketing">Marketing</option>
//                                 </select>
//                                 <select
//                                     name="Chapter"
//                                     value={newResponsibility.Chapter}
//                                     onChange={handleChange}
//                                     className="border border-primary-100 rounded-lg px-3 py-2 h-10 w-full focus:outline-none"
//                                 >
//                                     <option value="">Select Chapter</option>
//                                     <option value="Chapter 1">Chapter 1</option>
//                                     <option value="Chapter 2">Chapter 2</option>
//                                     <option value="Chapter 3">Chapter 3</option>
//                                     <option value="Chapter 4">Chapter 4</option>
//                                 </select>

//                                 <input
//                                     type="text"
//                                     name="Pincode"
//                                     placeholder="Enter Pincode"
//                                     value={newResponsibility.Pincode}
//                                     onChange={handleChange}
//                                     className="border border-primary-100 rounded-lg px-3 py-2 h-10 w-full focus:outline-none"
//                                 />
//                                 <input
//                                     type="text"
//                                     name="City"
//                                     placeholder="Enter City"
//                                     value={newResponsibility.City}
//                                     onChange={handleChange}
//                                     className="border border-primary-100 rounded-lg px-3 py-2 h-10 w-full focus:outline-none"
//                                 />
//                                 <input
//                                     type="text"
//                                     name="State"
//                                     placeholder="Enter State"
//                                     value={newResponsibility.State}
//                                     onChange={handleChange}
//                                     className="border border-primary-100 rounded-lg px-3 py-2 h-10 w-full focus:outline-none"
//                                 />
//                                 <input
//                                     type="text"
//                                     name="Country"
//                                     placeholder="Enter Country"
//                                     value={newResponsibility.Country}
//                                     onChange={handleChange}
//                                     className="border border-primary-100 rounded-lg px-3 py-2 h-10 w-full focus:outline-none"
//                                 />


//                                 {/* Action Buttons */}
//                                 <div className="col-span-2 flex mt-4 gap-4">
//                                     <button
//                                         onClick={() => setStep(2)}
//                                         className="bg-primary-200 text-white px-6 py-2 rounded-full cursor-pointer transition"
//                                     >
//                                         Next
//                                     </button>
//                                     <button
//                                         onClick={() => setStep(0)}
//                                         className="border border-primary-200 text-primary-200 px-6 py-2 rounded-full hover:bg-primary-50 transition"
//                                     >
//                                         Cancel
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Step 2 - Role and Date Selection */}
//             {step === 2 && (
//                 <div className="fixed inset-0 flex items-center justify-center text-primary-150  bg-opacity-40 z-50">
//                     <div className="bg-white rounded-2xl shadow-lg w-96 p-6 relative">
//                         {/* Close button */}
//                         <button
//                             onClick={() => setStep(1)}
//                             className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//                         >
//                             ×
//                         </button>

//                         {/* Title */}
//                         <h2 className="text-lg font-semibold text-center mb-6">Assign The Role</h2>

//                         {/* Select Role */}
//                         <select
//                             name="MemberRole"
//                             value={newResponsibility.MemberRole}
//                             onChange={handleChange}
//                             className="border border-primary-100 rounded-lg px-3 py-2 w-full mb-4 focus:outline-none"
//                         >
//                             <option value="">Select Role</option>
//                             <option value="City Head">City Head</option>
//                             <option value="Country Head">Country Head</option>
//                             <option value="Member">Member</option>
//                         </select>

//                         {/* Select Date */}
//                         <div className="relative mb-6">
//                             <input
//                                 name="AssignDate"
//                                 value={newResponsibility.AssignDate}
//                                 onChange={handleChange}
//                                 type="date"
//                                 className="border border-primary-100 rounded-lg px-3 py-2 w-full focus:outline-none"
//                             />
//                         </div>

//                         {/* Buttons */}
//                         <div className="flex justify-center gap-4">
//                             <button
//                                 onClick={addResponsibility}
//                                 className="bg-primary-200 text-white cursor-pointer px-6 py-2 rounded-full transition"
//                             >
//                                 Assign
//                             </button>

//                             <button
//                                 onClick={() => setStep(1)}
//                                 className="border border-primary-200 cursor-pointer text-primary-200 px-6 py-2 rounded-full transition"
//                             >
//                                 Back
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Step 3 - Success Message */}
//             {step === 3 && (
//                 <div className="fixed inset-0 flex items-center justify-center  bg-opacity-40 z-50">
//                     <div className="bg-white rounded-2xl shadow-lg w-96 p-8 text-center">
//                         {/* Celebration Icon */}
//                         <div className="flex justify-center mb-4">
//                             <span className="text-5xl">🎉</span>
//                         </div>

//                         {/* Title */}
//                         <h2 className="text-2xl font-bold text-primary-500 mb-2">
//                             Congratulations
//                         </h2>

//                         {/* Subtitle */}
//                         <p className="text-gray-500">You have assigned the role...</p>
//                     </div>
//                 </div>
//             )}

//             {/* Edit Modal */}
//             {showEditModal && editingResponsibility && (
//                 <div className="fixed text-primary-150 inset-0  bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white p-5 rounded-md w-full max-w-md relative shadow-2xl">
//                         <h2 className="text-xl font-semibold mb-4 text-center">
//                             Edit Responsibility
//                         </h2>
//                         <button
//                             className="absolute top-3 right-3 text-xl font-bold"
//                             onClick={() => setShowEditModal(false)}
//                         >
//                             ×
//                         </button>

//                         <input
//                             type="text"
//                             name="MemberName"
//                             value={editingResponsibility.MemberName}
//                             onChange={handleChange}
//                             className="text-gray-700 focus:outline-none border border-primary-100 rounded-lg px-3 py-2 w-full mb-3"
//                             placeholder="Member Name"
//                         />
//                         <input
//                             type="text"
//                             name="MemberRole"
//                             value={editingResponsibility.MemberRole}
//                             onChange={handleChange}
//                             className="text-gray-700 focus:outline-none border border-primary-100 rounded-lg px-3 py-2 w-full mb-3"
//                             placeholder="Role"
//                         />

//                         <input
//                             type="date"
//                             name="AssignDate"
//                             value={editingResponsibility.AssignDate}
//                             onChange={handleChange}
//                             className="text-gray-700 focus:outline-none border border-primary-100 rounded-lg px-3 py-2 w-full mb-5"
//                         />

//                         <button
//                             onClick={saveResponsibility}
//                             className="w-50 block mx-auto bg-primary-200 text-white py-2 rounded-full"
//                         >
//                             Save Changes
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Responsibility;

import { useState, useEffect } from "react";
import {
    FaSearch,
    FaSortAmountDownAlt,
    FaRegEdit,
} from "react-icons/fa";
import { RiContactsLine } from "react-icons/ri";
import { FiFilter } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import DataTable from "react-data-table-component";

// Step 1 Modal Component
const Step1Modal = ({ newResponsibility, setNewResponsibility, handleChange, setStep }) => (
    <div className="fixed inset-0 text-primary-150  bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-8 relative">
            <button className="absolute top-4 right-4 text-gray-500 cursor-pointer text-xl" onClick={() => setStep(0)}>×</button>

            <h2 className="text-lg font-semibold mb-6">Assign The Role</h2>

            <div className="grid grid-cols-12">
                {/* Photo Upload Section */}
                <div className="col-span-3 flex flex-col">
                    <div className="relative inline-block">
                        <div className="w-32 h-32 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 mb-3 overflow-hidden">
                            {newResponsibility.Photo ? (
                                <>
                                    <img src={URL.createObjectURL(newResponsibility.Photo)} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                                    <button type="button" onClick={() => setNewResponsibility({ ...newResponsibility, Photo: null })} className="absolute top-1 right-20 text-gray-800 font-semibold cursor-pointer rounded-full px-2 py-1 text-sm">✕</button>
                                </>
                            ) : (
                                <span className="text-sm">No Photo</span>
                            )}
                        </div>
                    </div>

                    <div className="border border-primary-100 px-2 py-2 rounded-md w-37">
                        <label className="cursor-pointer bg-primary-300 text-primary-200 px-4 py-1 rounded-md">
                            Upload Photo
                            <input type="file" name="Photo" onChange={(e) => setNewResponsibility({ ...newResponsibility, Photo: e.target.files[0] })} className="hidden" />
                        </label>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="col-span-9 grid grid-cols-2 gap-3">
                    {[
                        { name: "MemberName", placeholder: "Enter Member Name", type: "text" },
                        { name: "MemberId", placeholder: "Enter Member Id", type: "text" },
                        { name: "Pincode", placeholder: "Enter Pincode", type: "text" },
                        { name: "City", placeholder: "Enter City", type: "text" },
                        { name: "State", placeholder: "Enter State", type: "text" },
                        { name: "Country", placeholder: "Enter Country", type: "text" }
                    ].map(field => (
                        <input
                            key={field.name}
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={newResponsibility[field.name]}
                            onChange={handleChange}
                            className="border border-primary-100 rounded-lg px-3 py-2 h-10 w-full focus:outline-none"
                        />
                    ))}

                    <select name="BusinessCategory" value={newResponsibility.BusinessCategory} onChange={handleChange} className="border border-primary-100 rounded-lg px-3 py-2 h-10 w-full focus:outline-none">
                        <option value="">Select Business Category</option>
                        <option value="Software Development">Software Development</option>
                        <option value="Marketing">Marketing</option>
                    </select>

                    <select name="Chapter" value={newResponsibility.Chapter} onChange={handleChange} className="border border-primary-100 rounded-lg px-3 py-2 h-10 w-full focus:outline-none">
                        <option value="">Select Chapter</option>
                        {[1, 2, 3, 4].map(i => <option key={i} value={`Chapter ${i}`}>Chapter {i}</option>)}
                    </select>

                    <div className="col-span-2 flex mt-4 gap-4">
                        <button onClick={() => setStep(2)} className="bg-primary-200 text-white px-6 py-2 rounded-full cursor-pointer transition">Next</button>
                        <button onClick={() => setStep(0)} className="border border-primary-200 text-primary-200 px-6 py-2 rounded-full hover:bg-primary-50 transition">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Step 2 Modal Component
const Step2Modal = ({ newResponsibility, handleChange, addResponsibility, setStep }) => (
    <div className="fixed inset-0 flex items-center justify-center text-primary-150  bg-opacity-40 z-50">
        <div className="bg-white rounded-2xl shadow-lg w-96 p-6 relative">
            <button onClick={() => setStep(1)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">×</button>

            <h2 className="text-lg font-semibold text-center mb-6">Assign The Role</h2>

            <select name="MemberRole" value={newResponsibility.MemberRole} onChange={handleChange} className="border border-primary-100 rounded-lg px-3 py-2 w-full mb-4 focus:outline-none">
                <option value="">Select Role</option>
                {["City Head", "Country Head", "Member"].map(role =>
                    <option key={role} value={role}>{role}</option>
                )}
            </select>

            <input name="AssignDate" value={newResponsibility.AssignDate} onChange={handleChange} type="date" className="border border-primary-100 rounded-lg px-3 py-2 w-full mb-6 focus:outline-none" />

            <div className="flex justify-center gap-4">
                <button onClick={addResponsibility} className="bg-primary-200 text-white cursor-pointer px-6 py-2 rounded-full transition">Assign</button>
                <button onClick={() => setStep(1)} className="border border-primary-200 cursor-pointer text-primary-200 px-6 py-2 rounded-full transition">Back</button>
            </div>
        </div>
    </div>
);

// Success Modal Component
const SuccessModal = () => (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-40 z-50">
        <div className="bg-white rounded-2xl shadow-lg w-96 p-8 text-center">
            <div className="flex justify-center mb-4"><span className="text-5xl">🎉</span></div>
            <h2 className="text-2xl font-bold text-primary-500 mb-2">Congratulations</h2>
            <p className="text-gray-500">You have assigned the role...</p>
        </div>
    </div>
);

// Edit Modal Component
const EditModal = ({ editingResponsibility, handleChange, saveResponsibility, setShowEditModal }) => (
    <div className="fixed text-primary-150 inset-0  bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-5 rounded-md w-full max-w-md relative shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-center">Edit Responsibility</h2>
            <button className="absolute top-3 right-3 text-xl font-bold" onClick={() => setShowEditModal(false)}>×</button>

            {[
                { name: "MemberName", placeholder: "Member Name" },
                { name: "MemberRole", placeholder: "Role" },
                { name: "AssignDate", type: "date" }
            ].map(field => (
                <input
                    key={field.name}
                    type={field.type || "text"}
                    name={field.name}
                    value={editingResponsibility[field.name]}
                    onChange={handleChange}
                    className="text-gray-700 focus:outline-none border border-primary-100 rounded-lg px-3 py-2 w-full mb-3"
                    placeholder={field.placeholder}
                />
            ))}

            <button onClick={saveResponsibility} className="w-50 block mx-auto bg-primary-200 text-white py-2 rounded-full">Save Changes</button>
        </div>
    </div>
);

// Main Component
const Responsibility = () => {
    const [responsibilityList, setResponsibilityList] = useState([]);
    const [newResponsibility, setNewResponsibility] = useState({
        MemberId: "", MemberName: "", MemberRole: "", BusinessCategory: "", AssignDate: "", MobileNumber: "dssdsd",
        Photo: null, Chapter: "", Pincode: "", City: "", State: "", Country: "", status: "Active", createdAt: new Date().toISOString(),
    });
    const [editingResponsibility, setEditingResponsibility] = useState(null);
    const [step, setStep] = useState(0);
    const [showEditModal, setShowEditModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState("newest");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (editingResponsibility) {
            setEditingResponsibility({ ...editingResponsibility, [name]: value });
        } else {
            setNewResponsibility({ ...newResponsibility, [name]: value });
        }
    };

    const addResponsibility = () => {
        setResponsibilityList([...responsibilityList, { ...newResponsibility, createdAt: new Date().toISOString() }]);
        setNewResponsibility({
            MemberId: "", MemberName: "", MemberRole: "", BusinessCategory: "", AssignDate: "", MobileNumber: "",
            Photo: null, Chapter: "", Pincode: "", City: "", State: "", Country: "", status: "Active", createdAt: new Date().toISOString(),
        });
        setStep(3);
    };

    const saveResponsibility = () => {
        const updated = [...responsibilityList];
        updated[editingResponsibility.index] = { ...editingResponsibility };
        setResponsibilityList(updated);
        setShowEditModal(false);
        setEditingResponsibility(null);
    };

    const deleteResponsibility = (index) => {
        setResponsibilityList(responsibilityList.filter((_, i) => i !== index));
    };

    const handleEdit = (row, index) => {
        setEditingResponsibility({ ...row, index });
        setShowEditModal(true);
    };

    useEffect(() => {
        if (step === 3) {
            const timer = setTimeout(() => setStep(0), 2000);
            return () => clearTimeout(timer);
        }
    }, [step]);

    const filteredList = responsibilityList
        .filter(item => item.MemberName.toLowerCase().includes(searchQuery.toLowerCase()) && (statusFilter === "all" || item.status === statusFilter))
        .sort((a, b) => sortOrder === "newest" ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt));

    const columns = [
        { name: "No.", selector: (_, index) => index + 1 },
        { name: "Member Id", selector: (row) => row.MemberId },
        { name: "Member Name", selector: (row) => row.MemberName },
        { name: "Member Role", selector: (row) => row.MemberRole },
        { name: "Business Category", selector: (row) => row.BusinessCategory },
        { name: "Assign Date", selector: (row) => row.AssignDate },
        { name: "Mobile Number", selector: (row) => row.MobileNumber },
        {
            name: "Status", selector: (row) => row.status,
            cell: (row) => (
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${row.status === "Active" ? "bg-primary-350 text-primary-400" : "bg-primary-450 text-primary-500"}`}>
                    {row.status}
                </span>
            ),
        },
        {
            name: "Actions",
            cell: (row, index) => (
                <div className="flex gap-5">
                    <button className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300" onClick={() => handleEdit(row, index)}><FaRegEdit /></button>
                    <button className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300" onClick={() => deleteResponsibility(index)}><MdDeleteOutline /></button>
                    <button className="text-primary-400 px-2 py-1 border-primary-400 border font-semibold rounded-full whitespace-nowrap">Active</button>
                    <button className="text-primary-500 px-2 py-1 border border-primary-500 font-semibold rounded-full whitespace-nowrap">Deactive</button>
                </div>
            ),
        },
    ];

    return (
        <div className="mx-auto mt-10 bg-white shadow-lg rounded-lg p-5 text-primary-150">
            {/* Header */}
            <div className="flex gap-5 items-center justify-between pb-4 border-b border-gray-200 mb-4">
                <h1 className="text-xl font-semibold">Responsibility</h1>

                <div className="relative w-64">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search Member..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-primary-100 rounded-md focus:outline-none" />
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <FaSortAmountDownAlt className="text-primary-200" />
                        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="font-semibold text-primary-150 py-2 text-base focus:outline-none">
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <FiFilter className="text-primary-200 text-xl" />
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="font-semibold text-primary-150 py-2 text-base focus:outline-none">
                            <option value="all">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Deactive">Deactive</option>
                        </select>
                    </div>

                    <button onClick={() => setStep(1)} className="bg-primary-200 text-white px-4 py-2 rounded-full flex items-center cursor-pointer gap-2">
                        <RiContactsLine /> Assign Role
                    </button>
                </div>
            </div>

            <DataTable columns={columns} data={filteredList} pagination highlightOnHover striped customStyles={{
                headRow: { style: { border: "none", backgroundColor: "#F5F8FD", borderRadius: "10px" } },
                headCells: { style: { fontSize: "14px", fontWeight: 600, color: "#061237", border: "none" } },
                cells: { style: { fontSize: "13px", color: "#061237", fontWeight: 500 } }
            }} noDataComponent="No responsibilities found" />

            {/* Modals */}
            {step === 1 && <Step1Modal newResponsibility={newResponsibility} setNewResponsibility={setNewResponsibility} handleChange={handleChange} setStep={setStep} />}
            {step === 2 && <Step2Modal newResponsibility={newResponsibility} handleChange={handleChange} addResponsibility={addResponsibility} setStep={setStep} />}
            {step === 3 && <SuccessModal />}
            {showEditModal && editingResponsibility && <EditModal editingResponsibility={editingResponsibility} handleChange={handleChange} saveResponsibility={saveResponsibility} setShowEditModal={setShowEditModal} />}
        </div>
    );
};

export default Responsibility;