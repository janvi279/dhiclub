import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomInput from "../../../../components/common/CustomInput";
import CustomSelect from "../../../../components/common/CustomSelect";

const EditCountryModal = ({ isOpen, country, onClose, onSave }) => {
    const validationSchema = Yup.object({
        countryName: Yup.string().trim().required("Country Name is required"),
        countryCode: Yup.string().trim().required("Country Code is required"),
        currency: Yup.string().trim().required("Currency Code is required"),
    });

    const initialValues = {
        countryName: country.countryName || "",
        countryCode: country.countryCode || "",
        currency: country.currency || "",
    };

    const handleSubmit = (values, { resetForm }) => {
        onSave({ ...country, ...values });
        resetForm();
        onClose();
    };
    const currency = ["INR", "USD", "CAD", "EUR"];

    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Edit Country">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="flex flex-col gap-4">

                    <Field
                        name="countryName"
                        component={CustomInput}
                        required
                        placeholder="Enter Country Name"
                    />


                    <Field
                        name="countryCode"
                        component={CustomInput}
                        required
                        placeholder="Enter Country Code"
                    />
                    <Field
                        name="currency"
                        component={CustomSelect}
                        required
                        placeholder="Select Currency"
                    >
                        {currency.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </Field>

                    {/* Footer Buttons */}
                    <div className="mt-4">

                        <button
                            type="submit"
                            className="w-50 mx-auto block bg-primary-200 text-white py-2 rounded-full"
                        >
                            Save
                        </button>
                    </div>
                </Form>
            </Formik>
        </CustomModal>
    );
};

export default EditCountryModal;
