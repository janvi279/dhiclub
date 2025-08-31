// components/common/CustomFilterSelect.jsx

const CustomFilterSelect = ({ value, onChange, options, icon: Icon, placeholder }) => {
    return (
        <div className="relative flex items-center">
            {Icon && <Icon className="text-primary-200 " />}
            <select
                value={value}
                onChange={onChange}
                className="px-2 font-semibold text-primary-150 py-2 text-base focus:outline-none"
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((opt) => (
                    <option key={opt.value || opt} value={opt.value || opt}>
                        {opt.label || opt}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CustomFilterSelect;
