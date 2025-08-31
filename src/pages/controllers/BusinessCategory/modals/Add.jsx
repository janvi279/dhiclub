import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomInput from "../../../../components/common/CustomInput";

const validationSchema = Yup.object({
    name: Yup.string().trim().required("Category Name is required"),
});

const AddBusinessCategoryModal = ({ isOpen, onClose, onSave }) => {
    const initialValues = {
        name: "",
        type:"",
        domain:"",
        status: "Active",
        createdAt: new Date().toISOString(),
    };

    const handleSubmit = (values, { resetForm }) => {
        onSave(values);
        resetForm();
        onClose();
    };

    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Add Business Category">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form className="flex flex-col gap-4">
                      
                        <Field
                            name="type"
                            component={CustomInput}
                            required
                            placeholder="Enter Business Type"
                        />
                        <Field
                            name="domain"
                            component={CustomInput}
                            required
                            placeholder="Enter Business Domain"
                        />
                        <Field
                            name="name"
                            component={CustomInput}
                            required
                            placeholder="Enter Business Category"
                        />

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-50 mx-auto block bg-primary-200 text-white py-2 rounded-full"
                        >
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </CustomModal>
    );
};

export default AddBusinessCategoryModal;
