import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomInput from "../../../../components/common/CustomInput";

const validationSchema = Yup.object({
    name: Yup.string().trim().required("Category Name is required"),
});

const EditBusinessCategoryModal = ({ isOpen, onClose, onSave, category }) => {
    const initialValues = {
        id: category.id,
        name: category.name,
        type:category.type,
        domain:category.domain,
        status: category.status,
        createdAt: category.createdAt,
    };

    const handleSubmit = (values) => {
        onSave(values);
        onClose();
    };

    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Edit Business Category">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form className="flex flex-col gap-4">

                        <Field
                            name="type"
                            component={CustomInput}
                            required
                            placeholder="Enter Business Type"
                        />
                        <Field
                            name="domain"
                            component={CustomInput}
                            required
                            placeholder="Enter Business Domain"
                        />
                        <Field
                            name="name"
                            component={CustomInput}
                            required
                            placeholder="Enter Business Category"
                        />

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-50 mx-auto block bg-primary-200 text-white py-2 rounded-full"
                        >
                            Update
                        </button>
                    </Form>
                )}
            </Formik>
        </CustomModal>
    );
};

export default EditBusinessCategoryModal;
