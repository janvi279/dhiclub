import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomSelect from "../../../../components/common/CustomSelect";
import CustomInput from "../../../../components/common/CustomInput";

const AddEditModal = ({ isOpen, onClose, onSave, city }) => {
    const countries = ["INDIA", "USA", "UK"];
    const states = ["Gujarat", "Maharashtra", "Delhi"];

    // 🔹 Cities with codes mapped
    const cities = [
        { value: "Rajkot", label: "Rajkot", code: "RAJ" },
        { value: "Ahmedabad", label: "Ahmedabad", code: "AMD" },
        { value: "Surat", label: "Surat", code: "ST" },
    ];

    const validationSchema = Yup.object({
        country: Yup.string().required("Country is required"),
        state: Yup.string().required("State is required"),
        cityName: Yup.string().trim().required("City Name is required"),
        cityCode: Yup.string().trim().required("City Code is required"),
    });

    const initialValues = city || {
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
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            title={city ? "Edit City" : "Add City"}
        >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, values }) => (
                    <Form className="flex flex-col gap-4">
                        {/* Country */}
                        <Field
                            name="country"
                            component={CustomSelect}
                            options={countries.map((c) => ({
                                value: c,
                                label: c,
                            }))}
                            required
                            placeholder="Select Country"
                        />

                        {/* State */}
                        <Field
                            name="state"
                            component={CustomSelect}
                            options={states.map((s) => ({
                                value: s,
                                label: s,
                            }))}
                            required
                            placeholder="Select State"
                        />

                        {/* City Name */}
                        <Field
                            name="cityName"
                            component={CustomSelect}
                            options={cities.map((c) => ({
                                value: c.value,
                                label: c.label,
                            }))}
                            required
                            placeholder="Select City Name"
                            onChange={(option) => {
                                setFieldValue("cityName", option.value);
                                // 🔹 auto set cityCode based on city selected
                                const selected = cities.find((c) => c.value === option.value);
                                if (selected) {
                                    setFieldValue("cityCode", selected.code);
                                }
                            }}
                        />

                        {/* City Code (auto filled) */}
                        <Field
                            name="cityCode"
                            component={CustomInput}
                            required
                            placeholder="City Code"
                            value={values.cityCode}
                            readOnly // prevent manual editing
                        />

                        {/* Submit Button */}
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="w-50 mx-auto block bg-primary-200 text-white py-2 rounded-full"
                            >
                                {city ? "Update" : "Submit"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </CustomModal>
    );
};

export default AddEditModal;
