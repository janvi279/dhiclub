// Step1Modal.jsx
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomInput from "../../../../components/common/CustomInput";

const Step1Modal = ({ newResponsibility, setNewResponsibility, setStep }) => {
    const validationSchema = Yup.object({
        memberId: Yup.string().trim().required("Member Id is required"),
    });

    const initialValues = {
        memberId: newResponsibility?.memberId || "",

    };

    const handleSubmit = (values) => {
        // save current step1 values to parent temp state then go to step2
        setNewResponsibility((prev) => ({ ...(prev || {}), ...values }));
        setStep(2);
    };

    return (
        <CustomModal isOpen={true} onClose={() => setStep(0)} title="Assign The Role">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
                <Form className="flex flex-col gap-4">
                    <Field name="memberId" component={CustomInput} required placeholder="Enter Member ID" label="Member ID" />


                    <div className="flex gap-5">
                        <button type="submit" className="w-32 bg-primary-200 text-white py-2 rounded-full">
                            Next
                        </button>
                        <button type="button" onClick={() => setStep(0)} className="w-32 border border-primary-200 text-primary-200 font-semibold py-2 rounded-full">
                            Cancel
                        </button>
                    </div>
                </Form>
            </Formik>
        </CustomModal>
    );
};

export default Step1Modal;
