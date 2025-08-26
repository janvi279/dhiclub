// import { useState } from "react";

// const MemberViewModal = ({ isOpen, member, onClose }) => {
//   const [activeTab, setActiveTab] = useState("personal");

//   if (!isOpen) return null;
//   if (!member) return null;

//   // Sample member data for demonstration
//   const sampleMember = {
//     memberId: "poonam001",
//     memberName: "Poonam Tala",
//     teamName: "Shakti",
//     businessCategory: "Software Development",
//     joiningDate: "01/07/2025",
//     businessJoiningDate: "05/07/2025",
//     fullName: "Poonam Tala",
//     contactNumber: "+91 1234567890",
//     email: "poonamtala@gmail.com",
//     education: "MBA",
//     dob: "25/07/2000",
//     address: "Runway Heights, Ayodhya Chowk, 150 Ft. Ring Road, Rajkot",
//     companyName: "Alphabit Infoway",
//     companyRegistration: "ABCD",
//     establishedYear: "2018",
//     staffCount: "50",
//     gstNumber: "abcd123456as",
//     officeNumber: "+91 1234567890",
//     officeEmail: "info@alphabitinfoway.com",
//     transactionId: "123456789",
//     paymentType: "UPI",
//     netAmount: "2000/- (without GST)",
//     membershipDuration: "1 Year",
//     attendance: "90%",
//     reference: "10",
//     tyfcb: "00",
//     testimonials: "02",
//     faceToFace: "04"
//   };

//   // Use sample data if no member data provided
//   const memberData = { ...sampleMember, ...member };

//   const tabs = [
//     { key: "personal", label: "Personal Details" },
//     { key: "business", label: "Business Details" },
//     { key: "transaction", label: "Transaction Details" },
//     { key: "performance", label: "Member Performance" }
//   ];

//   return (
//     <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
//         {/* Header */}
//         <div className="flex items-center justify-between py-6 px-6">
//           <h2 className="text-xl font-semibold text-primary-150">View Member</h2>
//           <button
//             className="text-gray-400  text-2xl font-light"
//             onClick={onClose}
//           >
//             ×
//           </button>
//         </div>

//         {/* Member Info Header */}
//         <div className="px-6  bg-gray-50">
//           <div className="flex items-start gap-6">
//             {/* Profile Image Placeholder */}
//             <div className="w-20 h-20 bg-gray-300 rounded-lg flex items-center justify-center">
//               <span className="text-gray-500 text-2xl">👤</span>
//             </div>

//             {/* Member Basic Info */}
//             <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-2 text-primary-150 font-medium">
//               <div>
//                 <span className="text-sm font-medium">Member Id :</span>
//                 <span className="ml-2 text-sm">{memberData.memberId}</span>
//               </div>
//               <div>
//                 <span className="text-sm font-medium">Team Name :</span>
//                 <span className="ml-2 text-sm">{memberData.teamName}</span>
//               </div>
//               <div>
//                 <span className="text-sm font-medium">Member Name :</span>
//                 <span className="ml-2 text-sm text-primary-200 font-medium">{memberData.memberName}</span>
//               </div>
//               <div>
//                 <span className="text-sm font-medium">Business Category :</span>
//                 <span className="ml-2 text-sm">{memberData.businessCategory}</span>
//               </div>
//               <div>
//                 <span className="text-sm font-medium">Joining Date :</span>
//                 <span className="ml-2 text-sm">{memberData.joiningDate}</span>
//               </div>
//               <div>
//                 <span className="text-sm font-medium">Joining Date :</span>
//                 <span className="ml-2 text-sm">{memberData.businessJoiningDate}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div>
//           <div className="flex mt-5">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.key}
//                 className={`px-6 py-3 text-sm font-medium ${activeTab === tab.key
//                     ? "border-primary-200 text-primary-200 border-b-3"
//                     : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                   }`}
//                 onClick={() => setActiveTab(tab.key)}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-6 overflow-y-auto max-h-96 text-primary-150 font-medium">
//           {activeTab === "personal" && (
//             <div className="grid grid-cols-2 gap-x-8 gap-y-2">
//               <div>
//                 <span className="text-sm font-medium">Full Name :</span>
//                 <span className="ml-2 text-sm">{memberData.fullName}</span>
//               </div>
//               <div>
//                 <span className="text-sm font-medium">Education :</span>
//                 <span className="ml-2 text-sm">{memberData.education}</span>
//               </div>
//               <div>
//                 <span className="text-sm font-medium">Contact Number :</span>
//                 <span className="ml-2 text-sm">{memberData.contactNumber}</span>
//               </div>
//               <div>
//                 <span className="text-sm font-medium">DOB :</span>
//                 <span className="ml-2 text-sm">{memberData.dob}</span>
//               </div>
//               <div className="col-span-2">
//                 <span className="text-sm font-medium">E-Mail ID :</span>
//                 <span className="ml-2 text-sm">{memberData.email}</span>
//               </div>
//               <div className="col-span-2">
//                 <span className="text-sm font-medium">Address :</span>
//                 <span className="ml-2 text-sm">{memberData.address}</span>
//               </div>

