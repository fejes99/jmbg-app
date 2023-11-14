import React, { useState } from 'react';
import './App.css';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import { JMBGDetails, getJMBGDetails } from './jmbgValidation';

/*
TODO:
1. add regex to fields (only string and only numbers)
2. fix css to app
*/

interface UserData {
  firstName: string;
  lastName: string;
  jmbg: number;
}

const App: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    jmbg: 0,
  });
  const [details, setDetails] = useState<JMBGDetails | null>(null);

  const [error, setError] = useState<string>('');
  console.log('🚀 ~ file: App.tsx:28 ~ error:', error);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleClick = () => {
    const details: JMBGDetails = getJMBGDetails(userData.jmbg.toString());
    setDetails(details);
    if (details.isValid === false) setError(details.error);
  };

  return (
    <>
      <h1>JMBG Aplikacija</h1>
      <Input
        type='text'
        label='Ime'
        name='firstName'
        value={userData.firstName}
        onChange={handleChange}
      />
      <Input
        type='text'
        label='Prezime'
        name='lastName'
        value={userData.lastName}
        onChange={handleChange}
      />
      <Input type='number' label='JMBG' name='jmbg' value={userData.jmbg} onChange={handleChange} />
      <Button title='Pretraži' onClick={handleClick} />

      {details?.isValid ? (
        <div>
          <div>Datum rođenja: {details.dateOfBirth}</div>
          <div>Regija rođenja: {details.region}</div>
          <div>Pol: {details.gender}</div>
        </div>
      ) : (
        <div>{error}</div>
      )}
    </>
  );
};

export default App;
