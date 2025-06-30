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
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">CONTROLLERS</h2>

      <form className="space-y-4">
        <div className="grid gap-5">
          <div>
            <label className="block mb-1 font-semibold">Country:</label>
            <select className="w-full border px-3 py-2 rounded">
              <option>Select Country</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">State:</label>
            <select className="w-full border px-3 py-2 rounded">
              <option>Select State</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">City:</label>
            <select className="w-full border px-3 py-2 rounded">
              <option>Select City</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Business Type:</label>
            <select className="w-full border px-3 py-2 rounded">
              <option>Select City</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block mb-1 font-semibold">Business Domain:</label>
            <select className="w-full border px-3 py-2 rounded">
              <option>Select Business Domain</option>
            </select>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-[#6246EA] text-white px-6 py-2 rounded hover:bg-purple-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>

  );
};

export default Country;
