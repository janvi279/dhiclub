const PersonalDetails = ({ member }) => (
  <div className="grid grid-cols-2 gap-x-8 gap-y-2">
    <div><span className="text-sm font-medium">Full Name :</span> <span className="ml-2 text-sm">{member.fullName}</span></div>
    <div><span className="text-sm font-medium">Education :</span> <span className="ml-2 text-sm">{member.education}</span></div>
    <div><span className="text-sm font-medium">Contact Number :</span> <span className="ml-2 text-sm">{member.contactNumber}</span></div>
    <div><span className="text-sm font-medium">DOB :</span> <span className="ml-2 text-sm">{member.dob}</span></div>
    <div><span className="text-sm font-medium">E-Mail ID :</span> <span className="ml-2 text-sm">{member.email}</span></div>
    <div><span className="text-sm font-medium">Address :</span> <span className="ml-2 text-sm">{member.address}</span></div>

    {/* Attachments */}
    <div className="col-span-2 mt-5">
      <h3 className="text-sm font-medium mb-3">Attachments</h3>
      <div className="grid grid-cols-4 gap-4">
        {["Aadhar Card", "Pan Card", "Driving Licence", "Ration Card"].map((doc) => (
          <div key={doc} className="text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <span className="text-gray-400 text-xs">📄</span>
            </div>
            <p className="text-xs">{doc}</p>
            <p className="text-xs text-gray-400">Clicked: 01/01/2025</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default PersonalDetails;
