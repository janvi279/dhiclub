import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomSelect from "../../../../components/common/CustomSelect";
import CustomInput from "../../../../components/common/CustomInput";

const AddStateModal = ({ isOpen, onClose, onSave }) => {
    const countries = ["INDIA", "USA", "UK"];
    const states = ["Gujarat", "Maharashtra", "Delhi"];

    const validationSchema = Yup.object({
        countryName: Yup.string().required("Country is required"),
        stateName: Yup.string().trim().required("State Name is required"),
        stateCode: Yup.string().trim().required("State Code is required"),
    });

    const initialValues = {
        countryName: "",
        stateName: "",
        stateCode: "",
        status: "Active",
        createdAt: new Date().toISOString(),
    };

    const handleSubmit = (values, { resetForm }) => {
        onSave(values);
        resetForm();
        onClose();
    };

    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Add State">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="flex flex-col gap-4">
                    {/* Country */}
                    <Field
                        name="countryName"
                        component={CustomSelect}
                        required
                        placeholder="Select Country"
                    >
                        {countries.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </Field>

                    {/* State */}
                    <Field
                        name="stateName"
                        component={CustomSelect}
                        required
                        placeholder="Select State"
                    >
                        {states.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </Field>




                    <Field
                        name="stateCode"
                        component={CustomInput}
                        required
                        placeholder="Enter State Code"
                    />

                    {/* Submit Button */}
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="w-50 mx-auto block bg-primary-200 text-white py-2 rounded-full"
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            </Formik>
        </CustomModal>
    );
};

export default AddStateModal;
