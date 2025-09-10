import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomInput from "../../../../components/common/CustomInput";
import {
    CountrySelect,
    StateSelect,
    CitySelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const AddEditModal = ({ isOpen, onClose, onSave, city }) => {
    const validationSchema = Yup.object({
        country: Yup.object().required("Country is required"),
        state: Yup.object().required("State is required"),
        city: Yup.object().required("City is required"),
        cityCode: Yup.string().trim().required("City Code is required"),
    });

    // ✅ Business type jaisi simple initial values
    const initialValues = city ? {
        country: city.countryId ? {
            id: city.countryId,
            name: city.countryName,
            iso2: city.countryIso2
        } : null,
        state: city.stateId ? {
            id: city.stateId,
            name: city.stateName,
            state_code: city.stateCode
        } : null,
        city: city.cityId ? {
            id: city.cityId,
            name: city.cityName
        } : null,
        cityCode: city.cityCode || "",
        status: city.status || "Active",
        createdAt: city.createdAt || new Date().toISOString(),
    } : {
        country: null,
        state: null,
        city: null,
        cityCode: "",
        status: "Active",
        createdAt: new Date().toISOString(),
    };

    const handleSubmit = (values, { resetForm }) => {
        const payload = {
            countryId: values.country?.id,
            countryName: values.country?.name,
            countryIso2: values.country?.iso2,
            stateId: values.state?.id,
            stateName: values.state?.name,
            stateCode: values.state?.state_code,
            cityId: values.city?.id,
            cityName: values.city?.name,
            cityCode: values.cityCode,
            status: values.status,
            createdAt: values.createdAt,
        };
        onSave(payload);
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
                enableReinitialize  // ✅ Aa important che editing ke liye
            >
                {({ setFieldValue, values }) => (
                    <Form className="flex flex-col gap-4">
                        <div>
                            <CountrySelect
                                onChange={(country) => {
                                    setFieldValue("country", country);
                                    setFieldValue("state", null);
                                    setFieldValue("city", null);
                                    setFieldValue("cityCode", "");
                                }}
                                placeHolder="Select Country"
                                defaultValue={values.country}  // ✅ defaultValue nahi, value use karo
                                style={{ border: 'none', outline: 'none', padding: "3px" }}
                            />
                            <ErrorMessage
                                name="country"
                                component="div"
                                className="text-[#D34053] text-sm sm:text-base "
                            />
                        </div>
                        <div>

                            <StateSelect
                                countryid={values.country?.id}
                                onChange={(state) => {
                                    setFieldValue("state", state);
                                    setFieldValue("city", null);
                                    setFieldValue("cityCode", "");
                                }}
                                placeHolder="Select State"
                                defaultValue={values.state}  // ✅ defaultValue nahi, value use karo
                                style={{ border: 'none', outline: 'none', padding: "3px" }}
                            />
                            <ErrorMessage
                                name="state"
                                component="div"
                                className="text-[#D34053] text-sm sm:text-base "
                            />
                        </div>
                        <div>
                            <CitySelect
                                countryid={values.country?.id}
                                stateid={values.state?.id}
                                onChange={(cityObj) => {
                                    setFieldValue("city", cityObj);
                                    // Auto generate city code
                                    const generatedCode = cityObj?.name ? cityObj.name.slice(0, 3).toUpperCase() : "";
                                    setFieldValue("cityCode", generatedCode);
                                }}
                                placeHolder="Select City"
                                defaultValue={values.city}  // ✅ defaultValue nahi, value use karo
                                style={{ border: 'none', outline: 'none', padding: "3px" }}
                            />
                            <ErrorMessage
                                name="cityCode"
                                component="div"
                                className="text-[#D34053] text-sm sm:text-base "
                            />
                        </div>
                        <Field
                            name="cityCode"
                            component={CustomInput}
                            required
                            placeholder="City Code"
                            readOnly
                        />

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