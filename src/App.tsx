import React, { useState } from 'react';
import './App.css';
import Input from './components/Input/Input';
import Button from './components/Button/Button';

const App: React.FC = () => {
  const [firstName, setfirstName] = useState<string>('');

  const validateJMBG = () => console.log('radi');

  return (
    <>
      <h1>JMBG Aplikacija</h1>
      <Input label='Ime' />
      <Input label='Prezime' />
      <Input label='JMBG' />
      <Button title='Pretraži' onClick={validateJMBG} />
    </>
  );
};

export default App;
