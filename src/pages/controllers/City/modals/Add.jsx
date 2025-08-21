import { useState } from "react";

const AddCityModal = ({ onClose, onSave }) => {
    const [form, setForm] = useState({ cityName: "", cityCode: "", state: "", country: "" });

    const countries = ["INDIA", "USA", "UK"];
    const states = ["Gujarat", "Maharashtra", "Delhi"];
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSave(form);
        onClose();
    };

    return (
        <div className="text-primary-150 fixed inset-0  bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded-2xl shadow-lg w-full max-w-md relative">
                <h2 className="text-xl font-semibold mb-3 text-center text-primary-150">
                    Add City
                </h2>
                <button
                    className="absolute top-3 right-3 text-xl"
                    onClick={onClose}
                >
                    ×
                </button>
                <select
                    name="country"

                    onChange={handleChange}
                    className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
                >
                    <option value="">Select Country</option>
                    {countries.map((cur) => (
                        <option key={cur} value={cur}>
                            {cur}
                        </option>
                    ))}
                </select>

                <select
                    name="state"

                    onChange={handleChange}
                    className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
                >
                    <option value="">Select State</option>
                    {states.map((cur) => (
                        <option key={cur} value={cur}>
                            {cur}
                        </option>
                    ))}
                </select>
                <input
                    name="cityName"
                    placeholder="Enter City Name"
                    onChange={handleChange}
                    className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
                />
                <input
                    name="cityCode"
                    placeholder="City Code"
                    onChange={handleChange}
                    className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
                />

                <button onClick={handleSubmit} className="w-50 mx-auto block bg-primary-200 text-white py-2 rounded-full">Save</button>

            </div>
        </div>
    );
};

export default AddCityModal;


// import { Formik, Form, Field, FormikProvider } from "formik";
// import * as Yup from "yup";

// const AddCityModal = ({ onClose, onSave }) => {
//   const countries = ["INDIA", "USA", "UK"];
//   const states = ["Gujarat", "Maharashtra", "Delhi"];

//   // ✅ Validation schema
//   const validationSchema = Yup.object({
//     country: Yup.string().required("Country is required"),
//     state: Yup.string().required("State is required"),
//     cityName: Yup.string().trim().required("City name is required"),
//     cityCode: Yup.string().trim().required("City code is required"),
//   });

//   const handleSubmit = (values, { resetForm }) => {
//     onSave(values);
//     resetForm();
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//       <div className="bg-white p-5 rounded-2xl shadow-lg w-full max-w-md relative">
//         <h2 className="text-xl font-semibold mb-3 text-center text-primary-150">
//           Add City
//         </h2>
//         <button
//           className="absolute top-3 right-3 text-xl"
//           onClick={onClose}
//         >
//           ×
//         </button>

//         {/* ✅ Formik Wrapper */}
//         <Formik
//           initialValues={{
//             country: "",
//             state: "",
//             cityName: "",
//             cityCode: "",
//           }}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {(formik) => (
//             <FormikProvider value={formik}>
//               <Form className="flex flex-col gap-4">
//                 {/* Country */}
//                 <div>
//                   <Field
//                     as="select"
//                     name="country"
//                     className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full"
//                   >
//                     <option value="">Select Country</option>
//                     {countries.map((cur) => (
//                       <option key={cur} value={cur}>
//                         {cur}
//                       </option>
//                     ))}
//                   </Field>
//                   {formik.touched.country && formik.errors.country && (
//                     <p className="text-red-500 text-sm mt-1">{formik.errors.country}</p>
//                   )}
//                 </div>

//                 {/* State */}
//                 <div>
//                   <Field
//                     as="select"
//                     name="state"
//                     className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full"
//                   >
//                     <option value="">Select State</option>
//                     {states.map((cur) => (
//                       <option key={cur} value={cur}>
//                         {cur}
//                       </option>
//                     ))}
//                   </Field>
//                   {formik.touched.state && formik.errors.state && (
//                     <p className="text-red-500 text-sm mt-1">{formik.errors.state}</p>
//                   )}
//                 </div>

//                 {/* City Name */}
//                 <div>
//                   <Field
//                     name="cityName"
//                     placeholder="Enter City Name"
//                     className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full"
//                   />
//                   {formik.touched.cityName && formik.errors.cityName && (
//                     <p className="text-red-500 text-sm mt-1">{formik.errors.cityName}</p>
//                   )}
//                 </div>

//                 {/* City Code */}
//                 <div>
//                   <Field
//                     name="cityCode"
//                     placeholder="City Code"
//                     className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full"
//                   />
//                   {formik.touched.cityCode && formik.errors.cityCode && (
//                     <p className="text-red-500 text-sm mt-1">{formik.errors.cityCode}</p>
//                   )}
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex justify-end gap-3 mt-4">
//                   <button
//                     type="button"
//                     onClick={onClose}
//                     className="px-4 py-2 border rounded"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={formik.isSubmitting}
//                     className="px-4 py-2 bg-primary-200 text-white rounded"
//                   >
//                     Save
//                   </button>
//                 </div>
//               </Form>
//             </FormikProvider>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default AddCityModal;

