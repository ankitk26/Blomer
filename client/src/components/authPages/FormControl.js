import React from "react";

const FormControl = ({ htmlFor, type, value, onChange, error }) => {
  const capitalize = (placeholder) => {
    return placeholder.charAt(0).toUpperCase() + placeholder.slice(1);
  };

  return (
    <div className="form-group-auth">
      <label htmlFor={htmlFor} className="text-gray-800 capitalize">
        {htmlFor}
      </label>
      <input
        type={type}
        id={htmlFor}
        name={htmlFor}
        className={`form-control-auth ${error && "text-red-600 border border-red-600"}`}
        value={value}
        placeholder={capitalize(htmlFor)}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="text-sm font-bold text-red-600">{error && error}</span>
    </div>
  );
};

export default FormControl;
