import Select from "react-select";

const CustomFilterSelect = ({ value, onChange, options, icon: Icon }) => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#E4E7FF" : "transparent",
      color: state.isFocused ? "#6246EA" : "#061237",
      cursor: "pointer",
      fontWeight: 600,
    }),
    control: (provided) => ({
      ...provided,
      border: "none",
      boxShadow: "none",
      backgroundColor: "transparent",
      minWidth: "120px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#6246EA",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  return (
    <div className="relative flex items-center w-full">
      {Icon && <Icon className="text-primary-200 mr-2 text-xl" />}
      <Select
        value={options.find((opt) => opt.value === value) || null} // ✅ fix here
        onChange={onChange}
        options={options}
        styles={customStyles}
        className="w-full font-semibold text-primary-150"
        isSearchable={false}
      />
    </div>
  );
};

export default CustomFilterSelect;
