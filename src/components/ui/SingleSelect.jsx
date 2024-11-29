import React from "react";
import Select, { components } from "react-select";
import { useField } from "formik";
import { ChevronDown } from "lucide-react";

const CustomOption = (props) => {
  const { data } = props;

  if (data.isAddNew) {
    return (
      <div
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          props.selectProps.onAddNew();
        }}
        className="px-2 py-2 text-blue-600 cursor-pointer ml-1"
      >
        {data.label}
      </div>
    );
  }

  return <components.Option {...props} />;
};

// const customStyles = {
//   control: (provided, state) => ({
//     ...provided,
//     borderColor: state.isFocused ? "#d1d5db" : provided.borderColor,
//     boxShadow: "none",
//     "&:hover": {
//       borderColor: "#d1d5db",
//     },
//   }),
//   indicatorSeparator: () => ({ display: "none" }),
//   menuPortal: (provided) => ({ ...provided, zIndex: 100 }),
//   menu: (provided) => ({ ...provided, zIndex: 100 }),
//   clearIndicator: (provided) => ({
//     ...provided,
//     cursor: "pointer", // Add cursor pointer to the clear (close) icon
//   }),
// };

const customStyles = {
  control: (provided) => ({
    ...provided,
    padding: "none",
    border: "none",
    boxShadow: "none",
    backgroundColor: "none",
    
  }),
  indicatorSeparator: () => ({ display: "none" }),
  menuPortal: (provided) => ({ ...provided, zIndex: 100 }),
  menu: (provided) => ({ ...provided, zIndex: 100 }),
  clearIndicator: (provided) => ({
    ...provided,
    cursor: "pointer", 
  }),
};



const variantClasses = {
  default: "secondary-text bg-primary-background border-0 border-b border-border pb-px rounded-none hover:bg-hoverbackground ptb-[11px]",
  transparent: "secondary-text  border-0 border-b border-border rounded-none hover:bg-hoverbackground",
  normal: "border-b border-border rounded-none hover:bg-hoverbackground focus:outline-none focus:border-[#d1d5db]",
  error: "border-red-500 focus:border-red-500",
  success: "border-green-500 focus:border-green-500",
  primary:"secondary-text bg-background border border-[#D0D5DD] rounded-none"
};

const labelClasses = {
  default: "label-text text-primary-text ",
  primary: "text-sm-medium text-primary-text", // Larger size
  transparent: "block label-text text-primary-text mb-1",
};

const CustomDropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#6C757D" stroke="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    </components.DropdownIndicator>
  );
};

const SingleSelect = ({
  placeholder,
  label,
  className,
  addBtnFn,
  showAddNew,
  options = [],
  menuPortalTarget,
  onChange,
  variant = "default",
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  // console.log(field);
  

  const addNewOption = {
    value: "add-new",
    label: "Add New",
    isAddNew: true,
  };

  const handleChange = (option) => {
    if (option === null) {
      // Handle clearing the selection
      setValue("");
      if (onChange) {
        onChange(null);
      }
    } else {
      // Handle regular selection
      setValue(option.value);
      if (addBtnFn && option && !option.isAddNew) {
        addBtnFn(option);
      }
      if (onChange) {
        onChange(option);
      }
    }
  };

  const validOptions = Array.isArray(options) ? options : [];

  return (
    <div className={`flex flex-col items-start ${className}`}>
      {label && (
        <label
          className={`block mb-1 ${labelClasses[variant]}`}
          htmlFor={field.name}
        >
          {label}
        </label>
      )}
      <div className="w-full">
        <Select
          id={field.name}
          classNamePrefix="select"
          options={showAddNew ? [addNewOption, ...validOptions] : validOptions}
          placeholder={placeholder}
          defaultValue={props.value}
          value={
            validOptions
              ? validOptions.find((option) => option?.value === field.value)
              : ""
          }
          styles={customStyles}
          onChange={handleChange}
          className={`w-full text-ellipsis placeholder:label-text label-text text-secondary-text whitespace-nowrap ${variantClasses[variant]}`}
          menuPortalTarget={menuPortalTarget}
          components={{
            Option: CustomOption,
            DropdownIndicator: CustomDropdownIndicator, 
          }}
          isClearable // Enable the clear (close) icon
        />

        {meta.touched && meta.error ? (
          <div className="text-red-600 text-[10px] mb-[2px] h-[12px]">
            {typeof meta.error === "string" && meta.error}
          </div>
        ) : (
          <div className="text-transparent text-[10px] mb-[2px] h-[12px]">
            .
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleSelect;
