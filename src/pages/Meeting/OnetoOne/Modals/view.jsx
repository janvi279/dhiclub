import CustomModal from "../../../../components/common/CustomModal";

const ViewModal = ({ isOpen, onClose, record }) => {
  if (!record) return null;

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="View One-to-One">
      <div className="space-y-4">
        {/* Top section with avatar + main info */}
        <div className="flex items-start gap-5 mt-5">
          {/* Avatar / Uploaded Photo */}
          {record.uploadPhoto ? (
            <img
              src={
                typeof record.uploadPhoto === "string"
                  ? record.uploadPhoto
                  : URL.createObjectURL(record.uploadPhoto)
              }
              alt="Uploaded"
              className="w-20 h-20 object-cover rounded-md"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
              No Photo
            </div>
          )}

          {/* Info section */}
          <div className="space-y-1 text-sm font-medium">
            <div className="flex items-start gap-5">
              <span className="font-semibold w-32 flex-shrink-0">Met With</span>
              <span className="flex-shrink-0">:</span>
              <span className="flex-1">{record.metWith || 'N/A'}</span>
            </div>
            <div className="flex items-start gap-5">
              <span className="font-semibold w-32 flex-shrink-0">Initiated By</span>
              <span className="flex-shrink-0">:</span>
              <span className="flex-1">{record.initiatedBy || 'N/A'}</span>
            </div>
            <div className="flex items-start gap-5">
              <span className="font-semibold w-32 flex-shrink-0">Date</span>
              <span className="flex-shrink-0">:</span>
              <span className="flex-1">{record.date || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div>
          <h3 className="text-primary-200 font-semibold border-b-2 border-primary-200 inline-block">
            One-to-One Details
          </h3>

          <div className="mt-4 space-y-3 text-sm font-medium">
            <div className="flex items-start gap-5">
              <span className="font-semibold w-40 flex-shrink-0">Where You Met</span>
              <span className="flex-shrink-0">:</span>
              <span className="flex-1">{record.whereYouMet || record.whereYouMeet || 'N/A'}</span>
            </div>
            <div className="flex items-start gap-5">
              <span className="font-semibold w-40 flex-shrink-0">Topic of Conversation</span>
              <span className="flex-shrink-0">:</span>
              <span className="max-h-[70vh] overflow-y-auto pr-2 whitespace-pre-line break-words">
                {record.topicOfConversation || record.twc || record.conversation || 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default ViewModal;