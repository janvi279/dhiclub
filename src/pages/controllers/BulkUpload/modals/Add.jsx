import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomInput from "../../../../components/common/CustomInput";
import CustomSelect from "../../../../components/common/CustomSelect";

const Add = ({ isOpen, onClose, onSave }) => {
    const validationSchema = Yup.object({
        country: Yup.string().required("Country is required"),
        countryCode: Yup.string().required("Country Code is required"),
        countryCurrency: Yup.string().required("Currency is required"),
        state: Yup.string().required("State is required"),
        stateCode: Yup.string().required("State Code is required"),
        city: Yup.string().required("City is required"),
        cityCode: Yup.string().required("City Code is required"),
        pinCode: Yup.string().required("Pin Code is required"),
        status: Yup.string().required("Status is required"),
    });

    const initialValues = {
        country: "",
        countryCode: "",
        countryCurrency: "",
        state: "",
        stateCode: "",
        city: "",
        cityCode: "",
        pinCode: "",
        status: "Active",
        createdAt: new Date().toISOString(),
    };

    const handleSubmit = (values, { resetForm }) => {
        onSave(values);
        resetForm();
        onClose();
    };

    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Add Bulk Upload">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="grid grid-cols-2 gap-4">
                    {/* Using Field with CustomInput */}
                    <Field
                        name="country"
                        placeholder="Country"
                        component={CustomInput}
                    />
                    <Field
                        name="countryCode"
                        placeholder="Country Code"
                        component={CustomInput}
                    />
                    <Field
                        name="countryCurrency"
                        placeholder="Currency"
                        component={CustomInput}
                    />
                    <Field
                        name="state"
                        placeholder="State"
                        component={CustomInput}
                    />
                    <Field
                        name="stateCode"
                        placeholder="State Code"
                        component={CustomInput}
                    />
                    <Field
                        name="city"
                        placeholder="City"
                        component={CustomInput}
                    />
                    <Field
                        name="cityCode"
                        placeholder="City Code"
                        component={CustomInput}
                    />
                    <Field
                        name="pinCode"
                        placeholder="Pin Code"
                        component={CustomInput}
                    />

                    <button
                        type="submit"
                        className="col-span-2 mx-auto bg-primary-200 text-white py-2 rounded-full w-50 text-center "
                    >
                        Submit
                    </button>

                </Form>
            </Formik>
        </CustomModal>
    );
};

export default Add;
