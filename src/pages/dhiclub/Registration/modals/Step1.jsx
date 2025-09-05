import { Field } from "formik";
import CustomSelect from "../../../../components/common/CustomSelect";
import CustomRadioButton from "../../../../components/common/CustomRadioButton";

const Step1 = ({ countries, states, cities, businessDomains, navigate }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="max-w-md">
          <label className="block mb-2 text-primary-150 font-semibold text-md">
            Select Country
          </label>
          <Field name="country" component={CustomSelect} placeholder="Select Country">
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Field>
        </div>

        <div className="max-w-md">
          <label className="block mb-2 text-primary-150 font-semibold text-md">
            Select State
          </label>
          <Field name="state" component={CustomSelect} placeholder="Select State">
            {states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Field>
        </div>

        <div className="max-w-md">
          <label className="block mb-2 text-primary-150 font-semibold text-md">
            Select City
          </label>
          <Field name="city" component={CustomSelect} placeholder="Select City">
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Field>
        </div>

        <div className="max-w-md">
          <label className="block mb-2 text-primary-150 font-semibold text-md">
            Select Business Domain
          </label>
          <Field name="businessDomain" component={CustomSelect} placeholder="Select Business Domain">
            {businessDomains.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </Field>
        </div>
      </div>

      <div className="mt-8">
        <label className="block mb-2 text-primary-150 font-semibold text-md">
          Select Forum
        </label>
        <div className="flex items-center gap-5">
          <Field name="forum" component={CustomRadioButton} value="Shakti" label="Shakti" />
          <Field name="forum" component={CustomRadioButton} value="Laxmi" label="Laxmi" />
        </div>
      </div>

      <div className="flex items-center gap-4 mt-8">
        <button
          type="submit"
          className="bg-primary-200 text-white px-8 py-2 rounded-full font-semibold"
        >
          Next
        </button>
        <button
          type="button"
          onClick={() => navigate("/Dhiclub/members")}
          className="border border-[#44C5FF] px-8 py-2 rounded-full text-primary-200 font-semibold"
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default Step1;
