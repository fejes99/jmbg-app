import React from 'react';
import './Input.css';

type inputType = 'text' | 'number';

interface Props {
  type: inputType;
  label: string;
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({ label, type, name, value, onChange }) => {
  const inputPattern = type === 'text' ? /^[a-zA-Z]*$/ : /^\d*$/;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (inputValue === '' || inputPattern.test(inputValue)) {
      onChange(event);
    }
  };

  return (
    <div className='input__container'>
      <div className='input__label'>{label}: </div>
      <input
        className='input__field'
        type='text'
        name={name}
        value={value.toString()}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Input;
