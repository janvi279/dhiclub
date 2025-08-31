import { Field, ErrorMessage } from "formik";
import CustomInput from "../../../../../components/common/CustomInput";

const AddressDetails = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-40 gap-y-5 max-w-5xl">

            <Field
                name="city"
                placeholder="Enter City"
                component={CustomInput}   // ✅ Custom Input use here
            />

            <Field
                name="state"
                placeholder="Enter State"
                component={CustomInput}   // ✅ Custom Input use here
            />
            <Field
                name="pincode"
                placeholder="Enter Pincode"
                component={CustomInput}   // ✅ Custom Input use here
            />

        </div>
    );
};

export default AddressDetails;
