const PerformanceDetails = ({ member }) => (
  <div className="space-y-6">
    {/* Time Period Buttons */}
    <div className="flex gap-2">
      <button className="px-4 py-2 bg-primary-200 text-white text-sm rounded-md">6 MONTHS</button>
      <button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-md">12 MONTHS</button>
      <button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-md">LIFETIME</button>
    </div>

    {/* Performance Metrics */}
    <div className="grid gap-x-8 gap-y-2">
      <div><span className="text-sm font-medium">Attendance :</span> <span className="ml-2 text-sm">{member.attendance}</span></div>
      <div><span className="text-sm font-medium">Reference :</span> <span className="ml-2 text-sm">{member.reference}</span></div>
      <div><span className="text-sm font-medium">TYFCB :</span> <span className="ml-2 text-sm">{member.tyfcb}</span></div>
      <div><span className="text-sm font-medium">Testimonials :</span> <span className="ml-2 text-sm">{member.testimonials}</span></div>
      <div><span className="text-sm font-medium">Face to Face :</span> <span className="ml-2 text-sm">{member.faceToFace}</span></div>
    </div>
  </div>
);

export default PerformanceDetails;
