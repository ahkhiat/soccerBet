import React, { useState } from 'react';

function Input({ label, id, type, name, value, onChange }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="form-input"
      />
    </div>
  );
}

export default Input;