import React from "react";

import { useState, useContext } from "react";

import { useNavigate, Link } from "react-router-dom";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import { UserContext } from "../../contexts/user.context";

import backgroundImage from "../../assets/bg.jpg";

//import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  accountType: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [isSubmitting, setIsSubmitting] = useState(false); // add this state variable
  const { displayName, email, password, confirmPassword, accountType } =
    formFields;
  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      // add this check to prevent multiple submissions
      return;
    }

    setIsSubmitting(true); // set isSubmitting to true when the form is submitted

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setIsSubmitting(false); // set isSubmitting to false if there is an error
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      setCurrentUser(user);

      await createUserDocumentFromAuth(user, { displayName, accountType });
      resetFormFields();
      navigate("/", { replace: true });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("User creation encountered an error", error);
      }
    } finally {
      setIsSubmitting(false); // set isSubmitting to false when the form submission is complete
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
  // Import statements and component code above
  return (
    <section
      className="h-screen max flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-0 items-center px-5 md:px-0"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-full pr-9">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
          className="h-96 w-96"
        />
      </div>
      <div className="md:w-1/3 max-w-9xl">
        <form onSubmit={handleSubmit}>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            placeholder="Display Name"
            type="text"
            name="displayName"
            value={displayName}
            onChange={handleChange}
            required
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            name="email"
            value={email || ""}
            required
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            placeholder="Password"
            required
            onChange={handleChange}
            name="password"
            value={password || ""}
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            placeholder="Confirm Password"
            required
            onChange={handleChange}
            name="confirmPassword"
            value={confirmPassword || ""}
          />
          <select
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            name="accountType"
            onChange={handleChange}
            required
          >
            <option value="">Select Account Type</option>
            <option value="freelancer">Create Account as a Freelancer</option>
            <option value="expert">Create Account as an Expert</option>
          </select>
          <div className="flex justify-center items-center space-x-0">
            <button
              className="self-center mb-2 mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 text-white rounded tracking-wider focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55 mb-2"
              type="submit"
              disabled={isSubmitting}
            >
              Sign Up
            </button>
          </div>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            Already have an account?{" "}
            <a
              className="text-red-600 hover:underline hover:underline-offset-4"
              href="/signin"
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUpForm;
