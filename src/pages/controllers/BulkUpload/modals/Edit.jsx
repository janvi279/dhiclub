import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomInput from "../../../../components/common/CustomInput";
import CustomSelect from "../../../../components/common/CustomSelect";

const EditBulkUploadModal = ({ isOpen, onClose, onSave, initialData }) => {
    const validationSchema = Yup.object({
        country: Yup.string().required("Country is required"),
        countryCode: Yup.string().required("Country Code is required"),
        countryCurrency: Yup.string().required("Currency is required"),
        state: Yup.string().required("State is required"),
        stateCode: Yup.string().required("State Code is required"),
        city: Yup.string().required("City is required"),
        cityCode: Yup.string().required("City Code is required"),
        pinCode: Yup.string().required("Pin Code is required"),

    });

    const handleSubmit = (values) => {
        onSave(values);
        onClose();
    };

    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Edit Bulk Upload">
            <Formik
                initialValues={initialData}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={handleSubmit}
            >
                <Form className="grid grid-cols-2 gap-4">
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
                        Save Changes
                    </button>

                </Form>
            </Formik>
        </CustomModal>
    );
};

export default EditBulkUploadModal;
