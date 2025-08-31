import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomInput from "../../../../components/common/CustomInput";
import CustomSelect from "../../../../components/common/CustomSelect";


const EditBusinessDomainModal = ({ isOpen, onClose, onSave, domain }) => {

    const businessTypes = ["Tiles", "Ceramic", "Sanitary"];

    const validationSchema = Yup.object({
        type: Yup.string().required("Business Type is required"),
        name: Yup.string().trim().required("Business Domain is required"),
    });

    const handleSubmit = (values, { resetForm }) => {
        onSave({ ...domain, ...values });
        resetForm();
        onClose();
    };

    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Edit Business Domain">
            <Formik
                initialValues={{
                    type: domain?.type || "",
                    name: domain?.name || "",
                }}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={handleSubmit}
            >

                <Form className="flex flex-col gap-4">

                    <Field
                        name="type"
                        component={CustomSelect}
                        required
                        placeholder="Select Business Type"
                    >
                        {businessTypes.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </Field>
                    <Field
                        name="name"
                        component={CustomInput}
                        required
                        placeholder="Enter Business Domain"
                    />
                    <button
                        type="submit"
                        className="w-50 mx-auto block bg-primary-200 text-white py-2 rounded-full"
                    >
                        Save Changes
                    </button>
                </Form>

            </Formik>
        </CustomModal>
    );
};

export default EditBusinessDomainModal;
