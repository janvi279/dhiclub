import { Formik, Form,Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomInput from "../../../../components/common/CustomInput";
import CustomSelect from "../../../../components/common/CustomSelect";

const businessTypes = ["Tiles", "Ceramic", "Sanitary"];

const validationSchema = Yup.object({
    type: Yup.string().required("Business Type is required"),
    name: Yup.string().trim().required("Business Domain Name is required"),
});

const AddBusinessDomainModal = ({ isOpen, onClose, onSave }) => {
    const initialValues = {
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
        <CustomModal isOpen={isOpen} onClose={onClose} title="Add Business Domain">
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
                            required
                            placeholder="Select Business Type"
                        >
                            {businessTypes.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </Field>

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
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </CustomModal>
    );
};

export default AddBusinessDomainModal;
