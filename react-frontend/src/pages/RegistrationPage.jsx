// RegistrationPage.jsx

import React from 'react';
import RegistrationForm from './Registration'; // Corrected import statement

const RegistrationPage = ({ onRegister }) => {
  return (
    <div className="container">
      <RegistrationForm onRegister={onRegister} />
    </div>
  );
};

export default RegistrationPage;
