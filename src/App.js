import './App.css';

import Home from "./Home";
import SignupForm from "./SignupForm";

import React from 'react';
import { useNavigate, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";

function App() {
  const navigate = useNavigate();

  const redirectToSignup = () => {
      navigate('/signup');
  };

  const redirectToLogin = () => {
      navigate('/login');
  };

  return (
      // TODO: Add LoginForm and Route button to the LoginForm page - the Login must check with firebase
      <Routes>
          <Route exact path="/" element={<Home handleSignupClick={redirectToSignup} handleLoginClick={redirectToLogin} />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
      </Routes>
  );
}

export default App;
