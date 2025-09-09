import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomSelect from "../../../../components/common/CustomSelect";
import CustomInput from "../../../../components/common/CustomInput";
import {
    CountrySelect,
    StateSelect,
    CitySelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { useState } from "react";

const AddEditModal = ({ isOpen, onClose, onSave, city }) => {
    // Local state for dynamic selects
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

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

                        <CountrySelect
                            onChange={(country) => {
                                setSelectedCountry(country);
                                setFieldValue("country", country.name);
                                setFieldValue("state", "");
                                setFieldValue("cityName", "");
                                setFieldValue("cityCode", "");
                            }}
                            placeHolder="Select Country"
                            defaultValue={selectedCountry}
                            searchable={false}
                            style={{ border: 'none', outline: 'none', padding: "3px" }}
                        />


                        {/* State */}

                        <StateSelect
                            countryid={selectedCountry?.id}
                            onChange={(state) => {
                                setSelectedState(state);
                                setFieldValue("state", state.name);
                                setFieldValue("cityName", "");
                                setFieldValue("cityCode", "");
                            }}
                            placeHolder="Select State"
                            defaultValue={selectedState}
                            style={{ border: 'none', outline: 'none', padding: "3px" }}
                        />


                        {/* City */}

                        <CitySelect
                            countryid={selectedCountry?.id}
                            stateid={selectedState?.id}
                            onChange={(cityObj) => {
                                setSelectedCity(cityObj);
                                setFieldValue("cityName", cityObj.name);
                                // Auto generate city code (first 3 letters uppercase)
                                setFieldValue(
                                    "cityCode",
                                    cityObj.name.slice(0, 3).toUpperCase()
                                );
                            }}
                            placeHolder="Select City"
                            defaultValue={selectedCity}
                            style={{ border: 'none', outline: 'none', padding: "3px" }}
                        />


                        {/* City Code (auto filled) */}
                        <Field
                            name="cityCode"
                            component={CustomInput}
                            required
                            placeholder="City Code"
                            value={values.cityCode}
                            readOnly
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