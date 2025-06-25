import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    country: yup.string().required("Country is required"),
    state: yup.string().required("State is required"),
    city: yup.string().required("City is required"),
    businessType: yup.string().required("Business Type is required"),
    businessDomains: yup
        .array()
        .min(1, "Select at least one Business Domain")
        .required(),
});

const Country = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log("Submitted Data ✅", data);
    };

    const countries = ["India", "USA", "Canada"];
    const states = ["Gujarat", "Maharashtra", "California"];
    const cities = ["Rajkot", "Mumbai", "Los Angeles"];
    const businessTypes = ["Services", "Manufacturing"];
    const businessDomains = [
        "Information Technology",
        "Health Care",
        "Beauty",
        "Manufacturing",
        "Software Development",
        "Graphics",
        "Digital Marketing",
        "IT Consulting",
    ];

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">CONTROLLERS</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="">
                {/* Country */}
                <div className=" mb-4 flex items-center relative gap-5">
                    <label className="text-xl  whitespace-nowrap">Country :</label>

                    <select {...register("country")} className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" >
                        <option value="">Select Country</option>
                        {countries.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                    {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
                </div>



                {/* State */}

                <div className=" mb-4 flex items-center relative gap-5">
                    <label className="text-xl  whitespace-nowrap">State :</label>
                    <select {...register("state")} className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" >
                        <option value="">Select State</option>
                        {states.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                    {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                </div>
                {/* City */}
                <div className=" mb-4 flex items-center relative gap-5">
                    <label className="text-xl  whitespace-nowrap">City :</label>
                    <select {...register("city")} className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" >
                        <option value="">Select City</option>
                        {cities.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                    {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                </div>

                {/* Business Type */}

                <div className=" mb-4 flex items-center relative gap-5">
                    <label className="text-xl  whitespace-nowrap">Business Type  :</label>
                    <select {...register("businessTypes")} className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" >
                        <option value="">Select City</option>
                        {businessTypes.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                    {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                </div>

                {/* Business Domain (multiselect checkboxes) */}
                {/* <div className=" mb-4 flex items-center relative gap-5">
                    <label className="text-xl  whitespace-nowrap">Business Domain  :</label>
                    <select {...register("businessDomains")} className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" >
                        <option value="businessDomains">Select City</option>
                        {businessDomains.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                    {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                </div> */}
                <div className=" mb-4 flex items-center relative gap-5">
                    <label className="text-xl  whitespace-nowrap">Business Type  :</label>
                    <select {...register("businessTypes")} className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" >
                        <option value="">Select City</option>
                        {businessTypes.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                    {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                </div>  

                {/* Submit */}
                <div className="col-span-2 mt-4">
                    <button
                        type="submit"
                        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Country;
