import React from "react";
import Select, { components } from "react-select";
import { ChevronDown } from "lucide-react";

// -- Optional custom option to handle "Add New" or special items --
const CustomOption = (props) => {
  const { data } = props;

  if (data.isAddNew) {
    return (
      <div
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // Call a parent function if you want to do something special, like open a modal
          props.selectProps.onAddNew?.();
        }}
        className="px-2 py-2 text-primary cursor-pointer"
      >
        {data.label}
      </div>
    );
  }

  return <components.Option {...props} />;
};

// -- Custom dropdown indicator with an icon --
const CustomDropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown size={20} strokeWidth={2} />
    </components.DropdownIndicator>
  );
};

// -- Custom styles for the react-select component (optional) --
const customStyles = {
  control: (provided) => ({
    ...provided,
    border: "1px solid #ddd",
    boxShadow: "none",
    minHeight: "38px",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  menuPortal: (provided) => ({ ...provided, zIndex: 9999 }), // So the dropdown isn't clipped
};

// -- A simple label style mapping (optional) --
const variantClasses = {
    default: "text-secondary bg-light border-4 border-bottom pb-1 rounded-0 hover:bg-secondary",
    transparent: "text-secondary border-0 border-bottom rounded-0 hover:bg-secondary",
    normal: "border-bottom border-secondary rounded-0 hover:bg-secondary focus:outline-none",
    error: "border-danger focus:border-danger",
    success: "border-success focus:border-success",
    primary: "text-gray bg-white border border-secondary rounded-3",
    border: "text-gray bg-white  border-lightborder rounded-3",
  };
  
  // Label classes mapped to Bootstrap classes
  const labelClasses = {
    default: "form-label text-primary",
    primary: "form-label fs-6 ", // Larger size
    transparent: "form-label text-primary mb-1",
  };
// -- Finally, the component --
const BasicSelect = ({
  label,
  name,
  className = "",
  placeholder = "Select...",
  options = [],
  value,            // The currently selected value (e.g. { value: 1, label: "Option 1" })
  onChange,         // Handler called when a new option is selected
  onAddNew,         // Optional handler if you want an "Add New" special option
  showAddNew = false,
  variant = "default",
  isDisabled = false,
  menuPortalTarget,
  ...props
}) => {
  // "Add New" item if needed
  const addNewOption = {
    value: "add-new",
    label: "Add New",
    isAddNew: true,
  };

  // Combine "Add New" with regular options if requested
  const validOptions = Array.isArray(options) ? options : [];
  const finalOptions = showAddNew ? [addNewOption, ...validOptions] : validOptions;

  const handleChange = (selectedOption) => {
    // If the user clears the field or picks a real option:
    if (onChange) {
      onChange(selectedOption || null);
    }
  };
  

  return (
    <div className={`d-flex flex-column ${className}`}>
      {label && (
        <label className={labelClasses[variant]} htmlFor={name}>
          {label}
        </label>
      )}

      <Select
        inputId={name}
        classNamePrefix="select"
        className={`w-100  placeholder-secondary label-text text-secondary whitespace-nowrap ${variantClasses[variant]}`}
        placeholder={placeholder}
        options={finalOptions}
        defaultValue={value}
        value={
          validOptions
            ? validOptions.find((option) => option?.value === value)
            : ""
        }
        onChange={handleChange}
        onAddNew={onAddNew} // see how we pass custom props for the custom option
        components={{
          Option: CustomOption,
          DropdownIndicator: CustomDropdownIndicator,
        }}
        styles={customStyles}
        isClearable
        isDisabled={isDisabled}
        menuPortalTarget={menuPortalTarget}
      />
    </div>
  );
};

export default BasicSelect;
