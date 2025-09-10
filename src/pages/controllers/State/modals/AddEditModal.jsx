import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomInput from "../../../../components/common/CustomInput";
import { CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const AddEditModal = ({ isOpen, onClose, onSave, state }) => {

  const validationSchema = Yup.object({
    country: Yup.object().nullable().required("Country is required"),
    state: Yup.object().nullable().required("State is required"),
    stateCode: Yup.string().trim().required("State Code is required"),
  });

  const initialValues = state
    ? {
      country: state.countryId
        ? { id: state.countryId, name: state.countryName, iso2: state.countryIso2 }
        : null,
      state: state.stateId
        ? { id: state.stateId, name: state.stateName, state_code: state.stateCode }
        : null,
      stateCode: state.stateCode || "",
      status: state.status || "Active",
      createdAt: state.createdAt || new Date().toISOString(),
    }
    : {
      country: null,
      state: null,
      stateCode: "",
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
      stateCode: values.stateCode,
      createdAt: values.createdAt,
      status: values.status,
    };
    onSave(payload);
    resetForm();
    onClose();
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={state ? "Edit State" : "Add State"}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form className="flex flex-col gap-4">

            {/* Country */}
            <div>
              <CountrySelect
                onChange={(country) => {
                  setFieldValue("country", country);
                  setFieldValue("state", null);
                  setFieldValue("stateCode", "");
                }}
                defaultValue={values.country}
                placeHolder="Select Country"
                style={{ border: 'none', outline: 'none', padding: "3px" }}
              />
              <ErrorMessage
                name="country"
                component="div"
                className="text-[#D34053] text-sm mt-1"
              />
            </div>

            {/* State */}
            <div>
              <StateSelect
                countryid={values.country?.id}
                onChange={(stateObj) => {
                  setFieldValue("state", stateObj);
                  setFieldValue("stateCode", stateObj?.state_code || "");
                }}
                defaultValue={values.state}
                placeHolder="Select State"
                style={{ border: 'none', outline: 'none', padding: "3px" }}
              />
              <ErrorMessage
                name="state"
                component="div"
                className="text-[#D34053] text-sm mt-1"
              />
            </div>


            <Field
              name="stateCode"
              component={CustomInput}
              placeholder="Enter State Code"
              className={`w-full ${errors.stateCode && touched.stateCode ? "border border-red-500" : ""}`}
            />



            {/* Submit */}
            <div className="mt-4">
              <button
                type="submit"
                className="w-40 mx-auto block bg-primary-200 text-white py-2 rounded-full"
              >
                {state ? "Update" : "Submit"}
              </button>
            </div>

          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default AddEditModal;
