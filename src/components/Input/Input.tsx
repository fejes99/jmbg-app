import React from 'react';
import './Input.css';

interface Props {
  label: string;
}
const Input: React.FC<Props> = ({ label }) => {
  return (
    <div className='input__container'>
      <div className='input__label'>{label}: </div>
      <input type='text' className='input__field' />
    </div>
  );
};
export default Input;
