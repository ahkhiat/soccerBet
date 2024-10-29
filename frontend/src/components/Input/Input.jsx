import { useState } from 'react';

function Input({ id, type, name, value, onChange, className, placeholder }) {
  const [inputValue, setInputValue] = useState("");

  return (
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
      />
  );
}

export default Input;