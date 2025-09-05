import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomInput from "../../../../components/common/CustomInput";
import CustomSelect from "../../../../components/common/CustomSelect";

const businessTypes = ["Tiles", "Ceramic", "Sanitary"];

const validationSchema = Yup.object({
    type: Yup.string().required("Business Type is required"),
    name: Yup.string().trim().required("Business Domain Name is required"),
});

const AddEditModal = ({ isOpen, onClose, onSave, domain }) => {
    const initialValues = domain || {
        type: "",
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
        <CustomModal isOpen={isOpen} onClose={onClose} title={domain ? "Edit Business Domain" : "Add Business Domain"}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form className="flex flex-col gap-4">
                        {/* Business Type */}

                        <Field
                            name="type"
                            component={CustomSelect}
                            options={businessTypes.map((s) => ({
                                value: s,
                                label: s,
                            }))}
                            required
                            placeholder="Select Business Type"
                        />


                        {/* Business Domain Name */}
                        <Field
                            name="name"
                            component={CustomInput}
                            required
                            placeholder="Enter Business Domain"
                        />

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-50 mx-auto block bg-primary-200 text-white py-2 rounded-full"
                        >
                            {domain ? "Update" : "Submit"}
                        </button>
                    </Form>
                )}
            </Formik>
        </CustomModal>
    );
};

export default AddEditModal;
