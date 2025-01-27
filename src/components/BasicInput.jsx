import React from 'react';

/**
 * A basic date input with a label. 
 * - `label`: string displayed above the input.
 * - `value`: the current date value (format "YYYY-MM-DD").
 * - `onChange`: callback invoked when the date changes.
 * - `className`: optional for extra styling/classes.
 */
const BasicInput = ({ label, value, onChange, className = '',type = "text", ...props }) => {
  return (
    <div className={`d-flex flex-column ${className}`}>
      {label && <label className="mb-1">{label}</label>}
      <input
        type={type}
        className="form-control" // or your custom classes
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default BasicInput;
