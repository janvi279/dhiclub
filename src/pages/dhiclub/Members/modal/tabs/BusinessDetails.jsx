const BusinessDetails = ({ member }) => (
  <div className="grid grid-cols-2 gap-x-8 gap-y-2">
    <div><span className="text-sm font-medium">Business Category :</span> <span className="ml-2 text-sm">{member.businessCategory}</span></div>
    <div><span className="text-sm font-medium">Staff Count :</span> <span className="ml-2 text-sm">{member.staffCount}</span></div>
    <div><span className="text-sm font-medium">Company Name :</span> <span className="ml-2 text-sm">{member.companyName}</span></div>
    <div><span className="text-sm font-medium">GST Number :</span> <span className="ml-2 text-sm">{member.gstNumber}</span></div>
    <div><span className="text-sm font-medium">Company Registration :</span> <span className="ml-2 text-sm">{member.companyRegistration}</span></div>
    <div><span className="text-sm font-medium">Office Number :</span> <span className="ml-2 text-sm">{member.officeNumber}</span></div>
    <div><span className="text-sm font-medium">Established Year :</span> <span className="ml-2 text-sm">{member.establishedYear}</span></div>
    <div><span className="text-sm font-medium">Office Email :</span> <span className="ml-2 text-sm">{member.officeEmail}</span></div>
  </div>
);

export default BusinessDetails;
