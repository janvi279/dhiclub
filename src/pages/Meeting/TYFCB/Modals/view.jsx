import CustomModal from "../../../../components/common/CustomModal";

const ViewModal = ({ isOpen, onClose, record }) => {
  if (!record) return null;

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="View TYFCB">
      <div className="space-y-4">
        {/* Top section with avatar + main info */}
        <div className="flex items-start gap-5 mt-5 font-medium">
          {/* Avatar placeholder */}
          <div className="w-20 h-20 bg-gray-200 rounded-md" />

          {/* Info section */}
          <div className="space-y-1 text-sm">
            <p className="flex gap-5">
              <span className="w-30">Thank You To</span>
              <span>:</span>
              {record.thankyouto}
            </p>
            <p className="flex gap-5">
              <span className="w-30">From</span>
              <span>:</span>
              {record.memberName}
            </p>
            <p className="flex gap-5">
              <span className="w-30">Date</span>
              <span>:</span>
              {record.date}
            </p>
          </div>
        </div>

        {/* Details Section */}
        <div>
          <h3 className="text-primary-200 font-semibold border-b-2 border-primary-200 inline-block ">
            TYFCB Details
          </h3>

          <div className="mt-2 space-y-2 text-sm font-medium">
            <p className="flex gap-5">
              <span className="w-30">Referral Amount</span>
              <span>:</span>
              ₹{record.referralAmount}
            </p>
            <p className="flex gap-5">
              <span className="w-30">Business Type</span>
              <span>:</span>
              {record.businessType}
            </p>
            <p className="flex gap-5">
              <span className="w-30">Referral Type</span>
              <span>:</span>
              {record.referralType}
            </p>
            <p className="flex gap-5">
              <span className="w-30">Comment</span>
              <span>:</span>
              {record.comment}
            </p>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default ViewModal;
