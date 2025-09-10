import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import CustomModal from "../../../../components/common/CustomModal";
import { CountrySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import axios from "axios";

const AddEditModal = ({ isOpen, onClose, onSave, country }) => {
  const [loadingCurrency, setLoadingCurrency] = useState(false);

  const validationSchema = Yup.object().shape({
    countryName: Yup.string().required("Country is required"),
  });

  // ✅ Include ID for edit mode
  const initialValues = {
    id: country?.id || null,
    countryName: country?.countryName || "",
    countryCode: country?.countryCode || "",
    currency: country?.currency || "",
    status: country?.status || "Active",
    createdAt: country?.createdAt || new Date().toISOString(),
  };

  const fetchCurrency = async (iso2, setFieldValue) => {
    if (!iso2) {
      setFieldValue("currency", "");
      return;
    }
    setLoadingCurrency(true);
    try {
      const res = await axios.get(`https://restcountries.com/v3.1/alpha/${iso2}`);
      const countryData = res?.data?.[0];
      if (countryData?.currencies) {
        const currencyCode = Object.keys(countryData.currencies)[0];
        const symbol = countryData.currencies[currencyCode]?.symbol || "";
        setFieldValue(
          "currency",
          symbol ? `${currencyCode} (${symbol})` : currencyCode
        );
      } else {
        setFieldValue("currency", "");
      }
    } catch (err) {
      console.error("fetchCurrency error:", err?.response ?? err);
      setFieldValue("currency", "");
    } finally {
      setLoadingCurrency(false);
    }
  };

  const handleSubmit = (values, { resetForm }) => {
    const payload = {
      id: values.id || Date.now(), // Generate ID if new country
      countryName: values.countryName,
      countryCode: values.countryCode,
      currency: values.currency,
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
      title={country ? "Edit Country" : "Add Country"}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ setFieldValue, values }) => (
          <Form className="flex flex-col gap-4">
            {/* CountrySelect */}
            <div>
              <CountrySelect
                onChange={(selected) => {
                  setFieldValue("countryName", selected?.name || "");
                  setFieldValue("countryCode", selected?.iso2?.toUpperCase() || "");
                  fetchCurrency(selected?.iso2, setFieldValue);
                }}
                defaultValue={
                  values.countryName && values.countryCode
                    ? { name: values.countryName, iso2: values.countryCode }
                    : null
                }
                placeHolder="Select Country"
                style={{ border: 'none', outline: 'none', padding: "3px" }}
              />
              <ErrorMessage
                name="countryName"
                component="div"
                className="text-[#D34053] text-sm mt-1"
              />
            </div>

            {/* Country Code */}
            <div>
              <input
                type="text"
                name="countryCode"
                value={values.countryCode}
                placeholder="Country Code"
                readOnly
                className="border border-gray-300 rounded p-2 w-full bg-gray-50"
              />
            </div>

            {/* Currency */}
            <div>
              <input
                type="text"
                name="currency"
                value={loadingCurrency ? "Loading..." : values.currency}
                readOnly
                placeholder="Currency"
                className="border rounded p-2 w-full border-gray-300 bg-gray-50"
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="w-50 mx-auto block bg-primary-200 text-white py-2 rounded-full "
                disabled={loadingCurrency}
              >
                {country ? "Update" : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default AddEditModal;