// import { Formik, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useState } from "react";
// import CustomModal from "../../../../components/common/CustomModal";
// import { CountrySelect } from "react-country-state-city";
// import "react-country-state-city/dist/react-country-state-city.css";
// import axios from "axios";

// const AddEditModal = ({ isOpen, onClose, onSave, country }) => {
//   const [loadingCurrency, setLoadingCurrency] = useState(false);

//   const validationSchema = Yup.object().shape({
//     countryName: Yup.string().required("Country is required"),
//   });

//   const initialValues = {
//     id: country?.id || null,
//     countryName: country?.countryName || "",
//     countryCode: country?.countryCode || "",
//     currency: country?.currency || "",
//     status: country?.status || "Active",
//     createdAt: country?.createdAt || new Date().toISOString(),
//   };

//   // 🔹 Fetch currency by ISO2
// const fetchCurrency = async (iso2, setFieldValue) => {
//   console.log("iso2", iso2)
//   console.log("setfieldvalue", setFieldValue.currency)
//   if (!iso2) {
//     setFieldValue("currency", "");
//     return;
//   }
//   setLoadingCurrency(true);
//   try {
//     const res = await axios.get(`https://restcountries.com/v3.1/alpha/${iso2}`);
//     const countryData = res?.data?.[0];
//     console.log("countryData", countryData)
//     if (countryData?.currencies) {
//       const currencyCode = Object.keys(countryData.currencies)[0]; // e.g. INR
//       console.log("currencyCode", currencyCode)
//       const symbol = countryData.currencies[currencyCode]?.symbol || "";
//       console.log("symbol", symbol)
//       setFieldValue(
//         "currency",
//         symbol ? `${currencyCode} (${symbol})` : currencyCode
//       );
//     } else {
//       console.log("else come")
//       setFieldValue("currency", "");
//     }
//   } catch (err) {
//     console.error("fetchCurrency error:", err?.response ?? err);
//     setFieldValue("currency", "");
//   } finally {
//     setLoadingCurrency(false);
//   }
// };

//   const handleSubmit = (values, { resetForm }) => {
//     const payload = {
//       id: values.id || Date.now(),
//       countryName: values.countryName,
//       countryCode: values.countryCode,
//       currency: values.currency,
//       status: values.status,
//       createdAt: values.createdAt,
//     };

//     onSave(payload);
//     resetForm();
//     onClose();
//   };

//   return (
//     <CustomModal
//       isOpen={isOpen}
//       onClose={onClose}
//       title={country ? "Edit Country" : "Add Country"}
//     >
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//         enableReinitialize
//       >

//         {({ setFieldValue, values }) => (

//           <Form className="flex flex-col gap-4">
//             <CountrySelect
//               onChange={(selected) => {
//                 setFieldValue("countryName", selected?.name || "");
//                 setFieldValue("countryCode", selected?.iso2 || "");
//                 fetchCurrency(selected?.iso2, setFieldValue);
//               }}
//               value={
//                 values.countryName
//                   ? { name: values.countryName, iso2: values.countryCode }
//                   : null
//               }
//               placeHolder="Select Country"
//               style={{
//                 border: "none",
//                 outline: "none",
//                 padding: "3px",
//               }}
//             />
//             <ErrorMessage
//               name="countryName"
//               component="div"
//               className="text-[#D34053] text-sm mt-1"
//             />

//             {/* Country Code */}
//             <input
//               type="text"
//               name="countryCode"
//               value={values.countryCode}
//               placeholder="Country Code"
//               readOnly
//               className="border border-gray-300 rounded p-2 w-full"
//             />

//             {/* Currency */}
//             <input
//               type="text"
//               name="currency"
//               value={values.currency}
//               readOnly
//               placeholder="Currency"
//               className="border rounded p-2 w-full border-gray-300"
//             />
//             <div className="mt-4">
//               <button
//                 type="submit"
//                 className="w-50 mx-auto block bg-primary-200 text-white py-2 rounded-full"
//                 disabled={loadingCurrency}
//               >
//                 {country ? "Update" : "Submit"}
//               </button>
//             </div>
//           </Form>

//         )}
//       </Formik>
//     </CustomModal>
//   );
// };

// export default AddEditModal;

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

  // ✅ Normalize incoming data for edit mode
  const initialValues = {
    countryName: country?.countryName || "",
    countryCode: country?.countryCode || "",
    currency: country?.currency || "",

  };

  const fetchCurrency = async (iso2, setFieldValue) => {
    console.log("iso2", iso2)
    console.log("setfieldvalue", setFieldValue.currency)
    if (!iso2) {
      setFieldValue("currency", "");
      return;
    }
    setLoadingCurrency(true);
    try {
      const res = await axios.get(`https://restcountries.com/v3.1/alpha/${iso2}`);
      const countryData = res?.data?.[0];
      console.log("countryData", countryData)
      if (countryData?.currencies) {
        const currencyCode = Object.keys(countryData.currencies)[0]; // e.g. INR
        console.log("currencyCode", currencyCode)
        const symbol = countryData.currencies[currencyCode]?.symbol || "";
        console.log("symbol", symbol)
        setFieldValue(
          "currency",
          symbol ? `${currencyCode} (${symbol})` : currencyCode
        );
      } else {
        console.log("else come")
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
      countryName: values.countryName,
      countryCode: values.countryCode,
      currency: values.currency,



    };
    console.log("Form Data:", payload);
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
                  setFieldValue("countryCode", selected?.iso2 || "");
                  fetchCurrency(selected?.iso2, setFieldValue);
                }}
                defaultValue={
                  values.countryName

                }

                placeHolder="Select Country"
                style={{
                  border: "none",
                  outline: "none",
                  padding: "3px",
                }}
              />
              <ErrorMessage
                name="countryName"
                component="div"
                className="text-[#D34053] text-sm mt-1"
              />
            </div>

            {/* Country Code */}
            <input
              type="text"
              name="countryCode"
              value={values.countryCode}
              placeholder="Country Code"
              readOnly
              className="border border-gray-300 rounded p-2 w-full"
            />

            {/* Currency */}
            <input
              type="text"
              name="currency"
              value={values.currency}
              readOnly
              placeholder="Currency"
              className="border rounded p-2 w-full border-gray-300"
            />

            <div className="mt-4">
              <button
                type="submit"
                className="w-50 mx-auto block bg-primary-200 text-white py-2 rounded-full"
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
