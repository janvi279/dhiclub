import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomInput from "../../../../components/common/CustomInput";

const EditBulkUploadModal = ({ isOpen, onClose, onSave, initialData }) => {
    const validationSchema = Yup.object({
        businessType: Yup.string().required("Business Type is required"),
        businessDomain: Yup.string().required("Business Domain is required"),
        businessCategory: Yup.string().required("Business Category is required"),
    });
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Edit Bulk Upload">
            <Formik
                initialValues={initialData}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    onSave(values);
                    onClose();
                }}
            >
                <Form className="space-y-4">
                    {/* Business Type */}
                    <Field
                        name="businessType"
                        component={CustomInput}
                        required
                        placeholder="Enter Business Type"
                        label="Business Type"
                    />

                    {/* Business Domain */}
                    <Field
                        name="businessDomain"
                        component={CustomInput}
                        required
                        placeholder="Enter Business Domain"
                        label="Business Domain"
                    />

                    {/* Business Category */}
                    <Field
                        name="businessCategory"
                        component={CustomInput}
                        required
                        placeholder="Enter Business Category"
                        label="Business Category"
                    />

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="w-50 mx-auto block bg-primary-200 text-white py-2 rounded-full"
                        >
                            Save Changes
                        </button>
                    </div>
                </Form>
            </Formik>
        </CustomModal>
    );
};

export default EditBulkUploadModal;
