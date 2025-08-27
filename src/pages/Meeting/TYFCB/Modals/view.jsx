import CustomModal from "../../../../components/common/CustomModal";

const ViewModal = ({ isOpen, onClose, record }) => {
  if (!record) return null;

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="View TYFCB Record">
      <div className="space-y-2">
        <p><strong>ID:</strong> {record.id}</p>
        <p><strong>Member:</strong> {record.memberName}</p>
        <p><strong>Chapter:</strong> {record.chapter}</p>
        <p><strong>Amount:</strong> ₹{record.amount}</p>
        <p><strong>Date:</strong> {record.date}</p>
        <p><strong>Status:</strong> {record.status}</p>
      </div>
    </CustomModal>
  );
};

export default ViewModal;
