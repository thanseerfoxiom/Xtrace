import React, { useCallback } from "react";
import ReactSelect, { components } from "react-select";
import { useField, useFormikContext } from "formik";
import { toast } from "react-toastify";

// A custom dropdown indicator using a Bootstrap-friendly SVG icon
const CustomDropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="#6C757D"
        stroke="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="bi bi-caret-down-fill"
      >
        <path d="M7 11l5 5 5-5z" />
      </svg>
    </components.DropdownIndicator>
  );
};

const MultiSelect = ({
  placeholder,
  label,
  className,
  name,
  options,
  menuPortalTarget,
  isCheck,
  onChange,
  onDeleteSelectedValues,
  deleteItem,
  isClearable,
  disabled,
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  // Create a "Select All" option when isCheck is enabled
  const selectAllOption = { label: "Select All", value: "*" };
  const extendedOptions =
    isCheck && options.length > 0 ? [selectAllOption, ...options] : options;

  // Custom styles for react-select that mimic Bootstrap's form-control
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? "1px solid #86b7fe" : "1px solid #ced4da",
      boxShadow: state.isFocused
        ? "0 0 0 0.25rem rgba(13, 110, 253, 0.25)"
        : provided.boxShadow,
      borderRadius: ".25rem",
      minHeight: "calc(1.5em + .75rem + 2px)",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#e9ecef",
      borderRadius: ".2rem",
      padding: "0.25rem 0.5rem",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#495057",
      fontSize: "0.875rem",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#6c757d",
      ":hover": {
        backgroundColor: "#ced4da",
        color: "#343a40",
      },
    }),
    option: (provided) => ({
      ...provided,
      fontSize: "0.875rem",
    }),
    input: (provided) => ({
      ...provided,
      fontSize: "0.875rem",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "0.875rem",
    }),
    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
  };

  // Custom Option to optionally show checkboxes for multi‑select
  const Option = (props) => {
    const { value } = props.data;
    const isSelectAllChecked =
      value === selectAllOption.value &&
      field.value?.length === options.length;
    const isChecked = field?.value?.some((option) => option?.value === value);

    return (
      <div>
        <components.Option {...props}>
          {isCheck && (
            <input
              type="checkbox"
              checked={
                value === selectAllOption.value ? isSelectAllChecked : isChecked
              }
              onChange={() => null}
              className="form-check-input me-2"
            />
          )}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };

  // Handle change events from react-select
  const handleChange = useCallback(
    async (newValue, actionMeta) => {
      if (!newValue) {
        const clearedValue = [];
        if (onChange) onChange(clearedValue);
        setFieldValue(name, clearedValue);
        return;
      }

      // Handle removal if deleteItem is true
      if (deleteItem && actionMeta.action === "remove-value") {
        const removedValue = actionMeta.removedValue;
        const isRemovable = await onDeleteSelectedValues(removedValue);
        if (!isRemovable) {
          toast.error(
            `The ${removedValue.label} and warehouse are associated, and the branch cannot be deleted.`
          );
          return;
        }
      }

      // If "Select All" is selected, toggle between all options and none
      const isSelectAllSelected = newValue.some(
        (option) => option.value === selectAllOption.value
      );
      if (isSelectAllSelected) {
        if (field.value?.length === options.length) {
          const clearedValue = [];
          if (onChange) onChange(clearedValue);
          setFieldValue(name, clearedValue);
        } else {
          const allSelected = options.map((opt) => ({
            label: opt.label,
            value: opt.value,
          }));
          if (onChange) onChange(allSelected);
          setFieldValue(name, allSelected);
        }
      } else {
        if (onChange) onChange(newValue);
        setFieldValue(name, newValue);
      }
    },
    [onChange, field.value, options, deleteItem, name, setFieldValue, onDeleteSelectedValues]
  );

  return (
    <div className={`mb-3 ${className || ""}`}>
      {label && <label className="form-label">{label}</label>}
      <ReactSelect
        id={field.name}
        isMulti
        value={field.value}
        onChange={handleChange}
        options={extendedOptions}
        placeholder={placeholder}
        styles={customStyles}
        className="w-100"
        classNamePrefix="react-select"
        menuPortalTarget={menuPortalTarget}
        components={{
          Option,
          DropdownIndicator: CustomDropdownIndicator,
        }}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        isClearable={isClearable}
        isDisabled={disabled}
      />
      {meta.touched && meta.error && (
        <div className="invalid-feedback d-block">{meta.error}</div>
      )}
    </div>
  );
};

export default MultiSelect;
