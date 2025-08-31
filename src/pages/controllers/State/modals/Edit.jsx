import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomInput from "../../../../components/common/CustomInput";
import CustomSelect from "../../../../components/common/CustomSelect";

const EditStateModal = ({ isOpen, state, onClose, onSave }) => {
    const countries = ["INDIA", "USA", "UK"];
    const states = ["Gujarat", "Maharashtra", "Delhi"];

    const validationSchema = Yup.object({
        countryName: Yup.string().trim().required("Country Name is required"),
        stateName: Yup.string().trim().required("City Name is required"),
        stateCode: Yup.string().trim().required("City Code is required"),
    });

    const initialValues = {
        countryName: state.countryName || "",
        stateName: state.stateName || "",
        stateCode: state.stateCode || "",
    };

    const handleSubmit = (values, { resetForm }) => {
        onSave({ ...state, ...values });
        resetForm();
        onClose();
    };

    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Edit State">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="flex flex-col gap-4">
                    {/* City Name */}
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

export default EditStateModal;
