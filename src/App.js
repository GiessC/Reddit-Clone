import './App.css';

import Home from "./Home";
import SignupForm from "./SignupForm";

import React from 'react';
import { useNavigate, Routes, Route } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const handleSignupClick = () => {
      navigate('/signup');
  };

  return (
      // TODO: Add LoginForm and Route button to the LoginForm page - the Login must check with firebase
      <Routes>
          <Route exact path="/" element={<Home handleSignupClick={handleSignupClick} />} />
          <Route path="/signup" element={<SignupForm/>} />
      </Routes>
  );
}

export default App;
