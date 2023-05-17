import React, { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { UserContext } from "../../contexts/user.context";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = ({ showSignUpForm }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      setCurrentUser(user);
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        alert("Invalid email or password");
      }
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSignUpClick = () => {
    const container = document.querySelector(".sign-in-up-container");
    container.classList.add("slide-right");
    setTimeout(() => {
      showSignUpForm();
    }, 500);
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
      <div className="sign-up-link-container">
        <span>Don't have an account? </span>
        <a href="#" onClick={handleSignUpClick}>
          Sign up here
        </a>
      </div>
    </div>
  );
};

const SignUpForm = ({ showSignInForm }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Code to create a new user account
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSignInClick = () => {
    const container = document.querySelector(".sign-in-up-container");
    container.classList.remove("slide-right");
    showSignInForm();
  };

  return (
    <div className="sign-up-container" style={{ display: "none" }}>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign Up</Button>
        </div>
      </form>
      <div className="sign-in-link-container">
        <span>Already have an account? </span>
        <a href="#" onClick={handleSignInClick}>
          Sign in here
        </a>
      </div>
    </div>
  );
};

const SignInSignUp = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const showSignUpForm = () => {
    setShowSignUp(true);
  };

  const showSignInForm = () => {
    setShowSignUp(false);
  };

  return (
    <div className="sign-in-up-container">
      <div className="sign-in-container">
        <SignInForm showSignUpForm={showSignUpForm} />
      </div>
      <div className="sign-up-container" style={{ display: "none" }}>
        <SignUpForm showSignInForm={showSignInForm} />
      </div>
    </div>
  );
};

export default SignInSignUp;
