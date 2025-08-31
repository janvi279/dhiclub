import React from "react";
import CustomModal from "../../../../components/common/CustomModal";
import { FaArrowRightLong } from "react-icons/fa6";

const ViewTestimonialModal = ({ isOpen, onClose, testimonial, onAction }) => {
  if (!testimonial) return null;

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="View Testimonial">
      <div className="space-y-5 mt-10">
        {/* Sender → Receiver */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-300" />
            <div>
              <h3 className="font-semibold text-primary-150">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.designation}</p>
            </div>
          </div>

          <span className="text-xl"><FaArrowRightLong /></span>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-300" />
            <div>
              <h3 className="font-semibold">{testimonial.receiverName || "Alon Musk"}</h3>
              <p className="text-sm text-gray-500">
                {testimonial.receiverDesignation || "Freelance"}
              </p>
            </div>
          </div>
        </div>

        {/* Date */}
        <div> <p className="text-gray-400 text-sm">{testimonial.date}</p>

          {/* Message */}
          <p className="text-gray-700 font-semibold  text-sm text-primary-150">{testimonial.message}</p></div>

        {/* Status */}
        <p>
          <span
            className={`px-4 py-1 rounded-full text-sm font-semibold ${testimonial.status === "Pending"
                ? "bg-primary-550 text-primary-150"
                : testimonial.status === "Approved"
                  ? "bg-primary-350 text-primary-150"
                  : testimonial.status === "Rejected"
                    ? "bg-red-200 text-red-700"
                    : "bg-primary-350 text-primary-400"
              }`}
          >
            Status: {testimonial.status || "Pending"}
          </span>
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap font-semibold">
          <button
            className="px-2 py-1 bg-primary-600 text-white rounded-lg"
            onClick={() => onAction("Approved", testimonial)}
          >
            Approve
          </button>
          <button
            className="px-2 py-1 bg-primary-650 text-white rounded-lg"
            onClick={() => onAction("Featured", testimonial)}
          >
            Feature
          </button>
          <button
            className="px-4 py-2 bg-primary-700 text-white rounded-lg "
            onClick={() => onAction("Rejected", testimonial)}
          >
            Reject
          </button>
          <button
            className="px-4 py-2 bg-primary-300  text-primary-200 rounded-lg "
            onClick={() => onAction("Deleted", testimonial)}
          >
            Delete
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default ViewTestimonialModal;
