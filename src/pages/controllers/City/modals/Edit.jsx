import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomInput from "../../../../components/common/CustomInput";

const EditCityModal = ({ isOpen, city, onClose, onSave }) => {
    const validationSchema = Yup.object({
        cityName: Yup.string().trim().required("City Name is required"),
        cityCode: Yup.string().trim().required("City Code is required"),
    });

    const initialValues = {
        cityName: city.cityName || "",
        cityCode: city.cityCode || "",
    };

    const handleSubmit = (values, { resetForm }) => {
        onSave({ ...city, ...values });
        resetForm();
        onClose();
    };

    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Edit City">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="flex flex-col gap-4">
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

export default EditCityModal;
