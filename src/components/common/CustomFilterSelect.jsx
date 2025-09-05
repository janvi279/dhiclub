import Select from "react-select";

const CustomFilterSelect = ({ value, onChange, options, icon: Icon }) => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#E8F5FA" : "transparent",
      color: state.isFocused ? "#44C5FF" : "#000000",
      cursor: "pointer",
      fontWeight: 600,
      
    }),
    control: (provided) => ({
      ...provided,
      border: "none",
      boxShadow: "none",
      backgroundColor: "transparent",
      minWidth: "100px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#44C5FF",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  return (
    <div className="relative flex items-center w-full">
      {Icon && <Icon className="text-primary-200  text-xl" />}
      <Select
        value={options.find((opt) => opt.value === value) || null} // ✅ fix here
        onChange={onChange}
        options={options}
        styles={customStyles}
        className="w-full font-semibold text-primary-150 text-sm"
        isSearchable={false}
      />
    </div>
  );
};

export default CustomFilterSelect;
