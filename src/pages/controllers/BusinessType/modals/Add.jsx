import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomInput from "../../../../components/common/CustomInput";

const AddBusinessTypeModal = ({ isOpen, onClose, onSave }) => {
    const validationSchema = Yup.object({
        name: Yup.string().trim().required("Business Type Name is required"),
    });

    const initialValues = {
        name: "",
        status: "Active",
        createdAt: new Date().toISOString(),
    };

    const handleSubmit = (values, { resetForm }) => {
        onSave(values);
        resetForm();
        onClose();
    };

    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Add Business Type">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form className="flex flex-col gap-4">
                    <Field
                        name="name"
                        component={CustomInput}
                        required
                        placeholder="Enter Business Type"
                    />

                    <div className="mt-4">
                        <button type="submit" className="w-50 mx-auto block bg-primary-200 text-white py-2 rounded-full">
                            Submit
                        </button>
                    </div>
                </Form>
            </Formik>
        </CustomModal>
    );
};

export default AddBusinessTypeModal;
