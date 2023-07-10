import React, { useState, useEffect } from 'react';
import Logo from '../Components/Logo';
import { FormRow } from '../Components/FormRow';
import { Alert } from '../Components/Alert';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  name: '',
  email: '',
  password: '',
  isMember: false,
};

export const Register = () => {
  const [values, setValues] = useState(initialValues);
  const navigate = useNavigate();
  const { user, isLoading, showAlert, displayAlert, registerUser, loginUser } = useAppContext();

  const toggleMembers = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return; // Return early if the form is incomplete
    }

    const currentUser = { name, email, password };

    if (isMember) {
      await loginUser(currentUser); // Await the loginUser function call
    } else {
      await registerUser(currentUser); // Await the registerUser function call
    }
  };

  useEffect(() => {
    if (user) {
      const timeout = setTimeout(() => {
        navigate('/'); 
      }, 2000); 

      return () => clearTimeout(timeout); 
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Sign In'}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
            label="Name"
          />
        )}
        {/* Email */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
          label="Email"
        />
        {/* Password */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
          label="Password"
        />

        <button type="submit" className="btn btn-block">        
          Submit
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type="button" onClick={toggleMembers} className="member-btn">
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
