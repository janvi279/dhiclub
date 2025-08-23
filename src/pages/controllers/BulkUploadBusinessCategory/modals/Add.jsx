import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomInput from "../../../../components/common/CustomInput";

const AddBulkUploadModal = ({ isOpen, onClose, onSave }) => {
    const validationSchema = Yup.object({
        businessType: Yup.string().required("Business Type is required"),
        businessDomain: Yup.string().required("Business Domain is required"),
        businessCategory: Yup.string().required("Business Category is required"),
    });
    const initialValues = {
        businessType: "", 
        businessDomain: "", 
        businessCategory: "",
        status: "Active",
        createdAt: new Date().toISOString(),
    };

    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Add Bulk Upload">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    onSave(values);
                    onClose();
                }}
            >
                {() => (
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
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </CustomModal>
    );
};

export default AddBulkUploadModal;