//               {/* Attachments Section */}
//               <div className="col-span-2 mt-6">
//                 <h3 className="text-sm font-medium mb-3">Attachments</h3>
//                 <div className="grid grid-cols-4 gap-4">
//                   {["Aadhar Card", "Pan Card", "Driving Licence", "Ration Card"].map((doc, index) => (
//                     <div key={doc} className="text-center">
//                       <div className="w-20 h-20 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
//                         <span className="text-gray-400 text-xs">📄</span>
//                       </div>
//                       <p className="text-xs">{doc}</p>
//                       <p className="text-xs text-gray-400">Clicked: 01/01/2025</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === "business" && (
//             <div className="grid grid-cols-2 gap-x-8 gap-y-4">
//               <div>
//                 <span className="text-sm font-medium">Business Category :</span>
//                 <span className="ml-2 text-sm">{memberData.businessCategory}</span>
//               </div>
//               <div>
//                 <span className="text-sm font-medium">Staff Count :</span>
//                 <span className="ml-2 text-sm">{memberData.staffCount}</span>
//               </div>
//               <div>
//                 <span className="text-sm font-medium">Company Name :</span>
//                 <span className="ml-2 text-sm">{memberData.companyName}</span>
//               </div>
//               <div>
//                 <span className="text-sm font-medium">GST Number :</span>
//                 <span className="ml-2 text-sm">{memberData.gstNumber}</span>
//               </div>
//               <div>
//                 <span className="text-sm font-medium ">Company Registration :</span>
//                 <span className="ml-2 text-sm">{memberData.companyRegistration}</span>
//               </div>
//               <div>
//                 <span className="text-sm font-medium ">Office Number :</span>
//                 <span className="ml-2 text-sm">{memberData.officeNumber}</span>
//               </div>
//               <div>
//                 <span className="text-sm font-medium ">Established Year :</span>
//                 <span className="ml-2 text-sm">{memberData.establishedYear}</span>
//               </div>
//               <div>
//                 <span className="text-sm font-medium ">Office Email :</span>
//                 <span className="ml-2 text-sm">{memberData.officeEmail}</span>
//               </div>
//             </div>
//           )}

//           {activeTab === "transaction" && (
//             <div className="grid grid-cols-2 gap-x-8 gap-y-4">
//               <div>
//                 <span className="text-sm font-medium ">Transaction ID :</span>
//                 <span className="ml-2 text-sm">{memberData.transactionId}</span>
//               </div>
//               <div>
//                 <span className="text-sm font-medium ">Payment Type :</span>
//                 <span className="ml-2 text-sm">{memberData.paymentType}</span>
//               </div>
//               <div>
//                 <span className="text-sm font-medium ">Net Amount :</span>
//                 <span className="ml-2 text-sm">{memberData.netAmount}</span>
//               </div>
//               <div>
//                 <span className="text-sm font-medium ">Membership Duration :</span>
//                 <span className="ml-2 text-sm">{memberData.membershipDuration}</span>
//               </div>
//             </div>
//           )}

