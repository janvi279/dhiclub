import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomInput from "../../../../components/common/CustomInput";
import CustomSelect from "../../../../components/common/CustomSelect";
import CustomTextarea from "../../../../components/common/CustomTextarea";

// ✅ Dropdown options
const initiatedByOptions = ["Me", "Other"];

const schema = Yup.object().shape({
  uploadPhoto: Yup.mixed().required("Upload photo is required"),
  metWith: Yup.string().required("Met With is required"),
  initiatedBy: Yup.string().required("Initiated By is required"),
  whereYouMeet: Yup.string().required("Where did you meet is required"),
  date: Yup.date().required("Date is required"),
  twc: Yup.string().required("Topic of conversation is required"),
});

const AddEditModal = ({ isOpen, onClose, record, onSave }) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={record ? "Edit One to One" : "Add One to One"}
    >
      <Formik
        initialValues={{
          uploadPhoto: record?.uploadPhoto || "",
          metWith: record?.metWith || "",
          initiatedBy: record?.initiatedBy || "",
          whereYouMeet: record?.whereYouMeet || "",
          date: record?.date || "",
          twc: record?.twc || "",
          status: record?.status || "Active",
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          onSave(values);
          onClose();
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-4">
            {/* ✅ Upload Photo styled field */}
            <div>

              <div className="flex items-center border-gray-300 border rounded-lg px-3 py-2">
                {/* File name preview */}
                <span className="flex-1 text-sm text-gray-600 truncate">
                  {values.uploadPhoto?.name || "No file chosen"}
                </span>

                {/* Choose File button */}
                <label className="ml-3 px-2 py-1  text-sm bg-primary-200 text-white rounded-md cursor-pointer">
                  Upload Photo
                  <input
                    type="file"
                    hidden
                    name="uploadPhoto"
                    accept="image/*"
                    onChange={(e) =>
                      setFieldValue("uploadPhoto", e.currentTarget.files[0])
                    }
                  />
                </label>
              </div>
            </div>

            {/* Met With */}
            <Field
              name="metWith"
              component={CustomInput}
              placeholder="Met With"
            />

            {/* Initiated By */}
            <Field
              name="initiatedBy"
              component={CustomSelect}
              placeholder="Initiated By"
            >
              {initiatedByOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Field>

            {/* Where did you meet */}
            <Field
              name="whereYouMeet"
              component={CustomInput}
              placeholder="Where did you meet?"
            />

            {/* Date */}
            <Field
              name="date"
              component={CustomInput}
              type="date"
              placeholder="Select Date"
            />

            {/* Topic of Conversation */}
            <Field
              name="twc"
              component={CustomTextarea}
              placeholder="Topic of Conversation"
              rows={3}
            />

            <button
              type="submit"
              className=" mx-auto block w-50 px-6 py-2 bg-primary-200 text-white rounded-full"
            >
              {record ? "Save Changes" : "Add"}
            </button>

          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default AddEditModal;
