import React, { useState } from "react";
import "./input.css";

const SystemInput = ({ value, setValue, label, rules }) => {
  const [error, setError] = useState("");

  function onBlurHandler() {
    if (rules?.notNull) {
      if (!value && !value.length) {
        setError("Заполните поле");
        return false;
      }
    }

    setError("");
  }

  return (
    <div className='system_input'>
      <label>{label ? label : "label"}</label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlurHandler}
        className={`form-control ${
          error && error.length && "system_input_error"
        }`}
      />
      {error && error.length && (
        <label className='system_input_error'>{error}</label>
      )}
    </div>
  );
};

export default SystemInput;
