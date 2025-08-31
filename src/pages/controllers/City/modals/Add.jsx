import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomSelect from "../../../../components/common/CustomSelect";
import CustomInput from "../../../../components/common/CustomInput";

const AddCityModal = ({ isOpen, onClose, onSave }) => {
    const countries = ["INDIA", "USA", "UK"];
    const states = ["Gujarat", "Maharashtra", "Delhi"];

    const validationSchema = Yup.object({
        country: Yup.string().required("Country is required"),
        state: Yup.string().required("State is required"),
        cityName: Yup.string().trim().required("City Name is required"),
        cityCode: Yup.string().trim().required("City Code is required"),
    });

    const initialValues = {
        country: "",
        state: "",
        cityName: "",
        cityCode: "",
        status: "Active",
        createdAt: new Date().toISOString(),
    };

    const handleSubmit = (values, { resetForm }) => {
        onSave(values);
        resetForm();
        onClose();
    };

    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Add City">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="flex flex-col gap-4">
                    {/* Country */}
                    <Field
                        name="country"
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
                        name="state"
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

                    {/* City Name */}
                    <Field
                        name="cityName"
                        component={CustomInput}
                        required
                        placeholder="Enter City Name"
                    />

                    {/* City Code */}
                    <Field
                        name="cityCode"
                        component={CustomInput}
                        required
                        placeholder="Enter City Code"
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

export default AddCityModal;
