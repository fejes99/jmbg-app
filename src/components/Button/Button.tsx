import React from 'react';
import './Button.css';

interface Props {
  title: string;
  onClick: () => void;
}
const Button: React.FC<Props> = ({ title, onClick }) => {
  return <button onClick={onClick}>{title}</button>;
};
export default Button;