//           {activeTab === "performance" && (
//             <div className="space-y-6">
//               {/* Time Period Buttons */}
//               <div className="flex gap-2">
//                 <button className="px-4 py-2 bg-primary-200 text-white text-sm rounded-md">6 MONTHS</button>
//                 <button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-md">12 MONTHS</button>
//                 <button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-md">LIFETIME</button>
//               </div>

//               {/* Performance Metrics */}
//               <div className="grid grid-cols-2 gap-x-8 gap-y-4">
//                 <div>
//                   <span className="text-sm font-medium ">Attendance :</span>
//                   <span className="ml-2 text-sm">{memberData.attendance}</span>
//                 </div>
//                 <div>
//                   <span className="text-sm font-medium ">Reference :</span>
//                   <span className="ml-2 text-sm">{memberData.reference}</span>
//                 </div>
//                 <div>
//                   <span className="text-sm font-medium ">TYFCB :</span>
//                   <span className="ml-2 text-sm">{memberData.tyfcb}</span>
//                 </div>
//                 <div>
//                   <span className="text-sm font-medium ">Testimonials :</span>
//                   <span className="ml-2 text-sm">{memberData.testimonials}</span>
//                 </div>
//                 <div>
//                   <span className="text-sm font-medium ">Face to Face :</span>
//                   <span className="ml-2 text-sm">{memberData.faceToFace}</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MemberViewModal

import { useState } from "react";
import PersonalDetails from "./tabs/PersonalDetails";
import BusinessDetails from "./tabs/BusinessDetails";
import TransactionDetails from "./tabs/TransactionDetails";
import PerformanceDetails from "./tabs/PerformanceDetails";

const MemberViewModal = ({ isOpen, member, onClose }) => {
  const [activeTab, setActiveTab] = useState("personal");

  if (!isOpen || !member) return null;

  const tabs = [
    { key: "personal", label: "Personal Details" },
    { key: "business", label: "Business Details" },
    { key: "transaction", label: "Transaction Details" },
    { key: "performance", label: "Member Performance" }
  ];

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between py-6 px-6">
          <h2 className="text-xl font-semibold text-primary-150">View Member</h2>
          <button className="text-gray-400  text-2xl font-light" onClick={onClose}>×</button>
        </div>

        {/* Member Info Header */}
        <div className="px-6  bg-gray-50">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-2xl">👤</span>
            </div>

            {/* Member Basic Info */}
            <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-2 text-primary-150 font-medium">
              <div><span className="text-sm font-medium">Member Id :</span> <span className="ml-2 text-sm">{member.memberId}</span></div>
              <div><span className="text-sm font-medium">Team Name :</span> <span className="ml-2 text-sm">{member.teamName}</span></div>
              <div><span className="text-sm font-medium">Member Name :</span> <span className="ml-2 text-sm text-primary-200 font-medium">{member.memberName}</span></div>
              <div><span className="text-sm font-medium">Business Category :</span> <span className="ml-2 text-sm">{member.businessCategory}</span></div>
              <div><span className="text-sm font-medium">Joining Date :</span> <span className="ml-2 text-sm">{member.joiningDate}</span></div>
              <div><span className="text-sm font-medium">Business Joining Date :</span> <span className="ml-2 text-sm">{member.businessJoiningDate}</span></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mt-5">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === tab.key
                  ? "border-primary-200 text-primary-200 border-b-3"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96 text-primary-150 font-medium">
          {activeTab === "personal" && <PersonalDetails member={member} />}
          {activeTab === "business" && <BusinessDetails member={member} />}
          {activeTab === "transaction" && <TransactionDetails member={member} />}
          {activeTab === "performance" && <PerformanceDetails member={member} />}
        </div>
      </div>
    </div>
  );
};

export default MemberViewModal;
